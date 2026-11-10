"use client";

import { useId } from "react";
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

const EditStudioDialog = () => {
  const id = useId();
  const fieldClassName =
    "mt-1 h-9 rounded-lg border-white/15 bg-neutral-950/80 px-2.5 text-sm text-white shadow-none placeholder:text-white/40 focus-visible:border-accent/70 focus-visible:ring-accent/10";
  const labelClassName = "block text-xs font-medium text-white/80";

  return (
    <Dialog>
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

        <div className="grid gap-x-3 gap-y-2.5 sm:grid-cols-2">
          <div className="grid gap-2 sm:col-span-2 sm:grid-cols-2">
            <div>
              <label className={labelClassName} htmlFor={`${id}-title`}>
                Studio name
              </label>
              <Input
                className={fieldClassName}
                id={`${id}-title`}
                name="title"
                placeholder="e.g. The Daylight Loft"
              />
            </div>
            <div>
              <label className={labelClassName} htmlFor={`${id}-category`}>
                Category
              </label>
              <select
                className={`${fieldClassName} w-full border border-white/10 appearance-none`}
                defaultValue=""
                id={`${id}-category`}
                name="category"
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
              id={`${id}-location`}
              name="location"
              placeholder="City, neighborhood"
            />
          </div>

          <div className="grid gap-2 sm:col-span-2 sm:grid-cols-3">
            <div>
              <label className={labelClassName} htmlFor={`${id}-hourlyRate`}>
                Hourly rate ($)
              </label>
              <Input
                className={fieldClassName}
                id={`${id}-hourlyRate`}
                min="0"
                name="hourlyRate"
                placeholder="120"
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
                id={`${id}-securityDeposit`}
                min="0"
                name="securityDeposit"
                placeholder="250"
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
                id={`${id}-maxCapacity`}
                min="1"
                name="maxCapacity"
                placeholder="12"
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
          </div>

          <div className="sm:col-span-2">
            <label className={labelClassName} htmlFor={`${id}-overview`}>
              About the studio
            </label>
            <textarea
              className="mt-1.5 w-full rounded-lg border border-white/15 bg-neutral-950/80 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-accent/70 focus:ring-4 focus:ring-accent/10"
              id={`${id}-overview`}
              maxLength={2000}
              name="overview"
              placeholder="Describe the space and what creators can make there."
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
              name="amenities"
              placeholder="Cyclorama wall, natural light, parking"
              rows={2}
            />
          </div>

        </div>
        <DialogFooter className=" border-white/10 bg-white/[0.03] p-2 sm:-mx-5 sm:-mb-5">
          <button
            className="inline-flex  items-center justify-center rounded-lg bg-accent px-5 text-sm font-semibold text-white transition hover:bg-accent/90"
            type="button"
          >
            Apply
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditStudioDialog;
