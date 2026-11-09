"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Sparkles } from "lucide-react";
import { authClient } from "../../lib/auth-client";
import { redirect } from "next/navigation";

export default function SignInPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [notice, setNotice] = useState("");

    const handleSubmit = async(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const user = Object.fromEntries(formData.entries())

        const { email, password } = user;
        const { data, error } = await authClient.signIn.email({
            email,
            password,
        });

        if (error) {
            setNotice(error.message);
            return;
        }

        if (data) {
            console.log(data);
            redirect('/')
        }
    }

    return (
        <main className="relative isolate flex min-h-screen items-center overflow-hidden bg-neutral-950 px-6 pb-20 pt-32 text-white sm:px-8 lg:px-10">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-40 top-20 size-[28rem] rounded-full bg-accent/10 blur-[120px]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-40 bottom-0 size-[30rem] rounded-full bg-red-950/30 blur-[130px]"
            />

            <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
                <section className="max-w-xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                        <Sparkles aria-hidden="true" className="size-4" />
                        MADE FOR CREATORS
                    </div>
                    <h1 className="mt-7 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                        Your next great
                        <span className="block text-accent">idea starts here.</span>
                    </h1>
                    <p className="mt-6 max-w-lg text-base leading-7 text-white/60 sm:text-lg">
                        Sign in to pick up where you left off and find the
                        perfect space for your next shoot, session, or big idea.
                    </p>

                    <div className="mt-12 hidden items-center gap-4 border-t border-white/10 pt-7 sm:flex">
                        <div className="flex -space-x-3" aria-hidden="true">
                            <span className="flex size-10 items-center justify-center rounded-full border-2 border-neutral-950 bg-[#8b5947] text-xs font-semibold">A</span>
                            <span className="flex size-10 items-center justify-center rounded-full border-2 border-neutral-950 bg-[#b57d5a] text-xs font-semibold">M</span>
                            <span className="flex size-10 items-center justify-center rounded-full border-2 border-neutral-950 bg-[#697565] text-xs font-semibold">J</span>
                        </div>
                        <p className="text-sm text-white/55">
                            A home for your next creative collaboration
                        </p>
                    </div>
                </section>

                <section
                    aria-labelledby="sign-in-heading"
                    className="w-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-9"
                >
                    <div>
                        <p className="text-sm font-bold tracking-[0.16em] text-accent">
                            WELCOME BACK
                        </p>
                        <h2
                            id="sign-in-heading"
                            className="mt-3 text-3xl font-semibold tracking-tight"
                        >
                            Sign in to Studior
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-white/55">
                            Enter your details below to access your account.
                        </p>
                    </div>

                    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-white/85"
                            >
                                Email address
                            </label>
                            <input
                                autoComplete="email"
                                className="h-12 w-full rounded-xl border border-white/10 bg-neutral-950/70 px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-accent/70 focus:ring-4 focus:ring-accent/10"
                                id="email"
                                name="email"
                                placeholder="you@example.com"
                                required
                                type="email"
                            />
                        </div>

                        <div>
                            <div className="mb-2 flex items-center justify-between gap-4">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-white/85"
                                >
                                    Password
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                    autoComplete="current-password"
                                    className="h-12 w-full rounded-xl border border-white/10 bg-neutral-950/70 px-4 pr-12 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-accent/70 focus:ring-4 focus:ring-accent/10"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    required
                                    type={showPassword ? "text" : "password"}
                                />
                                <button
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    aria-pressed={showPassword}
                                    className="absolute inset-y-0 right-0 inline-flex w-12 items-center justify-center rounded-r-xl text-white/45 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-accent"
                                    onClick={() => setShowPassword((visible) => !visible)}
                                    type="button"
                                >
                                    {showPassword ? (
                                        <EyeOff aria-hidden="true" className="size-4" />
                                    ) : (
                                        <Eye aria-hidden="true" className="size-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {notice && (
                            <p
                                className="rounded-xl border border-accent/20 bg-accent/10 px-4 py-3 text-sm text-white/75"
                                role="status"
                            >
                                {notice}
                            </p>
                        )}

                        <button
                            className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-white transition hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                            type="submit"
                        >
                            Sign in
                            <ArrowRight
                                aria-hidden="true"
                                className="size-4 transition-transform group-hover:translate-x-1"
                            />
                        </button>
                    </form>

                    <p className="mt-7 text-center text-sm text-white/55">
                        New to Studior?{" "}
                        <Link
                            className="font-semibold text-accent transition hover:text-accent/80"
                            href="/sign-up"
                        >
                            Create an account
                        </Link>
                    </p>
                </section>
            </div>
        </main>
    );
}
