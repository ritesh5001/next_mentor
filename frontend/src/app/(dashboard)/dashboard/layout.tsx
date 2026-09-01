import { redirect } from "next/navigation";

import { requireUser } from "@/lib/queries";

/**
 * Keeps admins out of the student dashboard.
 *
 * Fixing the login redirect alone was not enough: an existing session, a
 * bookmark or a link in an email drops an administrator into a course list
 * with a KYC form and a commission wallet, none of which apply to them.
 *
 * This sits on /dashboard specifically rather than on the parent group,
 * because /learn shares that group and admins legitimately preview courses
 * there — the API grants them access to any course on purpose, so they can
 * check content before publishing it.
 */
export default async function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  if (user.role === "admin") redirect("/admin");

  return <>{children}</>;
}
