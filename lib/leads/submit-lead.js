import "server-only";

import {
  BUDGET_RANGES,
  CHALLENGES_BY_INTEREST,
  COMPANY_SIZES,
  CONSULTING_INTERESTS,
  EMPLOYEES_IMPACTED,
  TIMELINES,
} from "@/content/consulting-form";
import { RETREAT_INTERESTS } from "@/content/leadership-retreats";
import { RFP_PAGE } from "@/content/company/request-for-proposal";
import { BRIEF } from "@/lib/nav-data";
import { COUNTRIES } from "@/lib/countries";
import {
  deliverCatalogDownload,
  deliverCourseQuote,
  deliverGlobalNavigation,
  deliverGuestAuthor,
  deliverLdConsulting,
  deliverLeadershipRetreat,
  deliverPartnership,
  deliverRfp,
  deliverTrainingEnquiry,
} from "@/lib/leads/zoho";

/**
 * Lead capture — the one pipeline behind both `app/api/leads/route.js` and
 * the form Server Actions in `lib/actions/`. Rate limit, honeypot, validate,
 * deliver; it answers `{ status, body }` and the caller turns that into an
 * HTTP response or an action result.
 *
 * Validation runs here as well as in the form because client-side validation
 * is a UX affordance, not a control — this must assume the submission did not
 * come from the form (TASTE.md §7.1).
 *
 * **Nothing here logs a submitted value.** Names, emails and phone numbers are
 * PII; a stack trace carrying a lead's email into a log aggregator is a real
 * incident, so failures are logged by shape only.
 */

/** Max requests per window, per IP. */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

/**
 * In-memory rate limiting. Correct for a single instance and useless across
 * several, which is the honest state of this until a shared store exists —
 * see TASTE.md §13. It is here because no limit at all means an open relay
 * into the sales pipeline.
 */
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Bound the map so a spray of unique IPs cannot grow it without limit.
  if (hits.size > 10_000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > RATE_LIMIT;
}

/** The course group-quote's requirements file: the live form's types and limit. */
const COURSE_FILE_TYPES = /\.(xls|xlsx)$/i;
const COURSE_FILE_MAX_BYTES = 4 * 1024 * 1024;

/** The RFP form's documents: its types, count and total size, as the form
 * itself checks them (`content/company/request-for-proposal.js`). */
const RFP_FORM = RFP_PAGE.submit;
const RFP_FILE_TYPES = /\.(pdf|docx|xlsx)$/i;

function rfpFileErrors(files) {
  if (files.length > RFP_FORM.files.max_files) return { files: `Upload up to ${RFP_FORM.files.max_files} files.` };
  if (files.some((file) => !RFP_FILE_TYPES.test(file.name))) return { files: "Upload PDF, DOCX or XLSX files only." };
  if (files.reduce((sum, file) => sum + file.size, 0) > RFP_FORM.files.max_mb * 1024 * 1024) {
    return { files: `Files must total ${RFP_FORM.files.max_mb}MB or less.` };
  }
  return {};
}

/** The header brief composer's options for one sentence slot. */
function briefOptions(key) {
  return BRIEF.slots.find((slot) => slot.k === key)?.options.map((option) => option.label) ?? [];
}

/** The live Zoho PartnershipForm's dropdown options. */
const PARTNERSHIP_TYPES = ["Resellers", "Affiliates"];
const TARGET_SEGMENTS = ["B2B", "B2C", "B2B and B2C"];

/**
 * Where each form's leads go, keyed by the `source` it submits with: the
 * fields that destination needs beyond name/email/phone, the allowed values
 * of its dropdowns (Zoho rejects anything outside its own option list), and
 * the delivery itself; `phone: false` / `name: false` for a form without
 * that field. A
 * source with no entry has no destination yet and
 * fails loudly (`deliver` below) — a form that reports success while
 * discarding the lead is worse than one that reports failure.
 */
