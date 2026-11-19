import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Studior",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <main className="relative flex flex-1 items-center overflow-hidden bg-neutral-950 px-6 pb-20 pt-32 text-white sm:px-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[min(85vw,38rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]"
      >
        <div className="absolute inset-8 rounded-full border border-white/[0.06]" />
        <div className="absolute inset-16 rounded-full border border-accent/15" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl text-center">
        <p className="mb-5 text-xs font-semibold tracking-[0.3em] text-accent uppercase">
          Error 404
        </p>
        <h1 className="text-5xl leading-none font-semibold tracking-tight sm:text-8xl md:text-9xl">
          Lost in the
          <br />
          <span className="text-accent">wrong scene.</span>
        </h1>
        <p className="mx-auto mt-7 max-w-lg text-base leading-7 text-white/60 sm:text-lg">
          Looks like this page missed its cue. Let’s get you back to finding
          your next creative space.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-7 text-sm font-semibold text-white transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Back to home
          </Link>
          <Link
            href="/studios"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-7 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Explore studios
          </Link>
        </div>
      </div>
    </main>
  );
}
