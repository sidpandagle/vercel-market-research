"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Navigation from "./Navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/90 shadow-[0_2px_20px_0_rgba(9,28,21,0.08)] border-b border-stone-100" style={{ borderTop: '2px solid #84CC16' }}>
      <div className={`container mx-auto flex h-[60px] items-center justify-between px-4 md:px-6 gap-2 md:gap-4 w-full`}>
        <Link href="/" className="flex items-center group flex-shrink-0">
          <Image
            src="/assets/images/logo.png"
            alt="Synaptic Research - Research. Insights. Intelligence."
            width={160}
            height={44}
            priority
            className="h-8 w-auto md:h-9 transition-opacity duration-200 group-hover:opacity-80"
          />
        </Link>

        <div className="flex items-center ml-auto">
          <Navigation />
        </div>

      </div>
    </header>
  );
}
