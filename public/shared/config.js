/**
 * Field Studies Display — Global Configuration
 * All timing, easing, and animation parameters.
 * Adjust these values without touching animation code.
 */

const CONFIG = {

  // --- Screen dimensions ---
  screen: {
    width: 1080,
    height: 1920,
  },

  // --- T₀: Archive breathes (cover + grid) ---
  t0: {
    duration: 9,             // seconds — cover shown + grid scrolling
  },

  // --- Transition T₀→T₁: Title scroll ---
  transition: {
    duration: 2.5,           // seconds — fast scroll to selected title
    ease: 'power3.inOut',    // GSAP easing for title scroll
  },

  // --- T₁: Project reveal ---
  t1: {
    duration: 9,             // seconds — title + plan + info composition
    productsDelay: 2.5,      // seconds — delay before first product appears (after accordion opens)
    productsStagger: 0.4,    // seconds — interval between each product appearing
    planimetryBuild: 4.5,   // seconds — total SVG draw duration
    planimetryDelay: {
      perimeter: 0,          // seconds — when perimeter lines start
      partitions: 1.0,       // seconds — when internal walls start
      fixtures: 2.0,         // seconds — when fixtures start
      dots: 3.5,             // seconds — when numbered dots appear
    },
  },

  // --- T₂: Product gallery ---
  t2: {
    durationPerImage: 4.5,   // seconds per gallery image
    imageCount: 4,           // default images per project (overridden by data)
  },

  // --- Dissolve T₂→T₀ ---
  dissolve: {
    duration: 2,             // seconds — fade back to cover
  },

  // --- Background transition (SX dark ↔ light) ---
  backgroundTransition: {
    duration: 1.5,           // seconds
    ease: 'power2.inOut',
  },

  // --- Easing presets ---
  ease: {
    gridScroll:      'power1.inOut',   // DX grid slow scroll
    titleScroll:     'power3.inOut',   // SX fast title scroll
    backgroundShift: 'power2.inOut',   // SX dark↔light
    fadeIn:          'power2.out',      // Element fade in
    fadeOut:         'power2.out',      // Element fade out
    imageExpand:     'power2.inOut',   // DX image expand to fullscreen
    galleryScroll:   'power2.inOut',   // DX horizontal gallery
    planDraw:        'power1.inOut',   // SVG stroke draw
    planSlideIn:     'power2.out',     // Planimetry slide-in from bottom
  },

  // --- Grid (DX) ---
  grid: {
    columns: 4,
    scrollSpeed: 60,          // px/sec — vertical scroll speed
    inactiveOpacity: 0.3,    // opacity of non-active project thumbnails
    cellGap: 10,             // px gap between cells
  },

  // --- Gallery (DX, T₂) ---
  gallery: {
    scrollDuration: 0.8,     // seconds per image transition
  },

  // --- Image expand (DX, T₁) ---
  imageExpand: {
    duration: 2,             // seconds — grid thumbnail to fullscreen
  },

  // --- Planimetry SVG ---
  planimetry: {
    lineOpacity: 0.2,        // stroke opacity for floor plan lines
    dotSize: 24,             // px — numbered product dot diameter
  },

  // --- Cover (SX, T₀) ---
  cover: {
    titleSize: 240,          // px — "Field Studies" / "Design Review"
    subtitleSize: 20,        // px — tagline
  },

  // --- Maintenance ---
  autoRefreshInterval: 5 * 60 * 60 * 1000,  // 5 hours in ms — page refresh to prevent memory leaks

  // --- Sync ---
  // Both screens read ?start=TIMESTAMP from the URL.
  // If absent, they use this default start time (MDW 2026 opening).
  // Position in loop = (Date.now() - start) % totalLoopDuration
  sync: {
    defaultStart: 1713100800000,  // Unix ms — fallback if no ?start= param

    // --- PartyKit relay (optional) ---
    // When `host` is empty, each screen runs its own standalone timeline
    // (no WebSocket traffic). After `partykit deploy` in /sync, set host
    // to the deployed origin (e.g. 'field-studies-sync.<user>.partykit.dev').
    host: 'field-studies-sync.agapedesign.partykit.dev',
    room: 'showroom',
    // SX max wait for DX's project_end before auto-advancing.
    projectEndTimeoutMs: 60000,
    // SX rebroadcasts current state every N ms so a screen that missed
    // a project_start (WebSocket blip, reconnect with stale lastState)
    // converges within one heartbeat interval.
    heartbeatMs: 4000,
  },
};
