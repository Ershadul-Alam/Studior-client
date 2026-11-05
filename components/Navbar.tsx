"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

const links: { label: string; href: string; dropdown?: boolean }[] = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios"},
  { label: "How It Works", href: "/how-it-works"},
  { label: "About Us", href: "/about" },
];

function ChevronDown() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5 opacity-80 transition-transform group-hover:rotate-180"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-neutral-950/80 backdrop-blur"
          : "bg-gradient-to-b from-neutral-950/70 to-transparent"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-7 lg:px-10">
        <Logo />

        <ul className="hidden items-center gap-10 lg:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="group flex items-center gap-1.5 text-[17px] font-medium text-white/90 transition-colors hover:text-white"
              >
                {link.label}
                {link.dropdown && <ChevronDown />}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex">
            <UserMenu />
          </div>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 text-white lg:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="size-5"
            >
              {open ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </>
              ) : (
                <>
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-6 rounded-2xl bg-neutral-950/95 p-4 shadow-2xl backdrop-blur lg:hidden">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-white/90 transition hover:bg-white/10"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="p-2">
              <UserMenu />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
