import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Star,
} from "lucide-react";

const API_URL = "http://localhost:8000";

function formatCategory(category = "") {
  return category
    .trim()
    .replace(/s$/, "")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatPrice(value) {
  return `$${Number(value || 0).toLocaleString("en-US")}`;
}

function Stat({ label, value, accent = false }) {
  return (
    <div className="bg-neutral-950 px-5 py-5">
      <p className="text-xs font-medium text-white/40">{label}</p>
      <p className={`mt-2 text-base font-bold ${accent ? "text-accent" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="mt-8 animate-pulse">
      <div className="h-4 w-40 rounded bg-white/10" />
      <div className="mt-5 h-11 w-3/4 max-w-2xl rounded bg-white/10" />
      <div className="mt-8 aspect-[16/9] rounded-3xl bg-white/5 ring-1 ring-white/10" />
      <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-24 bg-neutral-950" />
        ))}
      </div>
    </div>
  );
}

async function StudioDetail({ params }) {
  const { id } = await params;
  await connection(); // fetch freshly from the API at request time

  let studio = null;
  let error = "";

  try {
    const res = await fetch(`${API_URL}/studios/${encodeURIComponent(id)}`);
    if (!res.ok) {
      throw new Error(res.status === 404 ? "not-found" : `Request failed: ${res.status}`);
    }
    studio = await res.json();
  } catch (err) {
    console.error("Failed to load studio:", err);
    error =
      err instanceof Error && err.message === "not-found" ? "not-found" : "error";
  }

  if (!studio) {
    return (
      <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 px-6 py-16 text-center">
        <p className="text-2xl font-bold text-white">
          {error === "not-found" ? "Studio not found" : "Couldn't load this studio"}
        </p>
        <p className="mx-auto mt-3 max-w-md text-white/60">
          {error === "not-found"
            ? "This studio may no longer be available."
            : "Make sure the API is running on localhost:8000 and try again."}
        </p>
        <Link
          href="/studios"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent/90"
        >
          <ArrowLeft className="size-4" />
          Back to all studios
        </Link>
      </div>
    );
  }

  const reviews = Array.isArray(studio.reviews) ? studio.reviews : [];
  const amenities = Array.isArray(studio.amenities) ? studio.amenities : [];
  const imageUrl = studio.imageUrl || "/banner.jpg";

  return (
    <>
      <div className="mt-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
          <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-accent">
            {formatCategory(studio.category)}
          </span>
          <span className="hidden size-1 rounded-full bg-white/20 sm:block" />
          <span className="flex items-center gap-1.5 text-white/60">
            <MapPin className="size-4 text-accent" />
            {studio.location}
          </span>
        </div>
        <h1 className="mt-4 max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {studio.title}
        </h1>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div className="min-w-0">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-neutral-900 ring-1 ring-white/10">
            <Image
              src={imageUrl}
              alt={studio.title}
              fill
              priority
              sizes="(min-width: 1024px) 1000px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-950/85 to-transparent" />
            <span className="absolute right-4 bottom-4 rounded-full bg-neutral-950/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
              Photo 1 of 1
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-4">
            <Stat
              label="Hourly Rate"
              value={`${formatPrice(studio.hourlyRate)}/hr`}
              accent
            />
            <Stat label="Security Deposit" value={formatPrice(studio.securityDeposit)} />
            <Stat label="Max Capacity" value={`${studio.maxCapacity} people`} />
            <Stat
              label="Client Rating"
              value={
                <span className="flex items-center gap-1.5">
                  <Star className="size-4 fill-accent text-accent" />
                  {studio.rating}
                  {reviews.length > 0 && (
                    <span className="text-xs font-medium text-white/40">
                      ({reviews.length})
                    </span>
                  )}
                </span>
              }
            />
          </div>

          <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-7">
            <h2 className="text-xl font-bold text-white">Workspace Overview</h2>
            <p className="mt-4 leading-relaxed text-white/60">{studio.overview}</p>
          </section>

          {amenities.length > 0 && (
            <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-7">
              <h2 className="text-xl font-bold text-white">Equipment &amp; Amenities</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {amenities.map((amenity) => (
                  <li
                    key={amenity}
                    className="flex items-start gap-2.5 text-sm text-white/70"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                    {amenity}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {reviews.length > 0 && (
            <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-white">Guest Reviews</h2>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                  <Star className="size-4 fill-accent text-accent" />
                  {studio.rating}
                </span>
              </div>
              <ul className="mt-5 space-y-4">
                {reviews.map((review, index) => (
                  <li
                    key={`${review}-${index}`}
                    className="rounded-xl border border-white/10 bg-neutral-950/40 px-4 py-4 text-sm leading-relaxed text-white/70"
                  >
                    &ldquo;{review}&rdquo;
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-28">
          <div className="rounded-2xl border border-white/10 bg-neutral-900 p-6 shadow-2xl shadow-black/40">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight text-accent">
                  {formatPrice(studio.hourlyRate)}
                </span>
                <span className="text-sm text-white/50">/ hour</span>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-sm font-semibold text-white">
                <Star className="size-4 fill-accent text-accent" />
                {studio.rating}
              </span>
            </div>

            <dl className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-white/50">Security Deposit</dt>
                <dd className="font-semibold text-white">
                  {formatPrice(studio.securityDeposit)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-white/50">Cancellation Policy</dt>
                <dd className="text-right font-semibold text-accent">
                  Free before shoot confirmation
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-white/50">Availability</dt>
                <dd className="text-right font-semibold text-white">
                  Instant Request Slots
                </dd>
              </div>
            </dl>

            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-4 text-[15px] font-bold text-white transition hover:bg-accent/90"
            >
              <CalendarDays className="size-5" />
              Book Workspace Now
            </button>

            <p className="mt-4 text-center text-xs leading-relaxed text-white/40">
              You won&apos;t be charged immediately. Your reservation will enter
              pending status for host approval.
            </p>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent">
                {(studio.ownerName || "Host").slice(0, 1).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">
                  Hosted by
                </p>
                <p className="truncate font-semibold text-white">
                  {studio.ownerName || "Studio host"}
                </p>
              </div>
            </div>
            {studio.ownerEmail && (
              <a
                href={`mailto:${studio.ownerEmail}`}
                className="mt-4 block truncate rounded-lg border border-white/10 bg-neutral-950/40 px-3 py-2 text-sm text-white/60 transition hover:border-accent/40 hover:text-white"
              >
                {studio.ownerEmail}
              </a>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}

export default function StudioDetailPage({ params }) {
  return (
    <section className="bg-neutral-950 py-28">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-10">
        <Link
          href="/studios"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 transition hover:text-accent"
        >
          <ArrowLeft className="size-4" />
          Back to all studios
        </Link>

        <Suspense fallback={<DetailSkeleton />}>
          <StudioDetail params={params} />
        </Suspense>
      </div>
    </section>
  );
}
