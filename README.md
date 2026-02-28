"# Synaptic Research

A modern, enterprise-grade healthcare research platform built with the latest web technologies.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with improved performance
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 3** - Utility-first CSS framework
- **Turbopack** - Ultra-fast bundler for development

## Features

- Clean, scalable architecture with App Router
- Server-side rendering and static generation
- Responsive design with Tailwind CSS
- Type-safe codebase with TypeScript
- Optimized fonts with next/font
- SEO-friendly with metadata API
- Fast development with Turbopack

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── reports/           # Reports section
│   │   ├── page.tsx       # Reports listing
│   │   └── [slug]/        # Individual report pages
│   ├── blog/              # Blog section
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── layout/           # Layout components (Header, Footer, Navigation)
│   ├── cards/            # Card components
│   └── ui/               # UI components
├── data/                 # JSON data files
│   ├── reports.json      # Reports data
│   ├── blogs.json        # Blog posts data
│   └── categories.json   # Categories data
└── lib/                  # Utility functions
    └── utils.ts          # Common utilities
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Development

The project uses:
- **App Router** for file-based routing
- **Server Components** by default for better performance
- **CSS Variables** for theming support
- **Geist fonts** optimized with next/font

## License

MIT" 
