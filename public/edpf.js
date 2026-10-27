/* ============================================================
   Edstellar Platform Form (edpf) — shared script
   Loaded by: orbit.html, polaris.html, meridian.html, spectra-lms.html

   To update form logic or wire Zoho CRM:
     1. Set FORM_ENDPOINT to your CRM POST URL (line ~5 below)
     2. Save — all 4 pages update automatically
   ============================================================ */

(function(){
  "use strict";
  var FORM_ENDPOINT = ""; /* TODO: CRM endpoint */

  var COUNTRIES = [["Afghanistan", "+93"], ["Albania", "+355"], ["Algeria", "+213"], ["American Samoa", "+1"], ["Andorra", "+376"], ["Angola", "+244"], ["Anguilla", "+1"], ["Antigua and Barbuda", "+1"], ["Argentina", "+54"], ["Armenia", "+374"], ["Aruba", "+297"], ["Australia", "+61"], ["Austria", "+43"], ["Azerbaijan", "+994"], ["Bahamas", "+1"], ["Bahrain", "+973"], ["Bangladesh", "+880"], ["Barbados", "+1"], ["Belarus", "+375"], ["Belgium", "+32"], ["Belize", "+501"], ["Benin", "+229"], ["Bermuda", "+1"], ["Bhutan", "+975"], ["Bolivia", "+591"], ["Bosnia and Herzegovina", "+387"], ["Botswana", "+267"], ["Brazil", "+55"], ["British Indian Ocean Territory", "+246"], ["British Virgin Islands", "+1"], ["Brunei", "+673"], ["Bulgaria", "+359"], ["Burkina Faso", "+226"], ["Burundi", "+257"], ["Cambodia", "+855"], ["Cameroon", "+237"], ["Canada", "+1"], ["Cape Verde", "+238"], ["Caribbean Netherlands", "+599"], ["Cayman Islands", "+1"], ["Central African Republic", "+236"], ["Chad", "+235"], ["Chile", "+56"], ["China", "+86"], ["Christmas Island", "+61"], ["Cocos Islands", "+61"], ["Colombia", "+57"], ["Comoros", "+269"], ["Cook Islands", "+682"], ["Costa Rica", "+506"], ["Croatia", "+385"], ["Cuba", "+53"], ["Curaçao", "+599"], ["Cyprus", "+357"], ["Czech Republic", "+420"], ["Côte d'Ivoire", "+225"], ["DR Congo", "+243"], ["Denmark", "+45"], ["Djibouti", "+253"], ["Dominica", "+1"], ["Dominican Republic", "+1"], ["Ecuador", "+593"], ["Egypt", "+20"], ["El Salvador", "+503"], ["Equatorial Guinea", "+240"], ["Eritrea", "+291"], ["Estonia", "+372"], ["Eswatini", "+268"], ["Ethiopia", "+251"], ["Falkland Islands", "+500"], ["Faroe Islands", "+298"], ["Fiji", "+679"], ["Finland", "+358"], ["France", "+33"], ["French Guiana", "+594"], ["French Polynesia", "+689"], ["Gabon", "+241"], ["Gambia", "+220"], ["Georgia", "+995"], ["Germany", "+49"], ["Ghana", "+233"], ["Gibraltar", "+350"], ["Greece", "+30"], ["Greenland", "+299"], ["Grenada", "+1"], ["Guadeloupe", "+590"], ["Guam", "+1"], ["Guatemala", "+502"], ["Guernsey", "+44"], ["Guinea", "+224"], ["Guinea-Bissau", "+245"], ["Guyana", "+592"], ["Haiti", "+509"], ["Honduras", "+504"], ["Hong Kong", "+852"], ["Hungary", "+36"], ["Iceland", "+354"], ["India", "+91"], ["Indonesia", "+62"], ["Iran", "+98"], ["Iraq", "+964"], ["Ireland", "+353"], ["Isle of Man", "+44"], ["Israel", "+972"], ["Italy", "+39"], ["Jamaica", "+1"], ["Japan", "+81"], ["Jersey", "+44"], ["Jordan", "+962"], ["Kazakhstan", "+7"], ["Kenya", "+254"], ["Kiribati", "+686"], ["Kuwait", "+965"], ["Kyrgyzstan", "+996"], ["Laos", "+856"], ["Latvia", "+371"], ["Lebanon", "+961"], ["Lesotho", "+266"], ["Liberia", "+231"], ["Libya", "+218"], ["Liechtenstein", "+423"], ["Lithuania", "+370"], ["Luxembourg", "+352"], ["Macao", "+853"], ["Madagascar", "+261"], ["Malawi", "+265"], ["Malaysia", "+60"], ["Maldives", "+960"], ["Mali", "+223"], ["Malta", "+356"], ["Marshall Islands", "+692"], ["Martinique", "+596"], ["Mauritania", "+222"], ["Mauritius", "+230"], ["Mayotte", "+262"], ["Mexico", "+52"], ["Micronesia", "+691"], ["Moldova", "+373"], ["Monaco", "+377"], ["Mongolia", "+976"], ["Montenegro", "+382"], ["Montserrat", "+1"], ["Morocco", "+212"], ["Mozambique", "+258"], ["Myanmar", "+95"], ["Namibia", "+264"], ["Nauru", "+674"], ["Nepal", "+977"], ["Netherlands", "+31"], ["New Caledonia", "+687"], ["New Zealand", "+64"], ["Nicaragua", "+505"], ["Niger", "+227"], ["Nigeria", "+234"], ["Niue", "+683"], ["Norfolk Island", "+672"], ["North Korea", "+850"], ["North Macedonia", "+389"], ["Northern Mariana Islands", "+1"], ["Norway", "+47"], ["Oman", "+968"], ["Pakistan", "+92"], ["Palau", "+680"], ["Palestine", "+970"], ["Panama", "+507"], ["Papua New Guinea", "+675"], ["Paraguay", "+595"], ["Peru", "+51"], ["Philippines", "+63"], ["Poland", "+48"], ["Portugal", "+351"], ["Puerto Rico", "+1"], ["Qatar", "+974"], ["Republic of the Congo", "+242"], ["Romania", "+40"], ["Russia", "+7"], ["Rwanda", "+250"], ["Réunion", "+262"], ["Saint Barthélemy", "+590"], ["Saint Helena", "+290"], ["Saint Kitts and Nevis", "+1"], ["Saint Lucia", "+1"], ["Saint Martin", "+590"], ["Saint Pierre and Miquelon", "+508"], ["Saint Vincent and the Grenadines", "+1"], ["Samoa", "+685"], ["San Marino", "+378"], ["Sao Tome and Principe", "+239"], ["Saudi Arabia", "+966"], ["Senegal", "+221"], ["Serbia", "+381"], ["Seychelles", "+248"], ["Sierra Leone", "+232"], ["Singapore", "+65"], ["Sint Maarten", "+1"], ["Slovakia", "+421"], ["Slovenia", "+386"], ["Solomon Islands", "+677"], ["Somalia", "+252"], ["South Africa", "+27"], ["South Korea", "+82"], ["South Sudan", "+211"], ["Spain", "+34"], ["Sri Lanka", "+94"], ["Sudan", "+249"], ["Suriname", "+597"], ["Svalbard and Jan Mayen", "+47"], ["Sweden", "+46"], ["Switzerland", "+41"], ["Syria", "+963"], ["Taiwan", "+886"], ["Tajikistan", "+992"], ["Tanzania", "+255"], ["Thailand", "+66"], ["Timor-Leste", "+670"], ["Togo", "+228"], ["Tokelau", "+690"], ["Tonga", "+676"], ["Trinidad and Tobago", "+1"], ["Tunisia", "+216"], ["Turkey", "+90"], ["Turkmenistan", "+993"], ["Turks and Caicos Islands", "+1"], ["Tuvalu", "+688"], ["US Virgin Islands", "+1"], ["Uganda", "+256"], ["Ukraine", "+380"], ["United Arab Emirates", "+971"], ["United Kingdom", "+44"], ["United States", "+1"], ["Uruguay", "+598"], ["Uzbekistan", "+998"], ["Vanuatu", "+678"], ["Vatican City", "+39"], ["Venezuela", "+58"], ["Vietnam", "+84"], ["Wallis and Futuna", "+681"], ["Western Sahara", "+212"], ["Yemen", "+967"], ["Zambia", "+260"], ["Zimbabwe", "+263"], ["Åland Islands", "+358"]];

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
    var sum = $(".edpf-sum"), thanks = $(".edpf-thanks");
    var cSel = $("#edpf-country"), dial = $("#edpf-dial");
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

    COUNTRIES.forEach(function(c){ var o = document.createElement("option"); o.value = c[0]; o.textContent = c[0]; o.setAttribute("data-dial", c[1]); cSel.appendChild(o); });
    function setDial(){ var o = cSel.options[cSel.selectedIndex]; var d = o ? (o.getAttribute("data-dial") || "") : ""; dial.textContent = d || "+"; H("phone_dial_code").value = d; }
    cSel.addEventListener("change", setDial);

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
      {key:"timeline", id:"edpf-timeline", label:"Timeline for implementation"},
      {key:"consent", id:"edpf-consent", label:"Privacy consent", ok:function(v,el){ return el.checked; }, wrap:function(){ return root.querySelector('[data-field="consent"]'); }}
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

      function done(){
        var first = (H("full_name").value.trim().split(/\s+/)[0] || "");
        $(".edpf-thanks-h").textContent = "Thank you" + (first ? ", " + first : "") + ". Your request is in.";
        $(".edpf-thanks-p").textContent = (p.id === "not-sure" ? "An Edstellar specialist" : "Your Edstellar " + p.name + " specialist") + " replies within " + p.reply + " with a scoped response.";
        var a = $(".edpf-thanks-also");
        if (also.length) { a.textContent = "We will also cover " + also.join(", ") + "."; a.hidden = false; } else a.hidden = true;
        form.hidden = true; thanks.hidden = false; thanks.focus();
        try { root.dispatchEvent(new CustomEvent("edpf:submitted", {bubbles:true, detail:{platform:p.id, source_page:H("source_page").value}})); } catch(_){}
        if (window.dataLayer) window.dataLayer.push({event:"platform_form_submit", platform:p.id, source_page:H("source_page").value});
      }
      if (H("company_website").value) { done(); return; }
      if (!FORM_ENDPOINT) { done(); return; }
      btn.disabled = true; btn.setAttribute("aria-busy","true");
      fetch(FORM_ENDPOINT, {method:"POST", body:new FormData(form)})
        .then(function(res){ if (!res.ok) throw new Error(res.status); done(); })
        .catch(function(){
          sum.innerHTML = "<span>Your request could not be sent. Please try again, or email contact@edstellar.com. Everything you entered is still here.</span>";
          sum.hidden = false; sum.focus();
        })
        .then(function(){ btn.disabled = false; btn.removeAttribute("aria-busy"); });
    });

    function setPlatform(id){
      picks.value = byId[id] ? id : "";
      apply(byId[id] || null);
    }
    root.edpfSetPlatform = setPlatform;
    root.edpfReset = function(){
      form.reset(); form.hidden = false; thanks.hidden = true; sum.hidden = true;
      RULES.forEach(function(r){ mark(r,false); });
      setDial(); setPlatform(root.getAttribute("data-platform") || "");
    };
    setDial();
    setPlatform(root.getAttribute("data-platform") || "");
  }

  window.EdPlatformForm = { init:init, platforms:PLATFORMS };
  Array.prototype.forEach.call(document.querySelectorAll(".edpf"), init);
})();
