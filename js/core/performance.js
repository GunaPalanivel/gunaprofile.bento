/**
 * Performance Monitoring System
 *
 * Tracks FPS, memory usage, and paint timing.
 * Accessible via Ctrl+Shift+P keyboard shortcut.
 *
 * @author Guna Palanivel
 * @version 1.0.0
 */

const PerformanceMonitor = (() => {
  let rafId = null;
  let lastTime = performance.now();
  let frames = 0;
  let fps = 60;

  /**
   * Calculate FPS
   */
  const measureFPS = () => {
    const currentTime = performance.now();
    frames++;

    if (currentTime >= lastTime + 1000) {
      fps = Math.round((frames * 1000) / (currentTime - lastTime));
      frames = 0;
      lastTime = currentTime;

      // Update state
      State.set("fps", fps, true); // Silent update
    }

    if (CONFIG.performance.rafEnabled) {
      rafId = raf(measureFPS);
    }
  };

  /**
   * Get memory usage (if available)
   * @returns {Object} Memory info
   */
  const getMemoryUsage = () => {
    if (performance.memory) {
      return {
        used: Math.round(performance.memory.usedJSHeapSize / 1048576), // MB
        total: Math.round(performance.memory.totalJSHeapSize / 1048576), // MB
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576), // MB
      };
    }
    return null;
  };

  /**
   * Get paint timing
   * @returns {Object} Paint metrics
   */
  const getPaintTiming = () => {
    const paintEntries = performance.getEntriesByType("paint");
    const result = {};

    paintEntries.forEach((entry) => {
      result[entry.name] = Math.round(entry.startTime);
    });

    return result;
  };

  /**
   * Log performance metrics
   */
  const logMetrics = () => {
    const memory = getMemoryUsage();
    const paint = getPaintTiming();

    console.group("⚡ Performance Metrics");
    console.log(`FPS: ${fps}`);
    if (memory) {
      console.log(
        `Memory: ${memory.used}MB / ${memory.total}MB (${memory.limit}MB limit)`
      );
    }
    if (Object.keys(paint).length > 0) {
      console.log("Paint Timing:", paint);
    }
    console.groupEnd();
  };

  /**
   * Initialize monitoring
   */
  const init = () => {
    if (!CONFIG.features.performance) return;

    measureFPS();

    // Log metrics every 5 seconds in dev mode
    if (CONFIG.env.isDev && CONFIG.performance.logMetrics) {
      setInterval(logMetrics, 5000);
    }

    console.log("⚡ Performance monitoring initialized");
  };

  /**
   * Stop monitoring
   */
  const stop = () => {
    if (rafId) {
      cancelRaf(rafId);
      rafId = null;
    }
  };

  /**
   * Get current metrics
   * @returns {Object} Current performance data
   */
  const getMetrics = () => {
    return {
      fps,
      memory: getMemoryUsage(),
      paint: getPaintTiming(),
    };
  };

  // Public API
  return {
    init,
    stop,
    getMetrics,
    logMetrics,
  };
})();

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = PerformanceMonitor;
}
