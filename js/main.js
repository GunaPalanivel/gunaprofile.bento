/**
 * Main Application Entry Point
 *
 * Orchestrates initialization of all features.
 * Handles feature flag checking and error boundaries.
 *
 * @author Guna Palanivel
 * @version 1.0.0
 */

(function initPortfolio() {
  ("use strict");

  console.log(`
  ╔════════════════════════════════════════════════════════════════════════════╗
  ║   🚀 Portfolio Interactive v${CONFIG.env.version}                         ║ 
  ║   Built by Guna Palanivel                                                  ║
  ║   Build: ${CONFIG.env.buildDate}                                           ║
  ╚════════════════════════════════════════════════════════════════════════════╝
  `);

  /**
   * Initialize core systems
   */
  const initCore = () => {
    try {
      // Initialize performance monitoring
      if (CONFIG.features.performance) {
        PerformanceMonitor.init();
      }

      console.log("✅ Core systems initialized");
    } catch (error) {
      console.error("❌ Core initialization failed:", error);
    }
  };

  /**
<<<<<<< HEAD
   * Initialize features (Task 2: Visual Excellence)
=======
   * Initialize features (Task 2-3: Visual + Interactivity)
>>>>>>> feat/interactivity
   */
  const initFeatures = () => {
    try {
      // Visual Excellence Layer (Task 2)
      if (CONFIG.features.cursor) CustomCursor.init();
      if (CONFIG.features.particles) ParticleSystem.init();
      if (CONFIG.features.gridInteractive) GridInteractive.init();
      if (CONFIG.features.smoothScroll) SmoothScroll.init();
      if (CONFIG.features.scrollAnimations) ScrollAnimations.init();
<<<<<<< HEAD
      MiscEffects.init(); // Always init (handles own feature checks)

      console.log("✅ Visual excellence features initialized");
=======
      MiscEffects.init();

      // Interactivity Layer (Task 3)
      if (CONFIG.features.keyboard) KeyboardShortcuts.init();
      if (CONFIG.features.darkMode) DarkMode.init();
      ContactEffects.init();
      ProjectsEffects.init();
      WorkEffects.init();
      FeatureHints.init();
      if (CONFIG.features.analytics) Analytics.init();
      if (CONFIG.features.featureHints) FeatureHints.init();
      console.log("✅ All features initialized");
>>>>>>> feat/interactivity
    } catch (error) {
      console.error("❌ Feature initialization failed:", error);
    }
  };

  /**
   * Setup global error handling
   */
  const setupErrorHandling = () => {
    window.addEventListener("error", (event) => {
      console.error("Global error:", event.error);
      // Prevent default to avoid console spam
      event.preventDefault();
    });

    window.addEventListener("unhandledrejection", (event) => {
      console.error("Unhandled promise rejection:", event.reason);
      event.preventDefault();
    });
  };

  /**
   * Main initialization
   */
  const init = () => {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
      return;
    }

    console.log("🎬 Initializing portfolio...");

    setupErrorHandling();
    initCore();
    initFeatures();

    console.log("✨ Portfolio fully loaded!");
    console.log("💡 Tip: Check CONFIG object for feature flags");
    console.log("💡 Tip: Use State.getAll() to inspect current state");
    console.log("💡 Tip: Use EventBus.getHistory() to see event log");
  };

  // Start initialization
  init();
})();
