<script type="application/json" id="ft-data">{"offices": [{"key": "us", "label": "United States", "tel": "+16822974830", "show": "+1 682 297 4830", "zones": ["America/", "Pacific/Honolulu"]}, {"key": "uk", "label": "United Kingdom", "tel": "+441514534009", "show": "+44 151 453 4009", "zones": ["Europe/", "Africa/", "Atlantic/"]}, {"key": "in", "label": "India", "tel": "+916364833830", "show": "+91 636 483 3830", "zones": ["Asia/", "Australia/", "Indian/", "Pacific/"]}], "bands": {"consulting": {"h": "Plan your next capability program with ", "em": "an Edstellar consultant.", "p": "Share the outcome you need. An Edstellar consultant comes back with a scoped approach and next steps.", "cta": ["Book a consultation", "/contact-us"], "alt": ["Send your RFP", "/request-for-proposal"]}, "course": {"h": "Bring this program to ", "em": "your team.", "p": "Edstellar adapts the program to your context and matches a trainer to your audience, virtual or onsite.", "cta": ["Enquire for your team", "/contact-us"], "alt": ["Browse the catalog", "/corporate-training-catalog"]}, "resources": {"h": "Put these ideas to work with ", "em": "free L&D templates.", "p": "Interactive templates and workbooks your team can use today, no sign-up needed to browse.", "cta": ["Explore L&D templates", "/learning-development-templates"], "alt": ["Talk to an Edstellar expert", "/contact-us"]}, "rfp": null}}</script>
<script>(function(){
  var root = document.documentElement;
  root.classList.add('js');
  var ft = document.querySelector('.ft');
  var DATA = JSON.parse(document.getElementById('ft-data').textContent);

  /* ---------- nearest office first (browser time zone, no IP lookup) ---------- */
  function orderOffices(tz){
    var list = document.querySelector('[data-offices]');
    if(!list) return;
    var items = Array.prototype.slice.call(list.children);
    var best = null;
    DATA.offices.forEach(function(o){
      o.zones.forEach(function(z){
        if(best) return;
        if(tz.indexOf(z) === 0) best = o.key;
      });
    });
    items.sort(function(a,b){
      var ak = a.getAttribute('data-key') === best ? 0 : 1;
      var bk = b.getAttribute('data-key') === best ? 0 : 1;
      return ak - bk;
    });
    items.forEach(function(li){
      list.appendChild(li);
      var tag = li.querySelector('.near');
      if(tag) tag.hidden = li.getAttribute('data-key') !== best;
    });
  }
  var tz = 'UTC';
  try{ tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'; }catch(e){}
  orderOffices(tz);

  /* ---------- Build your brief one-liner ---------- */
  var brief = document.querySelector('[data-brief]');
  if(brief){
    brief.addEventListener('submit', function(e){
      e.preventDefault();
      var s = brief.querySelector('[name=service]'), w = brief.querySelector('[name=who]'), p = brief.querySelector('[name=where]');
      var out = brief.querySelector('.brief-status');
      out.textContent = 'Opens the Build your brief composer filled in: ' +
        s.options[s.selectedIndex].text + ', ' + w.options[w.selectedIndex].text + ', ' + p.options[p.selectedIndex].text + '.';
    });
  }

  /* ---------- cookie settings ---------- */
  var ck = document.querySelector('[data-cookie]');
  if(ck){
    ck.addEventListener('click', function(){
      var out = document.querySelector('.bar-status');
      out.textContent = 'Reopens the consent banner, with Accept, Reject and Manage choices (§13).';
    });
  }

  /* ---------- mobile accordions ---------- */
  var mq = window.matchMedia('(max-width:600px)');
  var toggles = document.querySelectorAll('.fh-m');
  function setMode(){
    toggles.forEach(function(b){
      var list = document.getElementById(b.getAttribute('aria-controls'));
      if(!list) return;
      if(mq.matches){ list.hidden = b.getAttribute('aria-expanded') !== 'true'; }
      else { list.hidden = false; }
    });
  }
  toggles.forEach(function(b){
    b.addEventListener('click', function(){
      var open = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', String(!open));
      document.getElementById(b.getAttribute('aria-controls')).hidden = open;
    });
  });
  if(mq.addEventListener) mq.addEventListener('change', setMode); else mq.addListener(setMode);
  setMode();

  /* ---------- 5A index (option C): highlight, never hide ---------- */
  var stages = document.querySelectorAll('.stage');
  if(stages.length){
    var status = document.querySelector('.rail-status');
    stages.forEach(function(btn){
      btn.addEventListener('click', function(){
        var on = btn.getAttribute('aria-pressed') === 'true';
        stages.forEach(function(b){ b.setAttribute('aria-pressed','false'); });
        var links = document.querySelectorAll('[data-stages]');
        links.forEach(function(a){ a.classList.remove('hit'); });
        if(on){ ft.classList.remove('filtering'); status.textContent = ''; return; }
        btn.setAttribute('aria-pressed','true');
        ft.classList.add('filtering');
        var key = btn.getAttribute('data-stage'), n = 0;
        links.forEach(function(a){
          if((' ' + a.getAttribute('data-stages') + ' ').indexOf(' ' + key + ' ') > -1){ a.classList.add('hit'); n++; }
        });
        status.textContent = btn.textContent.trim().replace(/^\d+\s*/, '') + ': ' + n + ' services and tools highlighted below.';
      });
    });
  }

  /* ---------- sticky mobile CTA hides when the footer is visible ---------- */
  var sticky = document.querySelector('.sticky');
  if(sticky && 'IntersectionObserver' in window){
    var io = new IntersectionObserver(function(en){
      en.forEach(function(e){ sticky.classList.toggle('away', e.isIntersecting); });
    });
    io.observe(ft);
  }

  /* ---------- mockup controls (not shipped) ---------- */
  var famSel = document.getElementById('mk-family');
  if(famSel){
    famSel.addEventListener('change', function(){
      var band = document.querySelector('.band');
      var b = DATA.bands[famSel.value];
      if(!b){ band.hidden = true; return; }
      band.hidden = false;
      band.querySelector('[data-h]').textContent = b.h;
      band.querySelector('[data-em]').textContent = b.em;
      band.querySelector('[data-p]').textContent = b.p;
      var c = band.querySelector('[data-cta]'), a = band.querySelector('[data-alt]');
      c.textContent = b.cta[0]; c.setAttribute('href', b.cta[1]);
      a.textContent = b.alt[0]; a.setAttribute('href', b.alt[1]);
    });
  }
  var tzSel = document.getElementById('mk-tz');
  if(tzSel){
    tzSel.addEventListener('change', function(){ orderOffices(tzSel.value === 'auto' ? tz : tzSel.value); });
  }
})();
</script>
<script>
(function(){
  var mq = window.matchMedia('(max-width:600px)');
  document.querySelectorAll('.ft-c3 .stage').forEach(function(btn){
    btn.addEventListener('click', function(){
      if(!mq.matches || btn.getAttribute('aria-pressed') !== 'true') return;
      document.querySelectorAll('.ft-c3 .fgroup').forEach(function(g){
        if(g.querySelector('.ft-link.hit')){
          g.querySelector('.fh-m').setAttribute('aria-expanded','true');
          g.querySelector('.fl').hidden = false;
        }
      });
    });
  });
})();
</script>