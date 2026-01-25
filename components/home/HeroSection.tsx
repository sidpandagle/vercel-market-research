import Link from 'next/link';
import { Section, Container, Button, SearchBar, Badge } from '@/components/ui';

export default function HeroSection() {
  return (
    <Section padding="xl" className="relative">
      {/* Advanced gradient mesh background - Full section coverage */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        {/* Gradient orbs with mesh effect - Optimized with will-change and reduced blur */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-ocean-500/30 via-bright-400/20 to-transparent rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-float motion-reduce:animate-none [will-change:transform]"></div>
        <div className="absolute top-20 -right-40 w-[600px] h-[600px] bg-gradient-to-bl from-bright-500/30 via-ocean-400/20 to-transparent rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-float motion-reduce:animate-none [will-change:transform]" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] bg-gradient-to-tr from-navy-500/20 via-ocean-300/15 to-transparent rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-float motion-reduce:animate-none [will-change:transform]" style={{ animationDelay: '4s' }}></div>
      </div>

      <Container size="lg" className="relative">
        <div className="flex flex-col items-center text-center space-y-8 relative z-10">
          {/* Floating badge */}
          <div className="animate-fadeIn motion-reduce:animate-none motion-reduce:animate-none flex items-center gap-2">
            <Badge variant="outline" className="backdrop-blur-sm bg-white/50 border-ocean-200 text-navy-800 px-4 py-1.5 shadow-sm hover:shadow-md transition-shadow">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-ocean-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-ocean-500"></span>
              </span>
              Trusted by 500+ Healthcare Leaders
            </Badge>
          </div>

          {/* Main headline with modern typography */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 animate-fadeIn motion-reduce:animate-none motion-reduce:animate-none leading-[1.1]" style={{ animationDelay: '0.05s' }}>
            Transform Healthcare
            <br />
            <span className="relative inline-block mt-2">
              <span className="bg-gradient-to-r from-navy-900 via-ocean-600 to-bright-500 bg-clip-text text-transparent">
                Decisions with AI
              </span>
              {/* Underline decoration */}
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 500 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10C150 2.5 350 2.5 498 10" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1e3a8a" />
                    <stop offset="50%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl animate-fadeIn motion-reduce:animate-none leading-relaxed font-light" style={{ animationDelay: '0.1s' }}>
            Access comprehensive market research, expert analysis, and actionable intelligence
            to drive strategic decisions in the rapidly evolving healthcare landscape.
          </p>

          {/* Floating stats cards - glassmorphic */}
          <div className="hidden lg:flex absolute top-32 -left-12 animate-fadeIn motion-reduce:animate-none" style={{ animationDelay: '0.3s' }}>
            <div className="backdrop-blur-md bg-white/60 border border-white/20 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl font-bold text-navy-900">2,500+</div>
              <div className="text-sm text-slate-600">Reports Published</div>
            </div>
          </div>

          <div className="hidden lg:flex absolute top-48 -right-12 animate-fadeIn motion-reduce:animate-none" style={{ animationDelay: '0.4s' }}>
            <div className="backdrop-blur-md bg-white/60 border border-white/20 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl font-bold text-navy-900">98%</div>
              <div className="text-sm text-slate-600">Client Satisfaction</div>
            </div>
          </div>

          {/* Search Bar with glassmorphic style */}
          <div className="w-full max-w-3xl flex justify-center animate-fadeIn motion-reduce:animate-none relative z-50" style={{ animationDelay: '0.15s' }}>
            <div className="w-full px-4 sm:px-0 backdrop-blur-sm">
              <SearchBar
                variant="hero"
                placeholder="Search reports, categories, regions..."
                className="w-full shadow-2xl hover:shadow-ocean-200/50 transition-shadow duration-300 rounded-xl"
              />
            </div>
          </div>

          {/* CTA buttons with enhanced styling */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn motion-reduce:animate-none z-1" style={{ animationDelay: '0.2s' }}>
            <Link href="/reports">
              <Button
                variant="primary"
                size="lg"
                className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="relative z-10">View Reports</span>
                <div className="absolute inset-0 bg-gradient-to-r from-ocean-600 to-bright-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="backdrop-blur-sm bg-white/50 hover:bg-white/80 border-gray-200 hover:border-ocean-400 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-8 animate-fadeIn motion-reduce:animate-none" style={{ animationDelay: '0.25s' }}>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <svg className="w-5 h-5 text-ocean-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              HIPAA Compliant
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <svg className="w-5 h-5 text-ocean-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              ISO Certified
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <svg className="w-5 h-5 text-ocean-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              FDA Compliant Data
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
