/**
 * Application Configuration & Feature Flags
 *
 * Centralized configuration for all JavaScript features.
 * Feature flags allow easy toggling during development/debugging.
 *
 * @author Guna Palanivel
 * @version 1.0.0
 */

const CONFIG = {
  // Feature Flags (Toggle features on/off)
  features: {
    cursor: true, // Custom cursor with magnetic effect
    particles: true, // Particle trail system
    gridInteractive: true, // Interactive grid squares
    smoothScroll: true, // Smooth scroll navigation
    scrollAnimations: true, // Scroll-triggered fade-ins
    keyboard: true, // Keyboard shortcuts
    darkMode: true, // Dark mode toggle
    performance: true, // Performance monitoring
    lazyLoad: true, // Lazy loading
    accessibility: true, // A11y enhancements
    analytics: true, // Event tracking (console)
    easterEggs: false, // Easter eggs (disabled by default)
  },

  // Performance Settings
  performance: {
    debounceDelay: 150, // Debounce delay (ms)
    throttleDelay: 100, // Throttle delay (ms)
    rafEnabled: true, // Use requestAnimationFrame
    logMetrics: true, // Log performance metrics to console
  },

  // Animation Settings
  animation: {
    duration: 300, // Default animation duration (ms)
    easing: "ease-in-out", // Default easing function
    reducedMotion: false, // Set by user preference
  },

  // Cursor Settings
  cursor: {
    size: 20, // Cursor size (px)
    magnetStrength: 0.3, // Magnetic pull strength (0-1)
    smoothness: 0.15, // Follow smoothness (0-1, lower = smoother)
  },

  // Particle Settings
  particles: {
    count: 20, // Max particles on screen
    lifetime: 1000, // Particle lifetime (ms)
    size: 4, // Particle size (px)
    color: "#2a9d8f", // Particle color
  },

  // Grid Settings
  grid: {
    waveSpeed: 50, // Wave propagation speed (ms)
    waveRadius: 3, // Wave effect radius (grid units)
    hoverScale: 1.1, // Hover scale factor
  },

  // Scroll Settings
  scroll: {
    offset: 100, // Scroll offset for section detection (px)
    smoothDuration: 800, // Smooth scroll duration (ms)
  },

  // Keyboard Shortcuts
  keyboard: {
    shortcuts: {
      help: "?", // Show shortcuts overlay
      darkMode: "ctrl+d", // Toggle dark mode
      performance: "ctrl+shift+p", // Show performance dashboard
      section1: "1", // Navigate to section 1
      section2: "2", // Navigate to section 2
      section3: "3", // Navigate to section 3
      section4: "4", // Navigate to section 4
      section5: "5", // Navigate to section 5
      section6: "6", // Navigate to section 6
      section7: "7", // Navigate to section 7
      section8: "8", // Navigate to section 8
    },
  },

  // Selectors (DOM query selectors)
  selectors: {
    main: ".bento-grid",
    sections: {
      hero: ".hero-card",
      projects: ".projects-card",
      education: ".education-card",
      work: ".work-card",
      blog: ".blog-card",
      resume: ".resume-card",
      contact: ".contact-card",
      misc: ".misc-card",
    },
    gridSquares: ".grid-square",
    skillBadges: ".skill-badge",
    socialIcons: ".social-icon",
  },

  // Environment
  env: {
    isDev:
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1",
    version: "1.0.0",
    buildDate: "2025-11-15",
  },
};

// Check for reduced motion preference
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  CONFIG.animation.reducedMotion = true;
  CONFIG.features.particles = false;
  CONFIG.features.scrollAnimations = false;
  console.log("⚡ Reduced motion detected - animations disabled");
}

// Freeze config to prevent accidental mutations
Object.freeze(CONFIG);

// Export for module usage (or use global)
if (typeof module !== "undefined" && module.exports) {
  module.exports = CONFIG;
}
