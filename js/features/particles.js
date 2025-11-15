/**
 * Particle Trail System
 *
 * Canvas-based particle system that follows cursor movement.
 * Creates trailing particles with fade-out and physics.
 *
 * Features:
 * - Canvas rendering for performance
 * - Particle pooling (reuse particles)
 * - Fade out over lifetime
 * - Random size and velocity variation
 * - Respects reduced motion
 *
 * @author Guna Palanivel
 * @version 1.0.0
 */

const ParticleSystem = (() => {
  let canvas = null;
  let ctx = null;
  let particles = [];
  let rafId = null;
  let isActive = false;
  let lastEmitTime = 0;
  const emitInterval = 30; // Emit particle every 30ms

  // Particle pool for performance
  class Particle {
    constructor(x, y) {
      this.reset(x, y);
    }

    reset(x, y) {
      this.x = x;
      this.y = y;
      this.size = CONFIG.particles.size + Math.random() * 3;
      this.life = CONFIG.particles.lifetime;
      this.maxLife = CONFIG.particles.lifetime;
      this.velocityX = (Math.random() - 0.5) * 2;
      this.velocityY = (Math.random() - 0.5) * 2;
      this.active = true;
    }

    update(deltaTime) {
      if (!this.active) return;

      // Update position
      this.x += this.velocityX;
      this.y += this.velocityY;

      // Apply friction
      this.velocityX *= 0.98;
      this.velocityY *= 0.98;

      // Update lifetime
      this.life -= deltaTime;

      if (this.life <= 0) {
        this.active = false;
      }
    }

    draw() {
      if (!this.active) return;

      const opacity = this.life / this.maxLife;
      const color = CONFIG.particles.color;

      // Parse hex color to RGB
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * opacity, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /**
   * Create canvas element
   */
  const createCanvas = () => {
    canvas = DOM.create("canvas", {
      className: "particle-canvas",
      attributes: {
        "aria-hidden": "true",
      },
    });

    // Style canvas
    Object.assign(canvas.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: "9998", // Below cursor
    });

    // Set canvas size
    resizeCanvas();

    // Get context
    ctx = canvas.getContext("2d");

    document.body.appendChild(canvas);
  };

  /**
   * Resize canvas to window size
   */
  const resizeCanvas = () => {
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  /**
   * Get or create particle from pool
   */
  const getParticle = (x, y) => {
    // Find inactive particle to reuse
    const inactiveParticle = particles.find((p) => !p.active);

    if (inactiveParticle) {
      inactiveParticle.reset(x, y);
      return inactiveParticle;
    }

    // Create new particle if under limit
    if (particles.length < CONFIG.particles.count) {
      const particle = new Particle(x, y);
      particles.push(particle);
      return particle;
    }

    return null;
  };

  /**
   * Emit particle at cursor position
   */
  const emitParticle = () => {
    const cursorPos = State.get("cursorPosition");
    if (!cursorPos) return;

    const now = Date.now();
    if (now - lastEmitTime < emitInterval) return;

    getParticle(cursorPos.x, cursorPos.y);
    lastEmitTime = now;
  };

  /**
   * Animation loop
   */
  let lastTime = performance.now();

  const animate = () => {
    if (!isActive) return;

    const currentTime = performance.now();
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Emit particle if cursor moved
    if (State.get("cursorVisible")) {
      emitParticle();
    }

    // Update and draw particles
    particles.forEach((particle) => {
      particle.update(deltaTime);
      particle.draw();
    });

    // Continue loop
    rafId = raf(animate);
  };

  /**
   * Handle window resize
   */
  const handleResize = debounce(() => {
    resizeCanvas();
  }, 250);

  /**
   * Initialize particle system
   */
  const init = () => {
    // Check feature flag
    if (!CONFIG.features.particles) return;

    // Check reduced motion
    if (CONFIG.animation.reducedMotion) {
      console.log("⚡ Particles disabled (reduced motion)");
      return;
    }

    // Check if touch device (optional - particles can work on touch)
    if ("ontouchstart" in window) {
      console.log("⚡ Particles disabled (touch device)");
      return;
    }

    createCanvas();

    // Listen for resize
    window.addEventListener("resize", handleResize);

    // Start animation
    isActive = true;
    animate();

    console.log("🌟 Particle system initialized");
  };

  /**
   * Destroy particle system
   */
  const destroy = () => {
    if (rafId) {
      cancelRaf(rafId);
    }

    if (canvas) {
      canvas.remove();
    }

    window.removeEventListener("resize", handleResize);
    particles = [];
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
  module.exports = ParticleSystem;
}
