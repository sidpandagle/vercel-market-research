import { SidebarTOCItem } from './toc-utils';

/**
 * Decode HTML entities in a string
 */
function decodeHTMLEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' ',
    '&apos;': "'",
  };

  return text.replace(/&[^;]+;/g, (entity) => entities[entity] || entity);
}

/**
 * Slugify a string to create URL-safe IDs
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Parse HTML content and extract headings to generate TOC
 * Also adds IDs to headings in the HTML if they don't have one
 */
export function parseHTMLAndGenerateTOC(htmlContent: string): {
  toc: SidebarTOCItem[];
  htmlWithIds: string;
} {
  if (!htmlContent) {
    return { toc: [], htmlWithIds: htmlContent };
  }

  const toc: SidebarTOCItem[] = [];
  const idCounts = new Map<string, number>();

  // Regex to match h2 and h3 tags with their content
  const headingRegex = /<(h[23])(\s+[^>]*)?>(.*?)<\/\1>/gi;

  let modifiedHtml = htmlContent;
  let match;

  // Reset regex index
  headingRegex.lastIndex = 0;

  while ((match = headingRegex.exec(htmlContent)) !== null) {
    const [fullMatch, tag, attributes = '', content] = match;
    const level = parseInt(tag.substring(1)); // 'h2' -> 2, 'h3' -> 3

    // Remove HTML tags from content to get plain text and decode HTML entities
    const text = decodeHTMLEntities(content.replace(/<[^>]+>/g, '').trim());

    if (!text) continue;

    // Check if ID already exists in attributes
    const existingIdMatch = attributes.match(/id=["']([^"']+)["']/);
    let id: string;

    if (existingIdMatch) {
      id = existingIdMatch[1];
    } else {
      // Generate unique ID
      const baseId = slugify(text);
      const count = idCounts.get(baseId) || 0;
      id = count > 0 ? `${baseId}-${count}` : baseId;
      idCounts.set(baseId, count + 1);

      // Add ID and scroll-mt-24 class to the heading
      const newAttributes = attributes.trim()
        ? `${attributes} id="${id}" class="scroll-mt-24"`
        : ` id="${id}" class="scroll-mt-24"`;

      const newHeading = `<${tag}${newAttributes}>${content}</${tag}>`;
      modifiedHtml = modifiedHtml.replace(fullMatch, newHeading);
    }

    toc.push({
      id,
      title: text,
      level,
    });
  }

  return {
    toc,
    htmlWithIds: modifiedHtml,
  };
}

/**
 * Add static section items to TOC (like Meet the Team, FAQ)
 */
export function addStaticSectionsToTOC(
  toc: SidebarTOCItem[],
  hasTeam: boolean,
  hasFAQ: boolean
): SidebarTOCItem[] {
  const result = [...toc];

  if (hasTeam) {
    result.push({
      id: 'meet-the-team',
      title: 'Meet the Team',
      level: 2,
    });
  }

  if (hasFAQ) {
    result.push({
      id: 'faq',
      title: 'Frequently Asked Questions',
      level: 2,
    });
  }

  return result;
}
