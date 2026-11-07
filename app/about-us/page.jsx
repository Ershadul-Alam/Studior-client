export const metadata = {
  title: "About Us | Studiro",
  description:
    "Get to know Studiro: a simpler way to discover creative studio spaces and bring your next idea to life.",
};

const values = [
  {
    number: "01",
    title: "Made for making",
    description:
      "From a first shoot to a full production, finding the right space should feel like the start of the creative process.",
  },
  {
    number: "02",
    title: "Good spaces, easy to find",
    description:
      "We bring independent studios together so you can spend less time searching and more time building something great.",
  },
  {
    number: "03",
    title: "Flexible by nature",
    description:
      "Creative work doesn't always fit a nine-to-five. Discover spaces with booking options that work around your plans.",
  },
];

export default function AboutUsPage() {
  return (
    <main
      className="overflow-hidden bg-neutral-950 text-white"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 50% 0%, rgba(203, 80, 67, 0.2), transparent 55%), radial-gradient(ellipse at 100% 55%, rgba(120, 25, 30, 0.12), transparent 45%)",
      }}
    >
      <section className="mx-auto grid w-full max-w-[1400px] gap-12 px-6 pb-20 pt-36 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-10 lg:pb-28 lg:pt-44">
        <div>
          <p className="text-sm font-bold tracking-[0.18em] text-accent">
            ABOUT STUDIRO
          </p>
          <h1 className="mt-5 max-w-lg text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            A little more room for creativity.
          </h1>
        </div>
        <div className="space-y-5 text-lg leading-relaxed text-white/65">
          <p>
            Finding a place to make something shouldn&apos;t get in the way of
            making it. Studiro brings creative studio spaces into one
            straightforward destination, so you can focus on the idea, not the
            search.
          </p>
          <p>
            Whether you&apos;re shooting a campaign, recording a podcast, or
            trying something entirely new, we want to help you find a space
            that makes the work feel possible.
          </p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-sm font-bold tracking-[0.18em] text-accent">
              WHAT MATTERS TO US
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Creative work, made easier.
            </h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.number}
                className="rounded-2xl border border-white/10 bg-neutral-950 p-7 sm:p-8"
              >
                <p className="text-sm font-bold tracking-[0.12em] text-accent">
                  {value.number}
                </p>
                <h3 className="mt-7 text-xl font-semibold">{value.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/55">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-7 sm:p-10 lg:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -right-20 size-96 rounded-full bg-accent/20 blur-[100px]"
          />
          <div className="relative grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <p className="text-sm font-bold tracking-[0.18em] text-accent">
                LET&apos;S TALK
              </p>
              <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Have a space or an idea to share?
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                We&apos;d love to hear what you&apos;re working on. Reach out
                with a question, partnership idea, or a studio you think should
                be on Studiro.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-neutral-950/70 p-6 sm:p-7">
              <p className="text-xs font-bold tracking-[0.16em] text-white/45">
                SAMPLE CONTACT DETAILS
              </p>
              <div className="mt-5 space-y-4">
                <a
                  href="mailto:hello@studiro.example"
                  className="group flex items-center justify-between gap-4 rounded-xl border border-white/10 p-4 transition hover:border-accent/60"
                >
                  <span>
                    <span className="block text-xs text-white/45">EMAIL</span>
                    <span className="mt-1 block font-medium text-white">
                      hello@studiro.example
                    </span>
                  </span>
                  <span aria-hidden="true" className="text-accent transition group-hover:translate-x-1">
                    &rarr;
                  </span>
                </a>
                <a
                  href="tel:+15550102040"
                  className="group flex items-center justify-between gap-4 rounded-xl border border-white/10 p-4 transition hover:border-accent/60"
                >
                  <span>
                    <span className="block text-xs text-white/45">PHONE</span>
                    <span className="mt-1 block font-medium text-white">
                      +1 (555) 010-2040
                    </span>
                  </span>
                  <span aria-hidden="true" className="text-accent transition group-hover:translate-x-1">
                    &rarr;
                  </span>
                </a>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-white/40">
                Example contact information for this page demo. Replace these
                details with your real contact channels before launch.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
