/**
 * Imports the recorded courses from a local folder into the live catalogue.
 *
 *   pnpm tsx --env-file=.env scripts/import-courses.ts <videoRoot> [thumbDir]
 *
 * Goes through the same service functions the admin panel uses, so every rule
 * the UI enforces (key ownership, HEAD-confirmed uploads, publish guard) holds
 * here too.
 *
 * Resumable: courses, modules and lessons are matched by slug/title, and a
 * lesson already marked `ready` is skipped. A dropped connection on a 1GB
 * upload costs one re-run, not a duplicate course.
 */
import fs from "node:fs";
import https from "node:https";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { and, eq } from "drizzle-orm";
import ImageKit from "imagekit";

import { db } from "@/db";
import { courses, lessons, modules, users } from "@/db/schema";
import { env } from "@/lib/env";
import { slugify } from "@/services/courses";
import {
  confirmLessonUpload,
  createCourse,
  createLesson,
  createModule,
  requestLessonUpload,
  setCourseStatus,
  setCourseThumbnail,
  updateLesson,
} from "@/services/admin-write";
import { grantCourse } from "@/services/grants";

type LessonSpec = { file: string; title: string; freePreview?: boolean };
type ModuleSpec = { title: string; lessons: LessonSpec[] };
type CourseSpec = {
  folder: string;
  thumb: string;
  title: string;
  subtitle: string;
  description: string;
  modules: ModuleSpec[];
};

const INSTRUCTOR = "Saurabh Namdev";
const PRICE_RUPEES = 2499;
const MRP_RUPEES = 4999;

const COURSES: CourseSpec[] = [
  {
    folder: "Meta ads",
    thumb: "meta.jpg",
    title: "Meta Ads",
    subtitle: "Set up your page and launch your first Meta ad campaign",
    description:
      "A practical walkthrough of Meta advertising, from understanding how Meta Ads work to launching a real campaign.\n\n" +
      "You will set up the Facebook Page your ads run from, then build a campaign step by step inside Ads Manager. " +
      "Every lesson is a screen recording of the actual setup, so you can follow along in your own account.",
    modules: [
      {
        title: "Getting Started with Meta Ads",
        lessons: [
          { file: "1. Meta Ads Introduction.mp4", title: "Introduction to Meta Ads", freePreview: true },
          { file: "2. Meta part 2.mp4", title: "Introduction to Meta Ads, Part 2" },
        ],
      },
      {
        title: "Setting Up Your Facebook Page",
        lessons: [{ file: "3. Meta fb page.mp4", title: "Creating Your Facebook Page" }],
      },
      {
        title: "Building Your Campaign",
        lessons: [{ file: "4. Campaign Setup.mp4", title: "Campaign Setup, Step by Step" }],
      },
      {
        title: "Wrapping Up",
        lessons: [{ file: "5. Conclusion.mp4", title: "Conclusion and Next Steps" }],
      },
    ],
  },
  {
    folder: "Ads & Whatsapp Lead Generation ",
    thumb: "wa.jpg",
    title: "Ads & WhatsApp Lead Generation",
    subtitle: "Run Meta ads that send leads straight to your WhatsApp",
    description:
      "Learn to generate leads by running ads that open a WhatsApp conversation instead of a form.\n\n" +
      "You will prepare the page your campaign runs from, create a WhatsApp campaign end to end, and manage it " +
      "from the Meta Ads Manager app on your phone.",
    modules: [
      {
        title: "Getting Started",
        lessons: [
          {
            file: "1. Ads & Whatsapp Leads Generation.mp4",
            title: "Ads & WhatsApp Lead Generation: Overview",
            freePreview: true,
          },
        ],
      },
      {
        title: "Preparing Your Campaign",
        lessons: [
          { file: "2. Whatsapp Page create for campaign.mp4", title: "Setting Up the Page for Your Campaign" },
        ],
      },
      {
        title: "Creating the WhatsApp Campaign",
        lessons: [
          { file: "3. Whatsapp Campaign Creation.mp4", title: "Creating the WhatsApp Campaign" },
          { file: "4. Whatsapp, Meta ads manager app.mp4", title: "Using the Meta Ads Manager App" },
        ],
      },
      {
        title: "Wrapping Up",
        lessons: [
          { file: "5. Whatsapp & Lead generation Conclusion.mp4", title: "Conclusion: WhatsApp & Lead Generation" },
        ],
      },
    ],
  },
];

const [videoRoot, thumbDir] = process.argv.slice(2);
if (!videoRoot) {
  console.error("usage: import-courses.ts <videoRoot> [thumbDir]");
  process.exit(1);
}

function probeDuration(file: string): number {
  const out = execFileSync("ffprobe", [
    "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file,
  ]).toString();
  return Math.round(Number.parseFloat(out));
}

/**
 * PUT with an explicit Content-Length. Node's fetch sends a stream body
 * chunked, and a presigned R2 PUT refuses chunked uploads.
 */
