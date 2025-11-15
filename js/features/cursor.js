/**
 * Custom Cursor with Magnetic Effect
 *
 * Creates a smooth-following cursor that magnetically attracts to
 * interactive elements (links, buttons). Uses RAF for 60fps performance.
 *
 * Features:
 * - Smooth exponential easing follow
 * - Magnetic attraction to clickable elements
 * - Scale animation on hover
 * - Hides default cursor
 * - Respects reduced motion preference
 *
 * @author Guna Palanivel
 * @version 1.0.0
 */

const CustomCursor = (() => {
  // Cursor state
  let cursorElement = null;
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let rafId = null;
  let isActive = false;

  // Magnetic target
  let magnetTarget = null;
  let magnetStrength = CONFIG.cursor.magnetStrength;

  /**
   * Create cursor DOM element
   */
  const createCursor = () => {
    cursorElement = DOM.create("div", {
      className: "custom-cursor",
      attributes: {
        "aria-hidden": "true",
      },
    });

    // Add styles programmatically (no CSS file needed)
    Object.assign(cursorElement.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: `${CONFIG.cursor.size}px`,
      height: `${CONFIG.cursor.size}px`,
      borderRadius: "50%",
      backgroundColor: "rgba(42, 157, 143, 0.5)",
      border: "2px solid rgba(42, 157, 143, 0.8)",
      pointerEvents: "none",
      zIndex: "9999",
      transform: "translate(-50%, -50%)",
      transition: "width 0.2s, height 0.2s, opacity 0.2s",
      opacity: "0",
      mixBlendMode: "difference",
    });

    document.body.appendChild(cursorElement);
  };

  /**
   * Update cursor position with smooth following
   */
  const updatePosition = () => {
    if (!isActive) return;

    // Calculate target position (with magnetic effect if applicable)
    let targetX = mouseX;
    let targetY = mouseY;

    if (magnetTarget) {
      const rect = magnetTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Apply magnetic pull
      targetX += (centerX - mouseX) * magnetStrength;
      targetY += (centerY - mouseY) * magnetStrength;
    }

    // Smooth exponential easing (lerp)
    cursorX += (targetX - cursorX) * CONFIG.cursor.smoothness;
    cursorY += (targetY - cursorY) * CONFIG.cursor.smoothness;

    // Apply transform
    cursorElement.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;

    // Update state
    State.set("cursorPosition", { x: cursorX, y: cursorY }, true);

    // Continue animation loop
    rafId = raf(updatePosition);
  };

  /**
   * Handle mouse move
   */
  const handleMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Show cursor on first move
    if (cursorElement.style.opacity === "0") {
      cursorElement.style.opacity = "1";
    }
  };

  /**
   * Handle mouse enter on interactive elements
   */
  const handleMouseEnter = (e) => {
    if (!isActive) return;

    // Scale up cursor
    cursorElement.style.width = `${CONFIG.cursor.size * 1.5}px`;
    cursorElement.style.height = `${CONFIG.cursor.size * 1.5}px`;
    cursorElement.style.backgroundColor = "rgba(42, 157, 143, 0.2)";

    // Set magnetic target
    magnetTarget = e.currentTarget;

    // Emit event
    EventBus.emit("cursor:hover", { element: e.currentTarget });
  };

  /**
   * Handle mouse leave on interactive elements
   */
  const handleMouseLeave = () => {
    if (!isActive) return;

    // Reset cursor size
    cursorElement.style.width = `${CONFIG.cursor.size}px`;
    cursorElement.style.height = `${CONFIG.cursor.size}px`;
    cursorElement.style.backgroundColor = "rgba(42, 157, 143, 0.5)";

    // Clear magnetic target
    magnetTarget = null;

    // Emit event
    EventBus.emit("cursor:leave");
  };

  /**
   * Attach hover listeners to interactive elements
   */
  const attachHoverListeners = () => {
    // Select all interactive elements
    const interactiveSelectors = [
      "a",
      "button",
      ".skill-badge",
      ".social-icon",
      ".grid-square",
      ".browser-controls span",
      ".window-controls span",
    ];

    interactiveSelectors.forEach((selector) => {
      const elements = DOM.qsa(selector);
      elements.forEach((element) => {
        element.addEventListener("mouseenter", handleMouseEnter);
        element.addEventListener("mouseleave", handleMouseLeave);
      });
    });
  };

  /**
   * Hide default cursor
   */
  const hideDefaultCursor = () => {
    const style = DOM.create("style");
    style.textContent = `
      * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);
  };

  /**
   * Initialize cursor
   */
  const init = () => {
    // Check feature flag
    if (!CONFIG.features.cursor) return;

    // Check reduced motion
    if (CONFIG.animation.reducedMotion) {
      console.log("⚡ Custom cursor disabled (reduced motion)");
      return;
    }

    // Check if touch device
    if ("ontouchstart" in window) {
      console.log("⚡ Custom cursor disabled (touch device)");
      return;
    }

    createCursor();
    hideDefaultCursor();
    attachHoverListeners();

    // Start tracking
    window.addEventListener("mousemove", handleMouseMove);

    // Start animation loop
    isActive = true;
    updatePosition();

    console.log("🖱️ Custom cursor initialized");
  };

  /**
   * Destroy cursor
   */
  const destroy = () => {
    if (rafId) {
      cancelRaf(rafId);
    }

    if (cursorElement) {
      cursorElement.remove();
    }

    window.removeEventListener("mousemove", handleMouseMove);
    isActive = false;
  };

  // Public API
  return {
    init,
    destroy,
  };
})();

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = CustomCursor;
}
