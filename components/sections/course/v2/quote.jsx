"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import V2Section from "@/components/sections/course/v2/section";
import { V2Eyebrow } from "@/components/sections/course/v2/section-head";
import V2Heading from "@/components/sections/course/v2/heading";
import { V2_BUTTON, V2_QUOTE_TOPIC_EVENT } from "@/components/sections/course/v2/buttons";
import { submitEnquiry } from "@/lib/actions/submit-enquiry";
import { COUNTRIES } from "@/lib/countries";
import { cn } from "@/lib/utils";

const INPUT =
  "w-full min-w-0 max-w-full rounded-[10px] border border-ink/12 bg-paper px-3 py-2.5 text-[14px] font-normal text-ink placeholder:text-ink-muted focus:border-navy focus:outline-none aria-[invalid=true]:border-error aria-[invalid=true]:shadow-[0_0_0_1px_var(--color-error)]";

function Field({ label, error, required, full, children }) {
  return (
    <label className={cn("grid min-w-0 gap-[5px] text-[12.5px] font-semibold text-ink", full && "col-span-full")}>
      <span>
        {label}
        {required && " *"}
      </span>
      {children}
      {error && <span className="text-[12px] font-medium text-error">{error}</span>}
    </label>
  );
}

/**
 * v2 · 14 Request a quote — the one inquiry form on the page. Section CTAs
 * and the RFP wizard announce what the visitor asked about
 * (`V2_QUOTE_TOPIC_EVENT`); that topic travels with the request. Delivered
 * through the shared lead pipeline (Zoho "TrainingEnquiry", Branch `course`),
 * like the course page's own form.
 */
