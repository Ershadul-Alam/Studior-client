import Hero from "@/components/Hero";
import StudioMarquee from "@/components/StudioMarquee";
import FeaturedStudios from "@/components/FeaturedStudios";
import Categories from "@/components/Categories";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <>
      <Hero />
      <StudioMarquee />
      <FeaturedStudios />
      <Categories />
      <HowItWorks />
    </>
  );
}
