import {
  BadgeCheck,
  Headphones,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const assurances = [
  {
    title: "Liability Protection",
    description: "Platform coverage helps protect hosts and creators.",
    icon: ShieldCheck,
  },
  {
    title: "Verified Profiles",
    description: "Identity checks create greater trust across every booking.",
    icon: BadgeCheck,
  },
  {
    title: "Equipment Safety",
    description: "Clear standards help keep equipment and spaces secure.",
    icon: Wrench,
  },
  {
    title: "24/7 Host Support",
    description: "Creator and host support is available around the clock.",
    icon: Headphones,
  },
];

export default function HostGuarantee() {
  return (
    <section
      aria-labelledby="host-guarantee-heading"
      className="relative isolate overflow-hidden border-t border-accent/20 bg-neutral-950 py-16 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[32rem] rounded-full bg-accent/10 blur-[130px]"
      />
      <div className="relative mx-auto w-full max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="text-sm font-bold tracking-[0.15em] text-accent">
              HOST GUARANTEE
            </p>
            <h2
              id="host-guarantee-heading"
              className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              Host Guarantee &amp; Creator Support
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-white/65">
            Platform assurances covering liability protection, verified
            profiles, equipment safety, and 24/7 host support.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {assurances.map((assurance) => {
            const Icon = assurance.icon;

            return (
              <article
                key={assurance.title}
                className="rounded-2xl border border-accent/20 bg-neutral-900/80 p-6 shadow-lg shadow-black/20"
              >
                <span className="flex size-10 items-center justify-center rounded-xl border border-accent/25 bg-gradient-to-br from-accent/25 to-accent/5 text-accent">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-5 text-base font-bold text-white">
                  {assurance.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {assurance.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
