import "server-only";

import { apiPostJson } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

/**
 * Lead delivery to our own API (`LEADS_API_URL`, authenticated with
 * `LEADS_API_KEY` in `X-Api-Key`), alongside Zoho — not instead of it.
 *
 * The body is the JSON the form itself submits, field for field — the API
 * was built against that shape — taken from the validated lead rather than
 * the raw submission. `company_website` is the honeypot, always empty by the
 * time a lead gets here.
 *
 * Returns `false` without sending when either setting is missing, so an
 * environment without the API keeps sending to Zoho alone.
 */
export async function deliverWebsiteLead(lead) {
  const url = endpoints.websiteLeads();
  const key = process.env.LEADS_API_KEY;
  if (!url || !key) return false;

  await apiPostJson(
    url,
    {
      country: lead.country,
      phone: lead.phone,
      dialCode: lead.dialCode,
      name: lead.name,
      company: lead.company,
      jobTitle: lead.jobTitle,
      company_website: "",
      email: lead.email,
      requirements: lead.message,
      page: lead.page,
      thankYou: lead.thankYou,
      branch: lead.branch,
    },
    { headers: { "X-Api-Key": key } },
  );
  return true;
}
