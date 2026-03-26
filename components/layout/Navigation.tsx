"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
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
];

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const consultingServices = consultingServicesData as ConsultingService[];

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
      <nav className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors whitespace-nowrap relative pb-0.5",
              "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-bright-500 after:transition-all after:duration-200",
              pathname === item.href
                ? "text-[var(--primary)] after:w-full"
                : "text-[var(--muted-foreground)] after:w-0 hover:text-[var(--primary)] hover:after:w-full"
            )}
          >
            {item.name}
          </Link>
        ))}

        <MegaMenu
          categories={categories}
          isActive={pathname.startsWith("/reports")}
        />
        <ConsultingMenu
          services={consultingServices}
          isActive={pathname.startsWith("/consulting")}
        />

        <Link
          href="/about"
          className={cn(
            "text-sm font-medium transition-colors whitespace-nowrap relative pb-0.5",
            "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-bright-500 after:transition-all after:duration-200",
            pathname === "/about"
              ? "text-[var(--primary)] after:w-full"
              : "text-[var(--muted-foreground)] after:w-0 hover:text-[var(--primary)] hover:after:w-full"
          )}
        >
          About Us
        </Link>

        <Link
          href="/contact"
          className={cn(
            "text-sm font-medium transition-colors whitespace-nowrap relative pb-0.5",
            "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-bright-500 after:transition-all after:duration-200",
            pathname === "/contact"
              ? "text-[var(--primary)] after:w-full"
              : "text-[var(--muted-foreground)] after:w-0 hover:text-[var(--primary)] hover:after:w-full"
          )}
        >
          Contact
        </Link>

      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-stone-200 hover:border-ocean-600 hover:bg-stone-50 transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileMenuOpen}
      >
        <div className="relative w-4 h-4">
          <span
            className={cn(
              "absolute left-0 h-0.5 bg-ocean-700 transition-all duration-300",
              isMobileMenuOpen
                ? "w-4 top-1/2 -translate-y-1/2 rotate-45"
                : "w-4 top-0.5"
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-ocean-700 transition-all duration-300",
              isMobileMenuOpen ? "w-0 opacity-0" : "w-3 opacity-100"
            )}
          />
          <span
            className={cn(
              "absolute left-0 h-0.5 bg-ocean-700 transition-all duration-300",
              isMobileMenuOpen
                ? "w-4 top-1/2 -translate-y-1/2 -rotate-45"
                : "w-4 bottom-0.5"
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
          "fixed top-[62px] right-0 h-[calc(100vh-62px)] w-72 z-50 md:hidden",
          "bg-navy-950 shadow-2xl",
          "transform transition-transform duration-300 ease-out",
          "overflow-y-auto"
        )}
        style={{ transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        <nav className="flex flex-col p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "py-3 px-4 text-base font-medium rounded-lg transition-colors",
                "hover:bg-white/10",
                pathname === item.href
                  ? "text-bright-400"
                  : "text-stone-300"
              )}
            >
              {item.name}
            </Link>
          ))}

          <Link
            href="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              "py-3 px-4 text-base font-medium rounded-lg transition-colors",
              "hover:bg-white/10",
              pathname === "/about"
                ? "text-bright-400"
                : "text-stone-300"
            )}
          >
            About Us
          </Link>

          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              "py-3 px-4 text-base font-medium rounded-lg transition-colors",
              "hover:bg-white/10",
              pathname === "/contact"
                ? "text-bright-400"
                : "text-stone-300"
            )}
          >
            Contact
          </Link>

          {/* Consulting Section in Mobile */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <span className="px-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Consulting &amp; Services
            </span>
            <div className="mt-2 flex flex-col">
              <Link
                href="/services"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "py-2 px-4 text-sm font-medium rounded-lg transition-colors hover:bg-white/10",
                  pathname === "/services"
                    ? "text-bright-400"
                    : "text-stone-300"
                )}
              >
                All Services
              </Link>
              {consultingServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/consulting/${service.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 px-4 text-sm text-stone-400 rounded-lg hover:bg-white/10 hover:text-stone-200 transition-colors"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Reports Section in Mobile */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <span className="px-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Reports
            </span>
            <div className="mt-2 flex flex-col">
              <Link
                href="/reports"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "py-3 px-4 text-base font-medium rounded-lg transition-colors",
                  "hover:bg-white/10",
                  pathname === "/reports"
                    ? "text-bright-400"
                    : "text-stone-300"
                )}
              >
                All Reports
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/reports?category=${category.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 px-4 text-sm text-stone-400 rounded-lg hover:bg-white/10 hover:text-stone-200 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mt-6 pt-6 px-4 border-t border-white/10">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Follow Us
            </span>
            <div className="mt-3 flex gap-4">
              <Link
                href="https://facebook.com/neographanalytics"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-bright-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://instagram.com/neographanalytics"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-bright-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com/company/neographanalytics"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-bright-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://twitter.com/neographanalytics"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-bright-400 transition-colors"
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
