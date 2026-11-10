"use client";

import Link from "next/link";
import {
    ArrowRight,
    ArrowUpRight,
    CalendarDays,
    Compass,
    Mail,
    UserRound,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const accountLinks = [
    {
        href: "/bookings",
        icon: CalendarDays,
        title: "Your bookings",
        description: "See the studios you have reserved.",
    },
    {
        href: "/your-studio",
        icon: UserRound,
        title: "Your studio",
        description: "Manage the space you share with creators.",
    },
];

export default function ProfilePage() {
    const {
        data: session,
        isPending,
        error: sessionError,
        refetch,
    } = authClient.useSession();
    const user = session?.user;
    const name = user?.name?.trim() || "Creator";
    const initials = name
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0))
        .join("")
        .toUpperCase();

    return (
        <main className="relative isolate min-h-screen overflow-hidden bg-neutral-950 px-6 pb-24 pt-36 text-white sm:px-8 sm:pt-40 lg:px-10">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-56 left-1/2 -z-10 size-[36rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[130px]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-48 top-[28rem] -z-10 size-[30rem] rounded-full bg-red-950/25 blur-[120px]"
            />

            <div className="mx-auto w-full max-w-5xl">
                <header className="max-w-2xl">
                    <p className="text-sm font-bold tracking-[0.18em] text-accent">
                        YOUR STUDIOR
                    </p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                        Your profile
                    </h1>
                    <p className="mt-4 text-base leading-7 text-white/60 sm:text-lg">
                        Your creative account, all in one place.
                    </p>
                </header>

                {isPending ? (
                    <div
                        role="status"
                        className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-sm text-white/60"
                    >
                        Loading your account...
                    </div>
                ) : !user ? (
                    <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-10">
                        <div className="flex size-14 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent">
                            <UserRound aria-hidden="true" className="size-6" />
                        </div>
                        <h2 className="mt-6 text-2xl font-semibold">
                            {sessionError
                                ? "Your account couldn't be loaded"
                                : "Sign in to view your profile"}
                        </h2>
                        <p className="mt-3 max-w-lg text-sm leading-6 text-white/60">
                            {sessionError
                                ? "There was a problem checking your session. Try again, or sign in to continue."
                                : "Your profile details and account shortcuts will be waiting for you here."}
                        </p>
                        {sessionError ? (
                            <button
                                type="button"
                                onClick={() => void refetch()}
                                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
                            >
                                Try again
                                <ArrowRight aria-hidden="true" className="size-4" />
                            </button>
                        ) : (
                            <Link
                                href="/sign-in"
                                className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
                            >
                                Sign in
                                <ArrowRight aria-hidden="true" className="size-4" />
                            </Link>
                        )}
                    </section>
                ) : (
                    <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                        <section
                            aria-labelledby="profile-card-heading"
                            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.025] p-7 sm:p-9"
                        >
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-accent/15 blur-[70px]"
                            />
                            <div className="relative">
                                <p className="text-xs font-bold tracking-[0.16em] text-white/45">
                                    ACCOUNT PROFILE
                                </p>
                                <div className="mt-8 flex size-20 items-center justify-center rounded-[1.75rem] border border-accent/30 bg-accent/15 text-2xl font-semibold text-accent shadow-lg shadow-accent/10">
                                    {initials || "C"}
                                </div>
                                <h2
                                    id="profile-card-heading"
                                    className="mt-6 break-words text-2xl font-semibold tracking-tight sm:text-3xl"
                                >
                                    {name}
                                </h2>
                                <p className="mt-2 text-sm text-white/55">
                                    Studior member
                                </p>

                                <div className="mt-8 border-t border-white/10 pt-6">
                                    <p className="text-xs font-bold tracking-[0.14em] text-white/40">
                                        EMAIL ADDRESS
                                    </p>
                                    <p className="mt-3 flex min-w-0 items-center gap-3 text-sm text-white/80">
                                        <Mail
                                            aria-hidden="true"
                                            className="size-4 shrink-0 text-accent"
                                        />
                                        <span className="break-all">
                                            {user.email || "No email address provided"}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section
                            aria-labelledby="account-links-heading"
                            className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-9"
                        >
                            <div className="flex items-start justify-between gap-5">
                                <div>
                                    <p className="text-xs font-bold tracking-[0.16em] text-accent">
                                        YOUR ACCOUNT
                                    </p>
                                    <h2
                                        id="account-links-heading"
                                        className="mt-3 text-2xl font-semibold tracking-tight"
                                    >
                                        Pick up where you left off
                                    </h2>
                                    <p className="mt-2 text-sm leading-6 text-white/55">
                                        Jump back into your creative plans.
                                    </p>
                                </div>
                                <div className="hidden size-11 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent sm:flex">
                                    <Compass aria-hidden="true" className="size-5" />
                                </div>
                            </div>

                            <div className="mt-7 space-y-3">
                                {accountLinks.map(
                                    ({ href, icon: Icon, title, description }) => (
                                        <Link
                                            key={href}
                                            href={href}
                                            className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-neutral-950/50 p-4 transition hover:border-accent/40 hover:bg-white/[0.05] sm:p-5"
                                        >
                                            <span className="flex min-w-0 items-center gap-4">
                                                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-white/70 transition group-hover:bg-accent/10 group-hover:text-accent">
                                                    <Icon
                                                        aria-hidden="true"
                                                        className="size-5"
                                                    />
                                                </span>
                                                <span className="min-w-0">
                                                    <span className="block font-semibold text-white">
                                                        {title}
                                                    </span>
                                                    <span className="mt-1 block text-sm leading-5 text-white/50">
                                                        {description}
                                                    </span>
                                                </span>
                                            </span>
                                            <ArrowUpRight
                                                aria-hidden="true"
                                                className="size-4 shrink-0 text-white/35 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                                            />
                                        </Link>
                                    ),
                                )}
                            </div>

                            <Link
                                href="/studios"
                                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-white"
                            >
                                Explore studios
                                <ArrowRight aria-hidden="true" className="size-4" />
                            </Link>
                        </section>
                    </div>
                )}
            </div>
        </main>
    );
}
