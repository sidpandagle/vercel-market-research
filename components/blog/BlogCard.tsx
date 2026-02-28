import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  location?: string;
}

export function BlogCard({
  slug,
  title,
  excerpt,
  category,
  author,
  date,
  readTime,
  location,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group flex flex-col h-full">
      <div className="flex flex-col h-full bg-white border border-slate-100 rounded-2xl overflow-hidden hover:border-ocean-200 hover:shadow-xl hover:shadow-ocean-50 hover:-translate-y-0.5 transition-all duration-200">
        {/* Accent stripe */}
        <div className="h-[3px] bg-ocean-600 shrink-0" />

        <div className="flex flex-col flex-1 p-6">
          {/* Category badge */}
          <div className="mb-4">
            <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-ocean-50 text-ocean-700 border border-ocean-100">
              {category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-slate-900 group-hover:text-ocean-700 transition-colors line-clamp-2 leading-snug mb-3">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-slate-500 line-clamp-3 flex-1 leading-relaxed">
            {excerpt}
          </p>

          {/* Footer */}
          <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-700 truncate">{author}</p>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                <span>{readTime}</span>
                <span>·</span>
                <time>{date}</time>
                {location && (
                  <>
                    <span>·</span>
                    <span className="truncate">{location}</span>
                  </>
                )}
              </div>
            </div>
            <span className="text-ocean-600 shrink-0">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
