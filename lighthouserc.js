/** @type {import('@lhci/cli').LighthouseRcConfig} */
module.exports = {
  ci: {
    collect: {
      // Use production build via `npm start` (run build first)
      startServerCommand: 'npm start',
      startServerReadyPattern: 'ready on',
      startServerReadyTimeout: 30000,
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/industry',
        'http://localhost:3000/blog',
        'http://localhost:3000/about',
        'http://localhost:3000/services',
        'http://localhost:3000/contact',
      ],
      numberOfRuns: 3,
      settings: {
        // Simulate mobile (Lighthouse default) — key for Core Web Vitals
        preset: 'desktop',
        // Throttle network/CPU to simulate real-world conditions
        throttlingMethod: 'simulate',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
        },
        // Capture all audits
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        // Skip PWA (not applicable here)
        skipAudits: ['installable-manifest', 'splash-screen', 'themed-omnibox'],
        // Disable storage reset to preserve service workers across runs
        disableStorageReset: false,
        // Chrome flags for headless auditing
        chromeFlags: '--no-sandbox --headless',
      },
    },
    assert: {
      // Fail CI if scores drop below these thresholds
      assertions: {
        'categories:performance': ['warn', { minScore: 0.7 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],

        // Core Web Vitals — fail on regressions
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 3000 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'speed-index': ['warn', { maxNumericValue: 3000 }],
        'interactive': ['warn', { maxNumericValue: 3500 }],

        // SEO fundamentals
        'document-title': ['error', { minScore: 1 }],
        'meta-description': ['error', { minScore: 1 }],
        'link-text': ['warn', { minScore: 1 }],
        'crawlable-anchors': ['error', { minScore: 1 }],
        'is-crawlable': ['error', { minScore: 1 }],
        'hreflang': ['warn', { minScore: 1 }],
        'canonical': ['error', { minScore: 1 }],
        'structured-data': ['warn', { minScore: 1 }],

        // Accessibility
        'image-alt': ['error', { minScore: 1 }],
        'color-contrast': ['warn', { minScore: 1 }],
        'heading-order': ['error', { minScore: 1 }],
        'label': ['error', { minScore: 1 }],
        'button-name': ['error', { minScore: 1 }],
        'link-name': ['error', { minScore: 1 }],

        // Best practices / security
        'uses-https': ['error', { minScore: 1 }],
        'no-vulnerable-libraries': ['warn', { minScore: 1 }],
        'csp-xss': ['warn', { minScore: 1 }],
        'deprecations': ['warn', { minScore: 1 }],
        'errors-in-console': ['warn', { minScore: 1 }],

        // Performance opportunities
        'uses-text-compression': ['warn', { minScore: 1 }],
        'uses-responsive-images': ['warn', { minScore: 1 }],
        'uses-optimized-images': ['warn', { minScore: 1 }],
        'efficient-animated-content': ['warn', { minScore: 1 }],
        'offscreen-images': ['warn', { minScore: 1 }],
        'render-blocking-resources': ['warn', { minScore: 1 }],
        'unused-css-rules': ['warn', { minScore: 0.8 }],
        'unused-javascript': ['warn', { minScore: 0.8 }],
        'uses-long-cache-ttl': ['warn', { minScore: 0.8 }],
      },
    },
    upload: {
      // Store reports locally in the .lighthouseci directory
      target: 'filesystem',
      outputDir: './.lighthouseci',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%',
    },
  },
};
