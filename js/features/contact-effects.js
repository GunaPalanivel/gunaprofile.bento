/**
 * Contact Section Interactive Effects
 *
 * Copy-to-clipboard for email and ripple effects for social icons.
 *
 * Features:
 * - Click email to copy to clipboard
 * - Toast notification on copy
 * - Ripple effect on social icons
 * - Hover animations
 *
 * @author Guna Palanivel
 * @version 1.0.0
 */

const ContactEffects = (() => {
  const EMAIL = "guna.devcontact@gmail.com";

  /**
   * Add styles
   */
  const addStyles = () => {
    const style = DOM.create("style");
    style.textContent = `
      /* Social icon ripple */
      .social-icon {
        position: relative;
        overflow: hidden;
        transition: transform 0.3s ease;
      }
      
      .social-icon:hover {
        transform: scale(1.1);
      }
      
      .social-icon:active {
        transform: scale(0.95);
      }
      
      .social-icon::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s, opacity 0.6s;
        opacity: 0;
      }
      
      .social-icon.ripple::after {
        width: 200%;
        height: 200%;
        opacity: 0;
      }
      
      /* Email clickable */
      .gmail-icon {
        cursor: copy;
      }
      
      /* Copy toast */
      .copy-toast {
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: #2a9d8f;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(42, 157, 143, 0.3);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        z-index: 10000;
        animation: slideInDown 0.3s ease-out;
        font-size: 0.875rem;
      }
      
      .copy-toast.hiding {
        animation: slideOutUp 0.3s ease-out;
      }
      
      @keyframes slideInDown {
        from {
          opacity: 0;
          transform: translateY(-100px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes slideOutUp {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(-100px);
        }
      }
      
      @media (max-width: 768px) {
        .copy-toast {
          top: 1rem;
          right: 1rem;
          left: 1rem;
        }
      }
    `;
    document.head.appendChild(style);
  };

  /**
   * Show toast notification
   */
  const showToast = (message, icon) => {
    const toast = DOM.create("div", {
      className: "copy-toast",
      html: `<span style="font-size: 1.5rem;">${icon}</span><span>${message}</span>`,
    });

    document.body.appendChild(toast);

    // Auto hide after 2.5 seconds
    setTimeout(() => {
      toast.classList.add("hiding");
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  };

  /**
   * Copy text to clipboard
   */
  const copyToClipboard = async (text) => {
    try {
      // Modern Clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }

      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand("copy");
      document.body.removeChild(textarea);
      return success;
    } catch (error) {
      console.error("Copy failed:", error);
      return false;
    }
  };

  /**
   * Handle email icon click
   */
  const handleEmailClick = async (e) => {
    e.preventDefault();

    const success = await copyToClipboard(EMAIL);

    if (success) {
      showToast("Email copied to clipboard!", "📋");
      EventBus.emit("contact:email-copied", { email: EMAIL });
      console.log("📋 Email copied to clipboard");
    } else {
      showToast("Copy failed. Email: " + EMAIL, "❌");
    }
  };

  /**
   * Handle social icon click (ripple effect)
   */
  const handleSocialClick = (e) => {
    const icon = e.currentTarget;

    // Add ripple class
    icon.classList.add("ripple");

    // Remove after animation
    setTimeout(() => {
      icon.classList.remove("ripple");
    }, 600);

    // Track click
    const platform = icon.getAttribute("title") || "Unknown";
    EventBus.emit("contact:social-click", { platform });
  };

  /**
   * Initialize contact effects
   */
  const init = () => {
    addStyles();

    // Email icon (Gmail)
    const emailIcon = DOM.qs(".gmail-icon");
    if (emailIcon) {
      emailIcon.addEventListener("click", handleEmailClick);
      console.log("📧 Email copy-to-clipboard initialized");
    }

    // Social icons (all)
    const socialIcons = DOM.qsa(CONFIG.selectors.socialIcons);
    socialIcons.forEach((icon) => {
      icon.addEventListener("click", handleSocialClick);
    });

    console.log(
      `✨ Contact effects initialized (${socialIcons.length} social icons)`
    );
  };

  /**
   * Destroy contact effects
   */
  const destroy = () => {
    const emailIcon = DOM.qs(".gmail-icon");
    if (emailIcon) {
      emailIcon.removeEventListener("click", handleEmailClick);
    }

    const socialIcons = DOM.qsa(CONFIG.selectors.socialIcons);
    socialIcons.forEach((icon) => {
      icon.removeEventListener("click", handleSocialClick);
    });
  };

  // Public API
  return {
    init,
    destroy,
  };
})();

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = ContactEffects;
}
