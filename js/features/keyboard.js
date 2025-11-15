/**
 * Keyboard Shortcuts System
 *
 * Provides keyboard navigation and shortcuts overlay.
 * VSCode-inspired command palette UX.
 *
 * Features:
 * - Keyboard shortcut registry
 * - Shortcuts help overlay (Press '?')
 * - Section navigation (1-8 keys)
 * - Dark mode toggle (Ctrl+D)
 * - Performance dashboard (Ctrl+Shift+P)
 * - Escape to close overlays
 *
 * @author Guna Palanivel
 * @version 1.0.0
 */

const KeyboardShortcuts = (() => {
  let overlayElement = null;
  let isOverlayVisible = false;
  let shortcuts = {};

  // Section mapping
  const sectionMap = {
    1: "hero-card",
    2: "projects-card",
    3: "education-card",
    4: "work-card",
    5: "blog-card",
    6: "resume-card",
    7: "contact-card",
    8: "misc-card",
  };

  /**
   * Create shortcuts overlay
   */
  const createOverlay = () => {
    overlayElement = DOM.create("div", {
      className: "keyboard-shortcuts-overlay",
      attributes: {
        role: "dialog",
        "aria-label": "Keyboard shortcuts",
        "aria-hidden": "true",
      },
    });

    const content = `
      <div class="shortcuts-modal">
        <div class="shortcuts-header">
          <h2>⌨️ Keyboard Shortcuts</h2>
          <button class="close-button" aria-label="Close shortcuts">×</button>
        </div>
        <div class="shortcuts-content">
          <div class="shortcuts-section">
            <h3>Navigation</h3>
            <div class="shortcut-item">
              <kbd>1</kbd> - <kbd>8</kbd>
              <span>Jump to sections</span>
            </div>
            <div class="shortcut-item">
              <kbd>↑</kbd> <kbd>↓</kbd>
              <span>Scroll page</span>
            </div>
          </div>
          
          <div class="shortcuts-section">
            <h3>Appearance</h3>
            <div class="shortcut-item">
              <kbd>Ctrl</kbd> + <kbd>D</kbd>
              <span>Toggle dark mode</span>
            </div>
          </div>
          
          <div class="shortcuts-section">
            <h3>Developer</h3>
            <div class="shortcut-item">
              <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>
              <span>Performance dashboard</span>
            </div>
          </div>
          
          <div class="shortcuts-section">
            <h3>Help</h3>
            <div class="shortcut-item">
              <kbd>?</kbd>
              <span>Show this help</span>
            </div>
            <div class="shortcut-item">
              <kbd>Esc</kbd>
              <span>Close overlays</span>
            </div>
          </div>
        </div>
        <div class="shortcuts-footer">
          <p>💡 Tip: Most shortcuts work from anywhere on the page</p>
        </div>
      </div>
      <div class="shortcuts-backdrop"></div>
    `;

    overlayElement.innerHTML = content;
    document.body.appendChild(overlayElement);

    // Add click handlers
    const closeButton = overlayElement.querySelector(".close-button");
    const backdrop = overlayElement.querySelector(".shortcuts-backdrop");

    closeButton.addEventListener("click", hideOverlay);
    backdrop.addEventListener("click", hideOverlay);

    // Add styles
    addOverlayStyles();
  };

  /**
   * Add CSS for shortcuts overlay
   */
  const addOverlayStyles = () => {
    const style = DOM.create("style");
    style.textContent = `
      .keyboard-shortcuts-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: none;
        align-items: center;
        justify-content: center;
      }
      
      .keyboard-shortcuts-overlay.visible {
        display: flex;
        animation: fadeIn 0.2s ease-out;
      }
      
      .shortcuts-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(4px);
      }
      
      .shortcuts-modal {
        position: relative;
        background: white;
        border-radius: 12px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        z-index: 10001;
        animation: slideUp 0.3s ease-out;
      }
      
      .shortcuts-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 2px solid #e0e0e0;
      }
      
      .shortcuts-header h2 {
        margin: 0;
        font-size: 1.5rem;
        color: #264653;
      }
      
      .close-button {
        background: none;
        border: none;
        font-size: 2rem;
        color: #666;
        cursor: pointer;
        padding: 0;
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        transition: all 0.2s;
      }
      
      .close-button:hover {
        background: #f0f0f0;
        color: #000;
      }
      
      .shortcuts-content {
        padding: 1.5rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
      }
      
      .shortcuts-section h3 {
        margin: 0 0 0.75rem 0;
        font-size: 0.875rem;
        text-transform: uppercase;
        color: #2a9d8f;
        font-weight: 600;
        letter-spacing: 0.5px;
      }
      
      .shortcut-item {
        display: flex;
        align-items: center;
        margin-bottom: 0.75rem;
        gap: 0.5rem;
      }
      
      .shortcut-item kbd {
        background: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 0.25rem 0.5rem;
        font-family: monospace;
        font-size: 0.875rem;
        box-shadow: 0 2px 0 #ccc;
        min-width: 2rem;
        text-align: center;
      }
      
      .shortcut-item span {
        color: #666;
        font-size: 0.875rem;
      }
      
      .shortcuts-footer {
        padding: 1rem 1.5rem;
        background: #f9f9f9;
        border-top: 2px solid #e0e0e0;
        border-radius: 0 0 12px 12px;
      }
      
      .shortcuts-footer p {
        margin: 0;
        color: #666;
        font-size: 0.875rem;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      /* Dark mode support */
      .dark-mode .shortcuts-modal {
        background: #1a1a1a;
        color: #e0e0e0;
      }
      
      .dark-mode .shortcuts-header {
        border-bottom-color: #333;
      }
      
      .dark-mode .shortcuts-header h2 {
        color: #64e1d1;
      }
      
      .dark-mode .close-button {
        color: #aaa;
      }
      
      .dark-mode .close-button:hover {
        background: #333;
        color: #fff;
      }
      
      .dark-mode .shortcut-item kbd {
        background: #2a2a2a;
        border-color: #444;
        box-shadow: 0 2px 0 #444;
      }
      
      .dark-mode .shortcuts-footer {
        background: #222;
        border-top-color: #333;
      }
      
      /* Mobile responsive */
      @media (max-width: 768px) {
        .shortcuts-content {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.appendChild(style);
  };

  /**
   * Show shortcuts overlay
   */
  const showOverlay = () => {
    if (!overlayElement) {
      createOverlay();
    }

    overlayElement.classList.add("visible");
    overlayElement.setAttribute("aria-hidden", "false");
    isOverlayVisible = true;

    // Focus trap
    const closeButton = overlayElement.querySelector(".close-button");
    closeButton.focus();

    // Update state
    State.set("keyboardOverlayVisible", true);
    EventBus.emit("overlay:show", { type: "keyboard-shortcuts" });

    console.log("⌨️ Keyboard shortcuts overlay shown");
  };

  /**
   * Hide shortcuts overlay
   */
  const hideOverlay = () => {
    if (!overlayElement) return;

    overlayElement.classList.remove("visible");
    overlayElement.setAttribute("aria-hidden", "true");
    isOverlayVisible = false;

    // Update state
    State.set("keyboardOverlayVisible", false);
    EventBus.emit("overlay:hide", { type: "keyboard-shortcuts" });
  };

  /**
   * Handle keyboard events
   */
  const handleKeyDown = (e) => {
    const key = e.key.toLowerCase();
    const ctrl = e.ctrlKey || e.metaKey;
    const shift = e.shiftKey;

    // Ignore if typing in input/textarea
    if (e.target.matches("input, textarea")) return;

    // ESC - Close overlays
    if (key === "escape") {
      if (isOverlayVisible) {
        hideOverlay();
        e.preventDefault();
      }
      return;
    }

    // ? - Show keyboard shortcuts
    if (key === "?" && !ctrl) {
      showOverlay();
      e.preventDefault();
      return;
    }

    // Ctrl+D - Toggle dark mode
    if (key === "d" && ctrl) {
      EventBus.emit("keyboard:toggle-dark-mode");
      e.preventDefault();
      return;
    }

    // Ctrl+Shift+P - Performance dashboard
    if (key === "p" && ctrl && shift) {
      EventBus.emit("keyboard:show-performance");
      e.preventDefault();
      return;
    }

    // Number keys 1-8 - Navigate to sections
    if (!ctrl && !shift && sectionMap[key]) {
      EventBus.emit("keyboard:navigate-section", {
        section: sectionMap[key],
        key: key,
      });
      e.preventDefault();
      return;
    }

    // Update last interaction time
    State.set("lastInteraction", Date.now(), true);
  };

  /**
   * Register a keyboard shortcut
   */
  const register = (key, callback, description) => {
    shortcuts[key] = { callback, description };
  };

  /**
   * Unregister a keyboard shortcut
   */
  const unregister = (key) => {
    delete shortcuts[key];
  };

  /**
   * Initialize keyboard shortcuts
   */
  const init = () => {
    // Check feature flag
    if (!CONFIG.features.keyboard) return;

    // Listen for keyboard events
    document.addEventListener("keydown", handleKeyDown);

    // Listen for programmatic show/hide events
    EventBus.on("keyboard:show-help", showOverlay);
    EventBus.on("keyboard:hide-help", hideOverlay);

    console.log("⌨️ Keyboard shortcuts system initialized");
    console.log('💡 Press "?" to see available shortcuts');
  };

  /**
   * Destroy keyboard shortcuts
   */
  const destroy = () => {
    document.removeEventListener("keydown", handleKeyDown);

    if (overlayElement) {
      overlayElement.remove();
    }
  };

  // Public API
  return {
    init,
    destroy,
    showOverlay,
    hideOverlay,
    register,
    unregister,
  };
})();

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = KeyboardShortcuts;
}
