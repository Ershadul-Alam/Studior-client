"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const UserMenu = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (isPending) return null;

  if (user) {
    const name = user.name?.trim() || user.email || "there";

    return (
      <HoverCard>
        <HoverCardTrigger
          delay={0}
          className="inline-flex items-center rounded-full border border-white/20 px-5 py-3 text-[15px] font-semibold text-white transition hover:bg-white/10"
        >
          Welcome, {name}
        </HoverCardTrigger>
        <HoverCardContent
          align="end"
          className="w-48 rounded-xl border border-white/10 bg-neutral-900 p-2 text-white shadow-xl"
        >
          <nav aria-label="Account" className="flex flex-col">
            <Link
              href="/profile"
              className="rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-white/10"
            >
              Profile
            </Link>
            <Link
              href="/your-studio"
              className="rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-white/10"
            >
              Your studio
            </Link>
          </nav>
        </HoverCardContent>
      </HoverCard>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/sign-in"
        className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-[15px] font-semibold text-white transition hover:bg-white/10"
      >
        Sign in
      </Link>
      <Link
        href="/sign-up"
        className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-[15px] font-semibold text-neutral-900 shadow-lg transition hover:bg-neutral-200"
      >
        Sign up
      </Link>
    </div>
  );
};

export default UserMenu;
