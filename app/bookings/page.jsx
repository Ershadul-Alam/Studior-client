"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    ArrowRight,
    CalendarDays,
    LoaderCircle,
    MapPin,
    XCircle,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const API_URL = "http://localhost:8000";

function getId(value) {
    const id = value?._id ?? value?.id;
    if (typeof id === "string") return id;
    return id?.$oid ?? "";
}

function getStudioId(booking) {
    if (typeof booking.studioId === "string") return booking.studioId;
    return booking.studioId?.$oid ?? "";
}

function formatBookingDate(value) {
    if (typeof value !== "string") return "Date not provided";

    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return "Date not provided";

    return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
    }).format(date);
}

function formatPrice(value) {
    return `$${Number(value || 0).toLocaleString("en-US")}/hr`;
}

function BookingCard({ booking, studio, onCancel, isCancelling }) {
    const studioId = getStudioId(booking);
    const bookingId = getId(booking);
    const imageUrl = studio?.imageUrl || "/banner.jpg";
    const title = studio?.title || "Studio booking";
    const status = booking.status || "pending";

    return (
        <article className="flex h-32 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition hover:border-accent/40 hover:bg-white/[0.06] sm:h-40">
            <div className="relative h-full w-32 shrink-0 bg-neutral-900 sm:w-56">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    sizes="(min-width: 640px) 224px, 128px"
                    className="object-cover"
                    unoptimized
                />
            </div>

            <div className="grid min-h-0 min-w-0 flex-1 grid-rows-[auto_minmax(0,1fr)_auto_auto] gap-y-0.5 overflow-hidden p-2 sm:gap-y-1 sm:p-3">
                <div className="flex min-w-0 items-center justify-between gap-2">
                    <p className="truncate text-[10px] font-bold tracking-[0.12em] text-accent uppercase sm:text-xs sm:tracking-[0.15em]">
                        {studio?.category || "Booking"}
                    </p>
                    <span className="shrink-0 rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 text-xs font-bold text-accent sm:rounded-lg sm:py-1 sm:text-base">
                        {formatPrice(studio?.hourlyRate)}
                    </span>
                </div>

                <div className="flex min-h-0 min-w-0 flex-col justify-center overflow-hidden">
                    <h2 className="truncate text-sm font-semibold text-white sm:text-lg">
                        {title}
                    </h2>
                    <p className="mt-0.5 flex min-w-0 items-center gap-1 text-xs text-white/60 sm:gap-1.5 sm:text-xs">
                        <MapPin aria-hidden="true" className="size-3 shrink-0 text-accent sm:size-4" />
                        <span className="truncate">
                            {studio?.location || "Location not provided"}
                        </span>
                    </p>
                </div>

                <div className="flex min-w-0 items-center justify-between gap-2 text-xs text-white/70 sm:text-xs">
                    <span className="inline-flex min-w-0 items-center gap-1.5">
                        <CalendarDays aria-hidden="true" className="size-3.5 shrink-0 text-accent sm:size-4" />
                        <span className="truncate">
                            {formatBookingDate(booking.bookingDate)}
                        </span>
                    </span>
                    <span className="shrink-0 rounded-full bg-white/5 px-2 capitalize">
                        {status}
                    </span>
                </div>

                <div className="flex min-w-0 items-center justify-between gap-2">
                    {studioId ? (
                        <Link
                            href={`/studios/${encodeURIComponent(studioId)}`}
                            className="inline-flex min-w-0 items-center gap-1 text-xs font-semibold whitespace-nowrap text-white transition hover:text-accent"
                        >
                            <span className="truncate">View studio</span>
                            <ArrowRight aria-hidden="true" className="size-3.5 shrink-0" />
                        </Link>
                    ) : (
                        <span />
                    )}
                    <button
                        type="button"
                        aria-label={isCancelling ? "Cancelling booking" : "Cancel booking"}
                        title="Cancel booking"
                        disabled={!bookingId || isCancelling}
                        onClick={() => onCancel(booking)}
                        className="inline-flex h-6 shrink-0 items-center justify-center gap-1 rounded-lg border border-red-400/30 px-2 text-xs font-semibold whitespace-nowrap text-red-300 transition hover:bg-red-400/10 hover:text-red-200 disabled:cursor-wait disabled:opacity-60 sm:h-7 sm:px-2.5"
                    >
                        {isCancelling ? (
                            <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
                        ) : (
                            <XCircle aria-hidden="true" className="size-4" />
                        )}
                        <span className="hidden sm:inline">
                            {isCancelling ? "Cancelling..." : "Cancel booking"}
                        </span>
                    </button>
                </div>
            </div>
        </article>
    );
}

