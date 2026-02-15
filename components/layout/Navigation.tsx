"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Linkedin, Twitter, ChevronDown } from "lucide-react";
import categories from "@/data/categories.json";
import consultingServicesData from "@/data/consulting-services.json";
import MegaMenu from "./MegaMenu";
import ConsultingMenu from "./ConsultingMenu";
import { cn } from "@/lib/utils";
import { ConsultingService } from "@/lib/api/consulting.types";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Press Releases", href: "/press-releases" },
  { name: "Services", href: "/services" },
];

const aboutDropdownItems = [
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/legal/privacy-policy" },
  { name: "Refund Policy", href: "/legal/refund-policy" },
  { name: "Cancellation Policy", href: "/legal/cancellation-policy" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const consultingServices = consultingServicesData as ConsultingService[];

  // Close about dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setIsAboutOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm font-medium transition-colors hover:text-[var(--primary)] whitespace-nowrap ${
              pathname === item.href
                ? "text-[var(--primary)]"
                : "text-[var(--muted-foreground)]"
            }`}
          >
            {item.name}
          </Link>
        ))}

        {/* About Dropdown */}
        <div className="relative" ref={aboutRef}>
          <button
            onClick={() => setIsAboutOpen(!isAboutOpen)}
            className={cn(
              "flex items-center gap-1 text-sm font-medium transition-colors hover:text-[var(--primary)] whitespace-nowrap",
              aboutDropdownItems.some((i) => pathname === i.href)
                ? "text-[var(--primary)]"
                : "text-[var(--muted-foreground)]"
            )}
          >
            About
            <ChevronDown
              className={cn(
                "w-3.5 h-3.5 transition-transform duration-200",
                isAboutOpen && "rotate-180"
              )}
            />
          </button>
          {isAboutOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
              {aboutDropdownItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsAboutOpen(false)}
                  className={cn(
                    "block px-4 py-2 text-sm transition-colors hover:bg-slate-50 hover:text-[var(--primary)]",
                    pathname === item.href
                      ? "text-[var(--primary)] bg-slate-50"
                      : "text-slate-700"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <ConsultingMenu
          services={consultingServices}
          isActive={pathname.startsWith("/consulting")}
        />
        <MegaMenu
          categories={categories}
          isActive={pathname.startsWith("/reports")}
        />
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileMenuOpen}
      >
        <div className="relative w-5 h-5">
          <span
            className={cn(
              "absolute left-0 w-5 h-0.5 bg-slate-700 transition-all duration-300",
              isMobileMenuOpen
                ? "top-1/2 -translate-y-1/2 rotate-45"
                : "top-1"
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 w-5 h-0.5 bg-slate-700 transition-all duration-300",
              isMobileMenuOpen ? "opacity-0" : "opacity-100"
            )}
          />
          <span
            className={cn(
              "absolute left-0 w-5 h-0.5 bg-slate-700 transition-all duration-300",
              isMobileMenuOpen
                ? "top-1/2 -translate-y-1/2 -rotate-45"
                : "bottom-1"
            )}
          />
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          "fixed top-16 right-0 h-[calc(100vh-4rem)] w-72 bg-white z-50 md:hidden",
          "border-l border-slate-200 shadow-xl",
          "transform transition-transform duration-300 ease-out",
          "overflow-y-auto",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "py-3 px-4 text-base font-medium rounded-lg transition-colors",
                "hover:bg-slate-100",
                pathname === item.href
                  ? "text-[var(--primary)] bg-slate-50"
                  : "text-slate-700"
              )}
            >
              {item.name}
            </Link>
          ))}

          {/* About Section in Mobile */}
          <div>
            <button
              onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
              className={cn(
                "w-full flex items-center justify-between py-3 px-4 text-base font-medium rounded-lg transition-colors hover:bg-slate-100",
                aboutDropdownItems.some((i) => pathname === i.href)
                  ? "text-[var(--primary)] bg-slate-50"
                  : "text-slate-700"
              )}
            >
              About
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  isMobileAboutOpen && "rotate-180"
                )}
              />
            </button>
            {isMobileAboutOpen && (
              <div className="flex flex-col pl-4">
                {aboutDropdownItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "py-2 px-4 text-sm rounded-lg transition-colors hover:bg-slate-100",
                      pathname === item.href
                        ? "text-[var(--primary)] bg-slate-50"
                        : "text-slate-600"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Consulting Section in Mobile */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <span className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Consulting
            </span>
            <div className="mt-2 flex flex-col">
              {consultingServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/consulting/${service.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 px-4 text-sm text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Reports Section in Mobile */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <span className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Reports
            </span>
            <div className="mt-2 flex flex-col">
              <Link
                href="/reports"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "py-3 px-4 text-base font-medium rounded-lg transition-colors",
                  "hover:bg-slate-100",
                  pathname === "/reports"
                    ? "text-[var(--primary)] bg-slate-50"
                    : "text-slate-700"
                )}
              >
                All Reports
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/reports?category=${category.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 px-4 text-sm text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Request Sample CTA */}
          <div className="mt-6 px-4">
            <Link
              href="/request-sample"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full py-3 px-4 text-center text-white font-medium bg-gradient-to-r from-navy-800 to-ocean-600 rounded-lg hover:from-navy-700 hover:to-ocean-500 transition-all shadow-md"
            >
              Request Sample
            </Link>
          </div>

          {/* Social Media Links */}
          <div className="mt-6 pt-6 px-4 border-t border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Follow Us
            </span>
            <div className="mt-3 flex gap-4">
              <Link
                href="https://facebook.com/healthcareforesights"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-ocean-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://instagram.com/healthcareforesights"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-ocean-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com/company/healthcareforesights"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-ocean-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://twitter.com/healthcareforesights"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-ocean-600 transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
