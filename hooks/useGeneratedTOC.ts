import { useEffect, useState, useMemo } from 'react';
import { SidebarTOCItem } from '@/lib/toc-utils';

// Default heading levels array - defined outside to maintain stable reference
const DEFAULT_HEADING_LEVELS = ['h2', 'h3'];

/**
 * Custom hook to automatically generate a Table of Contents from headings in the DOM
 * Supports h2, h3, and h4 headings and uses MutationObserver to detect dynamically added content
 * @param containerSelector - CSS selector for the container element (default: 'article')
 * @param headingLevels - Array of heading levels to include (default: ['h2', 'h3', 'h4'])
 * @returns Array of SidebarTOCItem extracted from headings
 */
export function useGeneratedTOC(
  containerSelector: string = 'article',
  headingLevels?: string[]
): SidebarTOCItem[] {
  const [tocItems, setTocItems] = useState<SidebarTOCItem[]>([]);

  // Use stable reference for heading levels
  const levels = headingLevels || DEFAULT_HEADING_LEVELS;

  // Create a stable key from levels array to use in dependency array
  const levelsKey = useMemo(() => levels.join(','), [levels]);

  useEffect(() => {
    // Function to generate a URL-safe ID from heading text
    const generateId = (text: string): string => {
      return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    };

    // Store observer reference so we can disconnect/reconnect when making changes
    let observer: MutationObserver | null = null;

    // Function to extract TOC items from the container
    const extractTOCItems = (): SidebarTOCItem[] => {
      const container = document.querySelector(containerSelector);
      if (!container) {
        return [];
      }

      // Temporarily disconnect observer to prevent loops when we set IDs
      if (observer) {
        observer.disconnect();
      }

      // Find all specified heading elements within the container
      const headingSelector = levels.join(', ');
      const headings = container.querySelectorAll(headingSelector);
      const items: SidebarTOCItem[] = [];

      headings.forEach((heading) => {
        const text = heading.textContent?.trim() || '';
        if (!text) return; // Skip empty headings

        // Get heading level (2 for h2, 3 for h3, etc.)
        const tagName = heading.tagName.toLowerCase();
        const level = parseInt(tagName.substring(1), 10);

        // Get existing ID or generate one
        let id = heading.id;
        if (!id) {
          id = generateId(text);
          heading.id = id; // Set the ID on the heading element
        }

        items.push({
          id,
          title: text,
          level,
        });
      });

      // Reconnect observer after we're done making changes
      if (observer) {
        observer.observe(container, {
          childList: true,
          subtree: true,
        });
      }

      return items;
    };

    // Initial extraction
    const initialItems = extractTOCItems();
    setTocItems(initialItems);

    // Set up MutationObserver to watch for dynamically added content
    const container = document.querySelector(containerSelector);
    if (!container) {
      return;
    }

    observer = new MutationObserver((mutations) => {
      // Check if any mutations added heading elements
      let shouldUpdate = false;

      for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Check if any added nodes contain headings
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              const headingSelector = levels.join(', ');

              // Check if the node itself is a heading or contains headings
              if (
                levels.includes(element.tagName.toLowerCase()) ||
                element.querySelector(headingSelector)
              ) {
                shouldUpdate = true;
              }
            }
          });
        }
      }

      if (shouldUpdate) {
        // Re-extract TOC items after a short delay to ensure DOM is settled
        setTimeout(() => {
          const updatedItems = extractTOCItems();
          setTocItems(updatedItems);
        }, 100);
      }
    });

    // Start observing the container for changes
    observer.observe(container, {
      childList: true,
      subtree: true,
    });

    // Cleanup observer on unmount
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [containerSelector, levelsKey]);

  return tocItems;
}
