import {
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  Clock,
  Search,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover Spaces",
    description:
      "Explore creative studios by location, category, and amenities to find the right space for your shoot or project.",
    href: "/studios",
    linkLabel: "Explore spaces",
    icon: Search,
  },
  {
    number: "02",
    title: "Select Shoot Hours",
    description:
      "Choose the date and hours that fit your schedule, then review availability and pricing before booking.",
    href: "/studios",
    linkLabel: "Check availability",
    icon: Clock,
  },
  {
    number: "03",
    title: "Book Instantly",
    description:
      "Confirm your selected studio and shoot time in a few quick steps, with no waiting for availability.",
    href: "/studios",
    linkLabel: "Book a studio",
    icon: CalendarCheck,
  },
  {
    number: "04",
    title: "Create & Produce",
    description:
      "Arrive at your studio, bring your vision to life, and make the most of a space built for creative work.",
    href: "/studios",
    linkLabel: "Start creating",
    icon: CalendarDays,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="relative isolate scroll-mt-24 overflow-hidden border-t border-accent/20 bg-neutral-950 pt-4 pb-16 sm:pb-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[32rem] rounded-full bg-accent/10 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-40 size-[28rem] rounded-full bg-red-950/30 blur-[120px]"
      />
      <div className="relative mx-auto w-full max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-sm font-bold tracking-[0.15em] text-accent">
              HOW STUDIOR WORKS
            </p>
            <h2
              id="how-it-works-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[42px]"
            >
            Space for every{" "}
            <span className="font-serif italic text-accent">creative</span>{" "}
            idea.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            Studior brings independent creative spaces and the people who need
            them together. Find a well-suited place for your next shoot,
            recording, or project—or share your own studio with creators
            looking for somewhere to make their next idea happen.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="relative flex flex-col overflow-hidden rounded-2xl border border-accent/20 bg-neutral-900/80 p-7 shadow-lg shadow-black/20 transition duration-300 before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-accent/70 before:to-transparent hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/10 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold tracking-[0.12em] text-accent">
                    {step.number}
                  </span>
                  <span className="flex size-11 items-center justify-center rounded-xl border border-accent/25 bg-gradient-to-br from-accent/25 to-accent/5 text-accent">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                </div>
                <h3 className="mt-7 text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/60">
                  {step.description}
                </p>
                <a
                  href={step.href}
                  className="group mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold text-accent transition hover:text-accent/80"
                >
                  {step.linkLabel}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </a>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
