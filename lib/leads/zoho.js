import "server-only";

import { apiPostForm } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { COUNTRIES } from "@/lib/countries";

/**
 * Lead delivery to Zoho Forms — field for field what the live site's forms
 * post, so records arrive in Zoho (and the CRM behind it) shaped exactly as
 * they always have. Every Edstellar Zoho form shares the same contact block:
 *
 *   SingleLine2  name                    SingleLine7  country name
 *   Email        work email              Dropdown     country ISO code ("us")
 *   SingleLine   company                 SingleLine3  dial code, digits only
 *   SingleLine1  job title               PhoneNumber_countrycode  national number
 *   MultiLine    free-text message       SingleLine4  page name (PAGE NAME)
 *                                        SingleLine5  branch (Branch)
 *
 * and each form adds its own fields on top (`deliverLdConsulting`).
 */

/**
 * The Zoho forms' bot rule rejects any submission that does not come from
 * edstellar.com ("Zoho Forms Bot", HTTP 400). A browser on the live site
 * says where it is with `Referer`/`Origin`; a server-side post sends neither,
 * so they are set to the page on edstellar.com the enquiry was made from.
 * Pinned to the live domain rather than `SITE.url`, which a staging deploy
 * may point elsewhere — the rule only knows edstellar.com.
 */
const ZOHO_ALLOWED_ORIGIN = "https://www.edstellar.com";

/**
 * Zoho's rejection page lists each failing field with Zoho's own message —
 * "FULL NAME Enter a value for this field." — and never echoes a submitted
 * value, so its text is safe to put in an error. Everything outside that list
 * (markup, script, style) is dropped. Other rejections — a 400 rather than
 * the 409 field list — are a generic Zoho error page, whose text is the
 * reason.
 */
function zohoErrorDetail(body) {
  const text = body
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");
  const match = text.match(/Error Occurred!\s*(.*?)\s*Back\b/);
  return (match?.[1] ?? text.trim()).slice(0, 300);
}

/**
 * The contact block every form shares. The dial code is the phone input's
 * own country (its flag can differ from the Country dropdown), falling back
 * to the selected country's. `program` (the link a university/government
 * enquiry came from) has no field of its own on the Zoho forms, so it rides
 * in Zoho's referrer field.
 */
function contactFields(lead, defaultThankYou) {
  const country = COUNTRIES.find((c) => c.name === lead.country);
  const dialDigits = lead.dialCode || (country?.dialCode.replace(/\D/g, "") ?? "");

  // The national number: digits only, minus the dial code the phone input
  // puts in front ("+91 98765 43210" → "9876543210").
  let phone = lead.phone.replace(/\D/g, "").replace(/^00/, "");
  if (dialDigits && lead.phone.trim().startsWith("+") && phone.startsWith(dialDigits)) {
    phone = phone.slice(dialDigits.length);
  }

  // The live forms record the page's last path segment, "Home Page" at `/`.
  const page = lead.page.split("/").filter(Boolean).at(-1) || "Home Page";

  return {
    zf_referrer_name: lead.program,
    // Each form's own thank-you page, as the live forms send.
    zf_redirect_url: `${ZOHO_ALLOWED_ORIGIN}/thank-you/${lead.thankYou || defaultThankYou}`,
    zc_gad: "",
    SingleLine2: lead.name,
    Email: lead.email,
    SingleLine: lead.company,
    SingleLine1: lead.jobTitle,
    Dropdown: country?.iso2 ?? "",
    SingleLine7: lead.country,
    SingleLine3: dialDigits,
    PhoneNumber_countrycode: phone,
    // Branch: the page again on static pages; a dynamic page's form names
    // its kind instead ("course"); the pricing page's package buttons put
    // "{tab}: {plan} Package" here.
    SingleLine5: lead.branch || lead.origin || page,
    // PAGE NAME: always the page's slug.
    SingleLine4: page,
    MultiLine: lead.message,
  };
}

function postToZoho(url, fields, lead) {
  return apiPostForm(url, fields, {
    errorDetail: zohoErrorDetail,
    headers: {
      Origin: ZOHO_ALLOWED_ORIGIN,
      Referer: `${ZOHO_ALLOWED_ORIGIN}${lead.page.startsWith("/") ? lead.page : "/"}`,
    },
  });
}

