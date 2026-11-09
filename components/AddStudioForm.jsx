"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ImagePlus,
  LoaderCircle,
  Sparkles,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";

const fieldClassName =
  "mt-2 h-12 rounded-xl border-white/15 bg-neutral-950/80 px-4 text-sm text-white shadow-none placeholder:text-white/50 focus-visible:border-accent/70 focus-visible:ring-accent/10";

const ownerFieldClassName =
  "mt-2 h-12 cursor-not-allowed rounded-xl border-accent/40 bg-accent/10 px-4 text-sm font-medium text-white opacity-100 shadow-none read-only:focus-visible:border-accent/40 read-only:focus-visible:ring-0";

const labelClassName = "block text-sm font-medium text-white";

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("The selected image couldn't be read."));
      }
    });
    reader.addEventListener("error", () => {
      reject(reader.error ?? new Error("The selected image couldn't be read."));
    });
    reader.readAsDataURL(file);
  });
}

function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`mt-2 w-full rounded-xl border border-white/15 bg-neutral-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/50 focus:border-accent/70 focus:ring-4 focus:ring-accent/10 ${className}`}
      {...props}
    />
  );
}

export default function AddStudioForm() {
  const router = useRouter();
  const { data: session, isPending, error: sessionError, refetch } = authClient.useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [selectedImageName, setSelectedImageName] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");

    const user = session?.user;
    if (!user?.name || !user.email) {
      setSubmitError("Your account name and email are required to list a studio.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const imageFile = formData.get("image");
    if (!(imageFile instanceof File) || imageFile.size === 0) {
      setSubmitError("Please choose an image for your studio.");
      return;
    }
    if (!imageFile.type.startsWith("image/")) {
      setSubmitError("Please choose a valid image file.");
      return;
    }

    const amenities = String(formData.get("amenities") ?? "")
      .split(/[,\n]/)
      .map((amenity) => amenity.trim())
      .filter(Boolean);

    setIsSubmitting(true);
    try {
      const studio = {
        title: String(formData.get("title") ?? "").trim(),
        category: String(formData.get("category") ?? ""),
        location: String(formData.get("location") ?? "").trim(),
        hourlyRate: Number(formData.get("hourlyRate")),
        securityDeposit: Number(formData.get("securityDeposit")),
        maxCapacity: Number(formData.get("maxCapacity")),
        imageUrl: await readFileAsDataUrl(imageFile),
        overview: String(formData.get("overview") ?? "").trim(),
        amenities,
        ownerName: user.name,
        ownerEmail: user.email,
      };

      const response = await fetch("http://localhost:8000/add-studio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studio),
      });

      if (!response.ok) {
        throw new Error(`The studio could not be submitted (HTTP ${response.status}).`);
      }

      router.push("/studios");
    } catch (error) {
      console.error("Failed to submit studio:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We couldn't submit your studio. Please try again.",
      );
      setIsSubmitting(false);
    }
  }

  const user = session?.user;

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[linear-gradient(135deg,#3b100d_0%,#160b0a_48%,#4a120e_100%)] px-6 pb-24 pt-32 text-white sm:px-8 lg:px-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 size-[28rem] rounded-full bg-accent/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 size-[30rem] rounded-full bg-red-950/30 blur-[130px]"
      />

      <div className="relative mx-auto w-full max-w-4xl">
        <Link
          href="/studios"
          className="inline-flex items-center gap-2 text-sm font-medium text-white/85 transition hover:text-white"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to studios
        </Link>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
            <Sparkles aria-hidden="true" className="size-4" />
            LIST YOUR SPACE
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            Bring your studio to <span className="text-accent">Studior.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/80">
            Share a few details about your space and help creators find their next
            place to make something great.
          </p>
        </div>

        <section
          aria-labelledby="studio-form-heading"
          className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-9"
        >
          <div>
            <p className="text-sm font-bold tracking-[0.16em] text-accent">
              STUDIO DETAILS
            </p>
            <h2 id="studio-form-heading" className="mt-3 text-2xl font-semibold tracking-tight">
              Tell us about your space
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/80">
              Add your studio details below. Your account contact information appears in a separate card at the bottom.
            </p>
          </div>

          {isPending ? (
            <p className="mt-8 rounded-xl border border-white/10 bg-neutral-950/50 px-4 py-5 text-sm text-white/85" role="status">
              Loading your account...
            </p>
          ) : !user ? (
            <div className="mt-8 rounded-xl border border-white/10 bg-neutral-950/50 p-5">
              {sessionError ? (
                <p className="text-sm text-red-300" role="alert">
                  We couldn&apos;t load your account. Please try again.
                </p>
              ) : (
                <p className="text-sm text-white/85">
                  Sign in to list a studio. Your account name and email will be included
                  with the submission.
                </p>
              )}
              {sessionError ? (
                <button
                  className="mt-4 rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                  onClick={() => void refetch()}
                  type="button"
                >
                  Try again
                </button>
              ) : (
                <Link
                  href="/sign-in"
                  className="mt-4 inline-flex rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent/90"
                >
                  Sign in
                </Link>
              )}
            </div>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClassName} htmlFor="title">
                    Studio name
                  </label>
                  <Input
                    className={fieldClassName}
                    id="title"
                    maxLength={100}
                    name="title"
                    placeholder="e.g. The Daylight Loft"
                    required
                  />
                </div>
                <div>
                  <label className={labelClassName} htmlFor="category">
                    Category
                  </label>
                  <select
                    className={`${fieldClassName} w-full appearance-none`}
                    defaultValue=""
                    id="category"
                    name="category"
                    required
                  >
                    <option className="bg-neutral-950" disabled value="">
                      Choose a category
                    </option>
                    <option className="bg-neutral-950" value="Photo Studio">Photo Studio</option>
                    <option className="bg-neutral-950" value="Film Stage">Film Stage</option>
                    <option className="bg-neutral-950" value="Podcast Room">Podcast Room</option>
                    <option className="bg-neutral-950" value="Music Suite">Music Suite</option>
                    <option className="bg-neutral-950" value="Art Workshop">Art Workshop</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClassName} htmlFor="location">
                  Location
                </label>
                <Input
                  className={fieldClassName}
                  id="location"
                  maxLength={160}
                  name="location"
                  placeholder="City, neighborhood"
                  required
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <label className={labelClassName} htmlFor="hourlyRate">
                    Hourly rate ($)
                  </label>
                  <Input
                    className={fieldClassName}
                    id="hourlyRate"
                    min="0"
                    name="hourlyRate"
                    placeholder="120"
                    required
                    step="0.01"
                    type="number"
                  />
                </div>
                <div>
                  <label className={labelClassName} htmlFor="securityDeposit">
                    Security deposit ($)
                  </label>
                  <Input
                    className={fieldClassName}
                    id="securityDeposit"
                    min="0"
                    name="securityDeposit"
                    placeholder="250"
                    required
                    step="0.01"
                    type="number"
                  />
                </div>
                <div>
                  <label className={labelClassName} htmlFor="maxCapacity">
                    Guest capacity
                  </label>
                  <Input
                    className={fieldClassName}
                    id="maxCapacity"
                    min="1"
                    name="maxCapacity"
                    placeholder="12"
                    required
                    step="1"
                    type="number"
                  />
                </div>
              </div>

              <div>
                <label className={labelClassName} htmlFor="image">
                  Studio image
                </label>
                <Input
                  accept="image/*"
                  className={`${fieldClassName} file:mr-3 file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-1 file:font-semibold file:text-white`}
                  id="image"
                  name="image"
                  required
                  type="file"
                  onChange={(event) =>
                    setSelectedImageName(event.currentTarget.files?.[0]?.name ?? "")
                  }
                />
                <p className="mt-2 flex items-center gap-2 text-sm text-white/90">
                  <ImagePlus aria-hidden="true" className="size-4 shrink-0 text-accent" />
                  {selectedImageName || "Choose an image file for your studio."}
                </p>
              </div>

              <div>
                <label className={labelClassName} htmlFor="overview">
                  About the studio
                </label>
                <Textarea
                  id="overview"
                  maxLength={2000}
                  name="overview"
                  placeholder="Describe the space, its best features, and what creators can make there."
                  required
                  rows={4}
                />
              </div>

              <div>
                <label className={labelClassName} htmlFor="amenities">
                  Equipment &amp; amenities
                </label>
                <Textarea
                  id="amenities"
                  name="amenities"
                  placeholder="Separate items with commas, e.g. Cyclorama wall, natural light, parking"
                  rows={3}
                />
              </div>

              {submitError && (
                <p
                  className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200"
                  role="alert"
                >
                  {submitError}
                </p>
              )}

              <div className="border-t border-white/10 pt-6">
                <button
                  className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-white transition hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
                      Submitting studio...
                    </>
                  ) : (
                    <>
                      Submit studio
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </section>

        {!isPending && user && (
          <section
            aria-labelledby="account-details-heading"
            className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-9"
          >
            <div className="mb-5">
              <p className="text-sm font-bold tracking-[0.16em] text-accent">
                ACCOUNT DETAILS
              </p>
              <h2
                id="account-details-heading"
                className="mt-3 text-2xl font-semibold tracking-tight"
              >
                Studio contact information
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/80">
                These details come from your account and will be included with your listing.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClassName} htmlFor="ownerName">
                  Your name
                </label>
                <Input
                  autoComplete="name"
                  className={ownerFieldClassName}
                  id="ownerName"
                  readOnly
                  value={user.name ?? ""}
                />
              </div>
              <div>
                <label className={labelClassName} htmlFor="ownerEmail">
                  Email address
                </label>
                <Input
                  autoComplete="email"
                  className={ownerFieldClassName}
                  id="ownerEmail"
                  readOnly
                  type="email"
                  value={user.email ?? ""}
                />
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}