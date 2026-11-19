"use client";

import { useId, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import getTokenFromClient from "@/lib/getTokenFromClient";
import { toast } from "@/components/ui/toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

const EditStudioDialog = ({ studio, onUpdated }) => {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const fieldClassName =
    "mt-1 h-9 rounded-lg border-white/15 bg-neutral-950/80 px-2.5 text-sm text-white shadow-none placeholder:text-white/40 focus-visible:border-accent/70 focus-visible:ring-accent/10";
  const labelClassName = "block text-xs font-medium text-white/80";

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");

    const studioId =
      typeof studio._id === "string" ? studio._id : studio._id?.$oid;
    if (!studioId) {
      setSubmitError("This studio is missing its ID and can't be updated.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const imageFile = formData.get("image");
    if (imageFile instanceof File && imageFile.size > 0 && !imageFile.type.startsWith("image/")) {
      setSubmitError("Please choose a valid image file.");
      return;
    }

    const amenities = String(formData.get("amenities") ?? "")
      .split(/[,\n]/)
      .map((amenity) => amenity.trim())
      .filter(Boolean);

    setIsSubmitting(true);
    try {
      const updates = {
        title: String(formData.get("title") ?? "").trim(),
        category: String(formData.get("category") ?? ""),
        location: String(formData.get("location") ?? "").trim(),
        hourlyRate: Number(formData.get("hourlyRate")),
        securityDeposit: Number(formData.get("securityDeposit")),
        maxCapacity: Number(formData.get("maxCapacity")),
        overview: String(formData.get("overview") ?? "").trim(),
        amenities,
      };

      if (imageFile instanceof File && imageFile.size > 0) {
        updates.imageUrl = await readFileAsDataUrl(imageFile);
      }

      const token = await getTokenFromClient();
      if (!token) {
        throw new Error("Please sign in again before updating this studio.");
      }

      const response = await fetch(
        `${API_URL}/your-studio/${encodeURIComponent(studioId)}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updates),
        },
      );

      if (!response.ok) {
        throw new Error(`The studio could not be updated (HTTP ${response.status}).`);
      }

      onUpdated(studioId, updates);
      setIsOpen(false);
      toast.add({
        title: "Studio updated",
        description: `${updates.title || studio.title || "Your studio"} has been updated successfully.`,
        type: "success",
      });
    } catch (error) {
      console.error("Failed to update studio:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We couldn't update this studio. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!isSubmitting) {
          setIsOpen(open);
          if (open) setSubmitError("");
        }
      }}
    >
      <DialogTrigger className="inline-flex h-7 items-center rounded-lg border border-white/15 px-2 text-xs font-medium text-white/80 transition hover:border-accent/40 hover:text-white">
        Edit
      </DialogTrigger>
      <DialogContent className="h-[80vh] max-h-[calc(100dvh-2rem)] max-w-2xl gap-3 overflow-y-auto border border-white/10 bg-neutral-950 p-4 text-white sm:max-w-2xl sm:p-5">
        <DialogHeader className="gap-0.5">
          <DialogTitle className="text-lg font-semibold">Edit studio</DialogTitle>
          <DialogDescription className="text-xs text-white/60">
            Update studio and contact details.
          </DialogDescription>
        </DialogHeader>

        <form key={JSON.stringify(studio)} onSubmit={handleSubmit}>
        <div className="grid gap-x-3 gap-y-2.5 sm:grid-cols-2">
          <div className="grid gap-2 sm:col-span-2 sm:grid-cols-2">
            <div>
              <label className={labelClassName} htmlFor={`${id}-title`}>
                Studio name
              </label>
              <Input
                className={fieldClassName}
                id={`${id}-title`}
                defaultValue={studio.title ?? ""}
                maxLength={100}
                name="title"
                placeholder="e.g. The Daylight Loft"
                required
              />
            </div>
            <div>
              <label className={labelClassName} htmlFor={`${id}-category`}>
                Category
              </label>
              <select
                className={`${fieldClassName} w-full border border-white/10 appearance-none`}
                defaultValue={studio.category ?? ""}
                id={`${id}-category`}
                name="category"
                required
              >
                <option className="bg-neutral-950" disabled value="">
                  Choose a category
                </option>
                <option className="bg-neutral-950" value="Photo Studio">
                  Photo Studio
                </option>
                <option className="bg-neutral-950" value="Film Stage">
                  Film Stage
                </option>
                <option className="bg-neutral-950" value="Podcast Room">
                  Podcast Room
                </option>
                <option className="bg-neutral-950" value="Music Suite">
                  Music Suite
                </option>
                <option className="bg-neutral-950" value="Art Workshop">
                  Art Workshop
                </option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClassName} htmlFor={`${id}-location`}>
              Location
            </label>
            <Input
              className={fieldClassName}
              defaultValue={studio.location ?? ""}
              id={`${id}-location`}
              maxLength={160}
              name="location"
              placeholder="City, neighborhood"
              required
            />
          </div>

          <div className="grid gap-2 sm:col-span-2 sm:grid-cols-3">
            <div>
              <label className={labelClassName} htmlFor={`${id}-hourlyRate`}>
                Hourly rate ($)
              </label>
              <Input
                className={fieldClassName}
                defaultValue={studio.hourlyRate ?? ""}
                id={`${id}-hourlyRate`}
                min="0"
                name="hourlyRate"
                placeholder="120"
                required
                step="0.01"
                type="number"
              />
            </div>
            <div>
              <label className={labelClassName} htmlFor={`${id}-securityDeposit`}>
                Security deposit ($)
              </label>
              <Input
                className={fieldClassName}
                defaultValue={studio.securityDeposit ?? ""}
                id={`${id}-securityDeposit`}
                min="0"
                name="securityDeposit"
                placeholder="250"
                required
                step="0.01"
                type="number"
              />
            </div>
            <div>
              <label className={labelClassName} htmlFor={`${id}-maxCapacity`}>
                Guest capacity
              </label>
              <Input
                className={fieldClassName}
                defaultValue={studio.maxCapacity ?? ""}
                id={`${id}-maxCapacity`}
                min="1"
                name="maxCapacity"
                placeholder="12"
                required
                step="1"
                type="number"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className={labelClassName} htmlFor={`${id}-image`}>
              Studio image
            </label>
            <Input
              accept="image/*"
              className={`${fieldClassName} file:mr-2 file:rounded-md file:border-0 file:bg-accent file:px-2 file:py-1 file:font-semibold file:text-white`}
              id={`${id}-image`}
              name="image"
              type="file"
            />
            {studio.imageUrl && (
              <p className="mt-1 text-xs text-white/50">Choose a file only to replace the current image.</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className={labelClassName} htmlFor={`${id}-overview`}>
              About the studio
            </label>
            <textarea
              className="mt-1.5 w-full rounded-lg border border-white/15 bg-neutral-950/80 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-accent/70 focus:ring-4 focus:ring-accent/10"
              id={`${id}-overview`}
              defaultValue={studio.overview ?? ""}
              maxLength={2000}
              name="overview"
              placeholder="Describe the space and what creators can make there."
              required
              rows={2}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClassName} htmlFor={`${id}-amenities`}>
              Equipment &amp; amenities
            </label>
            <textarea
              className="mt-1.5 w-full rounded-lg border border-white/15 bg-neutral-950/80 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-accent/70 focus:ring-4 focus:ring-accent/10"
              id={`${id}-amenities`}
              defaultValue={
                Array.isArray(studio.amenities)
                  ? studio.amenities.join(", ")
                  : studio.amenities ?? ""
              }
              name="amenities"
              placeholder="Cyclorama wall, natural light, parking"
              rows={2}
            />
          </div>
        </div>
        {submitError && (
          <p className="mt-3 text-sm text-red-300" role="alert">
            {submitError}
          </p>
        )}
        <DialogFooter className="mt-3 border-white/10 bg-white/[0.03] p-2 sm:-mx-5 sm:-mb-5">
          <button
            className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-white transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Saving..." : "Apply"}
          </button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditStudioDialog;