function putFile(url: string, file: string): Promise<void> {
  const size = fs.statSync(file).size;
  return new Promise((resolve, reject) => {
    let sent = 0;
    let lastPct = -1;
    const req = https.request(
      url,
      { method: "PUT", headers: { "Content-Type": "video/mp4", "Content-Length": size } },
      (res) => {
        let body = "";
        res.on("data", (c) => (body += c));
        res.on("end", () =>
          res.statusCode && res.statusCode < 300
            ? resolve()
            : reject(new Error(`R2 PUT ${res.statusCode}: ${body.slice(0, 300)}`)),
        );
      },
    );
    req.on("error", reject);
    const stream = fs.createReadStream(file);
    stream.on("data", (chunk) => {
      sent += chunk.length;
      const pct = Math.floor((sent / size) * 100);
      if (pct % 10 === 0 && pct !== lastPct) {
        lastPct = pct;
        process.stdout.write(` ${pct}%`);
      }
    });
    stream.pipe(req);
  });
}

async function findOrCreateCourse(spec: CourseSpec) {
  const slug = slugify(spec.title);
  const [existing] = await db.select({ id: courses.id, slug: courses.slug }).from(courses)
    .where(eq(courses.slug, slug)).limit(1);
  if (existing) return existing;

  return createCourse({
    title: spec.title,
    subtitle: spec.subtitle,
    description: spec.description,
    instructorName: INSTRUCTOR,
    priceInRupees: PRICE_RUPEES,
    mrpInRupees: MRP_RUPEES,
    level: "beginner",
    language: "en",
  });
}

async function findOrCreateModule(courseId: string, title: string) {
  const find = () => db.select({ id: modules.id }).from(modules)
    .where(and(eq(modules.courseId, courseId), eq(modules.title, title))).limit(1);
  let [row] = await find();
  if (!row) {
    await createModule({ courseId, title });
    [row] = await find();
  }
  return row.id;
}

async function findOrCreateLesson(moduleId: string, title: string) {
  const find = () => db.select({ id: lessons.id, status: lessons.videoStatus }).from(lessons)
    .where(and(eq(lessons.moduleId, moduleId), eq(lessons.title, title))).limit(1);
  let [row] = await find();
  if (!row) {
    await createLesson({ moduleId, title });
    [row] = await find();
  }
  return row;
}

async function uploadThumbnail(courseId: string, file: string) {
  const cfg = env("imagekit");
  const ik = new ImageKit({
    publicKey: cfg.IMAGEKIT_PUBLIC_KEY,
    privateKey: cfg.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: cfg.IMAGEKIT_URL_ENDPOINT,
  });
  const res = await ik.upload({
    file: fs.readFileSync(file),
    fileName: `${crypto.randomUUID()}.jpg`,
    folder: "/thumbnails",
    useUniqueFileName: false,
  });
  await setCourseThumbnail(courseId, res.filePath);
  console.log(`  thumbnail -> ${res.filePath}`);
}

const created: string[] = [];

for (const spec of COURSES) {
  console.log(`\n=== ${spec.title}`);
  const course = await findOrCreateCourse(spec);
  created.push(course.id);
  console.log(`  course ${course.slug} (${course.id})`);

  for (const mod of spec.modules) {
    const moduleId = await findOrCreateModule(course.id, mod.title);
    console.log(`  module: ${mod.title}`);

    for (const ls of mod.lessons) {
      const lesson = await findOrCreateLesson(moduleId, ls.title);
      await updateLesson(lesson.id, { title: ls.title, isFreePreview: Boolean(ls.freePreview) });

      if (lesson.status === "ready") {
        console.log(`    = ${ls.title} (already ready, skipped)`);
        continue;
      }

      const file = path.join(videoRoot, spec.folder, ls.file);
      const duration = probeDuration(file);
      const mb = (fs.statSync(file).size / 1048576).toFixed(0);
      process.stdout.write(`    ^ ${ls.title} [${mb}MB, ${duration}s]`);

      const upload = await requestLessonUpload(lesson.id, "video/mp4");
      if ("error" in upload) throw new Error(upload.error);

      await putFile(upload.uploadUrl, file);
      const confirmed = await confirmLessonUpload(lesson.id, upload.videoId, duration);
      if ("error" in confirmed) throw new Error(confirmed.error);
      console.log(`  ok`);
    }
  }

  if (thumbDir) await uploadThumbnail(course.id, path.join(thumbDir, spec.thumb));

  const published = await setCourseStatus(course.id, "published");
  if (!published.ok) throw new Error(published.error);
  console.log(`  published`);
}

// The test user was set up to have every course; keep that true for these.
const [admin] = await db.select({ id: users.id }).from(users)
  .where(eq(users.email, "saurabhnamdev2015@gmail.com")).limit(1);
const [student] = await db.select({ id: users.id }).from(users)
  .where(eq(users.email, "mohitnamdev2016@gmail.com")).limit(1);
if (admin && student) {
  for (const courseId of created) {
    await grantCourse({ userId: student.id, courseId, grantedById: admin.id });
  }
  console.log("\ngranted both courses to mohitnamdev2016@gmail.com");
}

process.exit(0);
