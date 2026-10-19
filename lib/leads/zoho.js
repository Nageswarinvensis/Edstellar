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
 *   MultiLine    free-text message       SingleLine4/5  page the form was on
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
    SingleLine5: page,
    // The pricing page's package buttons put "{tab}: {plan} Package" here,
    // as its live popup form does; every other form records the page.
    SingleLine4: lead.origin || page,
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
  const contact = contactFields(lead, "course");

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
