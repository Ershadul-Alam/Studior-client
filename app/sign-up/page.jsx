"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Sparkles } from "lucide-react";
import { authClient } from "../../lib/auth-client";
import { redirect } from "next/navigation";

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [notice, setNotice] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const user = Object.fromEntries(formData.entries())

        if (formData.get("password") !== formData.get("confirmPassword")) {
            setNotice("Your passwords don't match. Please check and try again.");
            return;
        }

        const { name, email, password } = user;
        const { data, error } = await authClient.signUp.email({
            name,
            email,
            password,
        });

        if (error) {
            setNotice(error.message || "We couldn't create your account. Please try again.");
            return;
        }

        if (data) {
            console.log(data);
            redirect('/')
        }
    };

    const handleGoogleSignIn = async() => {
        const {error}= await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
        if (error) {
        setNotice(error.message || "Google sign-in failed.");
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
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-accent/[0.08] via-transparent to-red-950/35"
            />

            <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
                <section className="max-w-xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                        <Sparkles aria-hidden="true" className="size-4" />
                        MADE FOR CREATORS
                    </div>
                    <h1 className="mt-7 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                        Make room for
                        <span className="block text-accent">what&apos;s next.</span>
                    </h1>
                    <p className="mt-6 max-w-lg text-base leading-7 text-white/60 sm:text-lg">
                        Create your account to discover inspiring spaces and
                        bring your next shoot, session, or big idea to life.
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
                    aria-labelledby="sign-up-heading"
                    className="w-full rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20 backdrop-blur sm:p-7"
                >
                    <div>
                        <h2
                            id="sign-up-heading"
                            className="text-2xl font-semibold tracking-tight"
                        >
                            Create your account
                        </h2>
                        <p className="mt-1 text-sm leading-5 text-white/55">
                            A few details and you&apos;re ready to get started.
                        </p>
                    </div>

                    <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-1 block text-sm font-medium text-white/85"
                            >
                                Full name
                            </label>
                            <input
                                autoComplete="name"
                                className="h-11 w-full rounded-xl border border-white/10 bg-neutral-950/70 px-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-accent/70 focus:ring-4 focus:ring-accent/10 sm:h-10"
                                id="name"
                                name="name"
                                placeholder="Your name"
                                required
                                type="text"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1 block text-sm font-medium text-white/85"
                            >
                                Email address
                            </label>
                            <input
                                autoComplete="email"
                                className="h-11 w-full rounded-xl border border-white/10 bg-neutral-950/70 px-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-accent/70 focus:ring-4 focus:ring-accent/10 sm:h-10"
                                id="email"
                                name="email"
                                placeholder="you@example.com"
                                required
                                type="email"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-1 block text-sm font-medium text-white/85"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    autoComplete="new-password"
                                    className="h-11 w-full rounded-xl border border-white/10 bg-neutral-950/70 px-3 pr-11 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-accent/70 focus:ring-4 focus:ring-accent/10 sm:h-10 sm:pr-10"
                                    id="password"
                                    minLength={8}
                                    name="password"
                                    placeholder="At least 8 characters"
                                    required
                                    type={showPassword ? "text" : "password"}
                                />
                                <button
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    aria-pressed={showPassword}
                                    className="absolute inset-y-0 right-0 inline-flex w-11 items-center justify-center rounded-r-xl text-white/45 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-accent sm:w-10"
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

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="mb-1 block text-sm font-medium text-white/85"
                            >
                                Confirm password
                            </label>
                            <div className="relative">
                                <input
                                    autoComplete="new-password"
                                    className="h-11 w-full rounded-xl border border-white/10 bg-neutral-950/70 px-3 pr-11 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-accent/70 focus:ring-4 focus:ring-accent/10 sm:h-10 sm:pr-10"
                                    id="confirmPassword"
                                    minLength={8}
                                    name="confirmPassword"
                                    placeholder="Re-enter your password"
                                    required
                                    type={showConfirmPassword ? "text" : "password"}
                                />
                                <button
                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                    aria-pressed={showConfirmPassword}
                                    className="absolute inset-y-0 right-0 inline-flex w-11 items-center justify-center rounded-r-xl text-white/45 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-accent sm:w-10"
                                    onClick={() => setShowConfirmPassword((visible) => !visible)}
                                    type="button"
                                >
                                    {showConfirmPassword ? (
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
                            className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-white transition hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:h-10"
                            type="submit"
                        >
                            Create account
                            <ArrowRight
                                aria-hidden="true"
                                className="size-4 transition-transform group-hover:translate-x-1"
                            />
                        </button>
                    </form>
                    <div className="mt-4 flex items-center gap-3" aria-hidden="true">
                        <span className="h-px flex-1 bg-white/10" />
                        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
                            Or continue with
                        </span>
                        <span className="h-px flex-1 bg-white/10" />
                    </div>
                    <button
                        onClick={handleGoogleSignIn}
                        className="btn mt-3 h-11 min-h-11 w-full rounded-xl border border-white/15 bg-white px-5 text-sm font-semibold text-neutral-900 shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:border-white hover:bg-white/95 hover:shadow-xl hover:shadow-black/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:translate-y-0 sm:h-10 sm:min-h-10"
                        type="button"
                    >
                        <svg aria-hidden="true" className="size-5 shrink-0" viewBox="0 0 48 48">
                            <path fill="#4285F4" d="M43.611 20.083H42V20H24v8h11.303c-1.65 4.657-6.108 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                            <path fill="#34A853" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                            <path fill="#FBBC05" d="M24 44c5.166 0 9.86-1.977 13.409-5.193l-6.19-5.238C29.166 35.217 26.715 36 24 36c-5.177 0-9.565-3.297-11.229-7.906l-6.522 5.025C9.56 39.556 16.227 44 24 44z" />
                            <path fill="#EA4335" d="M43.611 20.083H42V20H24v8h11.303a12.02 12.02 0 01-4.09 5.569l6.19 5.238C41.576 35.44 44 30.185 44 24c0-1.341-.138-2.65-.389-3.917z" />
                        </svg>
                        Login with Google
                    </button>


                    <p className="mt-4 text-center text-xs leading-5 text-white/40">
                        By creating an account, you agree to our terms and privacy policy.
                    </p>
                    <p className="mt-3 text-center text-sm text-white/55">
                        Already have an account?{" "}
                        <Link
                            className="font-semibold text-accent transition hover:text-accent/80"
                            href="/sign-in"
                        >
                            Sign in
                        </Link>
                    </p>
                </section>
            </div>
        </main>
    );
}
