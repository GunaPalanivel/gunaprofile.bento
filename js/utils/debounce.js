/**
 * Performance Utilities (Debounce, Throttle, RAF)
 *
 * Optimizes event handlers and animations.
 * Critical for scroll/resize performance.
 *
 * @author Guna Palanivel
 * @version 1.0.0
 */

/**
 * Debounce function - delays execution until after wait time
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
const debounce = (func, wait = CONFIG.performance.debounceDelay) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function - limits execution to once per wait time
 * @param {Function} func - Function to throttle
 * @param {number} wait - Wait time in ms
 * @returns {Function} Throttled function
 */
const throttle = (func, wait = CONFIG.performance.throttleDelay) => {
  let inThrottle;

  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), wait);
    }
  };
};

/**
 * RequestAnimationFrame wrapper with fallback
 * @param {Function} callback - Function to execute
 * @returns {number} RAF ID
 */
const raf = (callback) => {
  if (CONFIG.performance.rafEnabled) {
    return window.requestAnimationFrame(callback);
  }
  return setTimeout(callback, 16); // ~60fps fallback
};

/**
 * Cancel RAF with fallback
 * @param {number} id - RAF ID to cancel
 */
const cancelRaf = (id) => {
  if (CONFIG.performance.rafEnabled) {
    window.cancelAnimationFrame(id);
  } else {
    clearTimeout(id);
  }
};

// Export utilities
if (typeof module !== "undefined" && module.exports) {
  module.exports = { debounce, throttle, raf, cancelRaf };
}
