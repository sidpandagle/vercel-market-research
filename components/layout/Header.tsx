"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Navigation from "./Navigation";
import GoogleTranslate from "./GoogleTranslate";
import { SearchBar } from "@/components/ui";

export default function Header() {
  const pathname = usePathname();
  const isNotReportPage = !pathname.includes("/reports/");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className={`${isNotReportPage ? 'container mx-auto' : ''} flex h-16 items-center justify-between px-4 md:px-6 gap-2 md:gap-4 w-full`}>
        <Link href="/" className="flex items-center group flex-shrink-0">
          <Image
            src="/assets/images/logo.png"
            alt="Healthcare Foresights - Predict. Research. Intelligence"
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
        <div className="ml-2 pl-2 border-l border-slate-200">
          <GoogleTranslate />
        </div>

        {/* Social Media Links - Desktop Only */}
        <div className="hidden lg:flex items-center gap-3 ml-4 pl-4 border-l border-slate-200">
          <Link
            href="https://facebook.com/healthcareforesights"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-ocean-600 transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="w-4 h-4" />
          </Link>
          <Link
            href="https://instagram.com/healthcareforesights"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-ocean-600 transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </Link>
          <Link
            href="https://linkedin.com/company/healthcareforesights"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-ocean-600 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </Link>
          <Link
            href="https://twitter.com/healthcareforesights"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-ocean-600 transition-colors"
            aria-label="X (Twitter)"
          >
            <Twitter className="w-4 h-4" />
          </Link>
        </div>
        </div>

      </div>
    </header>
  );
}
