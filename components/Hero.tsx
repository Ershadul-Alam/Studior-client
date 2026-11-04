import Image from "next/image";

const features = [
  {
    label: "Professional Studio Rental",
    icon: (
      <>
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </>
    ),
  },
  {
    label: "Flexible Hourly Studio Rental",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </>
    ),
  },
  {
    label: "Instant Online Studio Booking",
    icon: (
      <>
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
      </>
    ),
  },
];

function FeatureIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 size-5 shrink-0 text-accent"
    >
      {children}
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-neutral-950">
      <Image
        src="/banner.jpg"
        alt="Photographers working in a red-lit studio"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/70" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-6 pb-14 pt-36 sm:pt-44 lg:px-10 lg:pb-20">
        <ul className="flex flex-col gap-5">
          {features.map((feature) => (
            <li
              key={feature.label}
              className="flex items-center gap-3 text-lg text-white sm:text-xl"
            >
              <FeatureIcon>{feature.icon}</FeatureIcon>
              {feature.label}
            </li>
          ))}
        </ul>

        <div className="mt-auto grid items-end gap-12 pt-20 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <p className="text-sm font-bold tracking-[0.15em] text-white">
              CREATIVE STUDIO RENTAL
            </p>
            <h1 className="mt-4 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[68px]">
              Where Great Content Comes Alive Inside
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80">
              Create outstanding visual content in professional studio
              environments equipped with modern facilities, flexible rental
              options, and inspiring spaces for every production.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#"
                className="rounded-lg bg-accent px-7 py-3.5 text-[17px] font-semibold text-white transition hover:bg-accent/90"
              >
                Explore Studios
              </a>
              <a
                href="#"
                className="rounded-lg bg-white px-7 py-3.5 text-[17px] font-semibold text-neutral-900 transition hover:bg-neutral-200"
              >
                Host your space
              </a>
            </div>
          </div>

          <aside className="w-full max-w-sm rounded-2xl bg-white p-3 shadow-2xl lg:w-96">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src="/banner.jpg"
                alt="Most popular studio space"
                fill
                sizes="(min-width: 1024px) 384px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="px-2 pb-3 pt-5">
              <h3 className="text-2xl font-bold tracking-tight text-neutral-900">
                Most Popular Studio
              </h3>
              <p className="mt-2 text-lg leading-relaxed text-neutral-600">
                Professional studio designed to bring every vision to life.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
