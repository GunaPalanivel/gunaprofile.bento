/**
 * Dark Mode Toggle
 *
 * Implements theme switching with smooth transitions.
 * Persists preference to localStorage.
 * Handles gradients and pseudo-elements.
 *
 * Features:
 * - Toggle via Ctrl+D or programmatically
 * - Smooth color transitions
 * - localStorage persistence
 * - System preference detection
 * - Toast notification on toggle
 * - Gradient override for contact section
 *
 * @author Guna Palanivel
 * @version 1.0.0
 */

const DarkMode = (() => {
  let isDark = false;
  const STORAGE_KEY = "portfolio-dark-mode";

  /**
   * Add dark mode styles
   */
  const addStyles = () => {
    const style = DOM.create("style");
    style.id = "dark-mode-base-styles";
    style.textContent = `
      /* Dark mode transition */
      body,
      .bento-grid,
      .bento-grid > section {
        transition: background 0.3s ease, background-color 0.3s ease, color 0.3s ease;
      }
      
      /* Dark mode base */
      body.dark-mode {
        background-color: #0a0a0a;
        color: #e0e0e0;
      }
      
      body.dark-mode .bento-grid {
        background-color: #0a0a0a;
      }
      
      /* Text colors */
      body.dark-mode h1,
      body.dark-mode h2,
      body.dark-mode h3 {
        color: #ffffff;
      }
      
      body.dark-mode p,
      body.dark-mode span {
        color: #cccccc;
      }
      
      /* Skill badges */
      body.dark-mode .skill-badge {
        background-color: #2a2a2a;
        color: #64e1d1;
        border: 1px solid #3a3a3a;
      }
      
      body.dark-mode .skill-badge:hover {
        background-color: #3a3a3a;
        box-shadow: 0 4px 12px rgba(100, 225, 209, 0.2);
      }
      
      /* Grid squares */
      body.dark-mode .grid-square {
        filter: brightness(0.8);
      }
      
      /* Social icons */
      body.dark-mode .social-icon {
        color: #64e1d1;
      }
      
      body.dark-mode .social-icon:hover {
        color: #3ac6b5;
      }
      
      /* Toast notification */
      .dark-mode-toast {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: #2a2a2a;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-size: 0.875rem;
      }
      
      .dark-mode-toast.hiding {
        animation: slideOutRight 0.3s ease-out;
      }
      
      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(100px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes slideOutRight {
        from {
          opacity: 1;
          transform: translateX(0);
        }
        to {
          opacity: 0;
          transform: translateX(100px);
        }
      }
      
      /* Mobile adjustments */
      @media (max-width: 768px) {
        .dark-mode-toast {
          bottom: 1rem;
          right: 1rem;
          left: 1rem;
        }
      }
    `;
    document.head.appendChild(style);
  };

  /**
   * Show toast notification
   */
  const showToast = (message, icon) => {
    const toast = DOM.create("div", {
      className: "dark-mode-toast",
      html: `<span style="font-size: 1.5rem;">${icon}</span><span>${message}</span>`,
    });

    document.body.appendChild(toast);

    // Auto hide after 2 seconds
    setTimeout(() => {
      toast.classList.add("hiding");
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  };

  /**
   * Apply dark mode
   */
  const apply = () => {
    document.body.classList.add("dark-mode");
    isDark = true;

    // Section background colors (uniform dark)
    const sections = {
      ".hero-card": "#1a1a1a",
      ".projects-card": "#1a1a1a",
      ".education-card": "#1a1a1a",
      ".work-card": "#1a1a1a",
      ".blog-card": "#1a1a1a",
      ".resume-card": "#1a1a1a",
      ".contact-card": "#1a1a1a",
      ".misc-card": "#1a1a1a",
    };

    // Apply backgrounds with gradient override
    Object.entries(sections).forEach(([selector, bgColor]) => {
      const element = document.querySelector(selector);
      if (element) {
        // Use 'background' to override gradients
        element.style.setProperty("background", bgColor, "important");
        element.style.setProperty("background-image", "none", "important");
        element.style.transition = "background 0.3s ease";
      }
    });

    // Special handling for contact card (gradient + pseudo-element)
    const contactCard = document.querySelector(".contact-card");
    if (contactCard) {
      // Create/update override stylesheet
      let styleSheet = document.getElementById("dark-mode-contact-override");

      if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "dark-mode-contact-override";
        document.head.appendChild(styleSheet);
      }

      styleSheet.textContent = `
        /* Contact card dark mode overrides */
        body.dark-mode .contact-card {
          background: #1a1a1a !important;
          background-image: none !important;
        }
        
        /* Hide the gradient pseudo-element */
        body.dark-mode .contact-card::before {
          display: none !important;
          opacity: 0 !important;
        }
        
        /* Dark mode chat bubble */
        body.dark-mode .chat-message-title {
          background: rgba(50, 50, 50, 0.8) !important;
          color: #64e1d1 !important;
          border-color: #64e1d1 !important;
        }
        
        /* Envelope SVG colors for dark mode */
        body.dark-mode .envelope-svg rect,
        body.dark-mode .envelope-svg polygon {
          filter: brightness(0.7);
        }
      `;
    }

    // Update bento grid background
    const bentoGrid = document.querySelector(".bento-grid");
    if (bentoGrid) {
      bentoGrid.style.setProperty("background-color", "#0a0a0a", "important");
    }

    // Update state
    State.set("darkMode", true);

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, "true");

    // Emit event
    EventBus.emit("theme:change", { theme: "dark" });

    console.log("🌙 Dark mode enabled");
  };

  /**
   * Remove dark mode
   */
  const remove = () => {
    document.body.classList.remove("dark-mode");
    isDark = false;

    // Remove inline styles from all sections
    const sections = [
      ".hero-card",
      ".projects-card",
      ".education-card",
      ".work-card",
      ".blog-card",
      ".resume-card",
      ".contact-card",
      ".misc-card",
      ".bento-grid",
    ];

    sections.forEach((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        element.style.background = "";
        element.style.backgroundImage = "";
        element.style.backgroundColor = "";
        element.style.transition = "background 0.3s ease";
      }
    });

    // Remove contact override stylesheet
    const overrideStyle = document.getElementById("dark-mode-contact-override");
    if (overrideStyle) {
      overrideStyle.remove();
    }

    // Update state
    State.set("darkMode", false);

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, "false");

    // Emit event
    EventBus.emit("theme:change", { theme: "light" });

    console.log("☀️ Light mode enabled");
  };

  /**
   * Toggle dark mode
   */
  const toggle = () => {
    if (isDark) {
      remove();
      showToast("Light mode activated", "☀️");
    } else {
      apply();
      showToast("Dark mode activated", "🌙");
    }
  };

  /**
   * Load saved preference
   */
  const loadPreference = () => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === "true") {
      apply();
      return;
    }

    if (saved === "false") {
      remove();
      return;
    }

    // Check system preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      apply();
      console.log("🌙 Dark mode detected from system preference");
    }
  };

  /**
   * Listen for system theme changes
   */
  const listenForSystemChanges = () => {
    if (!window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    mediaQuery.addEventListener("change", (e) => {
      // Only auto-switch if user hasn't manually set preference
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === null) {
        if (e.matches) {
          apply();
        } else {
          remove();
        }
      }
    });
  };

  /**
   * Initialize dark mode
   */
  const init = () => {
    // Check feature flag
    if (!CONFIG.features.darkMode) return;

    addStyles();
    loadPreference();
    listenForSystemChanges();

    // Listen for keyboard shortcut
    EventBus.on("keyboard:toggle-dark-mode", toggle);

    console.log("🌓 Dark mode system initialized");
    console.log("💡 Press Ctrl+D to toggle theme");
  };

  /**
   * Destroy dark mode
   */
  const destroy = () => {
    remove();

    // Remove base styles
    const baseStyles = document.getElementById("dark-mode-base-styles");
    if (baseStyles) {
      baseStyles.remove();
    }
  };

  // Public API
  return {
    init,
    destroy,
    toggle,
    apply,
    remove,
    isEnabled: () => isDark,
  };
})();

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = DarkMode;
}
