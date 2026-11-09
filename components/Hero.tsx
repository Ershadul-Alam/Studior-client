import Image from "next/image";

// const features = [
//   {
//     label: "Considered creative spaces",
//     icon: (
//       <>
//         <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
//         <circle cx="12" cy="13" r="3" />
//       </>
//     ),
//   },
//   {
//     label: "Flexible, by-the-hour booking",
//     icon: (
//       <>
//         <circle cx="12" cy="12" r="10" />
//         <path d="M12 6v6l4 2" />
//       </>
//     ),
//   },
//   {
//     label: "Effortless online reservations",
//     icon: (
//       <>
//         <path d="M8 2v4" />
//         <path d="M16 2v4" />
//         <rect width="18" height="18" x="3" y="4" rx="2" />
//         <path d="M3 10h18" />
//       </>
//     ),
//   },
// ];

// function FeatureIcon({ children }: { children: React.ReactNode }) {
//   return (
//     <svg
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className="mt-0.5 size-5 shrink-0 text-accent"
//     >
//       {children}
//     </svg>
//   );
// }

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
        {/* <ul className="flex flex-col gap-5">
          {features.map((feature) => (
            <li
              key={feature.label}
              className="flex items-center gap-3 text-lg text-white/90 sm:text-xl"
            >
              <FeatureIcon>{feature.icon}</FeatureIcon>
              {feature.label}
            </li>
          ))}
        </ul> */}

        <div className="mt-auto grid items-end gap-12 pt-20 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.24em] text-white/80 sm:text-sm">
              <span className="h-px w-8 bg-accent" />
              SPACE FOR THE ART OF MAKING
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-[68px]">
              A space to bring your vision into{" "}
              <span className="font-serif italic text-accent">focus.</span>
            </h1>
            <p className="mt-6 max-w-xl text-sm font-semibold leading-relaxed text-white/75">
              Thoughtfully equipped studios for the moments, images, and ideas
              you want to bring to life.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="/studios"
                className="rounded-lg bg-accent px-7 py-3.5 text-[14px] font-semibold text-white transition hover:bg-accent/90"
              >
                Discover studios
              </a>
              <a
                href="/add-studio"
                className="rounded-lg bg-white px-7 py-3.5 text-[14px] font-semibold text-neutral-900 transition hover:bg-neutral-200"
              >
                List your studio
              </a>
            </div>
          </div>

        </div>
      </div>

      <aside
        aria-label="Creator spotlight post"
        className="absolute bottom-8 right-8 z-20 w-[340px] overflow-hidden rounded-2xl border border-white/15 bg-neutral-950/85 text-white shadow-2xl shadow-black/40 backdrop-blur-md"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-accent via-red-500 to-amber-400 p-[2px]">
              <span className="flex size-full items-center justify-center rounded-full bg-neutral-950 text-xs font-bold">
                S
              </span>
            </span>
            <div>
              <p className="text-sm font-semibold">studio.session</p>
              <p className="text-[11px] text-white/55">CREATOR SPOTLIGHT</p>
            </div>
          </div>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="size-5 text-white/75"
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r=".75" fill="currentColor" />
          </svg>
        </div>

        <div className="relative aspect-[16/10]">
          <Image
            src="/banner.jpg"
            alt="A creator filming in a red-lit studio"
            fill
            sizes="340px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[10px] font-medium tracking-[0.16em] text-white/90 backdrop-blur-sm">
            ON SET
          </span>
        </div>

        <div className="px-4 pb-4 pt-3">
          <div className="flex items-center gap-3 text-white/90">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
            </svg>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
            </svg>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-auto size-5"
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/75">
            <span className="mr-1 font-semibold text-white">studio.session</span>
            The right light, the right space, and room to make something
            unforgettable.
          </p>
        </div>
      </aside>
    </section>
  );
}
