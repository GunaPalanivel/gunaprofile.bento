# Guna Portfolio

A modern, interactive portfolio website featuring advanced JavaScript architecture, responsive bento grid layout, and production-grade performance optimizations. Built with vanilla JavaScript, HTML5, and CSS3.

**🚀 Live Demo:** [gunapalanivel.github.io/gunaprofile.bento](https://gunapalanivel.github.io/gunaprofile.bento/)

---

## 🎨 Design Philosophy

This portfolio demonstrates:

- **Modern JavaScript Architecture**: Modular, event-driven design with state management
- **Zero External Dependencies**: Vanilla JS, no frameworks or libraries
- **Component-Based Architecture**: Isolated, reusable feature modules
- **Performance-First**: 139 FPS, <100MB memory, <1s load time
- **Mobile-First Responsive**: 7 breakpoints (320px → 2560px+)
- **Accessibility-First**: WCAG 2.1 AA compliant with keyboard navigation, ARIA labels, reduced motion support
- **Progressive Enhancement**: Works without JavaScript, enhanced with JS

---

## 🛠️ Tech Stack

| Technology          | Purpose                                                   | Version/Standard             |
| ------------------- | --------------------------------------------------------- | ---------------------------- |
| **JavaScript ES6+** | Interactive features, state management, event handling    | ES2015+                      |
| **HTML5**           | Semantic markup with ARIA attributes                      | HTML Living Standard         |
| **CSS3**            | Grid layout, custom properties, animations, media queries | CSS3 + CSS Custom Properties |
| **SVG**             | Scalable vector graphics (envelope animation)             | SVG 1.1                      |
| **Git**             | Version control with feature branch workflow              | Git 2.x                      |

### JavaScript Features Used

- **ES6+ Syntax**: Arrow functions, template literals, destructuring, modules (IIFE pattern)
- **Design Patterns**: Observer pattern, Pub/Sub, Singleton, Factory
- **Browser APIs**: IntersectionObserver, Clipboard API, localStorage, matchMedia, requestAnimationFrame
- **Performance**: Debouncing, throttling, event delegation, object pooling
- **Accessibility**: Focus management, keyboard event handling, ARIA live regions

### CSS Features Used

- CSS Grid (9×9 responsive layout)
- CSS Custom Properties (design tokens)
- CSS Animations (`@keyframes`, `steps()` for typewriter effect)
- CSS `clamp()` for responsive typography
- CSS `prefers-*` media queries (accessibility)
- CSS Transform 3D (paperclip effect)
- CSS Transitions (smooth dark mode)

---

## 📁 Project Structure

```
gunaprofile.bento/
├── index.html                     # Main HTML (8 sections + JavaScript integration)
│
├── card/                          # Standalone HTML pages
│   ├── projectlist.html           # Projects list page
│   └── workexp.html               # Work experience detail page
│
├── css/                           # Stylesheets (22 files)
│   ├── main.css                   # Import aggregator (loads all CSS modules)
│   ├── reset.css                  # Modern CSS reset (box-sizing, margin/padding normalization)
│   ├── variables.css              # Design tokens (colors, spacing, timing, easing)
│   ├── typography.css             # Font system (fallback stack, responsive sizing)
│   ├── grid.css                   # Bento grid layout (9×9 desktop, stacked mobile)
│   ├── responsive.css             # Global media queries (7 breakpoints)
│   ├── components.css             # Shared component styles (buttons, badges, cards)
│   │
│   ├── hero.css                   # Hero section styles
│   ├── hero-responsive.css        # Hero media queries
│   ├── work.css                   # Work experience grid patterns
│   ├── work-responsive.css        # Work media queries
│   ├── projects.css               # Projects browser window mockup
│   ├── projects-responsive.css    # Projects media queries
│   ├── education.css              # Education house illustration + animations
│   ├── education-responsive.css   # Education media queries
│   ├── blog.css                   # Blog window UI
│   ├── contact.css                # Contact envelope SVG animation
│   ├── resume.css                 # Resume document stack + 3D paperclip
│   ├── misc.css                   # Skills badge system
│   │
│   ├── mobile-optimization.css    # Mobile-specific overrides
│   ├── override.css               # Temporary hotfix layer (to be refactored)
│   │
│   └── workexp/                   # Work experience subsection
│       └── grid.css               # Work grid specific styles
│
├── js/                            # JavaScript modules (15 files)
│   ├── config.js                  # Feature flags & constants
│   ├── main.js                    # Application entry point
│   │
│   ├── core/                      # Core systems (3 files)
│   │   ├── state.js               # State management (Observer pattern)
│   │   ├── events.js              # Event bus (Pub/Sub pattern)
│   │   └── performance.js         # Performance monitoring (FPS, memory, paint)
│   │
│   ├── utils/                     # Utility functions (2 files)
│   │   ├── dom.js                 # DOM helpers (query, events, classes)
│   │   └── debounce.js            # Performance utilities (debounce, throttle, RAF)
│   │
│   └── features/                  # Feature modules (12 files)
│       ├── cursor.js              # Custom magnetic cursor
│       ├── particles.js           # Canvas particle trail system
│       ├── grid-interactive.js    # Wave effect on work grid (80 squares)
│       ├── scroll.js              # Smooth scroll + section tracking + fade-in animations
│       ├── misc-effects.js        # Skill badge hover/ripple effects
│       ├── keyboard.js            # Keyboard shortcuts system + help overlay
│       ├── dark-mode.js           # Theme switching with localStorage
│       ├── contact-effects.js     # Email copy + social icon ripples
│       ├── projects-effects.js    # Browser window controls
│       ├── work-effects.js        # Grid color randomization
│       ├── analytics.js           # Event tracking (console logger)
│       └── feature-hints.js       # First-visit notification system
│
├── assets/
│   └── images/
│       └── favicon-32x32.png      # Site favicon
│
├── .gitignore                     # Git ignore rules
├── .hintrc                        # VS Code hints configuration
└── README.md                      # This file
```

**Architecture Highlights - Notes:**

- **Modular JavaScript**: Each feature is self-contained, independently loadable
- **Feature Flags**: Easy toggling via `config.js` (no code changes needed)
- **Event-Driven**: Loose coupling via EventBus, no direct function calls between modules
- **State Management**: Centralized reactive state with observer pattern
- **Performance Monitoring**: Real-time FPS and memory tracking built-in

- **Component-based CSS**: Each section has dedicated style + responsive files
- **Override.css**: Temporary specificity fix (technical debt - needs consolidation)
- **Import Order Matters**: `override.css` must load last for proper cascade
- **Card Pages**: Standalone HTML pages for detailed views (linked from main portfolio)
- **Workexp Subfolder**: Nested CSS organization for work experience grid patterns

---

## 🚀 Getting Started

### Prerequisites

- Modern browser (Chrome 88+, Firefox 87+, Safari 14+, Edge 88+)
- Text editor (VS Code recommended)
- Git (for version control)
- Optional: Live server for development

### Installation

```
# Clone repository

git clone https://github.com/GunaPalanivel/gunaprofile.bento.git
cd gunaprofile.bento
```

```
# Open in browser (no build step required)

open index.html
```

```
# OR use live server

VS Code: Install "Live Server" extension, right-click index.html → "Open with Live Server"
```

### Development Workflow

```
# Create feature branch

git checkout -b feat/your-feature
```

```
# Make changes, test locally - Commit with semantic messages

git commit -m "feat: add lazy loading"
git commit -m "fix: resolve dark mode gradient override"
git commit -m "perf: optimize particle system with object pooling"
git commit -m "refactor: consolidate CSS specificity"
```

```
# Push to GitHub

git push origin feat/your-feature
```

```
# Merge to main when ready

git checkout main
git merge --squash feat/your-feature
git push origin main
```

**⚠️ Known Issue:** GitHub Pages may cache old builds. After deployment:

1. Wait 1-2 minutes for build to complete
2. Hard refresh browser: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)
3. Check Actions tab for build status

