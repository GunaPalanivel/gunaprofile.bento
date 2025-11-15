/**
 * Work Section Effects
 *
 * Additional interactions for work experience section.
 *
 * @author Guna Palanivel
 * @version 1.0.0
 */

const WorkEffects = (() => {
  /**
   * Randomize grid colors
   */
  const randomizeColors = () => {
    const colors = ["#207a70", "#3ac6b5", "#2a9d8f", "#64e1d1"];
    const squares = DOM.qsa(".grid-square");

    squares.forEach((square) => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      square.style.backgroundColor = randomColor;
    });

    EventBus.emit("work:colors-randomized");
    console.log("🎨 Work grid colors randomized");
  };

  /**
   * Initialize work effects
   */
  const init = () => {
    // Double-click work section to randomize colors
    const workCard = DOM.qs(".work-card");
    if (workCard) {
      workCard.addEventListener("dblclick", randomizeColors);
      console.log("🎨 Work effects initialized (double-click to randomize)");
    }
  };

  /**
   * Destroy work effects
   */
  const destroy = () => {
    const workCard = DOM.qs(".work-card");
    if (workCard) {
      workCard.removeEventListener("dblclick", randomizeColors);
    }
  };

  // Public API
  return {
    init,
    destroy,
    randomizeColors,
  };
})();

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = WorkEffects;
}
