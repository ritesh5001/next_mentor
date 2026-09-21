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

/* ------------------------------------------------------------- templates */

/**
 * Blank entries to fill in as real feedback arrives.
 *
 * Deliberately NOT rendered: quotes shown to buyers with a verified tick have
 * to come from real students. Copy an entry into TESTIMONIALS above, replace
 * every field with what the person actually wrote, and it appears on the
 * homepage — at three or more the section becomes the sliding carousel.
 *
 * `who` is how they describe themselves: Student, Housewife, Working
 * professional, Freelancer, Business owner.
 */
export const FEEDBACK_TEMPLATE: Testimonial[] = Array.from({ length: 18 }, () => ({
  name: "",
  who: "",
  course: "",
  body: "",
}));
