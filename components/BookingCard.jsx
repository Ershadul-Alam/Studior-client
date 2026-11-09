"use client"
import { useState } from "react";
import { format, startOfToday } from "date-fns";
import { CalendarDays, MapPin, Star } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

function formatPrice(value) {
    return `$${Number(value || 0).toLocaleString("en-US")}`;
}

const BookingCard = ({ studio }) => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState();
    const [calendarOpen, setCalendarOpen] = useState(false);

    const userName = user?.name ?? "User not Signed In";
    const userEmail = user?.email ?? "User not Signed In";

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!selectedDate) return;

        const booking = {
            studioId: studio._id,
            bookingDate: format(selectedDate, "yyyy-MM-dd"),
            userName,
            userEmail,
        };

        try {
            const response = await fetch("http://localhost:8000/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(booking),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Booking confirmed!", data);
                setDialogOpen(false);
            } else {
                console.error("Booking failed:", data.error);
            }
        } catch (error) {
            console.error("Error submitting booking:", error);
        }
    }

    return (
        <aside className="lg:sticky lg:top-28">
            <div className="rounded-2xl border border-white/10 bg-neutral-900 p-6 shadow-2xl shadow-black/40">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold tracking-tight text-accent">
                            {formatPrice(studio.hourlyRate)}
                        </span>
                        <span className="text-sm text-white/50">/ hour</span>
                    </div>
                    <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-sm font-semibold text-white">
                        <Star className="size-4 fill-accent text-accent" />
                        {studio.rating}
                    </span>
                </div>

                <dl className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
                    <div className="flex items-center justify-between gap-4">
                        <dt className="text-white/50">Security Deposit</dt>
                        <dd className="font-semibold text-white">
                            {formatPrice(studio.securityDeposit)}
                        </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <dt className="text-white/50">Cancellation Policy</dt>
                        <dd className="text-right font-semibold text-accent">
                            Free before shoot confirmation
                        </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <dt className="text-white/50">Availability</dt>
                        <dd className="text-right font-semibold text-white">
                            Instant Request Slots
                        </dd>
                    </div>
                </dl>

                <button
                    type="button"
                    onClick={() => setDialogOpen(true)}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-4 text-[15px] font-bold text-white transition hover:bg-accent/90"
                >
                    <CalendarDays className="size-5" />
                    Book Workspace Now
                </button>

                <p className="mt-4 text-center text-xs leading-relaxed text-white/40">
                    You won&apos;t be charged immediately. Your reservation will enter
                    pending status for host approval.
                </p>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto border border-white/10 bg-neutral-900 p-6 text-white sm:max-w-lg">
                    <form onSubmit={handleBooking} className="contents">
                        <DialogHeader className="pr-8">
                            <DialogTitle className="text-xl font-bold text-white">
                                Complete your booking
                            </DialogTitle>
                            <DialogDescription className="text-white/55">
                                Review the workspace details and choose your booking date.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                                        {studio.category || "Studio"}
                                    </p>
                                    <h3 className="mt-1 truncate text-lg font-bold text-white">
                                        {studio.title || "Creative workspace"}
                                    </h3>
                                    {studio.location && (
                                        <p className="mt-2 flex items-center gap-1.5 text-sm text-white/55">
                                            <MapPin className="size-4 shrink-0 text-accent" />
                                            {studio.location}
                                        </p>
                                    )}
                                </div>
                                <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-sm font-semibold text-white">
                                    <Star className="size-4 fill-accent text-accent" />
                                    {studio.rating}
                                </span>
                            </div>

                            <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-sm">
                                <div>
                                    <dt className="text-xs text-white/45">Hourly rate</dt>
                                    <dd className="mt-1 font-semibold text-white">
                                        {formatPrice(studio.hourlyRate)} / hour
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-white/45">Security deposit</dt>
                                    <dd className="mt-1 font-semibold text-white">
                                        {formatPrice(studio.securityDeposit)}
                                    </dd>
                                </div>
                                {studio.maxCapacity && (
                                    <div className="col-span-2">
                                        <dt className="text-xs text-white/45">Maximum capacity</dt>
                                        <dd className="mt-1 font-semibold text-white">
                                            {studio.maxCapacity} people
                                        </dd>
                                    </div>
                                )}
                            </dl>
                        </div>

                        <div className="space-y-2">
                            <p id="booking-date-label" className="text-sm font-semibold text-white">
                                Booking date
                            </p>
                            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                                <PopoverTrigger
                                    render={
                                        <Button
                                            id="booking-date"
                                            aria-labelledby="booking-date-label"
                                            type="button"
                                            variant="outline"
                                            className="h-12 w-full justify-start border-white/15 bg-neutral-950 text-left font-normal text-white hover:bg-white/5 hover:text-white"
                                        />
                                    }
                                >
                                    <CalendarDays className="mr-2 size-4 text-accent" />
                                    {selectedDate
                                        ? format(selectedDate, "EEEE, MMMM d, yyyy")
                                        : <span className="text-white/45">Select a date</span>}
                                </PopoverTrigger>
                                <PopoverContent
                                    align="start"
                                    className="w-auto border border-white/10 bg-neutral-900 p-2 text-white"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={(date) => {
                                            setSelectedDate(date);
                                            if (date) setCalendarOpen(false);
                                        }}
                                        disabled={{ before: startOfToday() }}
                                        className="bg-neutral-900 text-white"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <DialogFooter className="-mx-6 -mb-6 mt-1 border-white/10 bg-white/[0.03] px-6 py-4 sm:flex-row">
                            <Button
                                type="submit"
                                disabled={!selectedDate}
                                className="w-full bg-accent font-bold text-white hover:bg-accent/90 sm:w-auto"
                            >
                                Confirm booking
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent">
                        {(studio.ownerName || "Host").slice(0, 1).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">
                            Hosted by
                        </p>
                        <p className="truncate font-semibold text-white">
                            {studio.ownerName || "Studio host"}
                        </p>
                    </div>
                </div>
                {studio.ownerEmail && (
                    <a
                        href={`mailto:${studio.ownerEmail}`}
                        className="mt-4 block truncate rounded-lg border border-white/10 bg-neutral-950/40 px-3 py-2 text-sm text-white/60 transition hover:border-accent/40 hover:text-white"
                    >
                        {studio.ownerEmail}
                    </a>
                )}
            </div>
        </aside>
    );
};

export default BookingCard;