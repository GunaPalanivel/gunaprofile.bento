/**
 * DOM Utility Functions
 *
 * Common DOM manipulation and query helpers.
 * Reduces code duplication and improves readability.
 *
 * @author Guna Palanivel
 * @version 1.0.0
 */

const DOM = {
  /**
   * Query selector (returns first match)
   * @param {string} selector - CSS selector
   * @param {Element} context - Search context (default: document)
   * @returns {Element|null}
   */
  qs: (selector, context = document) => {
    return context.querySelector(selector);
  },

  /**
   * Query selector all (returns NodeList)
   * @param {string} selector - CSS selector
   * @param {Element} context - Search context (default: document)
   * @returns {NodeList}
   */
  qsa: (selector, context = document) => {
    return context.querySelectorAll(selector);
  },

  /**
   * Add event listener with optional delegation
   * @param {Element|string} target - Element or selector
   * @param {string} event - Event name
   * @param {Function|string} handlerOrSelector - Handler function or delegate selector
   * @param {Function} handler - Handler (if using delegation)
   * @returns {Function} Remove listener function
   */
  on: (target, event, handlerOrSelector, handler) => {
    const element = typeof target === "string" ? DOM.qs(target) : target;
    if (!element) return () => {};

    // Event delegation
    if (typeof handlerOrSelector === "string") {
      const delegateSelector = handlerOrSelector;
      const actualHandler = (e) => {
        if (e.target.matches(delegateSelector)) {
          handler.call(e.target, e);
        }
      };
      element.addEventListener(event, actualHandler);
      return () => element.removeEventListener(event, actualHandler);
    }

    // Direct listener
    element.addEventListener(event, handlerOrSelector);
    return () => element.removeEventListener(event, handlerOrSelector);
  },

  /**
   * Add class to element
   * @param {Element|string} target - Element or selector
   * @param {string} className - Class name
   */
  addClass: (target, className) => {
    const element = typeof target === "string" ? DOM.qs(target) : target;
    if (element) element.classList.add(className);
  },

  /**
   * Remove class from element
   * @param {Element|string} target - Element or selector
   * @param {string} className - Class name
   */
  removeClass: (target, className) => {
    const element = typeof target === "string" ? DOM.qs(target) : target;
    if (element) element.classList.remove(className);
  },

  /**
   * Toggle class on element
   * @param {Element|string} target - Element or selector
   * @param {string} className - Class name
   * @returns {boolean} Whether class is now present
   */
  toggleClass: (target, className) => {
    const element = typeof target === "string" ? DOM.qs(target) : target;
    return element ? element.classList.toggle(className) : false;
  },

  /**
   * Check if element has class
   * @param {Element|string} target - Element or selector
   * @param {string} className - Class name
   * @returns {boolean}
   */
  hasClass: (target, className) => {
    const element = typeof target === "string" ? DOM.qs(target) : target;
    return element ? element.classList.contains(className) : false;
  },

  /**
   * Get element attribute
   * @param {Element|string} target - Element or selector
   * @param {string} attr - Attribute name
   * @returns {string|null}
   */
  getAttr: (target, attr) => {
    const element = typeof target === "string" ? DOM.qs(target) : target;
    return element ? element.getAttribute(attr) : null;
  },

  /**
   * Set element attribute
   * @param {Element|string} target - Element or selector
   * @param {string} attr - Attribute name
   * @param {string} value - Attribute value
   */
  setAttr: (target, attr, value) => {
    const element = typeof target === "string" ? DOM.qs(target) : target;
    if (element) element.setAttribute(attr, value);
  },

  /**
   * Create element with options
   * @param {string} tag - Tag name
   * @param {Object} options - { className, id, attributes, text, html }
   * @returns {Element}
   */
  create: (tag, options = {}) => {
    const element = document.createElement(tag);

    if (options.className) element.className = options.className;
    if (options.id) element.id = options.id;
    if (options.text) element.textContent = options.text;
    if (options.html) element.innerHTML = options.html;

    if (options.attributes) {
      Object.entries(options.attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    }

    return element;
  },

  /**
   * Check if element is in viewport
   * @param {Element} element - Element to check
   * @param {number} offset - Offset (px)
   * @returns {boolean}
   */
  isInViewport: (element, offset = 0) => {
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    return (
      rect.top >= -offset &&
      rect.left >= -offset &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) +
          offset &&
      rect.right <=
        (window.innerWidth || document.documentElement.clientWidth) + offset
    );
  },
};

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = DOM;
}
