"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, LoaderCircle, MapPin, Trash2, Users } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const API_URL = "http://localhost:8000";

function getStudioId(studio) {
    if (typeof studio._id === "string") return studio._id;
    return studio._id?.$oid ?? "";
}

function StudioCard({ studio, onDelete, isDeleting }) {
    const imageUrl = studio.imageUrl || "/banner.jpg";

    return (
        <article className="flex overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition hover:border-accent/40 hover:bg-white/[0.06]">
            <div className="relative h-32 w-32 shrink-0 sm:h-40 sm:w-56">
                <Image
                    src={imageUrl}
                    alt={studio.title || "Studio"}
                    fill
                    sizes="(min-width: 640px) 224px, 128px"
                    className="object-cover"
                    unoptimized
                />
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 p-3 sm:gap-3 sm:p-4">
                <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-bold tracking-[0.15em] text-accent uppercase">
                        {studio.category || "Studio"}
                    </p>
                    <span className="shrink-0 rounded-lg border border-accent/30 bg-accent/10 px-3 py-1.5 text-base font-bold text-accent sm:text-lg">
                        ${Number(studio.hourlyRate || 0)}/hr
                    </span>
                </div>

                <div className="min-w-0">
                    <h2 className="truncate text-lg font-semibold text-white sm:text-2xl">
                        {studio.title || "Untitled studio"}
                    </h2>
                    <p className="mt-1 flex items-center gap-2 text-sm text-white/60">
                        <MapPin aria-hidden="true" className="size-4 shrink-0 text-accent" />
                        <span className="truncate">{studio.location || "Location not provided"}</span>
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm text-white/70">
                    <span className="inline-flex items-center gap-2">
                        <Users aria-hidden="true" className="size-4 text-accent" />
                        Up to {studio.maxCapacity || 0}
                    </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                    <Link
                        href={`/studios/${encodeURIComponent(getStudioId(studio))}`}
                        className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-white transition hover:text-accent"
                    >
                        View studio
                        <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                    <button
                        type="button"
                        aria-label={`Delete ${studio.title || "studio"}`}
                        title="Delete studio"
                        disabled={isDeleting}
                        onClick={() => onDelete(studio)}
                        className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-red-400/30 text-red-300 transition hover:bg-red-400/10 hover:text-red-200 disabled:cursor-wait disabled:opacity-60"
                    >
                        {isDeleting ? (
                            <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
                        ) : (
                            <Trash2 aria-hidden="true" className="size-4" />
                        )}
                    </button>
                </div>
            </div>
        </article>
    );
}

