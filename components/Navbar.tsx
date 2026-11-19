"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

const links = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "List Your Studio", href: "/add-studio" },
  { label: "About Us", href: "/about-us" },
];

const accountLinks = [
  { label: "Profile", href: "/profile" },
  { label: "Bookings", href: "/bookings" },
  { label: "Your Studios", href: "/your-studio" },
];

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
          ? "bg-neutral-950/80 backdrop-blur"
          : "bg-gradient-to-b from-neutral-950/70 to-transparent"
      }`}
    >
      <div className="relative mx-auto w-full max-w-[1400px] px-3 py-3 sm:px-6 sm:py-7 lg:px-10">
        <nav
          aria-label="Primary navigation"
          className="flex items-center justify-between gap-2 lg:gap-4"
        >
          <div className="flex min-w-0 items-center">
            <Logo showMark={false} compact />
          </div>

          <ul className="hidden flex-1 items-center justify-center gap-7 lg:flex">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="whitespace-nowrap text-sm font-medium text-white/90 transition-colors hover:text-white xl:text-base"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <UserMenu />
            <button
              onClick={() => setOpen((currentlyOpen) => !currentlyOpen)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="site-menu"
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white sm:size-11"
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
          <div
            id="site-menu"
            className="absolute top-full right-3 left-auto max-h-[calc(100dvh-5rem)] w-fit max-w-[calc(100vw-1.5rem)] overflow-y-auto rounded-2xl border border-white/10 bg-neutral-950/95 p-2 shadow-2xl backdrop-blur sm:right-6 sm:p-4 lg:right-10"
          >
            <nav aria-label="Site menu">
              <ul className="flex flex-col lg:hidden">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="inline-flex w-fit whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10 sm:px-4 sm:py-3 sm:text-base"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-2 border-t border-white/10 pt-2 lg:mt-0 lg:border-0 lg:pt-0">
                <p className="whitespace-nowrap px-3 py-1.5 text-xs font-bold tracking-[0.15em] text-white/45 lg:hidden">
                  YOUR ACCOUNT
                </p>
                <ul className="flex flex-col">
                  {accountLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="inline-flex w-fit whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10 sm:px-4 sm:py-3 sm:text-base"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <UserMenu
                  placement="menu"
                  onSignedOut={() => setOpen(false)}
                />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
