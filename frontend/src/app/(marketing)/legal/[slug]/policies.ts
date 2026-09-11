import { SITE_CONTACT } from "@/lib/site";

/**
 * The published Terms, Privacy and Refund policies.
 *
 * Wording is supplied by the business and reproduced here as given; treat this
 * file as copy, not as code to tidy. The only edits made in transcription were
 * to normalise the support email and phone onto SITE_CONTACT so the footer and
 * the policies cannot quote different ones.
 */

export type Block = { p: string } | { ul: string[] };

export type Section = { heading: string; blocks: Block[] };

export type Policy = {
  title: string;
  /** Used for <meta name="description"> and the lede under the title. */
  description: string;
  dateLabel: string;
  date: string;
  intro: Block[];
  sections: Section[];
  /** Rendered after the numbered sections, in a boxed closing note. */
  closing?: string;
};

const terms: Policy = {
  title: "Terms & Conditions",
  description:
    "The terms that govern your use of the NextMentor website, courses, training programs, digital products and related services.",
  dateLabel: "Last updated",
  date: "10 September 2026",
  intro: [
    {
      p: "Welcome to NextMentor. By accessing or using our website, courses, training programs, digital products, and related services, you agree to be bound by the following Terms & Conditions. Please read them carefully before making any purchase or using our services.",
    },
  ],
  sections: [
    {
      heading: "1. About NextMentor",
      blocks: [
        {
          p: "NextMentor provides online education, skill-development training, courses, tutorials, and learning resources related to digital skills, online advertising, lead generation, artificial intelligence, and other professional skills.",
        },
        { p: "The courses are intended for educational and skill-development purposes." },
      ],
    },
    {
      heading: "2. Eligibility",
      blocks: [
        {
          p: "You must provide accurate information while registering or purchasing any course from NextMentor.",
        },
        {
          p: "By using our services, you confirm that the information provided by you is accurate and complete.",
        },
        {
          p: "If you are under 18 years of age, you should use our services only with the involvement and consent of your parent or legal guardian.",
        },
      ],
    },
    {
      heading: "3. Course Purchase & Access",
      blocks: [
        {
          p: "After successful payment, eligible course access may be provided to the registered account, email address or mobile number.",
        },
        { p: "Course access is intended solely for the individual who purchased the course." },
        { p: "You must not:" },
        {
          ul: [
            "Share your login ID or password with another person.",
            "Resell, distribute, reproduce, or commercially exploit course content.",
            "Record, copy, reproduce, or redistribute paid course videos or materials without written permission.",
            "Upload NextMentor's course content on any third-party platform.",
          ],
        },
        {
          p: "NextMentor reserves the right to suspend or terminate access if unauthorized sharing, copying, redistribution, or misuse of course content is detected.",
        },
      ],
    },
    {
      heading: "4. Course Content",
      blocks: [
        {
          p: "We make reasonable efforts to provide accurate and useful educational content. However, digital platforms, advertising systems, software, policies, and technologies may change from time to time.",
        },
        {
          p: "Therefore, NextMentor does not guarantee that every method, strategy, platform feature, or technique taught in a course will remain unchanged or produce identical results in the future.",
        },
        { p: "Course content may be updated, modified, replaced, or discontinued when necessary." },
      ],
    },
    {
      heading: "5. No Guaranteed Income",
      blocks: [
        { p: "NextMentor provides education and skill-development training." },
        {
          p: "We do not guarantee any specific income, profit, sales, leads, clients, employment, business growth, or financial results from using our courses or training.",
        },
        {
          p: "Results depend on various factors, including individual skills, implementation, effort, market conditions, advertising budget, business model, competition, and other circumstances.",
        },
        {
          p: "Any examples, testimonials, case studies, or income-related illustrations presented on our website or during training are for informational purposes only and should not be interpreted as a guarantee of future results.",
        },
      ],
    },
    {
      heading: "6. Payment",
      blocks: [
        { p: "All course prices displayed on the website are subject to change without prior notice." },
        { p: "Payment must be successfully completed before course access is provided." },
        { p: "You are responsible for providing correct payment and registration information." },
        {
          p: "If a payment is deducted but the course access is not activated, you should contact our support team with the relevant transaction details.",
        },
      ],
    },
    {
      heading: "7. Refund & Cancellation Policy",
      blocks: [
        {
          p: "All purchases are subject to the NextMentor Refund Policy published separately on our website.",
        },
        {
          p: "By purchasing a course, you acknowledge that you have read and agreed to the applicable Refund Policy.",
        },
        {
          p: "Where a refund is approved, it will be processed according to the terms and conditions specified in the Refund Policy.",
        },
      ],
    },
    {
      heading: "8. Intellectual Property",
      blocks: [
        {
          p: "All course videos, graphics, text, presentations, PDFs, logos, website content, designs, training materials, and other content provided by NextMentor are the intellectual property of NextMentor or its respective licensors.",
        },
        {
          p: "No part of the content may be copied, reproduced, modified, published, distributed, sold, or commercially exploited without prior written permission.",
        },
      ],
    },
    {
      heading: "9. User Account",
      blocks: [
        { p: "You are responsible for maintaining the confidentiality of your account credentials." },
        { p: "You are responsible for all activities performed through your account." },
        {
          p: "If you believe that your account has been accessed without authorization, you should immediately contact NextMentor support.",
        },
      ],
    },
    {
      heading: "10. Prohibited Activities",
      blocks: [
        { p: "Users must not use the website or course services for unlawful or fraudulent activities." },
        { p: "You must not:" },
        {
          ul: [
            "Attempt to gain unauthorized access to our website or systems.",
            "Disrupt or interfere with website operations.",
            "Copy or misuse our intellectual property.",
            "Use false information for registration or transactions.",
            "Attempt to circumvent course-access restrictions.",
            "Share paid course credentials with others.",
          ],
        },
        {
          p: "Violation of these terms may result in suspension or termination of access without refund, subject to applicable law and the applicable Refund Policy.",
        },
      ],
    },
    {
      heading: "11. Third-Party Platforms",
      blocks: [
        {
          p: "Some courses may provide educational guidance relating to third-party platforms such as Meta, Facebook, Instagram, Google, WhatsApp, Canva, AI tools, or other services.",
        },
        {
          p: "NextMentor is not responsible for changes to third-party platforms, their policies, account restrictions, advertising decisions, outages, pricing, or functionality.",
        },
        {
          p: "Users are responsible for complying with the terms and policies of any third-party platform they use.",
        },
      ],
    },
    {
      heading: "12. Website Availability",
      blocks: [
        {
          p: "We make reasonable efforts to keep the website and services available. However, temporary interruptions may occur because of maintenance, technical problems, internet issues, hosting problems, or circumstances beyond our reasonable control.",
        },
        { p: "NextMentor does not guarantee uninterrupted or error-free availability of the website." },
      ],
    },
    {
      heading: "13. Limitation of Liability",
      blocks: [
        {
          p: "To the extent permitted by applicable law, NextMentor shall not be responsible for indirect, incidental, special, or consequential losses arising from the use of our website, courses, training, or information.",
        },
        {
          p: "Nothing in these Terms & Conditions is intended to exclude or limit any liability that cannot legally be excluded or limited under applicable law.",
        },
      ],
    },
    {
      heading: "14. Changes to Terms",
      blocks: [
        { p: "NextMentor may update or modify these Terms & Conditions from time to time." },
        {
          p: "The updated version will be published on this page with the revised “Last updated” date.",
        },
        {
          p: "Continued use of our website or services after changes are published constitutes acceptance of the updated Terms & Conditions, to the extent permitted by applicable law.",
        },
      ],
    },
    {
      heading: "15. Privacy",
      blocks: [
        { p: "Your use of our website and services is also subject to our Privacy Policy." },
        {
          p: "We may collect and process information as described in our Privacy Policy for purposes such as account creation, course delivery, payment processing, customer support, and service improvement.",
        },
      ],
    },
    {
      heading: "16. Governing Law & Jurisdiction",
      blocks: [
        {
          p: "These Terms & Conditions shall be governed by and interpreted in accordance with the laws applicable in India.",
        },
        {
          p: "Subject to applicable law, disputes arising in connection with these Terms & Conditions shall be subject to the jurisdiction of the appropriate courts having jurisdiction over the place of business of NextMentor.",
        },
      ],
    },
    {
      heading: "17. Contact",
      blocks: [
        {
          p: "For questions, support, or concerns regarding these Terms & Conditions, please contact NextMentor.",
        },
        {
          ul: [
            `Email: ${SITE_CONTACT.email}`,
            `Phone: ${SITE_CONTACT.phone}`,
            `Website: ${SITE_CONTACT.website}`,
          ],
        },
      ],
    },
  ],
  closing:
    "By accessing our website or purchasing our courses, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.",
};

