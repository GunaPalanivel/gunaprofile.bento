/**
 * Smooth Scroll & Section Tracking
 *
 * Provides smooth scrolling between sections and tracks current
 * visible section. Integrates with keyboard shortcuts.
 *
 * Features:
 * - Smooth scroll to sections
 * - Active section tracking
 * - Scroll direction detection
 * - Throttled scroll events
 * - Intersection Observer fade-ins
 *
 * @author Guna Palanivel
 * @version 1.0.0
 */

const SmoothScroll = (() => {
  let sections = [];
  let isScrolling = false;
  let scrollTimeout = null;

  /**
   * Smooth scroll to section
   * @param {string} sectionId - Section class name (e.g., 'hero-card')
   */
  const scrollToSection = (sectionId) => {
    const section = DOM.qs(`.${sectionId}`);
    if (!section) {
      console.warn(`Section not found: ${sectionId}`);
      return;
    }

    // Calculate scroll position
    const offsetTop = section.offsetTop - CONFIG.scroll.offset;

    // Smooth scroll
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });

    // Update state
    State.set("currentSection", sectionId.replace("-card", ""));

    // Emit event
    EventBus.emit("scroll:to-section", { section: sectionId });

    console.log(`📍 Scrolled to: ${sectionId}`);
  };

  /**
   * Get current visible section
   */
  const getCurrentSection = () => {
    const scrollY = window.scrollY + window.innerHeight / 2;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (scrollY >= section.offsetTop) {
        return section;
      }
    }

    return sections[0];
  };

  /**
   * Update active section
   */
  const updateActiveSection = throttle(() => {
    const currentSection = getCurrentSection();
    if (!currentSection) return;

    const sectionName = currentSection.className
      .split(" ")[0]
      .replace("-card", "");
    const previousSection = State.get("currentSection");

    if (sectionName !== previousSection) {
      State.set("currentSection", sectionName);
      EventBus.emit("section:change", {
        from: previousSection,
        to: sectionName,
      });

      if (CONFIG.env.isDev) {
        console.log(`📍 Section changed: ${previousSection} → ${sectionName}`);
      }
    }
  }, CONFIG.performance.throttleDelay);

  /**
   * Handle scroll events
   */
  const handleScroll = () => {
    // Set scrolling flag
    State.set("isScrolling", true);

    // Clear existing timeout
    clearTimeout(scrollTimeout);

    // Update active section (throttled)
    updateActiveSection();

    // Reset scrolling flag after delay
    scrollTimeout = setTimeout(() => {
      State.set("isScrolling", false);
      EventBus.emit("scroll:end");
    }, 150);

    // Update scroll Y
    State.set("scrollY", window.scrollY, true);
  };

  /**
   * Initialize smooth scroll
   */
  const init = () => {
    // Check feature flag
    if (!CONFIG.features.smoothScroll) return;

    // Get all sections
    const sectionSelectors = Object.values(CONFIG.selectors.sections);
    sections = sectionSelectors
      .map((selector) => DOM.qs(selector))
      .filter((section) => section !== null);

    if (sections.length === 0) {
      console.warn("⚠️ No sections found for scroll tracking");
      return;
    }

    // Listen for scroll events (passive for performance)
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Listen for keyboard navigation events
    EventBus.on("keyboard:navigate-section", (data) => {
      scrollToSection(data.section);
    });

    // Set initial section
    updateActiveSection();

    console.log(`📜 Smooth scroll initialized (${sections.length} sections)`);
  };

  /**
   * Destroy smooth scroll
   */
  const destroy = () => {
    window.removeEventListener("scroll", handleScroll);
    clearTimeout(scrollTimeout);
  };

  // Public API
  return {
    init,
    destroy,
    scrollToSection,
  };
})();

/**
 * Scroll-Triggered Fade-In Animations
 *
 * Uses Intersection Observer to fade in elements as they
 * enter viewport. More performant than scroll event listeners.
 */
const ScrollAnimations = (() => {
  let observer = null;
  let animatedElements = [];

  /**
   * Create Intersection Observer
   */
  const createObserver = () => {
    const options = {
      root: null, // viewport
      rootMargin: "-50px", // Trigger slightly before entering
      threshold: 0.1, // 10% visible
    };

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add visible class
          entry.target.classList.add("fade-in-visible");

          // Emit event
          EventBus.emit("scroll:element-visible", {
            element: entry.target,
          });

          // Stop observing (animate once)
          observer.unobserve(entry.target);
        }
      });
    }, options);
  };

  /**
   * Add CSS for fade-in animations
   */
  const addStyles = () => {
    const style = DOM.create("style");
    style.textContent = `
      .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }
      
      .fade-in-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }

      /* Respect reduced motion */
      @media (prefers-reduced-motion: reduce) {
        .fade-in {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  };

  /**
   * Setup elements for animation
   */
  const setupElements = () => {
    // Target sections for fade-in
    const selectors = [
      ".hero-card",
      ".projects-card",
      ".education-card",
      ".work-card",
      ".blog-card",
      ".resume-card",
      ".contact-card",
      ".misc-card",
    ];

    selectors.forEach((selector) => {
      const element = DOM.qs(selector);
      if (element) {
        // Add fade-in class
        element.classList.add("fade-in");

        // Observe element
        observer.observe(element);

        animatedElements.push(element);
      }
    });
  };

  /**
   * Initialize scroll animations
   */
  const init = () => {
    // Check feature flag
    if (!CONFIG.features.scrollAnimations) return;

    // Check reduced motion
    if (CONFIG.animation.reducedMotion) {
      console.log("⚡ Scroll animations disabled (reduced motion)");
      return;
    }

    // Check browser support
    if (!("IntersectionObserver" in window)) {
      console.warn("⚠️ IntersectionObserver not supported");
      return;
    }

    addStyles();
    createObserver();
    setupElements();

    console.log(
      `🎭 Scroll animations initialized (${animatedElements.length} elements)`
    );
  };

  /**
   * Destroy scroll animations
   */
  const destroy = () => {
    if (observer) {
      observer.disconnect();
    }
  };

  // Public API
  return {
    init,
    destroy,
  };
})();

// export to include both modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = { SmoothScroll, ScrollAnimations };
}
