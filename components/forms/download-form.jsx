"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import CtaButton from "@/components/common/cta-button";
import { submitCatalogDownload } from "@/lib/actions/submit-catalog-download";
import { BROCHURE_THANK_YOU } from "@/lib/constants";

/**
 * The gated-download form — name / work email / company / phone in front of
 * a PDF. Shared by the blog rail's catalog card (`catalog-rail.jsx`) and the
 * domain/course brochure drawer (`brochure-gate.jsx`); the lead goes to Zoho
 * "DownloadCatalog" through the `submitCatalogDownload` Server Action, which
 * sets Branch and PAGE NAME from the page it was sent from.
 *
 * The form carries only `brochureKey` (e.g. `catalog`, `domain:ai`) — never
 * the brochure URL, so no PDF link appears in the page source. The Server
 * Action resolves the key and gives the URL to Zoho, whose thank-you email is
 * the only place the visitor gets the link. On success the visitor lands on
 * `/thank-you/{thankYou}`.
 */
/** "Download the catalog" → "download the catalog", for "Click here to …" titles. */
const lowerFirst = (text) => (text ? `${text.charAt(0).toLowerCase()}${text.slice(1)}` : "");

export default function DownloadForm({
  brochureKey,
  idPrefix,
  submitLabel,
  thankYou = BROCHURE_THANK_YOU,
  formLabel = "Brochure download",
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // Per-field messages, shown under each input; `error` is for a failed send.
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event) {
    event.preventDefault();
    const errors = {
      ...(name.trim().length < 2 ? { name: "Enter your name." } : {}),
      ...(!/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(email)
        ? { email: "Please enter email address." }
        : {}),
      ...(!company.trim() ? { company: "Enter your company name." } : {}),
      ...(!/^\+?[\d\s()-]+$/.test(phone.trim()) || phone.replace(/\D/g, "").length < 6
        ? { phone: "Enter a valid phone number." }
        : {}),
    };
    setFieldErrors(errors);
    setError("");
    if (Object.keys(errors).length) return;
    setSubmitting(true);

    let result;
    try {
      result = await submitCatalogDownload({
        name,
        company,
        email,
        phone,
        // Which brochure this form unlocks; the server resolves it to the
        // link Zoho's thank-you email carries.
        brochureKey,
        company_website: event.currentTarget.elements.company_website?.value ?? "",
        page: window.location.pathname,
      });
    } catch {
      result = null;
    }
    if (result?.ok) {
      // Stays "Sending…" until the thank-you page replaces this one.
      router.push(`/thank-you/${thankYou}`);
      return;
    }
    setSubmitting(false);
    // A `brochure` error has no input to sit under, so it falls through to
    // the general message below.
    const { name: nameError, email: emailError, company: companyError, phone: phoneError } =
      result?.errors ?? {};
    if (nameError || emailError || companyError || phoneError) {
      setFieldErrors({ name: nameError, email: emailError, company: companyError, phone: phoneError });
      return;
    }
    setError(
      result?.error ||
        "We could not send your request. Please try again, or email us at contact@edstellar.com.",
    );
  }

  return (
    <form noValidate onSubmit={submit} aria-label={formLabel}>
      <Field
        id={`${idPrefix}-name`}
        label="Name"
        autoComplete="name"
        placeholder="Your full name"
        value={name}
        onChange={setName}
        error={fieldErrors.name}
      />
      <Field
        id={`${idPrefix}-email`}
        label="Work email"
        type="email"
        autoComplete="email"
        placeholder="you@company.com"
        value={email}
        onChange={setEmail}
        error={fieldErrors.email}
        className="mt-3"
      />
      <Field
        id={`${idPrefix}-company`}
        label="Company name"
        autoComplete="organization"
        placeholder="Your company"
        value={company}
        onChange={setCompany}
        error={fieldErrors.company}
        className="mt-3"
      />
      <Field
        id={`${idPrefix}-phone`}
        label="Phone number"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="+91 98765 43210"
        value={phone}
        onChange={setPhone}
        error={fieldErrors.phone}
        className="mt-3"
      />

      <input
        type="text"
        name="company_website"
        aria-label="Leave this field empty"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {error ? (
        <Text as="p" role="alert" className="mt-3 text-[12px] leading-[1.45] text-destructive">
          {error}
        </Text>
      ) : null}

      <CtaButton type="submit" arrow block disabled={submitting} title={`Click here to ${lowerFirst(submitLabel)}`} className="mt-3.5 py-3.5 text-[13px]">
        {submitting ? "Sending…" : submitLabel}
      </CtaButton>
    </form>
  );
}

/** One labelled, required text input, its error underneath. */
function Field({ id, label, type = "text", onChange, error, className, ...props }) {
  return (
    <Box className={className}>
      <label
        htmlFor={id}
        className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted"
      >
        {label} <span className="text-destructive">*</span>
      </label>
      <input
        id={id}
        type={type}
        required
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[10px] border border-ink/22 bg-paper px-3.5 py-3 text-[14px] text-ink outline-none placeholder:text-ink/45 focus:border-navy aria-invalid:border-destructive"
        {...props}
      />
      {error ? (
        <Text as="p" id={`${id}-error`} className="mt-1.5 text-right text-[12px] leading-[1.45] text-destructive">
          {error}
        </Text>
      ) : null}
    </Box>
  );
}