/** Zoho "TrainingEnquiry" — the live `/enquiry-form` and `/contact-us`. */
export async function deliverTrainingEnquiry(lead) {
  await postToZoho(endpoints.zohoTrainingEnquiry(), contactFields(lead, "enquire"), lead);
}

/**
 * Zoho "EdstellarLDConsultingform1" — the live L&D, OD, talent assessment,
 * coaching and managed training pages. The contact block plus:
 *
 *   Dropdown2  company size              Dropdown4  employees to be impacted
 *   Dropdown1  primary consulting interest  Dropdown5  timeline
 *   Dropdown3  current L&D challenge     Dropdown6  budget range
 */
export async function deliverLdConsulting(lead) {
  await postToZoho(
    endpoints.zohoLdConsulting(),
    {
      ...contactFields(lead, "consulting"),
      Dropdown2: lead.companySize,
      Dropdown1: lead.interest,
      Dropdown3: lead.challenge,
      Dropdown4: lead.employeesImpacted,
      Dropdown5: lead.timeline,
      Dropdown6: lead.budget,
    },
    lead,
  );
}

/**
 * Zoho "PartnershipForm" — both tabs of the live `/partner-program` form.
 * It shares the contact block's field names but not all their meanings:
 *
 *   SingleLine1  country name (not job title — this form has none)
 *   SingleLine4  which tab: "For Businesses" / "For Indivisuvals" (sic —
 *                the live form's own spelling, kept so records match)
 *   Dropdown1    partnership type        Dropdown2  target segment (businesses)
 *
 * and no SingleLine7. The individuals tab also has no SingleLine (company)
 * or Dropdown2. Each tab has its own thank-you page.
 */
export async function deliverPartnership(lead) {
  const business = lead.audience === "business";
  const { SingleLine7, SingleLine1, SingleLine4, SingleLine, ...contact } = contactFields(
    lead,
    business ? "partnership-groups" : "partnership-individuals",
  );

  // The individuals tab has no company or target segment field at all.
  await postToZoho(
    endpoints.zohoPartnership(),
    {
      ...contact,
      SingleLine1: lead.country,
      SingleLine4: business ? "For Businesses" : "For Indivisuvals",
      Dropdown1: lead.partnershipType,
      ...(business && { SingleLine, Dropdown2: lead.targetSegment }),
    },
    lead,
  );
}

/**
 * Zoho "CourseMultiStepFrom" (sic) — the live course pages' multi-step
 * group-quote form. Field for field what its script posts, which is not the
 * shared contact block: no referrer/redirect fields, no country ISO code,
 * and
 *
 *   SingleLine9  country name            SingleLine6  team members
 *   SingleLine4  course slug             SingleLine7  "One Time", or the
 *   SingleLine5  "course"                             recurring session count
 *   SingleLine8  "website"               MultiLine1   courses picked (several)
 *   MultiLine    training needs          FileUpload   requirements Excel file
 */
export async function deliverCourseQuote(lead) {
  const contact = contactFields(lead, "course-multistep-form");

  const fields = {
    SingleLine2: contact.SingleLine2,
    Email: contact.Email,
    SingleLine: contact.SingleLine,
    SingleLine1: contact.SingleLine1,
    SingleLine3: contact.SingleLine3,
    PhoneNumber_countrycode: contact.PhoneNumber_countrycode,
    SingleLine9: lead.country,
    MultiLine: lead.message,
    SingleLine5: "course",
    SingleLine4: contact.SingleLine4,
    SingleLine6: lead.teamSize,
    SingleLine7: lead.frequency,
    MultiLine1: lead.courses,
    SingleLine8: "website",
  };
  if (lead.file) fields.FileUpload = lead.file;

  await postToZoho(endpoints.zohoCourseQuote(), fields, lead);
}

/**
 * The "Impremium" form's Country dropdown spells four countries differently
 * from `lib/countries.js`, and Zoho rejects a value outside its own list.
 * Zoho still lists "Macedonia" where our dropdown now says "North Macedonia",
 * and already uses "Eswatini", so that one needs no entry.
 */
