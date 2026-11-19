"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Clock, MapPin, Star } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function getStudioId(studio) {
  if (typeof studio._id === "string") return studio._id;
  return studio._id?.$oid ?? "";
}

function FeaturedStudioCard({ studio }) {
  const imageUrl = studio.imageUrl || "/banner.jpg";

  return (
    <article className="relative isolate flex min-h-[420px] overflow-hidden rounded-3xl bg-neutral-900 ring-1 ring-white/10 sm:min-h-[480px]">
      <Image
        src={imageUrl}
        alt={studio.title || "Featured studio"}
        fill
        sizes="(min-width: 1024px) 1200px, 100vw"
        unoptimized
        className="object-cover"
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-neutral-950 via-neutral-950/75 to-neutral-950/10" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/10" />

      <div className="relative z-10 flex w-full flex-col justify-end p-6 sm:max-w-2xl sm:p-10 lg:p-14">
        <p className="text-xs font-bold tracking-[0.18em] text-accent uppercase">
          {studio.category || "Featured space"}
        </p>
        <h3 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {studio.title || "A space for your next idea"}
        </h3>
        {studio.location && (
          <p className="mt-4 flex items-center gap-2 text-sm text-white/70 sm:text-base">
            <MapPin className="size-4 shrink-0 text-accent" />
            {studio.location}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/80">
          {studio.hourlyRate != null && (
            <span className="flex items-center gap-2">
              <Clock className="size-4 text-accent" />
              ${Number(studio.hourlyRate).toLocaleString("en-US")}/hr
            </span>
          )}
          {studio.rating != null && (
            <span className="flex items-center gap-2">
              <Star className="size-4 fill-accent text-accent" />
              {studio.rating}
            </span>
          )}
        </div>

        <Link
          href={`/studios/${encodeURIComponent(getStudioId(studio))}`}
          className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
        >
          View studio
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}

function SliderSkeleton() {
  return (
    <div className="mt-8 min-h-[420px] animate-pulse rounded-3xl bg-white/5 ring-1 ring-white/10 sm:min-h-[480px]" />
  );
}

export default function FeaturedStudios() {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [api, setApi] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadStudios() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is not configured");

        const response = await fetch(`${apiUrl}/featured-studios`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Featured studios request failed: ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Featured studios response must be an array");
        }

        setStudios(data.slice(0, 3));
      } catch (requestError) {
        if (controller.signal.aborted) return;
        console.error("Failed to load featured studios:", requestError);
        setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadStudios();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!api) return;

    const updateSelectedIndex = () => setSelectedIndex(api.selectedScrollSnap());
    updateSelectedIndex();
    api.on("select", updateSelectedIndex);
    return () => api.off("select", updateSelectedIndex);
  }, [api]);

  return (
    <section className="bg-neutral-950 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-sm font-bold tracking-[0.15em] text-accent">
              CURATED FOR YOU
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Featured studios
            </h2>
          </div>
          <Link
            href="/studios"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
          >
            Explore all studios
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {loading ? (
          <SliderSkeleton />
        ) : error ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-6 py-10 text-center">
            <p className="font-semibold text-white">Featured studios are unavailable</p>
            <p className="mt-2 text-sm text-white/60">
              Please try again later.
            </p>
          </div>
        ) : studios.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-6 py-10 text-center">
            <p className="font-semibold text-white">No featured studios yet</p>
            <p className="mt-2 text-sm text-white/60">
              Check back soon to discover our featured spaces.
            </p>
          </div>
        ) : (
          <div className="mt-8">
            <Carousel
              setApi={setApi}
              opts={{ align: "start", loop: studios.length > 1 }}
              aria-label="Featured studios"
            >
              <CarouselContent>
                {studios.map((studio, index) => (
                  <CarouselItem key={getStudioId(studio) || index}>
                    <FeaturedStudioCard studio={studio} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {studios.length > 1 && (
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2" aria-label="Choose slide">
                    {studios.map((studio, index) => (
                      <button
                        key={getStudioId(studio) || index}
                        type="button"
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={selectedIndex === index ? "true" : undefined}
                        onClick={() => api?.scrollTo(index)}
                        className={`h-2 rounded-full transition-all ${
                          selectedIndex === index
                            ? "w-8 bg-accent"
                            : "w-2 bg-white/30 hover:bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <CarouselPrevious className="static size-10 translate-y-0 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10" />
                    <CarouselNext className="static size-10 translate-y-0 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10" />
                  </div>
                </div>
              )}
            </Carousel>
          </div>
        )}
      </div>
    </section>
  );
}
