/**
 * Projects Section Interactive Effects
 *
 * Working browser window controls (minimize/maximize).
 *
 * @author Guna Palanivel
 * @version 1.0.0
 */

const ProjectsEffects = (() => {
  let isMinimized = false;
  let isMaximized = false;

  /**
   * Add styles
   */
  const addStyles = () => {
    const style = DOM.create("style");
    style.textContent = `
      .browser-controls span {
        cursor: pointer;
        transition: transform 0.2s, opacity 0.2s;
      }
      
      .browser-controls span:hover {
        transform: scale(1.2);
      }
      
      .browser-controls span:active {
        transform: scale(0.9);
      }
      
      .browser-window {
        transition: all 0.3s ease;
      }
      
      .browser-window.minimized .browser-content {
        max-height: 0;
        opacity: 0;
        overflow: hidden;
      }
      
      .browser-window.maximized {
        transform: scale(1.05);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      }
    `;
    document.head.appendChild(style);
  };

  /**
   * Handle minimize click
   */
  const handleMinimize = () => {
    const browserWindow = DOM.qs(".browser-window");
    if (!browserWindow) return;

    isMinimized = !isMinimized;
    browserWindow.classList.toggle("minimized", isMinimized);

    EventBus.emit("projects:minimize", { minimized: isMinimized });
    console.log(`🪟 Projects ${isMinimized ? "minimized" : "restored"}`);
  };

  /**
   * Handle maximize click
   */
  const handleMaximize = () => {
    const browserWindow = DOM.qs(".browser-window");
    if (!browserWindow) return;

    isMaximized = !isMaximized;
    browserWindow.classList.toggle("maximized", isMaximized);

    EventBus.emit("projects:maximize", { maximized: isMaximized });
    console.log(`🪟 Projects ${isMaximized ? "maximized" : "restored"}`);
  };

  /**
   * Initialize projects effects
   */
  const init = () => {
    addStyles();

    const browserControls = DOM.qs(".browser-controls");
    if (!browserControls) {
      console.warn("⚠️ Browser controls not found");
      return;
    }

    // Get control buttons
    const controls = browserControls.querySelectorAll("span");
    if (controls.length < 3) return;

    const [closeBtn, minimizeBtn, maximizeBtn] = controls;

    // Add event listeners
    minimizeBtn.addEventListener("click", handleMinimize);
    maximizeBtn.addEventListener("click", handleMaximize);

    console.log("🪟 Browser window controls initialized");
  };

  /**
   * Destroy projects effects
   */
  const destroy = () => {
    const browserControls = DOM.qs(".browser-controls");
    if (!browserControls) return;

    const controls = browserControls.querySelectorAll("span");
    if (controls.length < 3) return;

    const [, minimizeBtn, maximizeBtn] = controls;
    minimizeBtn.removeEventListener("click", handleMinimize);
    maximizeBtn.removeEventListener("click", handleMaximize);
  };

  // Public API
  return {
    init,
    destroy,
  };
})();

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = ProjectsEffects;
}
