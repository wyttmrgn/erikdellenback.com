/* Erik Dellenback site: menu panel and hero video. No dependencies. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------------
     Menu: button toggles the slide-in panel. Escape, the backdrop, the
     Close button and any link inside close it. Focus moves into the panel
     on open and back to the button on close.
     ------------------------------------------------------------------- */
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  if (btn && menu) {
    var label = btn.querySelector('.menu-btn__label');
    var lastFocus = null;
    var closing = null;

    function openMenu() {
      if (closing) { clearTimeout(closing); closing = null; }
      lastFocus = document.activeElement;
      menu.hidden = false;
      // force a reflow so the slide-in transition runs after display changes
      void menu.offsetWidth;
      menu.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      if (label) label.textContent = 'Close';
      document.body.classList.add('menu-open');
      var first = menu.querySelector('.menu__list li:not([hidden]) a');
      if (first) first.focus();
    }

    function closeMenu() {
      menu.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      if (label) label.textContent = 'Menu';
      document.body.classList.remove('menu-open');
      var finish = function () { menu.hidden = true; closing = null; };
      if (reduceMotion) finish(); else closing = setTimeout(finish, 240);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    btn.addEventListener('click', function () {
      if (menu.hidden) openMenu(); else closeMenu();
    });
    Array.prototype.forEach.call(menu.querySelectorAll('[data-menu-close]'), function (el) {
      el.addEventListener('click', closeMenu);
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) closeMenu();
    });
  }

  /* ---------------------------------------------------------------------
     Marquees (the sayings ticker and the photo strip): a visible Pause/Play
     control so the moving line can be stopped on touch and keyboard, and
     the animation is paused while the element is off-screen.
     ------------------------------------------------------------------- */
  function marquee(root, toggleSelector) {
    var toggle = root.querySelector(toggleSelector);
    if (toggle && !reduceMotion) {
      toggle.hidden = false;
      toggle.addEventListener('click', function () {
        var paused = root.classList.toggle('is-paused');
        toggle.textContent = paused ? 'Play' : 'Pause';
      });
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        root.classList.toggle('is-offscreen', !entries[0].isIntersecting);
      }).observe(root);
    }
  }
  Array.prototype.forEach.call(document.querySelectorAll('.ticker'), function (el) { marquee(el, '.ticker__toggle'); });
  Array.prototype.forEach.call(document.querySelectorAll('.strip'), function (el) { marquee(el, '.strip__toggle'); });

  /* ---------------------------------------------------------------------
     Reveal: sections fade up once as they enter view. Under reduced motion
     the CSS shows everything immediately.
     ------------------------------------------------------------------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add('is-visible'); });
  }

  /* ---------------------------------------------------------------------
     Hero video. The still <picture> under the video is the poster. We only
     load a clip when the visitor allows motion and has not asked to save
     data. Phones held upright get the portrait file, everything else the
     landscape file. The video stays hidden until it is actually playing,
     so a blocked autoplay (iOS Low Power Mode, for example) just leaves
     the still in place. If a file is missing the still stays too.
     ------------------------------------------------------------------- */
  var video = document.querySelector('.hero__video');
  if (video && window.matchMedia) {
    var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    var saveData = !!(conn && conn.saveData);
    if (!reduceMotion && !saveData) {
      var portrait = window.matchMedia('(max-aspect-ratio: 4/5)');
      var current = null;
      var failed = false;

      function pick() {
        if (failed) return;
        var want = portrait.matches ? video.getAttribute('data-src-portrait') : video.getAttribute('data-src-landscape');
        if (!want || want === current) return;
        current = want;
        video.hidden = true;
        video.src = want;
        video.load();
      }

      video.addEventListener('canplay', function () {
        var p = video.play();
        if (p && p.catch) p.catch(function () { video.hidden = true; });
      });
      video.addEventListener('playing', function () { video.hidden = false; });
      video.addEventListener('error', function () {
        failed = true;
        video.hidden = true;
        video.removeAttribute('src');
      }, true);

      if (portrait.addEventListener) portrait.addEventListener('change', pick);
      else if (portrait.addListener) portrait.addListener(pick);

      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (failed || !video.getAttribute('src')) return;
            if (entry.isIntersecting) { var p = video.play(); if (p && p.catch) p.catch(function () {}); }
            else video.pause();
          });
        }, { threshold: 0.05 }).observe(video);
      }

      pick();
    }
  }
})();
