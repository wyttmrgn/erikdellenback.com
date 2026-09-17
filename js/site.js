/* Erik Dellenback site: menu panel, photo strip, reveal, hero video. No dependencies. */
(function () {
  'use strict';

  // Styles that depend on this script (the reveal fade) only switch on once it is running.
  document.documentElement.classList.replace('no-js', 'js');

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
      void menu.offsetWidth; // force a reflow so the slide-in transition runs
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
     Photo strip: holds a steady 30px per second whatever the list width,
     and stops animating while it is scrolled out of view. Under reduced
     motion it is a static row, reachable and scrollable from the keyboard.
     ------------------------------------------------------------------- */
  Array.prototype.forEach.call(document.querySelectorAll('.strip'), function (strip) {
    if (reduceMotion) {
      strip.setAttribute('tabindex', '0');
      strip.setAttribute('role', 'region');
      strip.setAttribute('aria-label', 'Photos, scrolls sideways');
      return;
    }
    var list = strip.querySelector('.strip__list');
    var track = strip.querySelector('.strip__track');
    var timer = null;
    function setSpeed() {
      // the images carry width/height so the list measures right before they load;
      // re-measure after load and on resize anyway
      if (list && track && list.offsetWidth > 200) track.style.animationDuration = Math.round(list.offsetWidth / 30) + 's';
    }
    setSpeed();
    window.addEventListener('load', setSpeed);
    window.addEventListener('resize', function () { clearTimeout(timer); timer = setTimeout(setSpeed, 150); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        strip.classList.toggle('is-offscreen', !entries[0].isIntersecting);
      }).observe(strip);
    }
  });

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
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
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

  // Contact form: preselect the topic from ?topic=, set the subject, and
  // send with fetch so the visitor stays on the page. Without JS the form
  // still posts normally and Formspree shows its own thank-you page.
  var form = document.querySelector('.form[data-form]');
  if (form) {
    var status = form.querySelector('.form__status');
    var topic = form.querySelector('[name="topic"]');
    var subject = form.querySelector('[name="_subject"]');
    var submit = form.querySelector('.form__submit');
    if (!submit || !status) return;
    try {
      var wanted = (window.location.search.match(/[?&]topic=([^&]+)/) || [])[1];
      if (wanted && topic) {
        wanted = decodeURIComponent(wanted).toLowerCase();
        Array.prototype.forEach.call(topic.options, function (o) { if (o.value.toLowerCase() === wanted) topic.value = o.value; });
      }
    } catch (e) {}
    function setSubject() { if (subject && topic) subject.value = 'Website: ' + topic.value; }
    if (topic) topic.addEventListener('change', setSubject);
    setSubject();
    if ((form.getAttribute('action') || '').indexOf('FORM_ID') !== -1) {
      submit.disabled = true;
      Array.prototype.forEach.call(form.querySelectorAll('input, select, textarea'), function (el) { el.disabled = true; });
      status.textContent = 'This form is being connected. Please check back shortly.';
      form.insertBefore(status, form.firstChild);
    } else if (window.fetch && window.FormData) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!form.checkValidity || form.checkValidity()) {
          submit.disabled = true; status.className = 'form__status'; status.textContent = 'Sending…';
          fetch(form.getAttribute('action'), { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
            .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
            .then(function () {
              Array.prototype.forEach.call(form.querySelectorAll('.form__row, .form__submit'), function (el) { el.hidden = true; });
              status.className = 'form__status form__status--ok';
              status.textContent = 'Thank you. Your message is on its way to Erik.';
            })
            .catch(function () {
              submit.disabled = false;
              status.textContent = 'Something went wrong and the message did not send. Please try again in a minute.';
            });
        } else if (form.reportValidity) form.reportValidity();
      });
    }
  }
})();
