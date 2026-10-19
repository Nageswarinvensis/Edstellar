import "server-only";

import { apiPostForm } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { COUNTRIES } from "@/lib/countries";

/**
 * Zoho's rejection page lists each failing field with Zoho's own message —
 * "FULL NAME Enter a value for this field." — and never echoes a submitted
 * value, so its text is safe to put in an error. Everything outside that list
 * (markup, script, style) is dropped. Other rejections — a 400 rather than
 * the 409 field list — are a generic Zoho error page, whose text is the
 * reason.
 */
/**
 * The Zoho form's bot rule rejects any submission that does not come from
 * edstellar.com ("Zoho Forms Bot", HTTP 400). A browser on the live site
 * says where it is with `Referer`/`Origin`; a server-side post sends neither,
 * so they are set to the page on edstellar.com the enquiry was made from.
 * Pinned to the live domain rather than `SITE.url`, which a staging deploy
 * may point elsewhere — the rule only knows edstellar.com.
 */
const ZOHO_ALLOWED_ORIGIN = "https://www.edstellar.com";

function zohoErrorDetail(body) {
  const text = body
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");
  const match = text.match(/Error Occurred!\s*(.*?)\s*Back\b/);
  return (match?.[1] ?? text.trim()).slice(0, 300);
}

/**
 * Deliver a validated lead to Zoho Forms' "TrainingEnquiry" form — field for
 * field what the live site's `/enquiry-form` posts, so records arrive in Zoho
 * (and the CRM behind it) shaped exactly as they always have:
 *
 *   SingleLine2  name                    SingleLine7  country name
 *   Email        work email              Dropdown     country ISO code ("us")
 *   SingleLine   company                 SingleLine3  dial code, digits only
 *   SingleLine1  job title               PhoneNumber_countrycode  national number
 *   MultiLine    training requirements   SingleLine4/5  page the form was on
 *
 * The dial code is the phone input's own country (its flag can differ from
 * the Country dropdown), falling back to the selected country's.
 * `program` (the link a university/government enquiry came
 * from) has no field of its own on the Zoho form, so it rides in Zoho's
 * referrer field.
 */
export async function deliverTrainingEnquiry(lead) {
  const country = COUNTRIES.find((c) => c.name === lead.country);
  const dialDigits = lead.dialCode || (country?.dialCode.replace(/\D/g, "") ?? "");

  // The national number: digits only, minus the dial code the phone input
  // puts in front ("+91 98765 43210" → "9876543210").
  let phone = lead.phone.replace(/\D/g, "").replace(/^00/, "");
  if (dialDigits && lead.phone.trim().startsWith("+") && phone.startsWith(dialDigits)) {
    phone = phone.slice(dialDigits.length);
  }

  // The live form records the page's last path segment, "Home Page" at `/`.
  const page = lead.page.split("/").filter(Boolean).at(-1) || "Home Page";

  await apiPostForm(endpoints.zohoTrainingEnquiry(), {
    zf_referrer_name: lead.program,
    // Each form's own thank-you page, as the live forms send.
    zf_redirect_url: `${ZOHO_ALLOWED_ORIGIN}/thank-you/${lead.thankYou || "enquire"}`,
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
    SingleLine4: page,
    MultiLine: lead.message,
  }, {
    errorDetail: zohoErrorDetail,
    headers: {
      Origin: ZOHO_ALLOWED_ORIGIN,
      Referer: `${ZOHO_ALLOWED_ORIGIN}${lead.page.startsWith("/") ? lead.page : "/"}`,
    },
  });
}
