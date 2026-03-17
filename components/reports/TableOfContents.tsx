'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { SidebarTOCItem } from '@/lib/toc-utils';

interface TableOfContentsProps {
  items: SidebarTOCItem[];
  className?: string;
  onShowFullTOC?: () => void;
  showFullTOC?: boolean;
  onNavigateToSection?: (sectionId: string) => void;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  className,
  onShowFullTOC,
  showFullTOC,
  onNavigateToSection,
}) => {
  const [activeId, setActiveId] = useState<string>('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -66%',
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [items]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const item = activeItemRef.current;
    if (!container || !item) return;

    const containerTop = container.scrollTop;
    const containerBottom = containerTop + container.clientHeight;
    const itemTop = item.offsetTop;
    const itemBottom = itemTop + item.offsetHeight;

    if (itemTop < containerTop || itemBottom > containerBottom) {
      container.scrollTo({
        top: itemTop - container.clientHeight / 2 + item.offsetHeight / 2,
        behavior: 'smooth',
      });
    }
  }, [activeId]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();

    if (showFullTOC && onNavigateToSection) {
      // Full TOC is open: trigger close + scroll sequence
      onNavigateToSection(id);
    } else {
      // Normal behavior: scroll immediately
      const element = document.getElementById(id);
      if (element) {
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <nav
      className={cn(
        'flex flex-col max-h-[calc(100vh-8rem)]',
        className
      )}
    >
      <div className="flex flex-col flex-1 min-h-0">
        {onShowFullTOC && (
          <button
            onClick={onShowFullTOC}
            className="mb-5 w-full group relative flex-shrink-0 overflow-hidden rounded-lg active:scale-[0.985] transition-all duration-200"
            style={{ boxShadow: '0 4px 14px 0 rgba(37,99,163,0.28)' }}
          >
            {/* Ocean-navy gradient base — matches site's --gradient-primary */}
            <div className="relative flex items-center gap-3 px-4 py-3.5 bg-gradient-to-br from-[#0F2D52] via-[#2563A3] to-[#3B7CB8] rounded-lg">
              {/* Bright-cyan inner highlight edge at top */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/50 to-transparent" />
              {/* Shine sweep on hover */}
              <div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/[0.09] to-transparent pointer-events-none"
                style={{ transition: 'transform 0.7s ease' }}
              />
              {/* Icon — cyan accent */}
              <svg
                className="w-4 h-4 text-[#00D4FF] flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 11h16M4 16h10" />
              </svg>
              {/* Label */}
              <span className="text-white text-[12px] font-semibold uppercase tracking-[0.1em] leading-none">
                Table of Contents
              </span>
              {/* Chevron — lights up cyan on hover */}
              <svg
                className="w-3.5 h-3.5 text-white/40 ml-auto flex-shrink-0 group-hover:text-[#00D4FF] group-hover:translate-x-0.5 transition-all duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        )}
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4 uppercase tracking-wide flex-shrink-0">
          Report Details
        </h3>
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto pb-4">
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                ref={activeId === item.id ? activeItemRef : null}
                className={cn(
                  'transition-all duration-200'
                )}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={cn(
                    'block py-3 px-4 border-l-4 transition-all duration-200 rounded-md',
                    'bg-white hover:bg-gray-50',
                    'shadow-sm hover:shadow-md',
                    activeId === item.id
                      ? 'border-[#8b5cf6] text-[var(--foreground)] font-medium bg-[#f3e9ff]'
                      : 'border-[#e9d5ff] text-[var(--foreground)] hover:border-[#c084fc]'
                  )}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
