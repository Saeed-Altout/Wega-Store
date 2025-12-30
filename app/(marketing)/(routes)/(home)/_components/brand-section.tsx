"use client";
import Image from "next/image";
import Link from "next/link";

import { Marquee } from "@/components/ui/marquee";

const brands = [
  {
    name: "calvin",
    imageUrl: "/icons/calvin.svg",
    href: "/",
  },
  {
    name: "chanel",
    imageUrl: "/icons/chanel.svg",
    href: "/",
  },
  {
    name: "denim",
    imageUrl: "/icons/denim.svg",
    href: "/",
  },
  {
    name: "louis",
    imageUrl: "/icons/louis.svg",
    href: "/",
  },
  {
    name: "prada",
    imageUrl: "/icons/prada.svg",
    href: "/",
  },
];

export function BrandSection() {
  return (
    <section className="py-10" id="brands-section">
      <div className="relative flex w-full flex-col items-center justify-center gap-1 overflow-hidden py-8">
        <Marquee pauseOnHover repeat={3}>
          {brands.map((brand) => (
            <Link key={brand.name} href={brand.href}>
              <Image
                src={brand.imageUrl}
                alt={`brand-${brand.name}`}
                width={150}
                height={150}
              />
            </Link>
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-linear-to-r from-background/95 to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-linear-to-l from-background/95 to-transparent"></div>
        <div className="pointer-events-none absolute top-0 left-0 w-full h-12 bg-linear-to-b from-background/90 to-transparent"></div>
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-background/90 to-transparent"></div>
      </div>
    </section>
  );
}
