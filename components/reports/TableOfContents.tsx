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

        {onShowFullTOC && (
          <button
            onClick={onShowFullTOC}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-[var(--foreground)] bg-[var(--card)] border border-[var(--border)] rounded-md hover:bg-[var(--muted)] transition-colors duration-200 flex-shrink-0"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            Table of Contents
          </button>
        )}
      </div>
    </nav>
  );
};
