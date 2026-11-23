/**
 * Scroll-linked favicon.
 *
 * The browser-tab icon is the logo's circle + arrow (without the "N").
 * As the page scrolls, the arrow travels down the circle in step with scroll
 * progress (top of page = top of circle, end of page = bottom), and it points
 * in the direction the user is scrolling.
 *
 * The static ./assets/favicon.png stays as the no-JS fallback; this script
 * swaps in a crisp vector version and only redraws when the icon actually
 * changes (quantised position or direction), so it costs almost nothing.
 */
(function () {
  'use strict';

  var link = document.querySelector('link[rel="icon"]');
  if (!link || !window.requestAnimationFrame) return;

  var CIRCLE = '#5f52fb';   // sampled from assets/logo_tight.png
  var STEPS = 24;           // distinct arrow positions
  var TRAVEL = 0.4;         // arrow moves +/- this far (circle radius = 1)

  // Arrow outline from the logo, centred on its own middle and scaled to 78%
  // so it has room to travel inside the circle in either direction.
  var ARROW = 'M-0.30 -0.43 L0 -0.317 L0.30 -0.43 L0 0.44 Z';

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function svgFor(step, up) {
    var ty = ((step / STEPS) - 0.5) * 2 * TRAVEL;
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 2 2">' +
        '<circle r="1" fill="' + CIRCLE + '"/>' +
        '<g transform="translate(0 ' + ty.toFixed(3) + ')' + (up ? ' rotate(180)' : '') + '">' +
          '<path d="' + ARROW + '" fill="#fff" stroke="#fff" stroke-width="0.07" stroke-linejoin="round"/>' +
        '</g>' +
      '</svg>';
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  }

  var lastKey = '';
  var lastY = window.pageYOffset;
  var up = false;
  var ticking = false;

  function update() {
    ticking = false;
    var y = window.pageYOffset;
    var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    if (y < lastY - 2) up = true;
    else if (y > lastY + 2) up = false;
    lastY = y;

    var step = Math.round(Math.min(1, Math.max(0, y / max)) * STEPS);
    var key = step + (up ? 'u' : 'd');
    if (key === lastKey) return;
    lastKey = key;

    link.type = 'image/svg+xml';
    link.href = svgFor(step, up);
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  if (reduceMotion) {
    // Keep the static circle + arrow; no movement.
    return;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();
