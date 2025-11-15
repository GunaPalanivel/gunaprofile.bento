/**
 * State Management System (Observer Pattern)
 *
 * Centralized state management with reactive updates.
 * Implements observer pattern for component communication.
 *
 * Usage:
 *   State.set('darkMode', true);
 *   State.get('darkMode');
 *   State.subscribe('darkMode', (value) => console.log(value));
 *
 * @author Guna Palanivel
 * @version 1.0.0
 */

const State = (() => {
  // Private state storage
  const state = {
    // UI State
    darkMode: false,
    currentSection: "hero",
    scrollY: 0,

    // Cursor State
    cursorPosition: { x: 0, y: 0 },
    cursorVisible: true,

    // Performance State
    fps: 0,
    memoryUsage: 0,

    // Feature State
    keyboardOverlayVisible: false,
    performanceDashboardVisible: false,

    // Interaction State
    isScrolling: false,
    lastInteraction: Date.now(),
  };

  // Observers storage { key: [callbacks] }
  const observers = {};

  /**
   * Subscribe to state changes
   * @param {string} key - State key to observe
   * @param {Function} callback - Function to call on change
   * @returns {Function} Unsubscribe function
   */
  const subscribe = (key, callback) => {
    if (!observers[key]) {
      observers[key] = [];
    }

    observers[key].push(callback);

    // Return unsubscribe function
    return () => {
      const index = observers[key].indexOf(callback);
      if (index > -1) {
        observers[key].splice(index, 1);
      }
    };
  };

  /**
   * Notify all observers of a state change
   * @param {string} key - State key that changed
   * @param {*} value - New value
   */
  const notify = (key, value) => {
    if (observers[key]) {
      observers[key].forEach((callback) => {
        try {
          callback(value, key);
        } catch (error) {
          console.error(`State observer error for key "${key}":`, error);
        }
      });
    }
  };

  /**
   * Set state value
   * @param {string} key - State key
   * @param {*} value - New value
   * @param {boolean} silent - If true, don't notify observers
   */
  const set = (key, value, silent = false) => {
    const oldValue = state[key];

    // Only update if value changed
    if (oldValue !== value) {
      state[key] = value;

      if (!silent) {
        notify(key, value);
      }

      // Log in dev mode
      if (CONFIG.env.isDev) {
        console.log(`📊 State changed: ${key}`, { old: oldValue, new: value });
      }
    }
  };

  /**
   * Get state value
   * @param {string} key - State key
   * @returns {*} State value
   */
  const get = (key) => {
    return state[key];
  };

  /**
   * Get all state (for debugging)
   * @returns {Object} Shallow copy of state
   */
  const getAll = () => {
    return { ...state };
  };

  /**
   * Reset state to initial values
   */
  const reset = () => {
    Object.keys(state).forEach((key) => {
      set(key, getInitialValue(key), true);
    });
    console.log("🔄 State reset to initial values");
  };

  /**
   * Get initial value for a state key
   * @param {string} key - State key
   * @returns {*} Initial value
   */
  const getInitialValue = (key) => {
    const initialValues = {
      darkMode: false,
      currentSection: "hero",
      scrollY: 0,
      cursorPosition: { x: 0, y: 0 },
      cursorVisible: true,
      fps: 0,
      memoryUsage: 0,
      keyboardOverlayVisible: false,
      performanceDashboardVisible: false,
      isScrolling: false,
      lastInteraction: Date.now(),
    };
    return initialValues[key];
  };

  // Public API
  return {
    subscribe,
    set,
    get,
    getAll,
    reset,
  };
})();

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = State;
}
