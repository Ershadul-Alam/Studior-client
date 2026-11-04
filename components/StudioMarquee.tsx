import Image, { type StaticImageData } from "next/image";

import pic1 from "@/public/studio-pic-1.webp";
import pic2 from "@/public/studio-pic-2.webp";
import pic3 from "@/public/studio-pic-3.webp";
import pic4 from "@/public/studio-pic-4.webp";
import pic5 from "@/public/studio-pic-5.webp";
import pic6 from "@/public/studio-pic-6.webp";
import pic7 from "@/public/studio-pic-7.webp";
import pic8 from "@/public/studio-pic-8.webp";
import pic9 from "@/public/studio-pic-9.webp";
import pic10 from "@/public/studio-pic-10.webp";
import pic11 from "@/public/studio-pic-11.webp";
import pic12 from "@/public/studio-pic-12.webp";
import pic13 from "@/public/studio-pic-13.webp";

const pics: StaticImageData[] = [
  pic1,
  pic2,
  pic3,
  pic4,
  pic5,
  pic6,
  pic7,
  pic8,
  pic9,
  pic10,
  pic11,
  pic12,
  pic13,
];

export default function StudioMarquee() {
  return (
    <section className="overflow-hidden bg-neutral-950 py-16">
      <p className="mb-10 text-center text-sm font-bold tracking-[0.15em] text-white/70">
        INSIDE OUR STUDIOS
      </p>

      <div className="flex w-max animate-[marquee_50s_linear_infinite] gap-4 hover:[animation-play-state:paused] group-hover:[animation-play-state:paused]">
        {[...pics, ...pics].map((pic, index) => (
          <div
            key={`${pic.src}-${index}`}
            className="group relative w-max shrink-0 overflow-hidden rounded-2xl"
          >
            <Image
              src={pic}
              alt={`Studio space ${(index % pics.length) + 1}`}
              className="h-52 w-auto rounded-2xl object-cover transition duration-300 group-hover:scale-105 sm:h-64"
              sizes="400px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