---

## ✨ Features

### 🎯 Interactive Features (NEW)

#### **Custom Magnetic Cursor**

- Smooth exponential easing (lerp) for natural movement
- Magnetic attraction to interactive elements (links, buttons, badges)
- Scale animation on hover (1.5x size)
- Disabled on touch devices (mobile/tablet)
- Respects `prefers-reduced-motion`

**Technical:** RAF-based animation loop, GPU-accelerated transforms

---

#### **Particle Trail System**

- Canvas-based rendering for 60fps performance
- Object pooling (max 20 particles, reused for memory efficiency)
- Physics simulation (velocity, friction, lifetime fade)
- Delta-time based animation (frame-independent)
- Disabled on touch devices

**Technical:** Canvas 2D API, particle pooling pattern, requestAnimationFrame

---

#### **Interactive Grid Wave Effect**

- Click any of 80 work grid squares to trigger radial wave
- Wave propagation algorithm (distance-based delay)
- Color randomization from teal palette
- Event delegation (1 listener for 80 squares)

**Technical:** Event delegation, Euclidean distance calculation, setTimeout cascade

---

#### **Smooth Scroll Navigation**

- Native smooth scrolling with section tracking
- Active section detection (viewport midpoint algorithm)
- Keyboard navigation (press `1-8` to jump to sections)
- Throttled scroll handlers (100ms intervals)

