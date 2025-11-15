/**
 * Analytics & Event Tracking
 *
 * Logs user interactions for future analytics integration.
 * Currently logs to console, easy to integrate with GA/Mixpanel.
 *
 * @author Guna Palanivel
 * @version 1.0.0
 */

const Analytics = (() => {
  const events = [];

  /**
   * Track event
   */
  const track = (eventName, data = {}) => {
    const event = {
      name: eventName,
      data,
      timestamp: Date.now(),
      url: window.location.href,
    };

    events.push(event);

    if (CONFIG.env.isDev) {
      console.log("📊 Analytics:", eventName, data);
    }

    // TODO: Send to analytics service
    // Example: gtag('event', eventName, data);
  };

  /**
   * Initialize analytics
   */
  const init = () => {
    if (!CONFIG.features.analytics) return;

    // Track page view
    track("page_view", {
      title: document.title,
      path: window.location.pathname,
    });

    // Track external links
    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href^="http"]');
      if (link) {
        track("external_link_click", {
          url: link.href,
          text: link.textContent.trim(),
        });
      }
    });

    // Listen for custom events
    EventBus.on("contact:email-copied", (data) => {
      track("email_copied", data);
    });

    EventBus.on("contact:social-click", (data) => {
      track("social_click", data);
    });

    EventBus.on("grid:wave", (data) => {
      track("grid_interaction", data);
    });

    EventBus.on("skill:click", (data) => {
      track("skill_click", data);
    });

    EventBus.on("theme:change", (data) => {
      track("theme_change", data);
    });

    console.log("📊 Analytics tracking initialized");
  };

  /**
   * Get all tracked events
   */
  const getEvents = () => {
    return [...events];
  };

  // Public API
  return {
    init,
    track,
    getEvents,
  };
})();

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = Analytics;
}
