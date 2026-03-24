import Link from 'next/link';
import type { Blog } from '@/lib/api/blogs.types';
import type { PressRelease } from '@/lib/api/press-releases.types';

interface IndustryContentPreviewProps {
  blogs: Blog[];
  pressReleases: PressRelease[];
}

function formatCardDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  } catch { /* fallback */ }
  return dateStr || '';
}

function BlogPreviewCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group block h-full">
      <article className="relative h-full bg-white rounded-xl border border-slate-200 overflow-hidden
        transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/60 hover:border-slate-300 hover:-translate-y-0.5">
        {/* Top accent line */}
        <div className="h-[3px] bg-gradient-to-r from-[#2563A3] to-[#60a5fa]" />

        <div className="p-5 flex flex-col h-[calc(100%-3px)]">
          {/* Category + Date row */}
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#2563A3] bg-blue-50 px-2.5 py-1 rounded-md">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              {blog.category}
            </span>
            <time className="text-[11px] text-slate-400 font-medium">
              {formatCardDate(blog.date)}
            </time>
          </div>

          {/* Title */}
          <h3 className="text-[15px] font-bold text-slate-800 leading-snug line-clamp-2 mb-2
            group-hover:text-[#2563A3] transition-colors duration-200">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-2 mb-4 flex-1">
            {blog.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2563A3] to-[#1B4B7F] flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-white">
                  {blog.author?.charAt(0)?.toUpperCase() || 'A'}
                </span>
              </div>
              <span className="text-xs text-slate-600 font-medium truncate">{blog.author}</span>
            </div>

            <span className="text-xs font-semibold text-[#2563A3] flex items-center gap-1 shrink-0
              opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0
              transition-all duration-200">
              Read
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function PressReleasePreviewCard({ pressRelease }: { pressRelease: PressRelease }) {
  return (
    <Link href={`/press-release/${pressRelease.slug}`} className="group block h-full">
      <article className="relative h-full bg-white rounded-xl border border-slate-200 overflow-hidden
        transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/60 hover:border-slate-300 hover:-translate-y-0.5">
        {/* Top accent line */}
        <div className="h-[3px] bg-gradient-to-r from-[#0F2D52] to-[#2563A3]" />

        <div className="p-5 flex flex-col h-[calc(100%-3px)]">
          {/* Category + Date row */}
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#1B4B7F] bg-slate-100 px-2.5 py-1 rounded-md">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5" />
              </svg>
              {pressRelease.category}
            </span>
            <time className="text-[11px] text-slate-400 font-medium">
              {formatCardDate(pressRelease.date)}
            </time>
          </div>

          {/* Title */}
          <h3 className="text-[15px] font-bold text-slate-800 leading-snug line-clamp-2 mb-2
            group-hover:text-[#1B4B7F] transition-colors duration-200">
            {pressRelease.title}
          </h3>

          {/* Excerpt */}
          <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-2 mb-4 flex-1">
            {pressRelease.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#0F2D52] to-[#1B4B7F] flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-white">
                  {pressRelease.author?.charAt(0)?.toUpperCase() || 'A'}
                </span>
              </div>
              <span className="text-xs text-slate-600 font-medium truncate">{pressRelease.author}</span>
            </div>

            <span className="text-xs font-semibold text-[#1B4B7F] flex items-center gap-1 shrink-0
              opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0
              transition-all duration-200">
              Read
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function IndustryContentPreview({
  blogs,
  pressReleases,
}: IndustryContentPreviewProps) {
  if (blogs.length === 0 && pressReleases.length === 0) {
    return null;
  }

  return (
    <section className="bg-gradient-to-b from-slate-50/80 to-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Latest Blogs */}
        {blogs.length > 0 && (
          <div className={pressReleases.length > 0 ? 'mb-8' : ''}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#2563A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <h2 className="text-base font-bold text-slate-900">Latest Blogs</h2>
              </div>
              <Link
                href="/blogs"
                className="text-xs font-semibold text-[#2563A3] hover:text-[#1B4B7F] flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all"
              >
                View All
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {blogs.map((blog) => (
                <BlogPreviewCard key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
        )}

        {/* Latest Press Releases */}
        {pressReleases.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#1B4B7F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5" />
                  </svg>
                </div>
                <h2 className="text-base font-bold text-slate-900">Latest Press Releases</h2>
              </div>
              <Link
                href="/press-releases"
                className="text-xs font-semibold text-[#1B4B7F] hover:text-[#0F2D52] flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-all"
              >
                View All
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {pressReleases.map((pr) => (
                <PressReleasePreviewCard key={pr.id} pressRelease={pr} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