const IMPREMIUM_COUNTRY_NAMES = {
  "Côte d’Ivoire": "Côte d'Ivoire",
  "North Macedonia": "Macedonia",
  Congo: "Congo (Republic)",
  "DR Congo": "Congo (DRC)",
};

/**
 * Zoho "Impremium" — the live `/ceo-retreats` request-an-invitation form.
 * Not the shared contact block; the field names that form posts, for the
 * fields our retreat form has:
 *
 *   SingleLine   full name               Dropdown     country name
 *   Email        work email              Radio        "I am interested in"
 *   SingleLine3  company                 MultiLine1   message
 *   SingleLine2  job title
 *   PhoneNumber_countrycodeval  "+" and the dial code
 *   PhoneNumber_countrycode     national number
 *
 * Zoho itself requires all of these but the message. The live form's
 * LinkedIn (SingleLine1) and two other questions (MultiLine, MultiLine2)
 * are optional in Zoho and not on our form, so they are not sent.
 */
export async function deliverLeadershipRetreat(lead) {
  const contact = contactFields(lead, "request-invite");
  const country = IMPREMIUM_COUNTRY_NAMES[lead.country] ?? lead.country;

  await postToZoho(
    endpoints.zohoLeadershipRetreat(),
    {
      zf_referrer_name: contact.zf_referrer_name,
      zf_redirect_url: contact.zf_redirect_url,
      zc_gad: "",
      SingleLine: lead.name,
      Email: lead.email,
      SingleLine3: lead.company,
      SingleLine2: lead.jobTitle,
      PhoneNumber_countrycodeval: contact.SingleLine3 ? `+${contact.SingleLine3}` : "",
      PhoneNumber_countrycode: contact.PhoneNumber_countrycode,
      Dropdown: country,
      Radio: lead.retreatInterest,
      MultiLine1: lead.message,
    },
    lead,
  );
}

/**
 * Zoho "BecomeAGuestAuthor" — the `/become-a-guest-author` pitch form. Its own
 * field names, and no phone or company:
 *
 *   SingleLine   full name               SingleLine1  LinkedIn profile
 *   Email        email                   MultiLine1   message (the blog idea)
 *   SingleLine2  job title               SingleLine3  branch (Branch)
 *                                        SingleLine4  page name (PAGE NAME)
 *
 * A static page, so Branch and PAGE NAME are both the page name.
 */
export async function deliverGuestAuthor(lead) {
  const contact = contactFields(lead, "become-a-guest-author");

  await postToZoho(
    endpoints.zohoGuestAuthor(),
    {
      zf_referrer_name: contact.zf_referrer_name,
      zf_redirect_url: contact.zf_redirect_url,
      zc_gad: "",
      SingleLine: lead.name,
      Email: lead.email,
      SingleLine2: lead.jobTitle,
      SingleLine1: lead.linkedin,
      MultiLine1: lead.message,
      SingleLine3: contact.SingleLine5,
      SingleLine4: contact.SingleLine5,
    },
    lead,
  );
}

/**
 * Zoho "DownloadCatalog" — the blog rail's "Download the catalog" form. Its
 * field names differ from the shared contact block:
 *
 *   SingleLine   name                    SingleLine5  Branch
 *   Email        work email              SingleLine4  PAGE NAME
 *   SingleLine1  company
 *   SingleLine2  phone, as typed (a plain single-line field, not Zoho's
 *                phone field — no dial code split)
 *   SingleLine3  brochure link — the PDF the visitor unlocked, which the
 *                Zoho thank-you email links to
 *
 * All six are mandatory on the Zoho form. Two forms post here, and Branch /
 * PAGE NAME follow the page: the blog rail's catalog card is "blog" in both on
 * every post; the brochure drawer is the domain slug in both on a domain
 * page, and Branch "course" with the course slug on a course page.
 */