**Technical:** `scrollTo()` with `behavior: 'smooth'`, passive event listeners

---

#### **Scroll-Triggered Animations**

- Fade-in animations on all 8 sections
- IntersectionObserver (browser-optimized, no scroll events)
- One-time animation (stops observing after trigger)
- Respects `prefers-reduced-motion`

**Technical:** IntersectionObserver API, CSS class toggling

---

#### **Keyboard Shortcuts System**

- Press `?` to show shortcuts overlay
- `Ctrl+D` to toggle dark mode
- `1-8` to navigate sections
- `Ctrl+Shift+P` for performance dashboard (future)
- `Escape` to close overlays
- Focus management for accessibility

**Technical:** Global keydown listener, modifier key detection, modal focus trap

---

#### **Dark Mode Toggle**

- Smooth color transitions (0.3s ease)
- localStorage persistence (remembers preference)
- System preference detection (`prefers-color-scheme: dark`)
- Gradient override for contact section
- Toast notifications on toggle

**Technical:** CSS class-based theming, localStorage API, matchMedia API

---

#### **Email Copy-to-Clipboard**

- Click Gmail icon to copy email
- Modern Clipboard API with fallback
- Toast notification on success/failure
- Analytics event tracking

**Technical:** `navigator.clipboard.writeText()`, fallback `document.execCommand('copy')`

---

#### **Social Icon Ripple Effects**

- Radial expansion animation on click
- 600ms duration with opacity fade
- All 4 social icons (LinkedIn, GitHub, CodePen, Gmail)

**Technical:** CSS pseudo-element (::after), transform animations

---

#### **Browser Window Controls**

- Yellow button: minimize/restore content
- Green button: maximize/restore window
- Working toggle states with smooth transitions

**Technical:** CSS class toggling, transform: scale()

---

#### **Feature Discovery Hints**

- First-visit notification badge (3s delay)
- Shows keyboard shortcuts (`?`, `Ctrl+D`, `1-8`)
- Dismissible with localStorage persistence
- Permanent keyboard icon (⌨️) in bottom-right corner
- Click icon to open shortcuts overlay

**Technical:** localStorage, delayed initialization, smooth animations

---

#### **Analytics Tracking**

- Console-based event logging (dev mode)
- Tracks: page views, link clicks, interactions
- Easy integration with GA/Mixpanel (TODO)
- EventBus integration for app-wide tracking

**Technical:** Custom event tracking, EventBus integration

---

