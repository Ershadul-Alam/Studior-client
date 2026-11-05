"use client";

import Image from "next/image";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, Star, Users } from "lucide-react";
import Link from "next/link";

export interface Studio {
  _id: string | { $oid: string };
  title: string;
  category: string;
  hourlyRate: number;
  maxCapacity: number;
  location: string;
  imageUrl: string;
  rating: number;
}

function extractId(studio: Studio) {
  const raw = studio._id;
  if (typeof raw === "string") return raw;
  return raw?.$oid ?? "";
}

function categoryKey(category: string) {
  // normalize plural/singular variants so "Photo Studios" and
  // "photo studio" collapse into the same tab
  return category.trim().toLowerCase().replace(/s$/, "");
}

function parseCategory(category: string) {
  return category.trim().replace(/\b\w/g, (char) => char.toUpperCase());
}

// canonical tabs, always shown in this order even if the API
// currently has no studios in a given category
const curatedCategories: { key: string; label: string }[] = [
  { key: "photo studio", label: "Photo Studios" },
  { key: "film stage", label: "Film Stages" },
  { key: "podcast room", label: "Podcast Rooms" },
  { key: "music suite", label: "Music Suites" },
  { key: "art workshop", label: "Art Workshops" },
];

// categories hidden from the page entirely (no tab, no cards)
const hiddenCategories = new Set(["sound stage"]);

function StudioCard({ studio }: { studio: Studio }) {
  return (
    <Card className="flex flex-col overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:ring-accent/50 hover:shadow-xl hover:shadow-accent/10">
      <div className="relative h-48 shrink-0">
        <Image
          src={studio.imageUrl}
          alt={studio.title}
          fill
          sizes="(min-width: 1280px) 340px, (min-width: 1024px) 430px, (min-width: 640px) 640px, 100vw"
          className="object-cover"
        />
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-neutral-950/80 px-2.5 py-1 text-xs font-bold text-white backdrop-blur">
          <Star className="size-3.5 fill-accent text-accent" />
          {studio.rating}
        </span>
      </div>

      <CardContent className="flex flex-1 flex-col gap-3 px-5">
        <p className="text-xs font-bold tracking-[0.15em] text-accent uppercase">
          {studio.category}
        </p>
        <CardTitle className="text-xl font-bold tracking-tight text-white">
          {studio.title}
        </CardTitle>

        <p className="flex items-center gap-2 text-sm text-white/60">
          <MapPin className="size-4 shrink-0 text-accent" />
          <span className="truncate">{studio.location}</span>
        </p>

        <div className="mt-1 flex items-center justify-between gap-3 border-t border-white/10 pt-3 text-sm">
          <p className="flex items-center gap-2 text-white/70">
            <Clock className="size-4 text-accent" />
            ${studio.hourlyRate}/hr
          </p>
          <p className="flex items-center gap-2 text-white/70">
            <Users className="size-4 text-accent" />
            Up to {studio.maxCapacity}
          </p>
        </div>
      </CardContent>

      <CardFooter className="px-5 pt-4 pb-5">
        <Link
          href={`/studios/${extractId(studio)}`}
          className="inline-flex w-full items-center justify-center rounded-lg bg-accent py-3 text-[15px] font-semibold text-white transition hover:bg-accent/90"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
}

export default function StudioBrowser({
  studios,
  initialCategory,
}: {
  studios: Studio[];
  initialCategory?: string;
}) {
  // exclude hidden categories from the whole page, not just the tabs
  const visibleStudios = studios.filter(
    (studio) => !hiddenCategories.has(categoryKey(studio.category)),
  );

  // unique categories in the order they appear in the data
  const dataKeys: string[] = [];
  for (const studio of visibleStudios) {
    const key = categoryKey(studio.category);
    if (!dataKeys.includes(key)) dataKeys.push(key);
  }

  // curated tabs first (Always includes Sound Stages), then any
  // categories that exist in the data but aren't in the curated list
  const tabs = [
    { key: "all", label: "All" },
    ...curatedCategories,
    ...dataKeys
      .filter((key) => !curatedCategories.some((tab) => tab.key === key))
      .map((key) => ({
        key,
        label: parseCategory(
          studios.find(
            (studio) => categoryKey(studio.category) === key,
          )?.category ?? key,
        ),
      })),
  ];

  const requested = initialCategory ? categoryKey(initialCategory) : "all";
  const [selected, setSelected] = useState<string>(
    requested === "all" ||
      tabs.some((tab) => tab.key === requested)
      ? requested
      : "all",
  );

  const visible =
    selected === "all"
      ? visibleStudios
      : visibleStudios.filter((studio) => categoryKey(studio.category) === selected);

  return (
    <>
      <div
        role="tablist"
        aria-label="Filter studios by category"
        className="mt-10 flex flex-wrap gap-2.5"
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={selected === tab.key}
            onClick={() => setSelected(tab.key)}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
              selected === tab.key
                ? "border-accent bg-accent text-white"
                : "border-white/10 bg-white/5 text-white/70 hover:border-white/25 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 px-6 py-12 text-center">
          <p className="text-lg font-semibold text-white">
            No studios in this category
          </p>
          <p className="mt-2 text-white/60">Try another category.</p>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((studio) => (
            <StudioCard
              key={extractId(studio) || studio.title}
              studio={studio}
            />
          ))}
        </div>
      )}
    </>
  );
}
