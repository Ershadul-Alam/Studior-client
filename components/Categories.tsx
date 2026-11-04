import { Suspense } from "react";
import { connection } from "next/server";

const categories = [
  {
    title: "Photo Studios",
    slug: "photo studio",
    description:
      "Cyclorama walls, natural daylight lofts, and profoto lighting setups.",
    icon: (
      <>
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </>
    ),
  },
  {
    title: "Film Stages",
    slug: "film stage",
    description:
      "Soundproof stages with green screens, camlock power, and drive-in access.",
    icon: (
      <>
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M7 3v18" />
        <path d="M17 3v18" />
        <path d="M3 7.5h4" />
        <path d="M17 7.5h4" />
        <path d="M3 12h18" />
        <path d="M3 16.5h4" />
        <path d="M17 16.5h4" />
      </>
    ),
  },
  {
    title: "Podcast Rooms",
    slug: "podcast room",
    description:
      "Turnkey audio/video recording with multi-cam 4K switchers and Shure mics.",
    icon: (
      <>
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <path d="M12 19v3" />
      </>
    ),
  },
  {
    title: "Music Suites",
    slug: "music suite",
    description:
      "Dolby Atmos monitoring, analog consoles, vocal booths, and live rooms.",
    icon: (
      <>
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </>
    ),
  },
  {
    title: "Art Workshops",
    slug: "art workshop",
    description:
      "Ceramic kilns, pottery wheels, printmaking presses, and raw maker space.",
    icon: (
      <>
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      </>
    ),
  },
];

// same normalization as the /studios category tabs, so DB variants
// like "Photo Studios" / "photo studio" collapse into one count
function categoryKey(category: string) {
  return category.trim().toLowerCase().replace(/s$/, "");
}

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

async function fetchCounts() {
  // runtime data — run only at request time, never during prerender
  await connection();

  let studios = null;

  try {
    const res = await fetch("http://localhost:8000/studios");
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    studios = await res.json();
  } catch (err) {
    console.error("Failed to load studio counts:", err);
  }

  const counts = new Map<string, number>();
  if (studios) {
    for (const studio of studios) {
      const key = categoryKey(studio.category ?? "");
      if (!key) continue;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }

  return { ok: studios !== null, counts };
}

function SpaceCount({ count }: { count: number | null }) {
  return <span className="min-w-12">{count === null ? "—" : count} Spaces</span>;
}

function CountSkeleton() {
  return <span className="min-w-12 animate-pulse rounded bg-white/10" />;
}

function SkeletonGrid() {
  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {categories.map((category) => (
        <div
          key={category.title}
          className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <div className="size-12 animate-pulse rounded-xl bg-white/10" />
          <div className="mt-6 h-5 w-2/3 animate-pulse rounded bg-white/10" />
          <div className="mt-2.5 space-y-2">
            <div className="h-3 w-full animate-pulse rounded bg-white/10" />
            <div className="h-3 w-3/4 animate-pulse rounded bg-white/10" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-white/10" />
          </div>
          <div className="mt-auto border-t border-white/10 pt-4">
            <CountSkeleton />
          </div>
        </div>
      ))}
    </div>
  );
}

async function CategoryGrid() {
  const { ok, counts } = await fetchCounts();

  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {categories.map((category) => (
        <a
          key={category.title}
          href={`/studios?category=${encodeURIComponent(category.slug)}`}
          className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-white/[0.08] hover:shadow-xl hover:shadow-accent/10"
        >
          <div className="flex size-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-6"
            >
              {category.icon}
            </svg>
          </div>

          <h3 className="mt-6 text-xl font-bold tracking-tight text-white">
            {category.title}
          </h3>
          <p className="mt-2.5 text-[15px] leading-relaxed text-white/60">
            {category.description}
          </p>

          <div className="mt-auto pt-8">
            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-[15px] font-medium text-white/70">
              <SpaceCount
                count={ok ? counts.get(categoryKey(category.slug)) ?? 0 : null}
              />
              <span className="text-white/40 transition-colors group-hover:text-accent">
                <ArrowRight />
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

export default function Categories() {
  return (
    <section className="bg-neutral-950 py-24">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-bold tracking-[0.15em] text-accent">
              CURATED PRODUCTION CATEGORIES
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[42px]">
              Browse by Creative Discipline
            </h2>
          </div>
          <a
            href="/studios"
            className="group inline-flex items-center gap-2 text-lg font-semibold text-accent transition hover:text-accent/80"
          >
            Explore All Workspaces <ArrowRight />
          </a>
        </div>

        <Suspense fallback={<SkeletonGrid />}>
          <CategoryGrid />
        </Suspense>
      </div>
    </section>
  );
}
