/**
 * Feature Discovery Hints
 *
 * Notifies users about keyboard shortcuts and dark mode.
 * Shows on first visit, dismissible, uses localStorage.
 *
 * @author Guna Palanivel
 * @version 1.0.0
 */

const FeatureHints = (() => {
  const STORAGE_KEY = "portfolio-hints-dismissed";
  const HINT_DELAY = 3000; // Show after 3 seconds

  /**
   * Add styles
   */
  const addStyles = () => {
    const style = DOM.create("style");
    style.textContent = `
      /* Hint badge */
      .feature-hint-badge {
        position: fixed;
        bottom: 2rem;
        left: 2rem;
        background: linear-gradient(135deg, #2a9d8f 0%, #264653 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(42, 157, 143, 0.4);
        z-index: 9999;
        cursor: pointer;
        animation: slideInLeft 0.5s ease-out, pulse 2s ease-in-out 1s infinite;
        max-width: 300px;
        border: 2px solid rgba(255, 255, 255, 0.2);
      }
      
      .feature-hint-badge:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 20px rgba(42, 157, 143, 0.6);
      }
      
      .hint-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.5rem;
      }
      
      .hint-title {
        font-size: 1rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      .hint-close {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        line-height: 1;
        transition: all 0.2s;
      }
      
      .hint-close:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: rotate(90deg);
      }
      
      .hint-content {
        font-size: 0.875rem;
        line-height: 1.5;
        margin-bottom: 0.75rem;
      }
      
      .hint-shortcuts {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        margin-top: 0.5rem;
      }
      
      .hint-key {
        background: rgba(255, 255, 255, 0.2);
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-family: monospace;
        font-size: 0.75rem;
        border: 1px solid rgba(255, 255, 255, 0.3);
      }
      
      .hint-action {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.75rem;
      }
      
      .hint-btn {
        flex: 1;
        padding: 0.5rem;
        border: 1px solid rgba(255, 255, 255, 0.3);
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: 600;
        transition: all 0.2s;
      }
      
      .hint-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.5);
      }
      
      .hint-btn.primary {
        background: rgba(255, 255, 255, 0.9);
        color: #2a9d8f;
      }
      
      .hint-btn.primary:hover {
        background: white;
      }
      
      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-100px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes pulse {
        0%, 100% {
          box-shadow: 0 4px 16px rgba(42, 157, 143, 0.4);
        }
        50% {
          box-shadow: 0 4px 24px rgba(42, 157, 143, 0.7);
        }
      }
      
      .feature-hint-badge.hiding {
        animation: slideOutLeft 0.3s ease-out forwards;
      }
      
      @keyframes slideOutLeft {
        to {
          opacity: 0;
          transform: translateX(-100px);
        }
      }
      
      /* Mobile responsive */
      @media (max-width: 768px) {
        .feature-hint-badge {
          bottom: 1rem;
          left: 1rem;
          right: 1rem;
          max-width: none;
        }
        
        .hint-shortcuts {
          justify-content: center;
        }
      }
      
      /* Keyboard icon badge (permanent) */
      .keyboard-icon-badge {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #2a9d8f 0%, #264653 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(42, 157, 143, 0.4);
        z-index: 9998;
        transition: all 0.3s;
        animation: fadeIn 0.5s ease-out 5s backwards;
      }
      
      .keyboard-icon-badge:hover {
        transform: scale(1.1) rotate(5deg);
        box-shadow: 0 6px 20px rgba(42, 157, 143, 0.6);
      }
      
      .keyboard-icon-badge:active {
        transform: scale(0.95);
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0); }
        to { opacity: 1; transform: scale(1); }
      }
      
      @media (max-width: 768px) {
        .keyboard-icon-badge {
          bottom: 1rem;
          right: 1rem;
          width: 45px;
          height: 45px;
          font-size: 1.3rem;
        }
      }
    `;
    document.head.appendChild(style);
  };

  /**
   * Create hint badge
   */
  const createHintBadge = () => {
    const badge = DOM.create("div", {
      className: "feature-hint-badge",
      html: `
        <div class="hint-header">
          <div class="hint-title">
            <span>💡</span>
            <span>Pro Tips</span>
          </div>
          <button class="hint-close" aria-label="Close hint">×</button>
        </div>
        <div class="hint-content">
          Unlock hidden features with keyboard shortcuts!
        </div>
        <div class="hint-shortcuts">
          <span class="hint-key">?</span>
          <span style="color: rgba(255,255,255,0.7);">View shortcuts</span>
        </div>
        <div class="hint-shortcuts">
          <span class="hint-key">Ctrl+D</span>
          <span style="color: rgba(255,255,255,0.7);">Dark mode</span>
        </div>
        <div class="hint-shortcuts">
          <span class="hint-key">1-8</span>
          <span style="color: rgba(255,255,255,0.7);">Navigate sections</span>
        </div>
        <div class="hint-action">
          <button class="hint-btn primary">Got it!</button>
        </div>
      `,
    });

    document.body.appendChild(badge);

    // Add event listeners
    const closeBtn = badge.querySelector(".hint-close");
    const gotItBtn = badge.querySelector(".hint-btn.primary");

    const dismiss = () => {
      badge.classList.add("hiding");
      setTimeout(() => badge.remove(), 300);
      localStorage.setItem(STORAGE_KEY, "true");

      // Show permanent keyboard icon after dismissing
      showKeyboardIcon();
    };

    closeBtn.addEventListener("click", dismiss);
    gotItBtn.addEventListener("click", dismiss);

    // Click anywhere on badge to show shortcuts
    badge.addEventListener("click", (e) => {
      if (e.target === badge || e.target.closest(".hint-content")) {
        KeyboardShortcuts.showOverlay();
      }
    });

    return badge;
  };

  /**
   * Create permanent keyboard icon badge
   */
  const createKeyboardIcon = () => {
    const icon = DOM.create("div", {
      className: "keyboard-icon-badge",
      html: "⌨️",
      attributes: {
        title: "Keyboard shortcuts (Press ?)",
        "aria-label": "Show keyboard shortcuts",
      },
    });

    icon.addEventListener("click", () => {
      KeyboardShortcuts.showOverlay();
    });

    document.body.appendChild(icon);
    return icon;
  };

  /**
   * Show keyboard icon
   */
  const showKeyboardIcon = () => {
    // Only show if not already present
    if (!document.querySelector(".keyboard-icon-badge")) {
      createKeyboardIcon();
    }
  };

  /**
   * Show hint badge
   */
  const showHint = () => {
    // Check if already dismissed
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed === "true") {
      // Show permanent icon instead
      showKeyboardIcon();
      return;
    }

    // Show hint after delay
    setTimeout(() => {
      createHintBadge();
    }, HINT_DELAY);
  };

  /**
   * Initialize feature hints
   */
  const init = () => {
    addStyles();
    showHint();

    console.log("💡 Feature hints initialized");
  };

  /**
   * Destroy feature hints
   */
  const destroy = () => {
    const badge = document.querySelector(".feature-hint-badge");
    const icon = document.querySelector(".keyboard-icon-badge");

    if (badge) badge.remove();
    if (icon) icon.remove();
  };

  // Public API
  return {
    init,
    destroy,
    showHint,
  };
})();

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = FeatureHints;
}