const DESTINATIONS = {
  "training-enquiry": {
    required: ["company", "jobTitle", "country"],
    deliver: deliverTrainingEnquiry,
  },
  "ld-consulting": {
    required: ["company", "jobTitle", "country", "companySize", "interest", "challenge", "timeline"],
    options: {
      companySize: COMPANY_SIZES,
      interest: CONSULTING_INTERESTS,
      employeesImpacted: EMPLOYEES_IMPACTED,
      timeline: TIMELINES,
      budget: BUDGET_RANGES,
    },
    // The challenge list depends on the interest, as on the live form.
    check: (lead) =>
      lead.challenge && !(CHALLENGES_BY_INTEREST[lead.interest] ?? []).includes(lead.challenge)
        ? { challenge: "Select a challenge for your consulting interest." }
        : {},
    deliver: deliverLdConsulting,
  },
  partnership: {
    required: ["country", "partnershipType"],
    options: {
      audience: ["business", "individual"],
      partnershipType: PARTNERSHIP_TYPES,
      targetSegment: TARGET_SEGMENTS,
    },
    // The businesses tab also asks for the company and a target segment.
    check: (lead) =>
      lead.audience === "business"
        ? {
            ...(lead.company ? {} : { company: REQUIRED_MESSAGES.company }),
            ...(lead.targetSegment ? {} : { targetSegment: REQUIRED_MESSAGES.targetSegment }),
          }
        : lead.audience
          ? {}
          : { audience: "Choose businesses or individuals." },
    deliver: deliverPartnership,
  },
  "course-quote": {
    required: ["company", "jobTitle", "country", "teamSize", "frequency"],
    check: (lead) =>
      lead.file &&
      (!COURSE_FILE_TYPES.test(lead.file.name) || lead.file.size > COURSE_FILE_MAX_BYTES)
        ? { file: "Upload an Excel file (.xls or .xlsx) of up to 4 MB." }
        : {},
    deliver: deliverCourseQuote,
  },
  "leadership-retreat": {
    required: ["company", "jobTitle", "country", "retreatInterest"],
    options: { retreatInterest: RETREAT_INTERESTS },
    deliver: deliverLeadershipRetreat,
  },
  "guest-author": {
    required: ["jobTitle", "linkedin"],
    phone: false,
    deliver: deliverGuestAuthor,
  },
  "global-navigation": {
    // No country: Zoho's GlobalNavigationForm has no field for it.
    required: ["company"],
    // The composer's sentence slots send their option labels — which are
    // Zoho's own dropdown values.
    options: {
      briefService: briefOptions("service"),
      briefWho: briefOptions("who"),
      briefWhere: briefOptions("where"),
    },
    check: (lead) =>
      lead.briefService || lead.message
        ? {}
        : { message: "Choose a service in the sentence above, or describe what you need." },
    deliver: deliverGlobalNavigation,
  },
  rfp: {
    required: ["company", "jobTitle", "country", "docType", "deadline", "headcount", "deliveryCountries"],
    options: {
      orgType: RFP_FORM.org_types,
      docType: RFP_FORM.doc_types,
      headcount: RFP_FORM.headcounts,
    },
    check: (lead) => ({
      ...(lead.services.length ? {} : { services: REQUIRED_MESSAGES.services }),
      ...(lead.services.every((service) => RFP_FORM.services.includes(service))
        ? {}
        : { services: "Select one of the listed options." }),
      ...(lead.deadline && !/^\d{4}-\d{2}-\d{2}$/.test(lead.deadline) ? { deadline: "Enter a valid date." } : {}),
      ...(lead.portalLink && !/^https?:\/\/\S+$/i.test(lead.portalLink) ? { portalLink: "Enter a valid link." } : {}),
      ...rfpFileErrors(lead.files),
    }),
    deliver: deliverRfp,
  },
  "catalog-download": {
    required: ["company"],
    phone: false,
    deliver: deliverCatalogDownload,
  },
};

