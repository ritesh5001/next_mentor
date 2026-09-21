/**
 * Student feedback shown in the homepage ticker.
 *
 * Only add feedback a real student actually gave — each card carries a
 * verified tick, so every entry here is a claim the business must be able to
 * back up (a message, a review, a form response). `who` is how the student
 * describes themselves: Student, Housewife, Working professional, Freelancer…
 */
export type Testimonial = {
  name: string;
  who?: string;
  course: string;
  body: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Priti Priyedarshni",
    course: "Digital marketing",
    body: "Structured training, Q&A sessions and mentorship that actually answered my questions. I went from nothing to running campaigns.",
  },
];
