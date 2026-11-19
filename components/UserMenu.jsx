"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

/** @param {{ placement?: string; onSignedOut?: () => void }} props */
const UserMenu = ({ placement = "header", onSignedOut } = {}) => {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [signOutError, setSignOutError] = useState("");
    const user = session?.user;

    async function handleSignOut() {
        setIsSigningOut(true);
        setSignOutError("");

        try {
            const { error } = await authClient.signOut();

            if (error) {
                setSignOutError(error.message || "Unable to sign out. Please try again.");
                return;
            }

            router.replace("/");
            onSignedOut?.();
        } catch (error) {
            setSignOutError(
                error instanceof Error
                    ? error.message
                    : "Unable to sign out. Please try again.",
            );
        } finally {
            setIsSigningOut(false);
        }
    }

    if (isPending) return null;

    if (user) {
        if (placement === "menu") {
            return (
                <div className="w-fit px-1 pt-1 sm:px-2 sm:pt-2">
                    <button
                        type="button"
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="inline-flex w-fit whitespace-nowrap rounded-xl px-2 py-2 text-left text-sm font-medium text-white/90 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60 sm:py-3 sm:text-base"
                    >
                        {isSigningOut ? "Signing out..." : "Sign out"}
                    </button>
                    {signOutError && (
                        <p role="alert" className="px-2 py-2 text-sm text-red-300">
                            {signOutError}
                        </p>
                    )}
                </div>
            );
        }

        return null;
    }

    if (placement === "menu") return null;

    return (
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <Link
                href="/sign-in"
                className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/20 px-2 py-2 text-[11px] font-semibold text-white transition hover:bg-white/10 sm:min-h-12 sm:px-5 sm:py-3 sm:text-[15px]"
            >
                Sign in
            </Link>
            <Link
                href="/sign-up"
                className="inline-flex min-h-10 items-center justify-center rounded-full bg-white px-2 py-2 text-[11px] font-semibold text-neutral-900 shadow-lg transition hover:bg-neutral-200 sm:min-h-12 sm:px-5 sm:py-3 sm:text-[15px]"
            >
                Sign up
            </Link>
        </div>
    );
};

export default UserMenu;
