/**
 * CLAY.GLOBAL SERVICES SCRIPT
 * ----------------------------------------------------------------------------
 * Clean interactive controller for Clay's pure minimalist services page.
 * Features:
 *   1. Header scroll blur & mobile drawer
 *   2. 5 Minimalist Geometric Canvas Stages (Orbs, Flat Circles, Squares, Double Cone, Corners)
 *   3. Smooth Parallax Scroll (Media Inner translateY)
 *   4. Current year indicator
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     1. HEADER SCROLL & MOBILE DRAWER
     ========================================================================== */
  (function initHeader() {
    var header = document.getElementById('clay-header');
    var btn = document.getElementById('clay-menu-btn');
    var drawer = document.getElementById('clay-mobile-drawer');
    var lastY = window.pageYOffset || document.documentElement.scrollTop;
    var threshold = 80;

    // Stacking service cards pin near the top of the viewport, so the header
    // must stay out of the way while the deck is pinned, in both directions.
    var deckList = document.querySelector('.clay-services-cards');
    var deckWide = window.matchMedia('all') /* stacking deck runs on phones too */;

    function deckIsPinned() {
      if (!deckList || !deckWide.matches || !deckList.firstElementChild) return false;
      var first = deckList.querySelector('.clay-service-card');
      var cards = deckList.querySelectorAll('.clay-service-card');
      var last = cards[cards.length - 1];
      if (!first || !last) return false;
      var stickTop = parseFloat(getComputedStyle(first).top) || 0;
      // Once the next section (the curtain) covers the top of the screen,
      // the deck is hidden and the header can behave normally again.
      var curtain = document.getElementById('methodology');
      if (curtain && curtain.getBoundingClientRect().top <= header.offsetHeight) return false;
      return first.getBoundingClientRect().top <= stickTop + 2 &&
        last.getBoundingClientRect().bottom > header.offsetHeight;
    }

    function onScroll() {
      if (!header) return;
      var y = window.pageYOffset || document.documentElement.scrollTop;

      // Scrolled elevation
      header.classList.toggle('scrolled', y > 20);

      // Auto-hide when scrolling down, reveal when scrolling up
      var drawerOpen = drawer && drawer.classList.contains('active');
      if (deckIsPinned() && !drawerOpen) {
        header.classList.add('is-hidden');
      } else if (y > threshold && !drawerOpen) {
        if (y > lastY + 5) {
          header.classList.add('is-hidden');
        } else if (y < lastY - 5) {
          header.classList.remove('is-hidden');
        }
      } else {
        header.classList.remove('is-hidden');
      }

      lastY = Math.max(0, y);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (btn && drawer) {
      btn.addEventListener('click', function () {
        var open = drawer.classList.toggle('active');
        btn.setAttribute('aria-expanded', String(open));
        if (open) header.classList.remove('is-hidden');
      });

      drawer.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          drawer.classList.remove('active');
          btn.setAttribute('aria-expanded', 'false');
        });
      });
    }
  })();

  /* ==========================================================================
     2. 5 MINIMALIST GEOMETRIC CANVAS STAGES (Clay's Exact Figures)
     Figures: orbs, flatCircles, squares, doubleCone, corners
     ========================================================================== */
  (function initGeometricStages() {
    var canvases = document.querySelectorAll('.clay-stage-canvas');
    if (!canvases.length) return;

    // Colours come from CSS so the same figures work as black line art on
    // white (narrow layout) and white line art on the dark card panel.
    function readTone(canvas) {
      var cs = getComputedStyle(canvas);
      var m = (cs.color || '').match(/\d+(\.\d+)?/g) || ['0', '0', '0'];
      var strength = parseFloat(cs.getPropertyValue('--figure-strength')) || 1;
      var dot = (cs.getPropertyValue('--figure-dot') || '').trim();
      var scale = parseFloat(cs.getPropertyValue('--figure-scale')) || 1;
      return { r: m[0], g: m[1], b: m[2], strength: strength, scale: scale, dot: dot || ('rgb(' + m[0] + ',' + m[1] + ',' + m[2] + ')') };
    }

    canvases.forEach(function (canvas) {
      var figure = canvas.getAttribute('data-figure') || 'orbs';
      var ctx = canvas.getContext('2d');
      if (!ctx) return;

      var w = canvas.width;
      var h = canvas.height;
      var isVisible = false;
      var t = Math.random() * 50;
      var tone = readTone(canvas);

      function ink(alpha) {
        return 'rgba(' + tone.r + ', ' + tone.g + ', ' + tone.b + ', ' + Math.min(1, alpha * tone.strength).toFixed(3) + ')';
      }

      window.addEventListener('resize', function () {
        tone = readTone(canvas);
        if (reduceMotion) render();
      }, { passive: true });

      if (reduceMotion) {
        render();
        return;
      }

      if ('IntersectionObserver' in window) {
        var obs = new IntersectionObserver(function (entries) {
          isVisible = entries[0].isIntersecting;
          if (isVisible) requestAnimationFrame(draw);
        }, { threshold: 0.05 });
        obs.observe(canvas);
      } else {
        isVisible = true;
        requestAnimationFrame(draw);
      }

      function draw() {
        if (!isVisible) return;
        t += 0.015;
        render();
        requestAnimationFrame(draw);
      }

      function render() {
        ctx.clearRect(0, 0, w, h);
        var cx = w / 2;
        var cy = h / 2;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(tone.scale, tone.scale);
        ctx.translate(-cx, -cy);

        switch (figure) {
          case 'orbs':
            // Concentric wireframe orbital rings
            for (var i = 1; i <= 3; i++) {
              ctx.save();
              ctx.translate(cx, cy);
              ctx.rotate(t * 0.4 * (i % 2 === 0 ? 1 : -1) + (i * Math.PI / 4));
              ctx.scale(1, 0.42);
              ctx.beginPath();
              ctx.arc(0, 0, 180 - (i * 35), 0, Math.PI * 2);
              ctx.strokeStyle = ink(0.16 - i * 0.03);
              ctx.lineWidth = 1.5 / tone.scale;
              ctx.stroke();

              var ang = t * 1.4 + i;
              var rad = 180 - (i * 35);
              ctx.beginPath();
              ctx.arc(Math.cos(ang) * rad, Math.sin(ang) * rad, 4, 0, Math.PI * 2);
              ctx.fillStyle = tone.dot;
              ctx.fill();
              ctx.restore();
            }
            break;

          case 'flatCircles':
            // Staggered pulsing floating circles
            for (var c = 0; c < 4; c++) {
              var angle = (c / 4) * Math.PI * 2 + (t * 0.35);
              var dist = 140 + Math.sin(t * 1.5 + c) * 20;
              var px = cx + Math.cos(angle) * dist;
              var py = cy + Math.sin(angle * 1.2) * (dist * 0.6);
              ctx.beginPath();
              ctx.arc(px, py, 35, 0, Math.PI * 2);
              ctx.strokeStyle = ink(0.12);
              ctx.lineWidth = 1.5 / tone.scale;
              ctx.stroke();

              ctx.beginPath();
              ctx.arc(px, py, 4.5, 0, Math.PI * 2);
              ctx.fillStyle = tone.dot;
              ctx.fill();
            }
            break;

          case 'squares':
            // Rotating nested wireframe squares
            for (var s = 1; s <= 3; s++) {
              ctx.save();
              ctx.translate(cx, cy);
              ctx.rotate(t * 0.3 * (s % 2 === 0 ? -1 : 1));
              var size = 180 - (s * 35);
              ctx.strokeStyle = ink(0.15 - s * 0.03);
              ctx.lineWidth = 1.5 / tone.scale;
              ctx.strokeRect(-size / 2, -size / 2, size, size);
              ctx.restore();
            }
            ctx.beginPath();
            ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
            ctx.fillStyle = tone.dot;
            ctx.fill();
            break;

          case 'doubleCone':
            // Wireframe dual cone / hourglass lines
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(t * 0.25);
            for (var k = 0; k < 12; k++) {
              var a = (k / 12) * Math.PI * 2;
              ctx.beginPath();
              ctx.moveTo(Math.cos(a) * 160, -120);
              ctx.lineTo(0, 0);
              ctx.lineTo(Math.cos(a + Math.PI) * 160, 120);
              ctx.strokeStyle = ink(0.08);
              ctx.lineWidth = 1.2 / tone.scale;
              ctx.stroke();
            }
            ctx.restore();
            break;

          case 'corners':
            // Minimalist architectural alignment corners
            ctx.save();
            ctx.translate(cx, cy);
            var arm = 40;
            var box = 140 + Math.sin(t) * 15;
            ctx.strokeStyle = ink(0.2);
            ctx.lineWidth = 2 / tone.scale;
            [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) {
              ctx.beginPath();
              ctx.moveTo(q[0] * box, q[1] * (box - arm));
              ctx.lineTo(q[0] * box, q[1] * box);
              ctx.lineTo(q[0] * (box - arm), q[1] * box);
              ctx.stroke();
            });
            ctx.beginPath();
            ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
            ctx.fillStyle = tone.dot;
            ctx.fill();
            ctx.restore();
            break;
        }
        ctx.restore();
      }
    });
  })();

  /* ==========================================================================
     3. SMOOTH PARALLAX SCROLL (translateY on Media Inner)
     ========================================================================== */
  (function initParallax() {
    if (reduceMotion) return;

    var inners = document.querySelectorAll('.clay-card-media-inner');
    if (!inners.length) return;

    var ticking = false;

    function update() {
      ticking = false;
      var winH = window.innerHeight;
      var winCenter = winH / 2;

      inners.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.bottom >= -150 && rect.top <= winH + 150) {
          var cardCenter = rect.top + (rect.height / 2);
          var offsetFromCenter = cardCenter - winCenter;
          // Clay's subtle smooth translateY shift: -60px to +60px
          var shift = Math.max(-65, Math.min(65, offsetFromCenter * 0.12));
          el.style.transform = 'translate3d(0px, ' + shift.toFixed(2) + 'px, 0px)';
        }
      });
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });

    update();
  })();

  /* ==========================================================================
     3b. STACKING SERVICE CARDS
     Cards are position: sticky (see audit.css). As each later card slides up
     over a card, that card scales down a little, so the stack reads as depth.
     The card currently on top gets .is-active (highlighted number badge).
     ========================================================================== */
  (function initCardStack() {
    var cards = Array.prototype.slice.call(document.querySelectorAll('.clay-service-card'));
    if (cards.length < 2) return;

    // Split "01 / SECURITY AUDITS" into a number pill and a quiet label.
    document.querySelectorAll('.clay-card-kicker').forEach(function (k) {
      var m = (k.textContent || '').match(/^\s*(\d+)\s*\/\s*(.+?)\s*$/);
      if (!m) return;
      var num = document.createElement('span');
      num.className = 'clay-card-kicker__num';
      num.textContent = m[1];
      var label = document.createElement('span');
      label.className = 'clay-card-kicker__label';
      label.textContent = m[2];
      k.textContent = '';
      k.appendChild(num);
      k.appendChild(label);
    });

    var wrappers = cards.map(function (c) { return c.querySelector('.clay-service-card__wrapper'); });
    var wide = window.matchMedia('all') /* stacking deck runs on phones too */;
    // Once a card pins, it keeps zooming out as you scroll: it loses
    // ZOOM_RATE of its size per viewport-height scrolled, down to MIN_SCALE.
    // Older cards have been pinned longer, so they are always smaller.
    var ZOOM_RATE = 0.085;
    var MIN_SCALE = 0.6;
    var list = cards[0].parentElement;
    var ticking = false;

    function reset() {
      wrappers.forEach(function (w) {
        if (!w) return;
        w.style.transform = '';
      });
      cards.forEach(function (c) { c.classList.remove('is-active'); });
    }

    function update() {
      ticking = false;
      if (!wide.matches) { reset(); return; }

      var winH = window.innerHeight;
      var tops = cards.map(function (c) { return c.getBoundingClientRect().top; });
      var stickTops = cards.map(function (c) { return parseFloat(getComputedStyle(c).top) || 0; });

      // How far each card has travelled toward its sticky position (0..1).
      var progress = tops.map(function (top, j) {
        var span = Math.max(1, winH - stickTops[j]);
        return Math.max(0, Math.min(1, (winH - top) / span));
      });

      // Scroll position at which each card pins (from its un-stuck layout
      // position, which sticky does not change: list top + earlier cards).
      var scrollY = window.pageYOffset;
      var gap = parseFloat(getComputedStyle(list).rowGap) || 0;
      var naturalTop = list.getBoundingClientRect().top + scrollY;

      var active = 0;
      progress.forEach(function (p, i) {
        if (p >= 0.5) active = i;
        var pinnedFor = scrollY - (naturalTop - stickTops[i]);
        naturalTop += cards[i].offsetHeight + gap;
        if (reduceMotion || !wrappers[i]) return;
        var scale = Math.max(MIN_SCALE, 1 - ZOOM_RATE * Math.max(0, pinnedFor) / winH);
        wrappers[i].style.transform = scale < 1 ? 'scale(' + scale.toFixed(4) + ')' : '';
      });

      cards.forEach(function (c, i) { c.classList.toggle('is-active', i === active); });
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  })();

  /* ==========================================================================
     4. INDUSTRIES DAPPER STAGE CONTROLLER (600vh Curtain Scrub)
     Curtain Layers 2 through 6 wipe up from translateY(100%) to 0%
     ========================================================================== */
  (function initIndustriesDapper() {
    var section = document.getElementById('services-industries');
    var layersContainer = document.getElementById('industries-dapper-layers');
    var progressFill = document.getElementById('industries-progress-fill');
    var counterNum = document.getElementById('active-sector-num');
    if (!section || !layersContainer) return;

    var slides = layersContainer.querySelectorAll('.clay-industry-slide');
    if (!slides.length) return;

    // The sector total and scroll length follow the number of sectors in the
    // content (100vh of scroll per sector; audit.css defaults to 600vh for 6).
    var counterTotal = document.getElementById('active-sector-total');
    if (counterTotal) counterTotal.textContent = pad(slides.length);
    section.style.height = (slides.length * 100) + 'vh';

    var isTicking = false;

    function pad(n) {
      return (n < 10 ? '0' : '') + n;
    }

    function updateCurtains() {
      isTicking = false;
      var rect = section.getBoundingClientRect();
      var headerEl = document.getElementById('clay-header');
      var headerH = headerEl ? headerEl.offsetHeight : 84;
      var winH = window.innerHeight;
      var stickyH = winH - headerH;
      var totalScroll = section.offsetHeight - stickyH;
      if (totalScroll <= 0) return;

      // Scrolled distance begins exactly when section top reaches the bottom of navbar
      var scrolled = headerH - rect.top;
      var overallProgress = Math.max(0, Math.min(1.0, scrolled / totalScroll));
      // For 6 slides, progress spans 5 step intervals (0.0 to 5.0)
      var sectorProgress = overallProgress * (slides.length - 1);

      // Layer 1 is stationary at translateY(0%)
      // Layers 2 through 6 wipe up as sectorProgress advances
      for (var i = 1; i < slides.length; i++) {
        var p = Math.max(0, Math.min(1.0, sectorProgress - (i - 1)));
        var yPercent = ((1 - p) * 100).toFixed(2);
        slides[i].style.transform = 'translate3d(0px, ' + yPercent + '%, 0px)';
      }

      // Progress bar fill
      if (progressFill) {
        progressFill.style.width = (overallProgress * 100).toFixed(1) + '%';
      }

      // Active sector counter
      if (counterNum) {
        var activeIdx = Math.max(0, Math.min(slides.length - 1, Math.floor(sectorProgress + 0.5)));
        var numStr = pad(activeIdx + 1);
        if (counterNum.textContent !== numStr) {
          counterNum.textContent = numStr;
        }
      }
    }

    window.addEventListener('scroll', function () {
      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(updateCurtains);
      }
    }, { passive: true });

    window.addEventListener('resize', function () {
      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(updateCurtains);
      }
    }, { passive: true });

    updateCurtains();
  })();

  /* ==========================================================================
     5. CURRENT YEAR
     ========================================================================== */
  var yr = document.getElementById('year-label');
  if (yr) yr.textContent = new Date().getFullYear();

})();
