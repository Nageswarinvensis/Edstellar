/* ============================================================
   Edstellar Platform Form (edpf) — shared script
   Loaded by: orbit.html, polaris.html, meridian.html, spectra-lms.html

   Submits as JSON to the site's lead API (/api/leads, source
   "platform-enquiry"), which validates and delivers to Zoho Forms'
   "EdstellarPlatforms" — see lib/leads/. Field names and option values
   must stay Zoho's own: content/platform-form.js is the server's copy.
   ============================================================ */

(function(){
  "use strict";
  var FORM_ENDPOINT = "/api/leads";
  var THANK_YOU_URL = "/thank-you/platform";

  /* Zoho's "Also interested in" options: its own names, CIP abbreviated,
     and no Meridian (that one rides in the message instead). */
  /* The phone input (intl-tel-input): flag menu and dial code, loaded from
     jsDelivr. Without it the field stays a plain input and the dial code
     follows the Country dropdown. */
  var ITI = "https://cdn.jsdelivr.net/npm/intl-tel-input@25.11.2/build/";
  var itiReady = null;
  function loadIti(){
    if (itiReady) return itiReady;
    itiReady = new Promise(function(resolve, reject){
      if (window.intlTelInput) return resolve(window.intlTelInput);
      var css = document.createElement("link"); css.rel = "stylesheet"; css.href = ITI + "css/intlTelInput.min.css"; document.head.appendChild(css);
      var js = document.createElement("script"); js.src = ITI + "js/intlTelInput.min.js"; js.async = true;
      js.onload = function(){ window.intlTelInput ? resolve(window.intlTelInput) : reject(); };
      js.onerror = reject; document.head.appendChild(js);
    });
    return itiReady;
  }

  var ZOHO_ALSO = {"spectra-lms":"Spectra LMS","capability-intelligence-platform":"CIP","tna-tni-engine":"TNA/TNI Engine","zenith":"Zenith","orbit":"Orbit","polaris":"Polaris"};

  /* The server's country list (lib/countries.js): name and ISO code, A–Z. */
  var COUNTRIES = [["Afghanistan","af"],["Albania","al"],["Algeria","dz"],["American Samoa","as"],["Andorra","ad"],["Angola","ao"],["Anguilla","ai"],["Antigua and Barbuda","ag"],["Argentina","ar"],["Armenia","am"],["Aruba","aw"],["Australia","au"],["Austria","at"],["Azerbaijan","az"],["Bahamas","bs"],["Bahrain","bh"],["Bangladesh","bd"],["Barbados","bb"],["Belarus","by"],["Belgium","be"],["Belize","bz"],["Benin","bj"],["Bermuda","bm"],["Bhutan","bt"],["Bolivia","bo"],["Bosnia and Herzegovina","ba"],["Botswana","bw"],["Brazil","br"],["British Indian Ocean Territory","io"],["British Virgin Islands","vg"],["Brunei","bn"],["Bulgaria","bg"],["Burkina Faso","bf"],["Burundi","bi"],["Cambodia","kh"],["Cameroon","cm"],["Canada","ca"],["Cape Verde","cv"],["Caribbean Netherlands","bq"],["Cayman Islands","ky"],["Central African Republic","cf"],["Chad","td"],["Chile","cl"],["China","cn"],["Colombia","co"],["Comoros","km"],["Congo","cg"],["Cook Islands","ck"],["Costa Rica","cr"],["Croatia","hr"],["Cuba","cu"],["Curaçao","cw"],["Cyprus","cy"],["Czech Republic","cz"],["Côte d’Ivoire","ci"],["Denmark","dk"],["Djibouti","dj"],["Dominica","dm"],["Dominican Republic","do"],["DR Congo","cd"],["Ecuador","ec"],["Egypt","eg"],["El Salvador","sv"],["Equatorial Guinea","gq"],["Eritrea","er"],["Estonia","ee"],["Eswatini","sz"],["Ethiopia","et"],["Falkland Islands","fk"],["Faroe Islands","fo"],["Fiji","fj"],["Finland","fi"],["France","fr"],["French Guiana","gf"],["French Polynesia","pf"],["Gabon","ga"],["Gambia","gm"],["Georgia","ge"],["Germany","de"],["Ghana","gh"],["Gibraltar","gi"],["Greece","gr"],["Greenland","gl"],["Grenada","gd"],["Guadeloupe","gp"],["Guam","gu"],["Guatemala","gt"],["Guinea","gn"],["Guinea-Bissau","gw"],["Guyana","gy"],["Haiti","ht"],["Honduras","hn"],["Hong Kong","hk"],["Hungary","hu"],["Iceland","is"],["India","in"],["Indonesia","id"],["Iran","ir"],["Iraq","iq"],["Ireland","ie"],["Israel","il"],["Italy","it"],["Jamaica","jm"],["Japan","jp"],["Jersey","je"],["Jordan","jo"],["Kazakhstan","kz"],["Kenya","ke"],["Kiribati","ki"],["Kosovo","xk"],["Kuwait","kw"],["Kyrgyzstan","kg"],["Laos","la"],["Latvia","lv"],["Lebanon","lb"],["Lesotho","ls"],["Liberia","lr"],["Libya","ly"],["Liechtenstein","li"],["Lithuania","lt"],["Luxembourg","lu"],["Macau","mo"],["Madagascar","mg"],["Malawi","mw"],["Malaysia","my"],["Maldives","mv"],["Mali","ml"],["Malta","mt"],["Marshall Islands","mh"],["Martinique","mq"],["Mauritania","mr"],["Mauritius","mu"],["Mexico","mx"],["Micronesia","fm"],["Moldova","md"],["Monaco","mc"],["Mongolia","mn"],["Montenegro","me"],["Montserrat","ms"],["Morocco","ma"],["Mozambique","mz"],["Myanmar","mm"],["Namibia","na"],["Nauru","nr"],["Nepal","np"],["Netherlands","nl"],["New Caledonia","nc"],["New Zealand","nz"],["Nicaragua","ni"],["Niger","ne"],["Nigeria","ng"],["Niue","nu"],["Norfolk Island","nf"],["North Korea","kp"],["North Macedonia","mk"],["Northern Mariana Islands","mp"],["Norway","no"],["Oman","om"],["Pakistan","pk"],["Palau","pw"],["Palestine","ps"],["Panama","pa"],["Papua New Guinea","pg"],["Paraguay","py"],["Peru","pe"],["Philippines","ph"],["Poland","pl"],["Portugal","pt"],["Puerto Rico","pr"],["Qatar","qa"],["Romania","ro"],["Russia","ru"],["Rwanda","rw"],["Réunion","re"],["Saint Barthélemy","bl"],["Saint Helena","sh"],["Saint Kitts and Nevis","kn"],["Saint Lucia","lc"],["Saint Martin","mf"],["Saint Pierre and Miquelon","pm"],["Saint Vincent and the Grenadines","vc"],["Samoa","ws"],["San Marino","sm"],["Saudi Arabia","sa"],["Senegal","sn"],["Serbia","rs"],["Seychelles","sc"],["Sierra Leone","sl"],["Singapore","sg"],["Sint Maarten","sx"],["Slovakia","sk"],["Slovenia","si"],["Solomon Islands","sb"],["Somalia","so"],["South Africa","za"],["South Korea","kr"],["South Sudan","ss"],["Spain","es"],["Sri Lanka","lk"],["Sudan","sd"],["Suriname","sr"],["Sweden","se"],["Switzerland","ch"],["Syria","sy"],["São Tomé and Príncipe","st"],["Taiwan","tw"],["Tajikistan","tj"],["Tanzania","tz"],["Thailand","th"],["Timor-Leste","tl"],["Togo","tg"],["Tokelau","tk"],["Tonga","to"],["Trinidad and Tobago","tt"],["Tunisia","tn"],["Turkey","tr"],["Turkmenistan","tm"],["Turks and Caicos Islands","tc"],["Tuvalu","tv"],["U.S. Virgin Islands","vi"],["Uganda","ug"],["Ukraine","ua"],["United Arab Emirates","ae"],["United Kingdom","gb"],["United States","us"],["Uruguay","uy"],["Uzbekistan","uz"],["Vanuatu","vu"],["Vatican City","va"],["Venezuela","ve"],["Vietnam","vn"],["Wallis and Futuna","wf"],["Yemen","ye"],["Zambia","zm"],["Zimbabwe","zw"]];
  /* Listed first, as on the site's other forms. */
  var PREFERRED = ["us","gb","in","au","ca"];

  var PLATFORMS = [
    {id:"spectra-lms", group:"Platforms", name:"Spectra LMS", desc:"AI-empowered, social and gamified LMS", cta:"Request a demo", reply:"one business day",
     goals:"Number of learners, the roles you want to see and the Spectra LMS features that matter most",
     challenges:["Low learner engagement or completion","Learners need to learn on mobile","Learning is scattered across tools and spreadsheets","Hard to see engagement and learning impact","Running blended programs at scale","Moving from another LMS"]},
    {id:"capability-intelligence-platform", group:"Platforms", name:"Capability Intelligence Platform", short:"CIP", desc:"One view of workforce capability", cta:"Request a demo", reply:"one business day",
     goals:"The assessments you run today, the teams in scope and the capability view your leaders need",
     challenges:["No single view of workforce capability","Assessment results sit across tools and vendors","Hard to spot skill gaps across teams","Linking assessment results to development","Planning future skills and roles","Reporting capability to leadership"]},
    {id:"tna-tni-engine", group:"Platforms", name:"TNA/TNI Engine", desc:"Training needs backed by evidence", cta:"Request a demo", reply:"one business day",
     goals:"Roles and locations in scope, the data you hold today and when your next training cycle starts",
     challenges:["Training needs rest on opinion, not evidence","Skill gaps are not measured by role","The annual TNA takes too long to run","The training plan is not tied to business priorities","Hard to justify the training budget","Turning needs into a training calendar"]},
    {id:"zenith", group:"Tools", name:"Zenith", desc:"Leadership assessment and development center", cta:"Book a consultation", reply:"one business day",
     goals:"Leadership levels in scope, the decision this supports (selection, promotion or succession) and your timeline",
     challenges:["Identifying high-potential leaders","Succession planning for key roles","Selecting or promoting leaders objectively","Building a leadership pipeline","Developing leaders after an assessment","Thin leadership bench strength"]},
    {id:"orbit", group:"Tools", name:"Orbit", desc:"360-degree feedback", cta:"Book a consultation", reply:"one business day",
     goals:"Number of assessees, the rater groups you want (45 to 360 degrees) and the competencies that matter",
     challenges:["Running 360-degree feedback for leaders","Getting honest, anonymous feedback","Turning feedback into development plans","Replacing a manual or survey-based 360","Building a feedback culture","Multi-rater feedback for a large group"]},
    {id:"polaris", group:"Tools", name:"Polaris", desc:"Team effectiveness sessions", cta:"Get a free demo", reply:"two business days",
     goals:"Who is in the team and the conversation it keeps avoiding",
     challenges:["A pattern keeps repeating and nothing shifts it","The leadership team cannot get on the same page","The team is in open conflict","Trust needs repair after an incident","We just merged, restructured or reorganized","A new leader has taken over an established team","The team delivers, but burnout and turnover show"]},
    {id:"meridian", group:"Tools", name:"Meridian", desc:"AI-assisted leadership coaching", cta:"Get a free demo", reply:"one business day",
     goals:"Number of leaders, their levels and what you want coaching to change",
     challenges:["Developing senior leaders","Preparing successors","Supporting first-time managers","Leaders moving into new roles","Turning around performance","Keeping high potentials"]},
    {id:"not-sure", group:"", name:"Not sure yet", desc:"Help me choose the right fit", cta:"Talk to a specialist", reply:"one business day",
     goals:"Tell us what you want to achieve, and we will suggest the platform or tool that fits",
     challenges:["Building workforce capability","Finding and closing skill gaps","Developing leaders","Improving team effectiveness","Raising learning engagement","Giving leaders better feedback"]}
  ];
  var OTHER = "Something else";
  var byId = {}; PLATFORMS.forEach(function(p){ byId[p.id] = p; });

  var CHECK = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];}); }

  function init(root){
    if (!root || root.__edpf) return; root.__edpf = true;
    var form = root.querySelector("form");
    var $ = function(sel){ return root.querySelector(sel); };
    var picks = $("#edpf-platform"), alsoBox = $(".edpf-also");
    var chSel = $("#edpf-challenge"), goals = $("#edpf-goals");
    var btnL = $(".edpf-btn-l"), btn = $(".edpf-btn"), reply = $(".edpf-reply");
    var sum = $(".edpf-sum");
    var cSel = $("#edpf-country"), phone = $("#edpf-phone"), iti = null;
    var H = function(n){ return form.elements[n]; };

    var html = "", lastGroup = null;
    PLATFORMS.forEach(function(p){
      var g = p.group || "Other";
      if (g !== lastGroup) { if (lastGroup !== null) html += '</optgroup>'; html += '<optgroup label="' + g + '">'; lastGroup = g; }
      html += '<option value="' + p.id + '">' + esc(p.name) + '</option>';
    });
    picks.insertAdjacentHTML("beforeend", html + '</optgroup>');
    alsoBox.innerHTML = PLATFORMS.filter(function(p){return p.id!=="not-sure";}).map(function(p){
      return '<label class="edpf-chip"><input type="checkbox" value="' + p.id + '"><span>' + esc(p.short || p.name) + '</span></label>';
    }).join("");

    /* Country dropdown: the preferred countries, a divider, then A–Z — the
       same list and order as the phone input's flag menu. */
    var byIso = {}; COUNTRIES.forEach(function(c){ byIso[c[1]] = c[0]; });
    function addOpt(name, iso){ var o = document.createElement("option"); o.value = name; o.textContent = name; if (iso) o.setAttribute("data-iso", iso); cSel.appendChild(o); return o; }
    PREFERRED.forEach(function(iso){ addOpt(byIso[iso], iso); });
    addOpt("──────────").disabled = true;
    COUNTRIES.forEach(function(c){ if (PREFERRED.indexOf(c[1]) < 0) addOpt(c[0], c[1]); });

    /* The flag and the dropdown follow each other: picking a country sets
       the flag, picking a flag sets the country. */
    function setDial(){
      var d = iti ? iti.getSelectedCountryData().dialCode : "";
      H("phone_dial_code").value = d ? "+" + d : "";
    }
    cSel.addEventListener("change", function(){
      var o = cSel.options[cSel.selectedIndex], iso = o && o.getAttribute("data-iso");
      if (iti && iso) { try { iti.setCountry(iso); } catch(_){} }
      setDial();
    });
    loadIti().then(function(intlTelInput){
      iti = intlTelInput(phone, {
        initialCountry: "us",
        countryOrder: PREFERRED,
        separateDialCode: true,
        autoPlaceholder: "off"
      });
      phone.addEventListener("countrychange", function(){
        var iso = iti.getSelectedCountryData().iso2, name = byIso[iso];
        if (name && cSel.value !== name) { cSel.value = name; clearBad("country"); }
        setDial();
      });
      setDial();
    }).catch(function(){ /* plain phone field; the server takes the country's dial code */ });

    function current(){ return byId[picks.value] || null; }

    function apply(p){
      var prev = chSel.value;
      var list = (p ? p.challenges : []).concat([OTHER]);
      chSel.innerHTML = '<option value="">' + (p ? "Select your current challenge" : "Choose a platform first") + '</option>' +
        (p ? list.map(function(c){ return '<option' + (c===prev?' selected':'') + '>' + esc(c) + '</option>'; }).join("") : "");
      chSel.disabled = !p;
      goals.placeholder = p ? p.goals : "Share your challenges, desired outcomes, or specific areas where you need support";
      btnL.textContent = p ? p.cta : "Request a demo";
      reply.textContent = "We reply within " + (p ? p.reply : "one business day") + " with a scoped response, no automated sales sequence.";
      H("intent").value = p ? p.id : "";
      H("platform_name").value = p ? p.name : "";
      Array.prototype.forEach.call(alsoBox.querySelectorAll("input"), function(cb){
        var same = p && cb.value === p.id; if (same) cb.checked = false; cb.disabled = !!same;
      });
    }

    picks.addEventListener("change", function(){ apply(current()); clearBad("platform"); });

    var RULES = [
      {key:"platform", id:"edpf-platform", label:"Platform or tool"},
      {key:"full_name", id:"edpf-name", label:"Full name"},
      {key:"work_email", id:"edpf-email", label:"Work email", ok:function(v){ return /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(v); }},
      {key:"company", id:"edpf-company", label:"Company name"},
      {key:"job_title", id:"edpf-title", label:"Job title"},
      {key:"country", id:"edpf-country", label:"Country"},
      {key:"phone", id:"edpf-phone", label:"Phone", ok:function(v){ var d = v.replace(/\D/g,""); return d.length>=6 && d.length<=15 && /^[0-9 ()+.\-]+$/.test(v); }},
      {key:"company_size", id:"edpf-size", label:"Company size"},
      {key:"current_challenge", id:"edpf-challenge", label:"Current challenge"},
      {key:"timeline", id:"edpf-timeline", label:"Timeline for implementation"}
    ];
    function elOf(r){ return r.id ? root.querySelector("#" + r.id) : r.el(); }
    function wrapOf(r){ return r.wrap ? r.wrap() : elOf(r).closest(".edpf-f"); }
    function valid(r){ var el = elOf(r); var v = (el.value || "").trim(); return r.ok ? r.ok(v, el) : !!v; }
    function mark(r, bad){
      var w = wrapOf(r); if (w) w.classList.toggle("bad", bad);
      elOf(r).setAttribute("aria-invalid", bad ? "true" : "false");
    }
    function clearBad(key){ RULES.forEach(function(r){ if (r.key===key) mark(r,false); }); }
    RULES.forEach(function(r){
      var el = elOf(r);
      var ev = (el.tagName === "SELECT" || el.type === "checkbox") ? "change" : "blur";
      el.addEventListener(ev, function(){ if (el.type !== "checkbox" && !el.value.trim() && ev==="blur" && !wrapOf(r).classList.contains("bad")) return; mark(r, !valid(r)); });
      if (ev === "blur") el.addEventListener("input", function(){ if (wrapOf(r).classList.contains("bad") && valid(r)) mark(r, false); });
    });

    form.addEventListener("submit", function(e){
      e.preventDefault();
      var bad = RULES.filter(function(r){ var b = !valid(r); mark(r, b); return b; });
      if (bad.length) {
        sum.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg><span>' +
          (bad.length === 1 ? "One field needs attention: " : bad.length + " fields need attention: ") + bad.map(function(r){ return r.label; }).join(", ") + ".</span>";
        sum.hidden = false;
        var first = bad[0]; var target = elOf(first);
        target.focus({preventScroll:true}); wrapOf(first).scrollIntoView({behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block:"center"});
        return;
      }
      sum.hidden = true;
      var p = current();
      var also = Array.prototype.filter.call(alsoBox.querySelectorAll("input"), function(cb){ return cb.checked; }).map(function(cb){ return byId[cb.value].name; });
      H("also_interested").value = also.join(", ");
      H("source_page").value = root.getAttribute("data-platform") || "platforms-hub";
      H("page_url").value = location.href;
      H("submitted_at").value = new Date().toISOString();

      /* Straight to the thank-you page; the button stays busy until it loads. */
      var redirecting = false;
      function done(){
        redirecting = true;
        try { root.dispatchEvent(new CustomEvent("edpf:submitted", {bubbles:true, detail:{platform:p.id, source_page:H("source_page").value}})); } catch(_){}
        if (window.dataLayer) window.dataLayer.push({event:"platform_form_submit", platform:p.id, source_page:H("source_page").value});
        location.assign(THANK_YOU_URL);
      }
      if (H("company_website").value) { done(); return; }
      var alsoIds = Array.prototype.filter.call(alsoBox.querySelectorAll("input"), function(cb){ return cb.checked; }).map(function(cb){ return cb.value; });
      var alsoOther = alsoIds.filter(function(id){ return !ZOHO_ALSO[id]; }).map(function(id){ return byId[id].name; });
      var goalsText = H("challenges_goals").value.trim();
      var payload = {
        source: "platform-enquiry",
        company_website: H("company_website").value,
        page: location.pathname,
        platform: p.name,
        name: H("full_name").value.trim(),
        email: H("work_email").value.trim(),
        company: H("company").value.trim(),
        jobTitle: H("job_title").value.trim(),
        country: H("country").value,
        dialCode: H("phone_dial_code").value,
        phone: H("phone").value.trim(),
        companySize: H("company_size").value,
        challenge: H("current_challenge").value,
        employeesImpacted: H("employees_impacted").value,
        timeline: H("timeline").value,
        budget: H("budget_range").value,
        alsoInterested: alsoIds.filter(function(id){ return ZOHO_ALSO[id]; }).map(function(id){ return ZOHO_ALSO[id]; }),
        message: (alsoOther.length ? "Also interested in: " + alsoOther.join(", ") + (goalsText ? "\n\n" : "") : "") + goalsText
      };
      /* The server's field names → this form's rules, to mark what it rejects. */
      var SERVER_FIELDS = {name:"full_name", email:"work_email", company:"company", jobTitle:"job_title", country:"country", phone:"phone", companySize:"company_size", challenge:"current_challenge", timeline:"timeline", platform:"platform"};
      function fail(text){
        sum.innerHTML = "<span>" + esc(text) + "</span>";
        sum.hidden = false; sum.focus();
      }
      btn.disabled = true; btn.setAttribute("aria-busy","true");
      fetch(FORM_ENDPOINT, {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload)})
        .then(function(res){ return res.json().catch(function(){ return {}; }).then(function(body){ return {status:res.status, body:body}; }); })
        .then(function(r){
          if (r.body && r.body.ok) { done(); return; }
          if (r.body && r.body.errors) {
            var labels = [];
            Object.keys(r.body.errors).forEach(function(k){
              var rule = RULES.filter(function(x){ return x.key === SERVER_FIELDS[k]; })[0];
              if (rule) { mark(rule, true); labels.push(rule.label); }
              else labels.push(r.body.errors[k]);
            });
            fail((labels.length === 1 ? "One field needs attention: " : labels.length + " fields need attention: ") + labels.join(", ") + ".");
            return;
          }
          fail((r.body && r.body.error) || "Your request could not be sent. Please try again, or email contact@edstellar.com. Everything you entered is still here.");
        })
        .catch(function(){
          fail("Your request could not be sent. Please try again, or email contact@edstellar.com. Everything you entered is still here.");
        })
        .then(function(){ if (!redirecting) { btn.disabled = false; btn.removeAttribute("aria-busy"); } });
    });

    function setPlatform(id){
      picks.value = byId[id] ? id : "";
      apply(byId[id] || null);
    }
    root.edpfSetPlatform = setPlatform;
    root.edpfReset = function(){
      form.reset(); sum.hidden = true;
      RULES.forEach(function(r){ mark(r,false); });
      if (iti) { try { iti.setCountry("us"); } catch(_){} }
      setDial(); setPlatform(root.getAttribute("data-platform") || "");
    };
    setDial();
    setPlatform(root.getAttribute("data-platform") || "");
  }

  window.EdPlatformForm = { init:init, platforms:PLATFORMS };
  Array.prototype.forEach.call(document.querySelectorAll(".edpf"), init);
})();
