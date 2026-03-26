"use client";

import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/90 shadow-[0_2px_20px_0_rgba(15,23,42,0.08)] border-b border-stone-100" style={{ borderTop: '2px solid #38BDF8' }}>
      <div className={`container mx-auto flex h-[60px] items-center justify-between px-4 md:px-6 gap-2 md:gap-4 w-full`}>
        <Logo variant="dark" />

        <div className="flex items-center ml-auto">
          <Navigation />
        </div>

      </div>
    </header>
  );
}