export default function YourStudioPage() {
    const {
        data: session,
        isPending: isSessionPending,
        error: sessionError,
        refetch,
    } = authClient.useSession();
    const [studioResult, setStudioResult] = useState({
        email: "",
        reloadKey: -1,
        studios: [],
        error: "",
    });
    const [reloadKey, setReloadKey] = useState(0);
    const [deletingId, setDeletingId] = useState("");
    const [studioToDelete, setStudioToDelete] = useState(null);
    const [deleteError, setDeleteError] = useState("");

    const email = session?.user?.email?.trim().toLowerCase();

    useEffect(() => {
        if (!email) return;

        const controller = new AbortController();

        async function loadStudios() {
            try {
                const response = await fetch(`${API_URL}/studios`, {
                    signal: controller.signal,
                });
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}.`);
                }

                const result = await response.json();
                if (!Array.isArray(result)) {
                    throw new Error("The studio service returned an invalid response.");
                }

                setStudioResult({
                    email,
                    reloadKey,
                    studios: result.filter(
                        (studio) =>
                            typeof studio.ownerEmail === "string" &&
                            studio.ownerEmail.trim().toLowerCase() === email,
                    ),
                    error: "",
                });
            } catch (error) {
                if (controller.signal.aborted) return;
                console.error("Failed to load your studios:", error);
                setStudioResult({
                    email,
                    reloadKey,
                    studios: [],
                    error: "We couldn't load your studios. Please try again.",
                });
            }
        }

        void loadStudios();
        return () => controller.abort();
    }, [email, reloadKey]);

    const user = session?.user;
    const hasCurrentResult =
        studioResult.email === email && studioResult.reloadKey === reloadKey;
    const studios = hasCurrentResult ? studioResult.studios : [];
    const isLoading = Boolean(email && !hasCurrentResult);
    const loadError = hasCurrentResult ? studioResult.error : "";

    function handleDelete(studio) {
        setDeleteError("");
        setStudioToDelete(studio);
    }

    async function confirmDelete() {
        if (!studioToDelete) return;

        const studio = studioToDelete;
        const id = getStudioId(studio);
        if (!id) {
            setDeleteError("This studio is missing its ID and can't be deleted.");
            return;
        }

        setDeletingId(id);
        setDeleteError("");

        try {
            const response = await fetch(
                `${API_URL}/your-studio/${encodeURIComponent(id)}`,
                {
                    method: "DELETE",
                    credentials: "include"
                },
            )
            if (!response.ok) {
                const responseBody = await response.text();
                let detail = "";
                if (responseBody) {
                    try {
                        const parsedBody = JSON.parse(responseBody);
                        const message =
                            typeof parsedBody === "string"
                                ? parsedBody
                                : parsedBody?.message || parsedBody?.error;
                        detail = typeof message === "string" ? message : "";
                    } catch {
                        if (!responseBody.trimStart().startsWith("<")) {
                            detail = responseBody.trim().slice(0, 200);
                        }
                    }
                }
                setDeleteError(
                    `Couldn't delete this studio (HTTP ${response.status}).${detail ? ` ${detail}` : " Please try again."}`,
                );
                return;
            }

            setStudioResult((current) => ({
                ...current,
                studios: current.studios.filter(
                    (item) => getStudioId(item) !== id,
                ),
            }));
            setStudioToDelete(null);
        } catch (error) {
            setDeleteError(
                error instanceof Error && error.message
                    ? `Couldn't reach the studio service. ${error.message}`
                    : "Couldn't reach the studio service. Please try again.",
            );
        } finally {
            setDeletingId("");
        }
    }

    return (
        <main className="min-h-screen bg-neutral-950 px-6 pb-24 pt-32 text-white sm:px-8 lg:px-10">
            <div className="mx-auto w-full max-w-5xl">
                <div className="flex flex-wrap items-end justify-between gap-5">
                    <div>
                        <p className="text-sm font-bold tracking-[0.15em] text-accent">
                            YOUR LISTINGS
                        </p>
                        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                            Your Studios
                        </h1>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">
                            Manage and revisit the studio spaces you&apos;ve added to Studior.
                        </p>
                    </div>
                    <Link
                        href="/add-studio"
                        className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
                    >
                        Add a studio
                        <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                </div>

                {isSessionPending ? (
                    <p className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-sm text-white/60" role="status">
                        Loading your account...
                    </p>
                ) : !user ? (
                    <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                        <p className="text-white">
                            {sessionError
                                ? "We couldn't load your account. Please try again."
                                : "Sign in to see the studios you've added."}
                        </p>
                        {sessionError ? (
                            <button
                                type="button"
                                onClick={() => void refetch()}
                                className="mt-4 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                            >
                                Try again
                            </button>
                        ) : (
                            <Link
                                href="/sign-in"
                                className="mt-4 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent/90"
                            >
                                Sign in
                            </Link>
                        )}
                    </div>
                ) : isLoading ? (
                    <p className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-sm text-white/60" role="status">
                        Loading your studios...
                    </p>
                ) : loadError ? (
                    <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                        <p className="text-sm text-red-300" role="alert">{loadError}</p>
                        <button
                            type="button"
                            onClick={() => setReloadKey((key) => key + 1)}
                            className="mt-4 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                            Try again
                        </button>
                    </div>
                ) : studios.length === 0 ? (
                    <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
                        <h2 className="text-lg font-semibold text-white">No studios yet</h2>
                        <p className="mt-2 text-sm text-white/60">
                            Once you list a studio, it will appear here.
                        </p>
                        <Link
                            href="/add-studio"
                            className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
                        >
                            List your first studio
                            <ArrowRight aria-hidden="true" className="size-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="mt-10 space-y-4">
                        {studios.map((studio, index) => (
                            <StudioCard
                                key={getStudioId(studio) || `${studio.title}-${index}`}
                                studio={studio}
                                onDelete={handleDelete}
                                isDeleting={deletingId === getStudioId(studio)}
                            />
                        ))}
                    </div>
                )}
            </div>
            <Dialog
                open={Boolean(studioToDelete)}
                onOpenChange={(open) => {
                    if (!open && !deletingId) {
                        setStudioToDelete(null);
                        setDeleteError("");
                    }
                }}
            >
                <DialogContent className="border border-white/10 bg-neutral-900 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold">
                            Delete this studio?
                        </DialogTitle>
                        <DialogDescription className="text-white/60">
                            This will permanently delete{" "}
                            <span className="font-semibold text-white">
                                {studioToDelete?.title || "this studio"}
                            </span>
                            . This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    {deleteError && (
                        <p className="text-sm text-red-300" role="alert">
                            {deleteError}
                        </p>
                    )}
                    <DialogFooter className="border-white/10 bg-white/[0.03]">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={Boolean(deletingId)}
                            onClick={() => {
                                setStudioToDelete(null);
                                setDeleteError("");
                            }}
                            className="border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            disabled={Boolean(deletingId)}
                            onClick={() => void confirmDelete()}
                            className="bg-red-600 text-white hover:bg-red-700"
                        >
                            {deletingId ? (
                                <>
                                    <LoaderCircle aria-hidden="true" className="animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                "Delete studio"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </main>
    );
}