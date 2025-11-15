/**
 * Miscellaneous UI Effects
 *
 * Small polish features for various sections.
 *
 * Features:
 * - Skill badge hover animations
 * - Social icon effects (delegated to other features)
 * - Browser window effects
 *
 * @author Guna Palanivel
 * @version 1.0.0
 */

const MiscEffects = (() => {
  /**
   * Add CSS for skill badges
   */
  const addSkillBadgeStyles = () => {
    const style = DOM.create("style");
    style.textContent = `
      .skill-badge {
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        cursor: pointer;
        position: relative;
      }
      
      .skill-badge:hover {
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 4px 12px rgba(42, 157, 143, 0.3);
      }
      
      .skill-badge:active {
        transform: translateY(-1px) scale(1.02);
      }

      /* Ripple effect on click */
      .skill-badge::after {
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
      
      .skill-badge.ripple::after {
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    `;
    document.head.appendChild(style);
  };

  /**
   * Handle skill badge click (ripple effect)
   */
  const handleSkillBadgeClick = (e) => {
    const badge = e.currentTarget;

    // Add ripple class
    badge.classList.add("ripple");

    // Remove after animation
    setTimeout(() => {
      badge.classList.remove("ripple");
    }, 600);

    // Emit event (could show proficiency modal in future)
    EventBus.emit("skill:click", {
      skill: badge.textContent.trim(),
    });
  };

  /**
   * Initialize skill badge effects
   */
  const initSkillBadges = () => {
    const badges = DOM.qsa(CONFIG.selectors.skillBadges);

    badges.forEach((badge) => {
      badge.addEventListener("click", handleSkillBadgeClick);
    });

    console.log(`🎯 Skill badges initialized (${badges.length} badges)`);
  };

  /**
   * Initialize all misc effects
   */
  const init = () => {
    addSkillBadgeStyles();
    initSkillBadges();

    console.log("✨ Misc effects initialized");
  };

  /**
   * Destroy misc effects
   */
  const destroy = () => {
    const badges = DOM.qsa(CONFIG.selectors.skillBadges);
    badges.forEach((badge) => {
      badge.removeEventListener("click", handleSkillBadgeClick);
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
  module.exports = MiscEffects;
}
