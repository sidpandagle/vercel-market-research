"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ConsultingService, ServiceCategory } from "@/lib/api/consulting.types";

interface ConsultingMenuProps {
  services: ConsultingService[];
  isActive: boolean;
}

export default function ConsultingMenu({ services, isActive }: ConsultingMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Group services by category
  const servicesByCategory = services.reduce((acc, service) => {
    const category = service.category as ServiceCategory;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  }, {} as Record<ServiceCategory, ConsultingService[]>);

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
          "flex items-center gap-1 cursor-pointer whitespace-nowrap",
          isActive
            ? "text-[var(--primary)]"
            : "text-[var(--muted-foreground)]"
        )}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Browse services"
      >
        Consulting
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
          "lg:top-[64px]",
          "bg-[var(--background)] border-t border-[var(--border)] shadow-lg bg-[var(--card)]",
          "transition-all duration-300 ease-out",
          "max-h-[calc(100vh-64px)] overflow-y-auto",
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2 pointer-events-none"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="menu"
        aria-label="Services"
        aria-hidden={!isOpen}
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className="p-6 max-w-7xl mx-auto">
          {/* Services overview link */}
          <div className="mb-5 pb-4 border-b border-[var(--border)]">
            <Link
              href="/services"
              onClick={() => setIsOpen(false)}
              className={cn(
                "inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]",
                "hover:underline underline-offset-4"
              )}
              role="menuitem"
              tabIndex={isOpen ? 0 : -1}
            >
              View All Services
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Services by Category */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
              <div key={category} className="space-y-3">
                <h3 className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">
                  {category}
                </h3>
                <div className="space-y-2">
                  {categoryServices.map((service) => (
                    <Link
                      key={service.id}
                      href={`/consulting/${service.slug}`}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block p-3 rounded-lg",
                        "border border-transparent",
                        "hover:border-[var(--primary)] hover:bg-[var(--muted)]",
                        "transition-all duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      )}
                      role="menuitem"
                      tabIndex={isOpen ? 0 : -1}
                    >
                      <h4 className="font-medium text-sm text-[var(--foreground)] mb-1">
                        {service.title}
                      </h4>
                      <p className="text-xs text-[var(--muted-foreground)] line-clamp-2">
                        {service.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
