"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { CtaButton } from "@/components/common/cta-button";
import { FormField, formInputClasses } from "@/components/common/form-field";
import { cn } from "@/lib/utils";
import { COUNTRY_DIAL_CODES, EMAIL_PATTERN, FREE_MAIL_DOMAINS } from "@/lib/constants";

const PHONE_PATTERN = /^[\d\s()+-]{6,20}$/;

/**
 * Platform enquiry form — used on Orbit, Spectra LMS and Polaris pages.
 *
 * Props:
 *   data: { heading, subheading, submitLabel, intent, successMessage, sla_note }
 *
 * On submit: POSTs to /api/enquiry (placeholder — shows success state).
 */
export default function PlatformEnquiryForm({ data }) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { country: "United States" } });

  const dialCode =
    COUNTRY_DIAL_CODES.find((c) => c.name === watch("country"))?.dialCode || "";

  if (!data) return null;

  async function onSubmit(values) {
    try {
      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, intent: data.intent }),
      });
    } catch {
      // Placeholder — show success regardless while backend is wired
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Box className="rounded-[22px] border border-ink/12 bg-white px-8 py-14 text-center shadow-[0_30px_70px_-50px_rgba(10,22,40,0.55)]">
        <Box className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-navy">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C8F135"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M8 12.5l2.7 2.7L16 9.5" />
          </svg>
        </Box>
        <Text as="h3" className="text-ink">
          Thank you, your request is in.
        </Text>
        <Text as="p" className="mx-auto mt-3 max-w-[46ch] text-ink/60">
          {data.successMessage ||
            "An Edstellar expert will reply within one business day."}
        </Text>
      </Box>
    );
  }

  return (
    <Box
      as="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="overflow-hidden rounded-[22px] border border-ink/12 bg-white shadow-[0_30px_70px_-50px_rgba(10,22,40,0.55)]"
    >
      <Box className="p-6.5 sm:p-9 lg:p-11">
        <Box className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Full name */}
          <FormField label="Full name" required error={errors.name?.message}>
            <input
              {...register("name", {
                required: "Please enter your full name.",
              })}
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              aria-invalid={Boolean(errors.name)}
              className={formInputClasses}
            />
          </FormField>

          {/* Work email */}
          <FormField label="Work email" required error={errors.workEmail?.message}>
            <input
              {...register("workEmail", {
                required: "Please enter your work email address.",
                pattern: {
                  value: EMAIL_PATTERN,
                  message: "That email address does not look right.",
                },
                validate: (value) =>
                  !FREE_MAIL_DOMAINS.has(value.split("@")[1]?.toLowerCase()) ||
                  "Please use your work email address.",
              })}
              type="email"
              autoComplete="email"
              placeholder="Enter your work email address"
              aria-invalid={Boolean(errors.workEmail)}
              className={formInputClasses}
            />
          </FormField>

          {/* Company name */}
          <FormField label="Company name" required error={errors.company?.message}>
            <input
              {...register("company", {
                required: "Please enter your company name.",
              })}
              type="text"
              autoComplete="organization"
              placeholder="Enter your company name"
              aria-invalid={Boolean(errors.company)}
              className={formInputClasses}
            />
          </FormField>

          {/* Job title */}
          <FormField label="Job title" required error={errors.jobTitle?.message}>
            <input
              {...register("jobTitle", {
                required: "Please enter your job title.",
              })}
              type="text"
              autoComplete="organization-title"
              placeholder="Enter your job title"
              aria-invalid={Boolean(errors.jobTitle)}
              className={formInputClasses}
            />
          </FormField>

          {/* Extra select (e.g. "Number of leaders" for Meridian, "Employees in scope" for TNA) */}
          {data.extraSelect && (
            <FormField
              label={
                data.extraSelect.optional ? (
                  <>
                    {data.extraSelect.label}{" "}
                    <Text as="span" className="text-[10px] text-ink/40 normal-case tracking-normal">
                      (optional)
                    </Text>
                  </>
                ) : (
                  data.extraSelect.label
                )
              }
              className="sm:col-span-2"
              error={errors[data.extraSelect.name]?.message}
            >
              <select
                {...register(data.extraSelect.name)}
                aria-invalid={Boolean(errors[data.extraSelect.name])}
                className={formInputClasses}
              >
                <option value="">Select</option>
                {data.extraSelect.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </FormField>
          )}

          {/* Country */}
          <FormField label="Country" required error={errors.country?.message}>
            <select
              {...register("country", {
                required: "Please select your country.",
              })}
              autoComplete="country-name"
              aria-invalid={Boolean(errors.country)}
              className={formInputClasses}
            >
              {COUNTRY_DIAL_CODES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </FormField>

          {/* Phone with dial code */}
          <FormField label="Phone" error={errors.phone?.message}>
            <Box className="flex items-stretch overflow-hidden rounded-xl border border-ink/15 bg-paper focus-within:border-navy focus-within:bg-white">
              <Text
                as="span"
                className="flex items-center border-r border-ink/12 px-3 font-mono text-[12.5px] text-ink/60"
              >
                {dialCode || "\u2014"}
              </Text>
              <input
                {...register("phone", {
                  pattern: {
                    value: PHONE_PATTERN,
                    message: "Please enter a valid phone number.",
                  },
                })}
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder="201-555-0123"
                aria-invalid={Boolean(errors.phone)}
                className="w-full min-w-0 bg-transparent p-3 text-[13.5px] text-ink outline-none placeholder:text-ink/35"
              />
            </Box>
          </FormField>

          {/* Requirements — optional textarea */}
          <FormField
            label={
              <>
                Requirements{" "}
                <Text as="span" className="text-[10px] text-ink/40 normal-case tracking-normal">
                  (optional)
                </Text>
              </>
            }
            className="sm:col-span-2"
          >
            <textarea
              {...register("requirements")}
              rows={4}
              placeholder={data.requirementsPlaceholder || "Number of assessees, use case, one-time or recurring, timing\u2026"}
              className={cn(formInputClasses, "resize-y")}
            />
          </FormField>
        </Box>

        {/* Consent */}
        <Box className="relative mt-5 flex items-start gap-2.75">
          <input
            {...register("consent", { required: true })}
            type="checkbox"
            id="platform-consent"
            aria-invalid={Boolean(errors.consent)}
            className="mt-0.75 size-3.5 flex-none accent-navy"
          />
          <Text
            as="label"
            htmlFor="platform-consent"
            className="text-[12.5px] leading-normal text-ink/60"
          >
            I agree that Edstellar may use my details to respond to this
            enquiry, as described in the{" "}
            <a
              href="/privacy-policy"
              title="Click Here to View Privacy Policy"
              className="underline hover:text-ink"
            >
              privacy policy
            </a>
            .
          </Text>
          {errors.consent ? (
            <Text
              as="span"
              role="alert"
              className="absolute top-full left-6 mt-1 text-[11px] leading-[1.35] text-red-600"
            >
              Please accept the privacy policy to continue.
            </Text>
          ) : null}
        </Box>

        {/* Footer */}
        <Box className="mt-6.5 flex flex-col items-start gap-4 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          {data.sla_note ? (
            <Text as="p" className="max-w-[50ch] text-[12.5px] leading-[1.55] text-ink/60">
              {data.sla_note}
            </Text>
          ) : null}
          <CtaButton type="submit" arrow disabled={isSubmitting} className="w-full sm:w-auto">
            {data.submitLabel || "Submit"}
          </CtaButton>
        </Box>
      </Box>
    </Box>
  );
}
