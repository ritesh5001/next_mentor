import Link from "next/link";
import { SearchX } from "lucide-react";

import { buttonClasses } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 px-6 text-center"
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-[var(--color-muted)]">
        <SearchX
          className="size-7 text-[var(--color-muted-foreground)]"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>

      <h1 className="text-2xl font-extrabold tracking-tight">Page not found</h1>
      <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
        That page does not exist, or it is no longer available.
      </p>

      <div className="mt-2 flex flex-wrap justify-center gap-2">
        <Link href="/courses" className={buttonClasses()}>
          Browse courses
        </Link>
        <Link href="/" className={buttonClasses({ variant: "secondary" })}>
          Go home
        </Link>
      </div>
    </main>
  );
}
