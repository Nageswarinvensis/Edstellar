export const SITE = {
  name: "Edstellar",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.edstellar.com",
  description:
    "Instructor-led corporate training and consulting. Programs scoped to your stack and delivered onsite, virtually, or offsite in 100+ countries.",
  legalName: "Edstellar",
};

/**
 * Languages and regions quoted in hero meta rows across the site.
 * Shared so a change lands on every page at once.
 */
export const DELIVERY_LANGUAGES = [
  "English",
  "Spanish",
  "Mandarin",
  "German",
  "Arabic",
  "Portuguese",
  "Hindi",
  "French",
  "Japanese",
  "Italian",
];

export const DELIVERY_COUNTRIES = [
  "United States",
  "United Kingdom",
  "India",
  "Canada",
  "Germany",
  "France",
  "Netherlands",
  "UAE",
  "Saudi Arabia",
  "Singapore",
  "Australia",
  "Japan",
  "Brazil",
  "South Africa",
];

/**
 * Full country list with dial codes, for lead-capture form country/phone
 * fields. Kept separate from `DELIVERY_COUNTRIES` (a short list quoted in
 * hero copy) since this one drives form logic, not marketing copy.
 */
export const COUNTRY_DIAL_CODES = [
  { name: "United States", dialCode: "+1" },
  { name: "United Kingdom", dialCode: "+44" },
  { name: "India", dialCode: "+91" },
  { name: "Canada", dialCode: "+1" },
  { name: "Australia", dialCode: "+61" },
  { name: "Germany", dialCode: "+49" },
  { name: "France", dialCode: "+33" },
  { name: "Netherlands", dialCode: "+31" },
  { name: "Ireland", dialCode: "+353" },
  { name: "Spain", dialCode: "+34" },
  { name: "Italy", dialCode: "+39" },
  { name: "Sweden", dialCode: "+46" },
  { name: "Norway", dialCode: "+47" },
  { name: "Denmark", dialCode: "+45" },
  { name: "Finland", dialCode: "+358" },
  { name: "Switzerland", dialCode: "+41" },
  { name: "Belgium", dialCode: "+32" },
  { name: "Austria", dialCode: "+43" },
  { name: "Poland", dialCode: "+48" },
  { name: "Portugal", dialCode: "+351" },
  { name: "United Arab Emirates", dialCode: "+971" },
  { name: "Saudi Arabia", dialCode: "+966" },
  { name: "Qatar", dialCode: "+974" },
  { name: "Israel", dialCode: "+972" },
  { name: "South Africa", dialCode: "+27" },
  { name: "Nigeria", dialCode: "+234" },
  { name: "Kenya", dialCode: "+254" },
  { name: "Egypt", dialCode: "+20" },
  { name: "Singapore", dialCode: "+65" },
  { name: "Malaysia", dialCode: "+60" },
  { name: "Japan", dialCode: "+81" },
  { name: "South Korea", dialCode: "+82" },
  { name: "China", dialCode: "+86" },
  { name: "Hong Kong", dialCode: "+852" },
  { name: "Indonesia", dialCode: "+62" },
  { name: "Philippines", dialCode: "+63" },
  { name: "Thailand", dialCode: "+66" },
  { name: "Vietnam", dialCode: "+84" },
  { name: "New Zealand", dialCode: "+64" },
  { name: "Brazil", dialCode: "+55" },
  { name: "Mexico", dialCode: "+52" },
  { name: "Argentina", dialCode: "+54" },
  { name: "Chile", dialCode: "+56" },
  { name: "Colombia", dialCode: "+57" },
  { name: "Turkey", dialCode: "+90" },
  { name: "Other", dialCode: "" },
];

/**
 * Shared work-email validation for lead-capture forms (LeadForm, the
 * group-quote wizard's own contact step). A personal-mail domain is rejected
 * so leads arrive with an identifiable organization.
 */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const FREE_MAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "yahoo.co.in",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "icloud.com",
  "me.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "gmx.com",
  "mail.com",
  "yandex.com",
  "mail.ru",
  "qq.com",
  "163.com",
  "126.com",
  "rediffmail.com",
  "zoho.com",
]);

/**
 * Global site navigation. Single source of truth for SiteHeader and its
 * mobile menu — both read from this list so a link change lands once.
 */
export const NAV_LINKS = [
  { label: "Corporate Training", href: "/corporate-training" },
  { label: "Coaching Services", href: "/coaching-services" },
  { label: "Consulting", href: "/learning-development-consulting-services" },
  { label: "Trainers", href: "/trainers" },
  { label: "Resources", href: "/resources" },
];

export const HEADER_CTA = {
  label: "View Pricing",
  href: "/https://www.edstellar.com/corporate-training-pricing",
};

/** SiteFooter link columns. */
export const FOOTER_NAV = [
  {
    heading: "Solutions",
    links: [
      { label: "Corporate Training", href: "/corporate-training" },
      { label: "Coaching Services", href: "/coaching-services" },
      {
        label: "Consulting",
        href: "/learning-development-consulting-services",
      },
      { label: "Talent Assessment", href: "/talent-assessment-services" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Trainers", href: "/trainers" },
      { label: "Resources", href: "/resources" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

export const FOOTER_LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];
