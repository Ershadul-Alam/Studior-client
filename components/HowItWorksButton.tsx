"use client";

export default function HowItWorksButton() {
  function scrollToHowItWorks() {
    document
      .getElementById("how-it-works")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <button
      type="button"
      onClick={scrollToHowItWorks}
      className="rounded-lg bg-white px-7 py-3.5 text-[14px] font-semibold text-neutral-900 transition hover:bg-neutral-200"
    >
      How It Works
    </button>
  );
}
