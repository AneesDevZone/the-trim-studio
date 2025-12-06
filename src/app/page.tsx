// This is a Next.js Server Component.
// It will render on the server for best performance and SEO.
import Hero from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Booking } from "@/components/sections/Booking";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <Booking />
    </main>
  );
}