export default function BookingsPage() {
    const {
        data: session,
        isPending: isSessionPending,
        error: sessionError,
        refetch,
    } = authClient.useSession();
    const [bookingResult, setBookingResult] = useState({
        email: "",
        reloadKey: -1,
        bookings: [],
        studios: [],
        error: "",
        studioError: "",
    });
    const [reloadKey, setReloadKey] = useState(0);
    const [cancellingId, setCancellingId] = useState("");
    const [cancelError, setCancelError] = useState("");

    const user = session?.user;
    const email = user?.email?.trim().toLowerCase();

    useEffect(() => {
        if (!email) return;

        const controller = new AbortController();

        async function loadBookings() {
            try {
                const response = await fetch(`${API_URL}/bookings`, {
                    signal: controller.signal,
                });
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}.`);
                }

                const result = await response.json();
                if (!Array.isArray(result)) {
                    throw new Error("The booking service returned an invalid response.");
                }

                let studios = [];
                let studioError = "";
                try {
                    const studiosResponse = await fetch(`${API_URL}/studios`, {
                        signal: controller.signal,
                    });
                    if (!studiosResponse.ok) {
                        throw new Error(`Request failed with status ${studiosResponse.status}.`);
                    }

                    const studiosResult = await studiosResponse.json();
                    if (!Array.isArray(studiosResult)) {
                        throw new Error("The studio service returned an invalid response.");
                    }
                    studios = studiosResult;
                } catch (error) {
                    if (controller.signal.aborted) return;
                    console.error("Failed to load studio details for bookings:", error);
                    studioError = "Studio details couldn't be loaded.";
                }

                setBookingResult({
                    email,
                    reloadKey,
                    bookings: result.filter(
                        (booking) =>
                            typeof booking.clientEmail === "string" &&
                            booking.clientEmail.trim().toLowerCase() === email,
                    ),
                    studios,
                    error: "",
                    studioError,
                });
            } catch (error) {
                if (controller.signal.aborted) return;
                console.error("Failed to load your bookings:", error);
                setBookingResult({
                    email,
                    reloadKey,
                    bookings: [],
                    studios: [],
                    error: "We couldn't load your bookings. Please try again.",
                    studioError: "",
                });
            }
        }

        void loadBookings();
        return () => controller.abort();
    }, [email, reloadKey]);

    const hasCurrentResult =
        bookingResult.email === email && bookingResult.reloadKey === reloadKey;
    const bookings = hasCurrentResult ? bookingResult.bookings : [];
    const studios = hasCurrentResult ? bookingResult.studios : [];
    const isLoading = Boolean(email && !hasCurrentResult);
    const loadError = hasCurrentResult ? bookingResult.error : "";
    const studioError = hasCurrentResult ? bookingResult.studioError : "";
    const studiosById = new Map(studios.map((studio) => [getId(studio), studio]));

    async function cancelBooking(booking) {
        const id = getId(booking);
        if (!id) {
            setCancelError("This booking is missing its ID and can't be cancelled.");
            return;
        }

        setCancellingId(id);
        setCancelError("");

        try {
            const response = await fetch(
                `${API_URL}/bookings/${encodeURIComponent(id)}`,
                {
                    method: "DELETE",
                    credentials: "include",
                },
            );
            if (!response.ok) {
                setCancelError(`Couldn't cancel this booking (HTTP ${response.status}).`);
                return;
            }

            setBookingResult((current) => ({
                ...current,
                bookings: current.bookings.filter((item) => getId(item) !== id),
            }));
        } catch (error) {
            console.error("Failed to cancel booking:", error);
            setCancelError("Couldn't reach the booking service. Please try again.");
        } finally {
            setCancellingId("");
        }
    }

    return (
        <main className="min-h-screen bg-neutral-950 px-6 pb-24 pt-32 text-white sm:px-8 lg:px-10">
            <div className="mx-auto w-full max-w-5xl">
                <div>
                    <p className="text-sm font-bold tracking-[0.15em] text-accent">
                        YOUR RESERVATIONS
                    </p>
                    <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                        Your Bookings
                    </h1>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">
                        Review your upcoming studio reservations and manage your bookings.
                    </p>
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
                                : "Sign in to see your bookings."}
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
                        Loading your bookings...
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
                ) : bookings.length === 0 ? (
                    <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
                        <h2 className="text-lg font-semibold text-white">No bookings yet</h2>
                        <p className="mt-2 text-sm text-white/60">
                            Once you book a studio, your reservation will appear here.
                        </p>
                        <Link
                            href="/studios"
                            className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
                        >
                            Explore studios
                            <ArrowRight aria-hidden="true" className="size-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="mt-10 space-y-4">
                        {studioError && (
                            <p className="text-sm text-amber-200" role="status">
                                {studioError} Booking and cancellation actions are still available.
                            </p>
                        )}
                        {cancelError && (
                            <p className="text-sm text-red-300" role="alert">
                                {cancelError}
                            </p>
                        )}
                        {bookings.map((booking, index) => {
                            const id = getId(booking);
                            return (
                                <BookingCard
                                    key={id || `${booking.studioId}-${booking.bookingDate}-${index}`}
                                    booking={booking}
                                    studio={studiosById.get(getStudioId(booking))}
                                    onCancel={cancelBooking}
                                    isCancelling={cancellingId === id}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}