const REQUIRED_MESSAGES = {
  company: "Enter your company name.",
  jobTitle: "Enter your job title.",
  country: "Select your country.",
  companySize: "Select your company size.",
  interest: "Select your primary consulting interest.",
  challenge: "Select your current challenge.",
  timeline: "Select a timeline.",
  partnershipType: "Select a partnership type.",
  targetSegment: "Select a target segment.",
  teamSize: "Select how many team members need training.",
  frequency: "Select one-time or recurring training.",
  retreatInterest: "Select what you are interested in.",
  linkedin: "Enter your LinkedIn profile.",
  docType: "Choose the document type.",
  deadline: "Enter the submission deadline.",
  headcount: "Select a range.",
  deliveryCountries: "List the delivery countries.",
  services: "Choose at least one service.",
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COUNTRY_NAMES = new Set(COUNTRIES.map((c) => c.name));

function str(value) {
  return typeof value === "string" ? value.trim() : "";
}

/** A multi-value field: the non-empty strings in it (a lone string counts). */
function strs(value) {
  return (Array.isArray(value) ? value : [value]).map(str).filter(Boolean);
}

function validate(body, { required = [], options = {}, check, phone = true, name = true } = {}) {
  const errors = {};

  const lead = {
    name: str(body.name),
    email: str(body.email),
    phone: str(body.phone),
    country: str(body.country),
    message: str(body.message),
    company: str(body.company),
    jobTitle: str(body.jobTitle),
    program: str(body.program),
    page: str(body.page),
    // Which package button the enquiry came from (pricing page), e.g.
    // "IT & Technical Training: Growth Package".
    origin: /^[\w &:-]{1,100}$/.test(str(body.origin)) ? str(body.origin) : "",
    dialCode: str(body.dialCode).replace(/\D/g, ""),
    // Zoho's Branch on a dynamic page's form, e.g. "course".
    branch: /^[a-z-]{1,40}$/.test(str(body.branch)) ? str(body.branch) : "",
    // The form's thank-you page slug — Zoho records it as its redirect URL.
    thankYou: /^[a-z0-9-]{1,60}$/.test(str(body.thankYou)) ? str(body.thankYou) : "",
    // Consulting form dropdowns.
    companySize: str(body.companySize),
    interest: str(body.interest),
    challenge: str(body.challenge),
    employeesImpacted: str(body.employeesImpacted),
    timeline: str(body.timeline),
    budget: str(body.budget),
    // Partner program form.
    audience: str(body.audience),
    partnershipType: str(body.partnershipType),
    targetSegment: str(body.targetSegment),
    // Course group-quote wizard.
    teamSize: str(body.teamSize),
    frequency: str(body.frequency),
    courses: str(body.courses),
    file: body.file instanceof File && body.file.size > 0 ? body.file : null,
    // Leadership retreat request form.
    retreatInterest: str(body.retreatInterest),
    // Guest author pitch form.
    linkedin: str(body.linkedin),
    // Header "Build your brief" composer.
    briefService: str(body.briefService),
    briefWho: str(body.briefWho),
    briefWhere: str(body.briefWhere),
    // Request for proposal form.
    orgType: str(body.orgType),
    docType: str(body.docType),
    services: strs(body.services),
    headcount: str(body.headcount),
    deliveryCountries: str(body.deliveryCountries),
    deadline: str(body.deadline),
    portalLink: str(body.portalLink),
    files: (Array.isArray(body.files) ? body.files : []).filter((file) => file instanceof File && file.size > 0),
  };

  if ((name || lead.name) && (lead.name.length < 2 || lead.name.length > 100)) errors.name = "Enter your name.";
  if (!EMAIL.test(lead.email) || lead.email.length > 254) {
    errors.email = "Enter a valid work email address.";
  }
  if (phone && lead.phone.replace(/\D/g, "").length < 6) {
    errors.phone = "Enter a valid phone number.";
  }
  if (lead.country && !COUNTRY_NAMES.has(lead.country)) errors.country = "Unknown country.";
  if (lead.message.length > 5000) errors.message = "Message is too long.";
  if (lead.dialCode.length > 4) errors.phone = "Enter a valid phone number.";
  if (lead.courses.length > 5000) errors.courses = "Too many courses.";
  for (const key of ["company", "jobTitle", "program", "page", "teamSize", "frequency", "linkedin", "deliveryCountries", "portalLink"]) {
    if (lead[key].length > 255) errors[key] = "Too long.";
  }
  for (const [key, allowed] of Object.entries(options)) {
    if (lead[key] && !allowed.includes(lead[key])) errors[key] = "Select one of the listed options.";
  }
  Object.assign(errors, check?.(lead));
  for (const key of required) {
    if (!lead[key] && !errors[key]) errors[key] = REQUIRED_MESSAGES[key];
  }

  return { errors, lead };
}

/**
 * Run one submission through the pipeline.
 *
 * @param {object} body  The submitted fields, plus `source` (which form) and
 *   `company_website` (the honeypot).
 * @param {string} ip    The caller's IP, for rate limiting.
 * @returns {Promise<{ status: number, body: object }>}
 */
export async function submitLead(body, ip) {
  if (rateLimited(ip)) {
    return { status: 429, body: { error: "Too many requests. Try again in a minute." } };
  }

  if (!body || typeof body !== "object") {
    return { status: 400, body: { error: "Malformed request." } };
  }

  // Honeypot: a real browser never fills a hidden field. Answer success so a
  // bot learns nothing from the response (TASTE.md §7.1).
  if (typeof body.company_website === "string" && body.company_website !== "") {
    return { status: 200, body: { ok: true } };
  }

  const destination = DESTINATIONS[str(body.source)];
  const { errors, lead } = validate(body, destination);

  if (Object.keys(errors).length > 0) {
    return { status: 422, body: { errors } };
  }

  try {
    if (!destination) throw new Error("LeadDestinationNotConfigured");
    await destination.deliver(lead);
  } catch (error) {
    // Shape only — never the lead, and never the upstream response body.
    // An ApiError's message is safe to log: URL without query, status, and
    // the destination's own field-level reason — never a submitted value.
    console.error(
      "[leads] delivery failed:",
      error?.name === "ApiError" ? error.message : (error?.name ?? "Error"),
    );
    // In `next dev` only, the reason rides along so it shows on the form —
    // the same PII-free text that is logged above.
    const reason =
      process.env.NODE_ENV === "development"
        ? ` [dev: ${error?.name === "ApiError" ? error.message : (error?.message ?? error?.name)}]`
        : "";
    return {
      status: 502,
      body: { error: `We could not submit your enquiry. Please try again.${reason}` },
    };
  }

  return { status: 201, body: { ok: true } };
}