export async function deliverCatalogDownload(lead) {
  const blog = /^\/blog(\/|$)/.test(lead.page);
  const course = /^\/corporate-training\/[^/]+\/[^/]+/.test(lead.page);
  const contact = contactFields({ ...lead, branch: course ? "course" : "" }, "blog");

  await postToZoho(
    endpoints.zohoCatalogDownload(),
    {
      zf_referrer_name: contact.zf_referrer_name,
      zf_redirect_url: "",
      zc_gad: "",
      SingleLine: lead.name,
      Email: lead.email,
      SingleLine1: lead.company,
      SingleLine2: lead.phone,
      SingleLine3: lead.brochure,
      SingleLine5: blog ? "blog" : contact.SingleLine5,
      SingleLine4: blog ? "blog" : contact.SingleLine4,
    },
    lead,
  );
}

/**
 * Zoho "GlobalNavigationForm" — the header's "Build your brief" composer:
 *
 *   SingleLine2  full name               Dropdown   service ("We need …")
 *   Email        work email              Dropdown1  people ("for …")
 *   SingleLine   company                 Dropdown2  location ("in …")
 *   SingleLine3  dial code               MultiLine  message
 *   PhoneNumber_countrycode  national number
 *   SingleLine5  Branch                  SingleLine4  PAGE NAME
 *
 * It opens on any page, so Branch and PAGE NAME follow the page it was sent
 * from: a course page is Branch "course" with the course slug as page name;
 * any other page is its page name in both.
 */
export async function deliverGlobalNavigation(lead) {
  const course = /^\/corporate-training\/[^/]+\/[^/]+/.test(lead.page);
  const contact = contactFields({ ...lead, branch: course ? "course" : "" }, "enquire");

  await postToZoho(
    endpoints.zohoGlobalNavigation(),
    {
      zf_referrer_name: contact.zf_referrer_name,
      zf_redirect_url: "",
      zc_gad: "",
      SingleLine2: lead.name,
      Email: lead.email,
      SingleLine: lead.company,
      SingleLine3: contact.SingleLine3,
      PhoneNumber_countrycode: contact.PhoneNumber_countrycode,
      Dropdown: lead.briefService,
      Dropdown1: lead.briefWho,
      Dropdown2: lead.briefWhere,
      MultiLine: lead.message,
      SingleLine5: contact.SingleLine5,
      SingleLine4: contact.SingleLine4,
    },
    lead,
  );
}

/**
 * The "RequestForProposal" form's Country dropdown names these countries
 * differently from `lib/countries.js`; Zoho rejects a value outside its own
 * list. As with Impremium, Zoho keeps "Macedonia" and already uses "Eswatini".
 */
const RFP_COUNTRY_NAMES = {
  "United States": "United States of America",
  "Côte d’Ivoire": "Côte d'Ivoire",
  "North Macedonia": "Macedonia",
  Congo: "Congo (Republic)",
  "DR Congo": "Congo (DRC)",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-10-20" (a date input's value) → "20-Oct-2026", Zoho's date format. */
function zohoDate(iso) {
  const [year, month, day] = iso.split("-");
  return year ? `${day}-${MONTHS[Number(month) - 1]}-${year}` : "";
}

/**
 * Zoho "RequestForProposal" — the `/request-for-proposal` form. The contact
 * block, except that Dropdown is the country *name* (in Zoho's spelling),
 * plus:
 *
 *   Dropdown1       organization type     Dropdown2   approximate headcount
 *   Radio           document type         SingleLine8 delivery countries
 *   SingleLine9     portal or tender link
 *   MultipleChoice  services in scope (one entry per service)
 *   FileUpload      RFP documents (one entry per file, up to 5)
 *   Date            submission deadline, dd-MMM-yyyy
 *
 * A static page: Branch and PAGE NAME are both
 * the page name.
 */
export async function deliverRfp(lead) {
  const contact = contactFields(lead, "request-for-proposal");
  const country = RFP_COUNTRY_NAMES[lead.country] ?? lead.country;

  await postToZoho(
    endpoints.zohoRfp(),
    {
      ...contact,
      Dropdown: country,
      Dropdown1: lead.orgType,
      Radio: lead.docType,
      SingleLine9: lead.portalLink,
      MultipleChoice: lead.services,
      Dropdown2: lead.headcount,
      SingleLine8: lead.deliveryCountries,
      FileUpload: lead.files,
      Date: zohoDate(lead.deadline),
    },
    lead,
  );
}