const refund: Policy = {
  title: "Cancellation & Refund Policy",
  description:
    "When a NextMentor purchase can be cancelled or refunded, how to request one, and the cases where a refund is not given.",
  dateLabel: "Effective date",
  date: "10 September 2026",
  intro: [
    {
      p: "At NextMentor, we aim to provide high-quality online courses and learning resources to our students. Please read this Refund & Cancellation Policy carefully before purchasing any course or package.",
    },
    {
      p: "By purchasing any course or program from NextMentor, you agree to the terms mentioned below.",
    },
  ],
  sections: [
    {
      heading: "1. Refund Period",
      blocks: [
        {
          p: "Customers can request a refund within 24 hours from the date and time of purchase.",
        },
        { p: "Refund requests received after 24 hours will not be accepted." },
      ],
    },
    {
      heading: "2. Eligibility for Refund",
      blocks: [
        { p: "A refund will only be considered if:" },
        {
          ul: [
            "The request is made within 24 hours of purchase.",
            `The request is sent from the registered email address to ${SITE_CONTACT.email}.`,
            "The course has not been substantially accessed or completed.",
            "A valid payment receipt or order details are provided.",
          ],
        },
      ],
    },
    {
      heading: "3. When Refunds Will Not Be Given",
      blocks: [
        { p: "Refunds will not be provided if:" },
        {
          ul: [
            "More than 24 hours have passed since the purchase.",
            "The customer has attended live training, mentorship, webinars, or coaching sessions.",
            "The customer is unable to continue due to personal reasons.",
            "The customer has accessed a significant portion of the course content.",
            "The customer has downloaded study materials or bonus resources.",
            "The customer changes their mind after purchase.",
            "The customer fails to attend scheduled sessions.",
            "The customer is dissatisfied due to personal expectations after accessing the course.",
          ],
        },
      ],
    },
    {
      heading: "4. Duplicate Payment",
      blocks: [
        {
          p: "If the same student accidentally makes the same payment more than once for the same course or package, the duplicate transaction may be eligible for a refund after verification.",
        },
      ],
    },
    {
      heading: "5. Failed or Unsuccessful Transactions",
      blocks: [
        {
          p: "If money has been deducted from the student's bank account but the order or payment is shown as unsuccessful and course access has not been provided, the student should contact our support team with the payment details.",
        },
        {
          p: "After verification, the amount will be handled according to the payment gateway and banking process and applicable rules.",
        },
      ],
    },
    {
      heading: "6. Change of Mind",
      blocks: [
        { p: "Refunds will not be provided simply because a student:" },
        {
          ul: [
            "Changes their mind after purchase.",
            "Does not wish to continue the course.",
            "Does not have sufficient time to complete the course.",
            "Does not achieve the expected results.",
            "Does not use the course after purchasing it.",
          ],
        },
      ],
    },
    {
      heading: "7. No Guaranteed Income",
      blocks: [
        {
          p: "NextMentor provides educational and skill-development content. We do not guarantee employment, freelancing projects, business sales, leads, income or any specific financial result from completing our courses.",
        },
        {
          p: "Individual results depend on the student's efforts, skills, implementation and other factors.",
        },
      ],
    },
    {
      heading: "8. How to Contact Us",
      blocks: [
        {
          p: "For payment-related issues, students can contact NextMentor support and provide:",
        },
        {
          ul: [
            "Student name",
            "Registered mobile number",
            "Registered email address",
            "Course or package purchased",
            "Transaction ID or Order ID",
            "Date of payment",
            "Screenshot of the payment, if required",
          ],
        },
        { p: "Our team will review the request and respond accordingly." },
        {
          ul: [
            `Email: ${SITE_CONTACT.email}`,
            `Support team: ${SITE_CONTACT.phone}`,
            `Website: ${SITE_CONTACT.website}`,
          ],
        },
      ],
    },
    {
      heading: "9. Policy Changes",
      blocks: [
        {
          p: "NextMentor reserves the right to modify or update this Refund & Cancellation Policy from time to time. Any changes will be published on this page.",
        },
      ],
    },
  ],
  closing:
    "By purchasing a course from NextMentor, the student acknowledges that they have read, understood and agreed to this Refund & Cancellation Policy.",
};

