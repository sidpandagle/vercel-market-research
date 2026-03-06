"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

interface MegaMenuProps {
  categories: Category[];
  isActive: boolean;
}

export default function MegaMenu({ categories, isActive }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Event handlers
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsOpen(true), 150);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      triggerRef.current?.focus();
    } else if (
      (e.key === "Enter" || e.key === " ") &&
      e.target === triggerRef.current
    ) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      className="relative"
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        className={cn(
          "text-sm font-medium transition-colors",
          "hover:text-[var(--primary)]",
          "flex items-center gap-1 cursor-pointer",
          isActive
            ? "text-[var(--primary)]"
            : "text-[var(--muted-foreground)]"
        )}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Browse reports by category"
      >
        Reports
        <svg
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Backdrop Overlay - only on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 top-[64px]"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mega Menu Panel */}
      <div
        className={cn(
          "fixed left-0 right-0 z-50",
          // Mobile: full height with scroll, Desktop: auto height
          "lg:top-[64px]",
          "bg-[var(--background)] border-t border-[var(--border)] shadow-lg bg-[var(--card)]",
          "transition-all duration-300 ease-out",
          // Mobile-specific scrolling styles
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2 pointer-events-none"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="menu"
        aria-label="Report categories"
        aria-hidden={!isOpen}
        style={{
          // Ensure menu doesn't overflow on mobile
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6 max-w-7xl mx-auto">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/industry/${category.slug}`}
              onClick={() => setIsOpen(false)}
              className={cn(
                "group block p-4 rounded-lg",
                "border border-[var(--border)] bg-[var(--card)]",
                "hover:border-[var(--primary)] hover:shadow-md",
                "transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-[var(--primary)]",
                // Ensure proper touch target size on mobile
                "min-h-[80px]"
              )}
              role="menuitem"
              tabIndex={isOpen ? 0 : -1}
            >
              <h3 className="font-semibold text-base mb-2 text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-[var(--muted-foreground)] line-clamp-2">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