### 🎨 CSS-Only Features

#### **Hero Section**

- Animated name badge with typewriter effect
- Blinking cursor animation
- Delayed tagline reveal
- Hover effects with scale transform

**Technical:** CSS `steps()` animation, `@keyframes`, custom properties

---

#### **Work Experience Grid**

- 4 animated grid patterns (80 squares total)
- Decorative icons (stars, circles, sparkles)
- Teal color palette variations
- Hover effects

---

#### **Projects Browser Mockup**

- Chrome-style window chrome
- Traffic light controls (visual only)
- URL bar with custom domain

---

#### **Education House Illustration**

- Animated house (roof, walls, windows, door, tree)
- Flying birds (3 instances, staggered)
- Floating sun
- Air particle system (5 particles)
- Parallax clouds

**Technical:** Pure CSS shapes, `@keyframes`, `animation-delay`

---

#### **Contact Envelope Animation**

- SVG envelope with open/close flap
- Letter reveal animation
- Social media icon grid (4 icons)

**Technical:** Inline SVG, CSS animations on `<g>` elements

---

#### **Resume Document Stack**

- 3-layer document stack (visible edges)
- 3D paperclip (10+ elements)
- Professional layout preview

**Technical:** `z-index` layering, `transform: rotateX/Y`

---

#### **Skills Badge System**

- Pill-style badges with hover effects
- 14 skills displayed
- Ripple animation on click

---

## 🏗️ JavaScript Architecture

### Core Systems

#### **State Management (`state.js`)**

```

// Observer pattern for reactive state
State.set('darkMode', true); // Update state
State.get('darkMode'); // Read state
State.subscribe('darkMode', callback); // Watch changes

```

**Features:**

- Centralized reactive state
- Observer pattern (pub/sub for state changes)
- Silent updates (no observer notification)
- Dev mode logging

---

#### **Event Bus (`events.js`)**

```

// Pub/Sub pattern for decoupled communication
EventBus.on('theme:change', (data) => {}); // Subscribe
EventBus.emit('theme:change', { theme }); // Publish
EventBus.once('init:complete', callback); // One-time listener

```

**Features:**