const privacy: Policy = {
  title: "Privacy Policy",
  description:
    "What personal information NextMentor collects, how it is used and protected, and the choices you have.",
  dateLabel: "Effective date",
  date: "10 September 2026",
  intro: [
    {
      p: "At NextMentor, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website, courses, and online services.",
    },
  ],
  sections: [
    {
      heading: "1. Information We Collect",
      blocks: [
        { p: "We may collect:" },
        {
          ul: [
            "Personal information: name, email address, phone number, payment and registration details.",
            "Usage information: pages visited, course activity, and website interactions.",
            "Technical information: IP address, browser, device information, operating system, and cookies.",
          ],
        },
      ],
    },
    {
      heading: "2. How We Use Your Information",
      blocks: [
        { p: "Your information may be used for:" },
        {
          ul: [
            "Providing and improving our courses and services.",
            "Creating and managing your account.",
            "Processing payments and course registrations.",
            "Responding to enquiries and providing customer support.",
            "Sending important updates and promotional communications.",
            "Improving website performance and user experience.",
          ],
        },
      ],
    },
    {
      heading: "3. How We Protect Your Information",
      blocks: [
        {
          p: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction.",
        },
        {
          ul: [
            "All sensitive information, including payment details, is encrypted using secure protocols.",
            "Access to personal data is limited to authorized personnel only.",
            "Regular security assessments are conducted to ensure your data is safe.",
          ],
        },
      ],
    },
    {
      heading: "4. Sharing of Information",
      blocks: [
        {
          p: "We do not sell or rent your personal information. Information may be shared with trusted service providers, payment partners, or authorities when required by law or necessary to provide our services.",
        },
      ],
    },
    {
      heading: "5. Cookies",
      blocks: [
        {
          p: "We may use cookies and similar technologies to remember preferences, maintain sessions, analyze website usage, and improve our services. You can manage cookies through your browser settings.",
        },
      ],
    },
    {
      heading: "6. Third-Party Links",
      blocks: [
        {
          p: "Our website may contain links to third-party websites or services. We are not responsible for their privacy practices and recommend reviewing their respective privacy policies.",
        },
      ],
    },
    {
      heading: "7. Your Rights",
      blocks: [
        { p: "Subject to applicable law, you may request to:" },
        {
          ul: [
            "Access or update your personal information.",
            "Request deletion where applicable.",
            "Opt out of promotional communications.",
          ],
        },
        { p: "For privacy-related requests, contact us at the details below." },
      ],
    },
    {
      heading: "8. Children's Privacy",
      blocks: [
        {
          p: "Our services are intended for users 14 years and above. We do not knowingly collect personal information from children below this age without appropriate authorization.",
        },
      ],
    },
    {
      heading: "9. Changes to This Policy",
      blocks: [
        {
          p: "We may update this Privacy Policy from time to time. Any changes will be published on this page with an updated effective date.",
        },
      ],
    },
    {
      heading: "10. Contact Us",
      blocks: [
        {
          ul: [
            `Email: ${SITE_CONTACT.email}`,
            `Phone: ${SITE_CONTACT.phone}`,
            `Website: ${SITE_CONTACT.website}`,
          ],
        },
      ],
    },
  ],
};

export const POLICIES = { terms, privacy, refund } as const;

export type PolicySlug = keyof typeof POLICIES;
