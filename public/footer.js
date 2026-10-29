(function () {
  var placeholder = document.getElementById('site-footer');
  if (!placeholder) return;

  fetch('/footer.html')
    .then(function (r) { return r.text(); })
    .then(function (html) {
      placeholder.innerHTML = html;
      init();
    })
    .catch(function () {});

  function init() {
    document.documentElement.classList.add('js');
    var ft = document.querySelector('.ft');
    if (!ft) return;

    /* --- mobile accordions --- */
    var mq = window.matchMedia('(max-width:600px)');
    var toggles = document.querySelectorAll('.fh-m');
    function setMode() {
      toggles.forEach(function (b) {
        var list = document.getElementById(b.getAttribute('aria-controls'));
        if (!list) return;
        list.hidden = mq.matches ? b.getAttribute('aria-expanded') !== 'true' : false;
      });
    }
    toggles.forEach(function (b) {
      b.addEventListener('click', function () {
        var open = b.getAttribute('aria-expanded') === 'true';
        b.setAttribute('aria-expanded', String(!open));
        var list = document.getElementById(b.getAttribute('aria-controls'));
        if (list) list.hidden = open;
      });
    });
    if (mq.addEventListener) mq.addEventListener('change', setMode);
    else mq.addListener(setMode);
    setMode();

    /* --- 5A index: highlight, never hide --- */
    var stages = document.querySelectorAll('.stage');
    if (stages.length) {
      var status = document.querySelector('.rail-status');
      stages.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var on = btn.getAttribute('aria-pressed') === 'true';
          stages.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
          document.querySelectorAll('[data-stages]').forEach(function (a) { a.classList.remove('hit'); });
          if (on) { ft.classList.remove('filtering'); if (status) status.textContent = ''; return; }
          btn.setAttribute('aria-pressed', 'true');
          ft.classList.add('filtering');
          var key = btn.getAttribute('data-stage'), n = 0;
          document.querySelectorAll('[data-stages]').forEach(function (a) {
            if ((' ' + a.getAttribute('data-stages') + ' ').indexOf(' ' + key + ' ') > -1) { a.classList.add('hit'); n++; }
          });
          if (status) status.textContent = btn.textContent.trim().replace(/^\d+\s*/, '') + ': ' + n + ' services and tools highlighted below.';
        });
      });

      /* on mobile, open groups that have a match when a stage is picked */
      var mq2 = window.matchMedia('(max-width:600px)');
      document.querySelectorAll('.ft-c3 .stage').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (!mq2.matches || btn.getAttribute('aria-pressed') !== 'true') return;
          document.querySelectorAll('.ft-c3 .fgroup').forEach(function (g) {
            if (g.querySelector('.ft-link.hit')) {
              var tm = g.querySelector('.fh-m');
              var fl = tm && document.getElementById(tm.getAttribute('aria-controls'));
              if (tm) tm.setAttribute('aria-expanded', 'true');
              if (fl) fl.hidden = false;
            }
          });
        });
      });
    }

    /* --- sticky mobile CTA hides when footer is visible --- */
    var sticky = document.querySelector('.sticky');
    if (sticky && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        en.forEach(function (e) { sticky.classList.toggle('away', e.isIntersecting); });
      }).observe(ft);
    }
  }
})();
