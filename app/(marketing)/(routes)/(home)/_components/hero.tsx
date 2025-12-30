import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section id="hero-section" className="pt-5">
      <Container>
        <div className="md:h-[600px] flex flex-col md:flex-row gap-6 justify-between py-10">
          <div className="h-full max-w-lg flex flex-col gap-2 md:gap-4 justify-center items-start">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Style That <span className="underline">Moves</span> With You
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-10">
              Nike designs that combine athletic performance with modern street
              style — on and off the track.
            </p>
            <Button size="lg" className="rounded-full px-8" asChild>
              <Link href="/products">
                <ArrowRightIcon />
                Shope Now
              </Link>
            </Button>
          </div>
          <div className="relative h-full flex items-center justify-center">
            <Image
              src="/images/hero.png"
              alt="Hero"
              className="object-contain size-full"
              width={600}
              height={600}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
