"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import GoogleTranslate from "./GoogleTranslate";
import { SearchBar } from "@/components/ui";

export default function Header() {
  const pathname = usePathname();
  const isNotReportPage = !pathname.includes("/reports/");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/85 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 shadow-[0_1px_12px_0_rgba(15,14,26,0.06)]">
      <div className={`${isNotReportPage ? 'container mx-auto' : ''} flex h-16 items-center justify-between px-4 md:px-6 gap-2 md:gap-4 w-full`}>
        <Link href="/" className="flex items-center group flex-shrink-0">
          <Image
            src="/assets/images/logo.png"
            alt="Synaptic Research - Research. Insights. Intelligence."
            width={180}
            height={50}
            priority
            className="h-10 w-auto md:h-10 transform group-hover:scale-105 transition-transform duration-200"
          />
        </Link>

        {/* Search Bar - Only show on non-homepage */}
        {(
          <div className="hidden lg:flex flex-1 max-w-md mx-4 min-w-0">
            <SearchBar
              variant="header"
              placeholder="Search reports..."
              className="w-full"
            />
          </div>
        )}

        <div className="flex items-center">
        <Navigation />

        {/* Language Selector */}
        <div className="ml-2 pl-2 border-l border-stone-200">
          <GoogleTranslate />
        </div>

</div>

      </div>
    </header>
  );
}
