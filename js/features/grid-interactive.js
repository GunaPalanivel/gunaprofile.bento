/**
 * Interactive Grid Squares
 *
 * Adds wave effect and color animations to the 80 grid squares
 * in the work experience section. Uses event delegation for performance.
 *
 * Features:
 * - Wave propagation effect on hover
 * - Color shift animation
 * - Scale animation
 * - Event delegation (1 listener for 80 squares)
 * - Debounced interaction
 *
 * @author Guna Palanivel
 * @version 1.0.0
 */

const GridInteractive = (() => {
  let gridContainer = null;
  let gridSquares = [];
  let isActive = false;

  // Color palette for animations
  const colors = ["#207a70", "#3ac6b5", "#2a9d8f", "#64e1d1"];

  /**
   * Calculate grid position from index
   * @param {number} index - Square index (0-79)
   * @returns {Object} {row, col, gridIndex}
   */
  const getGridPosition = (index) => {
    // Each grid has 20 squares (5 cols × 4 rows)
    const gridIndex = Math.floor(index / 20); // 0-3 (which grid)
    const squareInGrid = index % 20;
    const row = Math.floor(squareInGrid / 5);
    const col = squareInGrid % 5;

    return { row, col, gridIndex };
  };

  /**
   * Calculate distance between two grid positions
   */
  const getDistance = (pos1, pos2) => {
    const dx = pos1.col - pos2.col;
    const dy = pos1.row - pos2.row;
    return Math.sqrt(dx * dx + dy * dy);
  };

  /**
   * Create wave effect from clicked square
   */
  const createWave = (clickedIndex) => {
    const clickedPos = getGridPosition(clickedIndex);

    gridSquares.forEach((square, index) => {
      const currentPos = getGridPosition(index);

      // Only affect squares in the same grid
      if (currentPos.gridIndex !== clickedPos.gridIndex) return;

      const distance = getDistance(clickedPos, currentPos);
      const delay = distance * CONFIG.grid.waveSpeed;

      // Animate with delay
      setTimeout(() => {
        animateSquare(square, distance);
      }, delay);
    });

    // Emit event
    EventBus.emit("grid:wave", { index: clickedIndex });
  };

  /**
   * Animate individual square
   */
  const animateSquare = (square, distance) => {
    const originalColor = square.style.backgroundColor;
    const originalTransform = square.style.transform || "scale(1)";

    // Random color from palette
    const newColor = colors[Math.floor(Math.random() * colors.length)];

    // Scale based on distance (closer = bigger)
    const scale = CONFIG.grid.hoverScale - distance * 0.05;
    const clampedScale = Math.max(1, Math.min(scale, CONFIG.grid.hoverScale));

    // Apply animation
    square.style.transition = "all 0.3s ease-out";
    square.style.backgroundColor = newColor;
    square.style.transform = `scale(${clampedScale})`;

    // Reset after animation
    setTimeout(() => {
      square.style.backgroundColor = originalColor;
      square.style.transform = originalTransform;
    }, 300);
  };

  /**
   * Handle square click with event delegation
   */
  const handleSquareClick = (e) => {
    if (!e.target.classList.contains("grid-square")) return;

    const clickedSquare = e.target;
    const index = gridSquares.indexOf(clickedSquare);

    if (index !== -1) {
      createWave(index);
    }
  };

  /**
   * Handle square hover
   */
  const handleSquareHover = (e) => {
    if (!e.target.classList.contains("grid-square")) return;

    const square = e.target;

    // Subtle scale on hover
    square.style.transition = "transform 0.2s ease-out";
    square.style.transform = "scale(1.05)";
  };

  /**
   * Handle square leave
   */
  const handleSquareLeave = (e) => {
    if (!e.target.classList.contains("grid-square")) return;

    const square = e.target;
    square.style.transform = "scale(1)";
  };

  /**
   * Add CSS for grid squares
   */
  const addStyles = () => {
    const style = DOM.create("style");
    style.textContent = `
      .grid-square {
        cursor: pointer;
        will-change: transform, background-color;
      }
      
      .grid-square:active {
        transform: scale(0.95) !important;
      }
    `;
    document.head.appendChild(style);
  };

  /**
   * Initialize grid interaction
   */
  const init = () => {
    // Check feature flag
    if (!CONFIG.features.gridInteractive) return;

    // Find grid container
    gridContainer = DOM.qs(".work-card");
    if (!gridContainer) {
      console.warn("⚠️ Grid container not found");
      return;
    }

    // Get all grid squares
    gridSquares = Array.from(DOM.qsa(CONFIG.selectors.gridSquares));

    if (gridSquares.length === 0) {
      console.warn("⚠️ No grid squares found");
      return;
    }

    // Add styles
    addStyles();

    // Use event delegation (1 listener for all squares)
    gridContainer.addEventListener("click", handleSquareClick);
    gridContainer.addEventListener("mouseover", handleSquareHover);
    gridContainer.addEventListener("mouseout", handleSquareLeave);

    isActive = true;

    console.log(
      `📊 Grid interactive initialized (${gridSquares.length} squares)`
    );
  };

  /**
   * Destroy grid interaction
   */
  const destroy = () => {
    if (gridContainer) {
      gridContainer.removeEventListener("click", handleSquareClick);
      gridContainer.removeEventListener("mouseover", handleSquareHover);
      gridContainer.removeEventListener("mouseout", handleSquareLeave);
    }

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
  module.exports = GridInteractive;
}
