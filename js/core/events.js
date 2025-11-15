/**
 * Event Bus System (Pub/Sub Pattern)
 *
 * Decoupled event communication between components.
 * Prevents tight coupling and enables modular architecture.
 *
 * Usage:
 *   EventBus.on('section:change', (data) => console.log(data));
 *   EventBus.emit('section:change', { section: 'hero' });
 *   EventBus.off('section:change', handler);
 *
 * @author Guna Palanivel
 * @version 1.0.0
 */

const EventBus = (() => {
  // Event listeners storage { event: [callbacks] }
  const events = {};

  // Event history for debugging (max 50 events)
  const eventHistory = [];
  const MAX_HISTORY = 50;

  /**
   * Subscribe to an event
   * @param {string} event - Event name
   * @param {Function} callback - Handler function
   * @param {Object} options - { once: boolean }
   * @returns {Function} Unsubscribe function
   */
  const on = (event, callback, options = {}) => {
    if (typeof callback !== "function") {
      console.error("EventBus.on: callback must be a function");
      return () => {};
    }

    if (!events[event]) {
      events[event] = [];
    }

    // Wrap callback if 'once' option is true
    const handler = options.once
      ? (...args) => {
          callback(...args);
          off(event, handler);
        }
      : callback;

    events[event].push(handler);

    if (CONFIG.env.isDev) {
      console.log(`📻 Event listener added: ${event}`);
    }

    // Return unsubscribe function
    return () => off(event, handler);
  };

  /**
   * Subscribe to event (fires once then unsubscribes)
   * @param {string} event - Event name
   * @param {Function} callback - Handler function
   * @returns {Function} Unsubscribe function
   */
  const once = (event, callback) => {
    return on(event, callback, { once: true });
  };

  /**
   * Unsubscribe from an event
   * @param {string} event - Event name
   * @param {Function} callback - Handler function to remove
   */
  const off = (event, callback) => {
    if (!events[event]) return;

    const index = events[event].indexOf(callback);
    if (index > -1) {
      events[event].splice(index, 1);

      if (CONFIG.env.isDev) {
        console.log(`📻 Event listener removed: ${event}`);
      }
    }

    // Clean up empty event arrays
    if (events[event].length === 0) {
      delete events[event];
    }
  };

  /**
   * Emit an event
   * @param {string} event - Event name
   * @param {*} data - Data to pass to handlers
   */
  const emit = (event, data = null) => {
    // Add to history
    addToHistory(event, data);

    if (!events[event] || events[event].length === 0) {
      if (CONFIG.env.isDev) {
        console.warn(`📻 No listeners for event: ${event}`);
      }
      return;
    }

    // Call all listeners (copy array to avoid mutation during iteration)
    const listeners = [...events[event]];
    listeners.forEach((callback) => {
      try {
        callback(data);
      } catch (error) {
        console.error(`EventBus emit error for "${event}":`, error);
      }
    });

    if (CONFIG.env.isDev) {
      console.log(`📻 Event emitted: ${event}`, data);
    }
  };

  /**
   * Add event to history
   * @param {string} event - Event name
   * @param {*} data - Event data
   */
  const addToHistory = (event, data) => {
    eventHistory.push({
      event,
      data,
      timestamp: Date.now(),
    });

    // Keep history size limited
    if (eventHistory.length > MAX_HISTORY) {
      eventHistory.shift();
    }
  };

  /**
   * Get event history (for debugging)
   * @returns {Array} Event history
   */
  const getHistory = () => {
    return [...eventHistory];
  };

  /**
   * Clear all event listeners
   */
  const clear = () => {
    Object.keys(events).forEach((event) => {
      delete events[event];
    });
    console.log("🧹 All event listeners cleared");
  };

  /**
   * Get listener count for an event
   * @param {string} event - Event name
   * @returns {number} Listener count
   */
  const listenerCount = (event) => {
    return events[event] ? events[event].length : 0;
  };

  // Public API
  return {
    on,
    once,
    off,
    emit,
    getHistory,
    clear,
    listenerCount,
  };
})();

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = EventBus;
}