export default function V2Quote({ data, courseName }) {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const onTopic = (event) => setTopic(String(event.detail ?? ""));
    window.addEventListener(V2_QUOTE_TOPIC_EVENT, onTopic);
    return () => window.removeEventListener(V2_QUOTE_TOPIC_EVENT, onTopic);
  }, []);

  if (!data) return null;
  const { eyebrow, heading, text, packages = [], fields = {}, size_options = [], mode_options = [], goal_placeholder, phone_placeholder, note, submit } = data;

  async function onSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const v = Object.fromEntries(form.entries());

    const local = {};
    if (!v.consent) local.consent = "Please accept the terms to continue.";
    if (!v.company?.trim()) local.company = "Enter your company name.";
    if (!v.jobTitle?.trim()) local.jobTitle = "Enter your job title.";
    if (!v.country) local.country = "Select your country.";
    if (Object.keys(local).length) {
      setErrors(local);
      return;
    }

    const requirements = [
      topic && `Request: ${topic}`,
      v.size && `Team size: ${v.size}`,
      v.mode && `Delivery mode: ${v.mode}`,
      v.goal && `Goal: ${v.goal}`,
    ]
      .filter(Boolean)
      .join("\n");

    setErrors({});
    setSubmitError("");
    setSending(true);
    let result;
    try {
      result = await submitEnquiry({
        name: v.name,
        email: v.email,
        phone: v.phone,
        company: v.company,
        jobTitle: v.jobTitle,
        country: v.country,
        requirements,
        program: courseName,
        company_website: v.company_website,
        page: window.location.pathname,
        thankYou: "course",
        branch: "course",
      });
    } catch {
      result = null;
    }
    setSending(false);

    if (result?.ok) {
      router.push("/thank-you/course");
      return;
    }
    if (result?.errors) {
      setErrors(Object.fromEntries(Object.entries(result.errors).map(([k, m]) => [k === "message" ? "goal" : k, m])));
      return;
    }
    setSubmitError(result?.error || "We could not send your request. Please try again, or email us at contact@edstellar.com.");
  }

  return (
    <V2Section id="quote">
      <Box className="grid gap-[30px] rounded-3xl bg-navy p-7 text-white lg:grid-cols-[0.9fr_1.1fr] lg:p-11">
        <Box className="min-w-0">
          <V2Eyebrow className="text-lime">{eyebrow}</V2Eyebrow>
          <V2Heading parts={heading} className="mb-3.5 text-white" emClassName="text-lime" />
          {text && <Text className="text-[15px] text-white/72">{text}</Text>}
          {packages.length > 0 && (
            <ul aria-label="Annual license packages" className="mt-5 grid grid-cols-2 gap-2">
              {packages.map((p, i) => (
                <li key={p.name} className={cn("rounded-xl border p-3", i === 1 ? "border-lime" : "border-white/16")}>
                  <b className="block font-display text-[15px] font-medium">{p.name}</b>
                  <span className="text-[12.5px] text-white/60">{p.text}</span>
                </li>
              ))}
            </ul>
          )}
        </Box>

        <form onSubmit={onSubmit} noValidate className="relative grid min-w-0 gap-3 rounded-[18px] bg-white p-[22px] text-ink min-[640px]:grid-cols-2">
          {/* Honeypot — real visitors never see or fill it. */}
          <label className="absolute -left-[9999px]" aria-hidden="true">
            Company website
            <input name="company_website" tabIndex={-1} autoComplete="off" />
          </label>

          {topic && (
            <p className="col-span-full rounded-[10px] bg-lime-soft px-3 py-2 text-[13.5px] text-ink">
              Your request: <b>{topic}</b>
            </p>
          )}

          <Field label={fields.name} required error={errors.name}>
            <input name="name" required autoComplete="name" className={INPUT} />
          </Field>
          <Field label={fields.email} required error={errors.email}>
            <input name="email" type="email" required autoComplete="email" className={INPUT} />
          </Field>
          <Field label={fields.company} required error={errors.company}>
            <input name="company" required autoComplete="organization" className={INPUT} />
          </Field>
          <Field label={fields.jobTitle} required error={errors.jobTitle}>
            <input name="jobTitle" required autoComplete="organization-title" className={INPUT} />
          </Field>
          <Field label={fields.country} required error={errors.country}>
            <select name="country" required defaultValue="" className={INPUT}>
              <option value="" disabled>Select your country</option>
              {COUNTRIES.map((c) => (
                <option key={c.iso2} value={c.name}>{c.name}</option>
              ))}
            </select>
          </Field>
          <Field label={fields.phone} required error={errors.phone}>
            <input name="phone" type="tel" required autoComplete="tel" placeholder={phone_placeholder} className={INPUT} />
          </Field>
          <Field label={fields.size}>
            <select name="size" defaultValue="" className={INPUT}>
              <option value="">Select</option>
              {size_options.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </Field>
          <Field label={fields.mode}>
            <select name="mode" defaultValue={mode_options[0]} className={INPUT}>
              {mode_options.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </Field>
          <Field label={fields.goal} full error={errors.goal}>
            <textarea name="goal" rows={3} placeholder={goal_placeholder} className={INPUT} />
          </Field>

          <label className="col-span-full grid grid-cols-[auto_1fr] items-start gap-x-2 gap-y-1 text-[11px] leading-[1.4] font-normal text-ink-muted">
            <input type="checkbox" name="consent" aria-invalid={errors.consent ? true : undefined} className="mt-px size-3.5 accent-navy" />
            <span>
              I agree to the <a href="/terms-conditions" className="text-ink underline underline-offset-2">Terms and Conditions</a> and the{" "}
              <a href="/privacy-policy" className="text-ink underline underline-offset-2">Privacy Policy</a>, and to Edstellar contacting me about this request. *
              {errors.consent && <span className="mt-1 block text-[12px] font-medium text-error">{errors.consent}</span>}
            </span>
          </label>

          <Box className="col-span-full flex flex-col gap-3 min-[640px]:flex-row min-[640px]:items-center min-[640px]:justify-between">
            {note && <p className="text-[12px] text-ink-muted">{note}</p>}
            <button type="submit" disabled={sending} className={cn(V2_BUTTON.primary, "disabled:opacity-60")}>
              {sending ? "Sending…" : submit} →
            </button>
          </Box>
          {submitError && <p role="alert" className="col-span-full text-[13px] text-error">{submitError}</p>}
        </form>
      </Box>
    </V2Section>
  );
}
