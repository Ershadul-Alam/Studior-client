import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import StudioBrowser from "@/components/StudioBrowser";

function SkeletonGrid() {
  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-white/10"
        >
          <div className="h-48 animate-pulse bg-white/10" />
          <div className="flex flex-1 flex-col gap-3 px-5 py-5">
            <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
            <div className="h-5 w-3/4 animate-pulse rounded bg-white/10" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-white/10" />
            <div className="mt-3 h-px bg-white/10" />
            <div className="flex justify-between">
              <div className="h-3 w-16 animate-pulse rounded bg-white/10" />
              <div className="h-3 w-16 animate-pulse rounded bg-white/10" />
            </div>
            <div className="mt-3 h-10 animate-pulse rounded-lg bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

async function StudioGrid({ searchParams }) {
  await connection();
  const { category } = await searchParams;

  let studios = [];

  try {
    const response = await fetch("http://localhost:8000/studios");
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    studios = await response.json();
  } catch (error) {
    console.error("Failed to load studios:", error);
  }

  if (studios.length === 0) {
    return (
      <div className="mt-16 rounded-2xl border border-white/10 bg-white/5 px-6 py-12 text-center">
        <p className="text-lg font-semibold text-white">No studios found</p>
        <p className="mt-2 text-white/60">
          Couldn&apos;t load studios. Make sure the API is running on localhost:8000.
        </p>
      </div>
    );
  }

  return <StudioBrowser studios={studios} initialCategory={category} />;
}

export default function StudiosPage({ searchParams }) {
  return (
    <section className="min-h-screen bg-neutral-950 py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-bold tracking-[0.15em] text-accent">
              OUR SPACES
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[42px]">
              All Studios
            </h1>
          </div>
          <Link
            href="/add-studio"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
          >
            List your studio
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <Suspense fallback={<SkeletonGrid />}>
          <StudioGrid searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}