- Decoupled component communication
- Event history tracking (last 50 events)
- Once-only listeners
- Error isolation (bad listener doesn't break others)

---

#### **Performance Monitor (`performance.js`)**

```

// Real-time performance metrics
PerformanceMonitor.getMetrics();
// Returns: { fps: 139, memory: { used, total }, paint: { ... } }

```

**Features:**

- RAF-based FPS counter
- Memory usage tracking (Chrome/Edge)
- Paint timing metrics
- Auto-logging every 5s in dev mode

---

### Utility Functions

#### **DOM Helpers (`dom.js`)**

```

DOM.qs('.selector'); // querySelector
DOM.qsa('.selector'); // querySelectorAll
DOM.on(element, 'click', handler); // Event listener with cleanup
DOM.addClass(element, 'active'); // Class manipulation

```

#### **Performance Utilities (`debounce.js`)**

```

debounce(func, 150); // Delay execution
throttle(func, 100); // Rate limit execution
raf(callback); // requestAnimationFrame wrapper

```

---

### Feature Modules

Each feature module follows this pattern:

```

const FeatureName = (() => {
// Private state
let isActive = false;

const init = () => {
if (!CONFIG.features.featureName) return;
// Initialize feature
};

const destroy = () => {
// Cleanup listeners, remove elements
};

return { init, destroy };
})();

```

**Benefits:**

- Self-contained (no global pollution)
- Feature flag controlled
- Easy to enable/disable
- Clean initialization/cleanup

---

## 🎨 Color Palette

| Section                  | Color           | Hex Code                                |
| ------------------------ | --------------- | --------------------------------------- |
| **Hero**                 | Yellow          | `#ffd60a`                               |
| **Work**                 | Teal Variations | `#207a70` `#3ac6b5` `#2a9d8f` `#64e1d1` |
| **Projects**             | Teal            | `#2a9d8f`                               |
| **Education**            | Light Blue      | `#9ad1ea`                               |
| **Blog**                 | Teal            | `#2a9d8f`                               |
| **Resume**               | Teal            | `#2a9d8f`                               |
| **Contact**              | Pale Blue       | `#94d1ee`                               |
| **Skills**               | Orange          | `#f4a261`                               |
| **Background**           | Stone           | `#d4c5b9`                               |
| **Dark Mode Sections**   | Dark Gray       | `#1a1a1a`                               |
| **Dark Mode Background** | Almost Black    | `#0a0a0a`                               |
| **Accent (Interactive)** | Teal            | `#2a9d8f`                               |
| **Text**                 | Navy            | `#264653`                               |

---

## 📱 Responsive Breakpoints

| Device Type          | Min Width | Layout Strategy                      |
| -------------------- | --------- | ------------------------------------ |
| **Small Mobile**     | 320px     | Single column stack                  |
| **Mobile**           | 480px     | Single column stack                  |
| **Tablet Portrait**  | 768px     | 2-column hybrid                      |
| **Tablet Landscape** | 1024px    | 3-column hybrid                      |
| **Laptop**           | 1280px    | **9×9 fixed grid**                   |
| **Desktop**          | 1440px    | 9×9 fixed grid (larger gaps)         |
| **Large Monitor**    | 1920px    | 9×9 fixed grid (enhanced spacing)    |
| **Ultra-Wide**       | 2560px    | 9×9 fixed grid (max-width container) |

**JavaScript Responsive Handling:**

- Cursor/particles disabled on touch devices (detected via `'ontouchstart' in window`)
- Feature hints adapt to mobile (full-width positioning)
- All features respect `prefers-reduced-motion`

---

## 🎯 Performance Metrics

| Metric                     | Target | Actual             | Status         |
| -------------------------- | ------ | ------------------ | -------------- |
| **First Contentful Paint** | <1.5s  | ~0.74s             | ✅ Excellent   |
| **Frame Rate**             | 60 FPS | 139 FPS            | ✅ Exceptional |
| **Memory Usage**           | <100MB | 70-75MB            | ✅ Optimal     |
| **Time to Interactive**    | <2s    | ~1.3s              | ✅ Excellent   |
| **JavaScript Bundle**      | <50KB  | ~25KB (unminified) | ✅ Excellent   |
| **Total Blocking Time**    | <300ms | ~50ms              | ✅ Excellent   |

**Optimization Techniques:**

- **Object Pooling**: Particle system reuses objects (no GC pressure)
- **Event Delegation**: 1 listener for 80 grid squares (vs 80 listeners)
- **Debouncing/Throttling**: Reduces scroll/resize handler calls by 90%+
- **requestAnimationFrame**: All animations synchronized with browser repaint
- **IntersectionObserver**: Scroll animations without scroll event listeners
- **Passive Event Listeners**: Scroll handlers don't block rendering
- **CSS Transitions**: GPU-accelerated (no JS animation loops)
- **Canvas Rendering**: Particles rendered on GPU (not DOM)

---

## ♿ Accessibility Features

| Feature                   | Implementation                                  | Standard        |
| ------------------------- | ----------------------------------------------- | --------------- |
| **Semantic HTML**         | `<main>`, `<section>`, proper heading hierarchy | WCAG 2.1        |
| **ARIA Labels**           | `aria-label` on all sections, buttons, icons    | WCAG 2.1        |
| **Keyboard Navigation**   | All features accessible via keyboard            | WCAG 2.1 AA     |
| **Focus Management**      | Visible focus indicators, modal focus trapping  | WCAG 2.1 AA     |
| **Reduced Motion**        | `prefers-reduced-motion` disables animations    | WCAG 2.1 AAA    |
| **High Contrast**         | `prefers-contrast: more` increases borders      | WCAG 2.1 AAA    |
| **Dark Mode**             | `prefers-color-scheme: dark` + manual toggle    | User Preference |
| **Color Contrast**        | 4.5:1 minimum for text                          | WCAG 2.1 AA     |
| **Screen Reader Support** | Descriptive labels, ARIA live regions (TODO)    | WCAG 2.1        |

**Keyboard Shortcuts:**

- `?` → Show shortcuts help
- `1-8` → Navigate sections
- `Ctrl+D` → Toggle dark mode
- `Tab` → Navigate interactive elements
- `Enter/Space` → Activate buttons
- `Escape` → Close overlays

---

## 🌐 Browser Support

| Browser            | Minimum Version | JavaScript Support | Notes                          |
| ------------------ | --------------- | ------------------ | ------------------------------ |
| **Chrome**         | 88+             | Full ES6+ support  | Full support                   |
| **Firefox**        | 87+             | Full ES6+ support  | Full support                   |
| **Safari**         | 14+             | Full ES6+ support  | IntersectionObserver supported |
| **Edge**           | 88+             | Full ES6+ support  | Full support                   |
| **Opera**          | 74+             | Full ES6+ support  | Full support                   |
| **iOS Safari**     | 14+             | Full ES6+ support  | Touch device detection works   |
| **Chrome Android** | 88+             | Full ES6+ support  | Full support                   |

**Feature Detection & Graceful Degradation:**

- CSS Grid: 96%+ global support
- IntersectionObserver: 95%+ global support
- Clipboard API: 96%+ global support (with fallback)
- matchMedia: 98%+ global support
- requestAnimationFrame: 99%+ global support

**Without JavaScript:**

- Portfolio still functional (progressive enhancement)
- All content readable
- CSS animations still work
- Links/navigation work

---

## 🐛 Known Issues & Roadmap

### Completed (Tasks 1-3) ✅

- ✅ Foundation layer (state, events, performance)
- ✅ Visual excellence (cursor, particles, grid, scroll)
- ✅ Interactivity (keyboard, dark mode, effects)
- ✅ Feature discovery hints

### In Progress

- 🔄 **Task 4: Technical Depth** (Tomorrow)

  - [ ] Lazy loading images
  - [ ] RAF optimization refactor
  - [ ] Memory leak prevention
  - [ ] Error boundaries
  - [ ] Code documentation (JSDoc)

- 🔄 **Task 6: Polish & Accessibility** (Tomorrow)

  - [ ] Focus management improvements
  - [ ] ARIA live regions
  - [ ] Mobile touch optimization
  - [ ] Cross-browser testing
  - [ ] Skip links

- 🔄 **Task 5: Easter Eggs** (Optional, Tomorrow)
  - [ ] Konami code (↑↑↓↓←→←→BA → Rainbow mode)
  - [ ] Command palette (Ctrl+K)
  - [ ] Secret matrix mode

### Technical Debt

1. **CSS Specificity Conflicts**: Multiple responsive files define same selectors

   - **Fix:** Consolidate responsive CSS (medium priority)

2. **override.css Hotfix Layer**: Band-aid solution for specificity

   - **Fix:** Refactor and remove (low priority)

3. **No Build Process**: Manual development, no minification
   - **Fix:** Add PostCSS/Vite pipeline (optional)

---

## 🔧 Configuration

### Feature Flags (`js/config.js`)

```

CONFIG.features = {
cursor: true, // Custom cursor (disable on touch)
particles: true, // Particle trail (disable on touch)
gridInteractive: true, // Grid wave effect
smoothScroll: true, // Smooth scroll navigation
scrollAnimations: true, // Fade-in animations
keyboard: true, // Keyboard shortcuts
darkMode: true, // Dark mode toggle
performance: true, // Performance monitoring
analytics: true, // Event tracking
easterEggs: false // Easter eggs (Task 5)
};

```

**To disable a feature:**

1. Open `js/config.js`
2. Set flag to `false`
3. Refresh page (no code changes needed)

---

## 🚀 Deployment

### GitHub Pages (Current)

```

# Deploy from main branch

git checkout main
git push origin main

# GitHub Actions automatically deploys to:

# https://gunapalanivel.github.io/gunaprofile.bento/

```

**Settings:**

- Repository → Settings → Pages
- Source: "Deploy from a branch"
- Branch: `main`
- Folder: `/ (root)`

### Alternative Platforms

| Platform             | Setup                | Notes                            |
| -------------------- | -------------------- | -------------------------------- |
| **Netlify**          | Drag-and-drop folder | Auto HTTPS, CDN, instant deploys |
| **Vercel**           | Import GitHub repo   | Auto deployments on push         |
| **Cloudflare Pages** | Connect GitHub       | Fast global CDN                  |

---

## 🙏 Acknowledgments

- **Design Inspiration:** [Bento Grids](https://bentogrids.com/)
- **CSS Reset:** [Josh Comeau's CSS Reset](https://www.joshwcomeau.com/css/custom-css-reset/)
- **Accessibility Guidelines:** [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- **JavaScript Patterns:** [Addy Osmani's Learning JavaScript Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/)

---

## 📊 Project Stats

| Metric                     | Value                          |
| -------------------------- | ------------------------------ |
| **Total Lines of Code**    | ~4,500+                        |
| **HTML Lines**             | ~800 (index.html + card pages) |
| **CSS Lines**              | ~2,500                         |
| **JavaScript Lines**       | ~1,500+                        |
| **HTML Files**             | 3 (index.html + 2 card pages)  |
| **CSS Files**              | 22                             |
| **JavaScript Files**       | 15                             |
| **Sections**               | 8                              |
| **Animations**             | 25+                            |
| **Interactive Features**   | 12                             |
| **Responsive Breakpoints** | 7                              |
| **Supported Devices**      | 320px - 2560px+                |
| **Performance Score**      | 139 FPS                        |

## 🗺️ Development Timeline

| Date             | Milestone             | Features                                 |
| ---------------- | --------------------- | ---------------------------------------- |
| **Week 1**       | Initial HTML/CSS      | Static portfolio with bento grid         |
| **Week 2**       | CSS Animations        | Typewriter, envelope, house animations   |
| **Nov 15, 2025** | **JavaScript Layer**  | **Tasks 1-3 Complete**                   |
| Nov 15 (PM)      | Task 1: Foundation    | State, Events, Performance, Utils        |
| Nov 15 (PM)      | Task 2: Visual        | Cursor, Particles, Grid, Scroll          |
| Nov 15 (PM)      | Task 3: Interactivity | Keyboard, Dark Mode, Effects, Hints      |
| **Nov 16, 2025** | **Tasks 4-6**         | **Technical Depth, Easter Eggs, Polish** |

---

## 🎓 Learning Outcomes

Building this portfolio taught:

### JavaScript Patterns

- **Observer Pattern**: State management with reactive updates
- **Pub/Sub Pattern**: Decoupled event communication
- **Singleton Pattern**: Config, State, EventBus
- **Module Pattern**: IIFE for encapsulation
- **Factory Pattern**: DOM element creation

### Performance Optimization

- **Object Pooling**: Particle system reuses objects
- **Event Delegation**: 1 listener for many elements
- **Debouncing/Throttling**: Rate-limiting event handlers
- **requestAnimationFrame**: Smooth 60fps animations
- **IntersectionObserver**: Efficient scroll detection

### Browser APIs

- **Canvas API**: Particle rendering
- **Clipboard API**: Copy-to-clipboard with fallback
- **localStorage**: Persistent preferences
- **matchMedia**: System preference detection
- **IntersectionObserver**: Lazy loading and scroll animations

### Accessibility

- **Keyboard Navigation**: All features keyboard-accessible
- **Focus Management**: Modal focus trapping
- **ARIA Labels**: Screen reader support
- **Reduced Motion**: Respecting user preferences
- **Progressive Enhancement**: Works without JS

---

**Built with 🪡 by Guna Palanivel**
