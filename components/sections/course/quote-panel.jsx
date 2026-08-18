"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Check } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { CtaButton } from "@/components/shared/CtaButton";
import { cn } from "@/lib/utils";
import {
  COUNTRY_DIAL_CODES,
  EMAIL_PATTERN,
  FREE_MAIL_DOMAINS,
} from "@/lib/constants";

const inputClasses =
  "w-full rounded-[10px] border border-ink/15 bg-white px-3 py-2.5 text-[12px] text-ink outline-none transition-colors placeholder:text-[#0A1628] focus:border-navy focus:bg-white";

function Field({ label, required, error, className, children }) {
  return (
    <Box as="label" className={cn("flex flex-col gap-1.25", className)}>
      {/* Visually hidden, not removed — inputs still need a real accessible
          name (TASTE.md §10); the placeholder carries the visual label. */}
      <Text as="span" className="sr-only">
        {label} {required ? "(required)" : null}
      </Text>
      {children}
      {error ? (
        <Text as="span" role="alert" className="text-[11.5px] text-red-600">
          {error}
        </Text>
      ) : null}
    </Box>
  );
}

/**
 * Sticky "request a training quote" form. No backend exists yet (see
 * `lib/content/courses.js`'s file header), so submission only validates and
 * swaps to a thank-you state client-side — the same behavior the source
 * design falls back to when its own `FORM_ENDPOINT` is unset.
 *
 * Design: `.qpanel`/`.qp-head`/`.qp-scroll`. The heading sits in its own
 * non-scrolling band (`.qp-head`); only the fields below it scroll once the
 * caller (`QuoteRail`) constrains this component's height. The right-edge
 * floating-rail positioning (sticky + reserved content padding) also lives
 * in that caller via the `className` prop — this component only owns the
 * card's own look.
 */
export default function QuotePanel({
  title = "Request a training quote",
  slaNote,
  className,
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { country: "United States" } });
  const [submitted, setSubmitted] = useState(false);

  const dialCode =
    COUNTRY_DIAL_CODES.find((country) => country.name === watch("country"))
      ?.dialCode || "";

  function onSubmit() {
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Box
        tabIndex={-1}
        className={cn(
          "flex flex-col overflow-hidden rounded-2xl border border-ink/22 bg-white p-6.5 text-center shadow-[0_1px_0_rgba(10,22,40,0.04),0_24px_48px_-30px_rgba(10,22,40,0.42),0_4px_14px_-8px_rgba(10,22,40,0.16)]",
          className,
        )}
      >
        <Box className="mx-auto mb-4 flex size-11 items-center justify-center rounded-full bg-lime text-navy">
          <Check size={20} strokeWidth={2.5} aria-hidden="true" />
        </Box>
        <Text as="h3" className="font-display text-lg font-semibold text-ink">
          Request received.
        </Text>
        <Text as="p" className="mt-2 text-[13.5px] leading-[1.6] text-ink/60">
          Thanks, a training specialist will reply within one business day with
          a tailored proposal.
        </Text>
      </Box>
    );
  }

  return (
    <Box
      as="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-ink/22 bg-white shadow-[0_1px_0_rgba(10,22,40,0.04),0_24px_48px_-30px_rgba(10,22,40,0.42),0_4px_14px_-8px_rgba(10,22,40,0.16)]",
        className,
      )}
    >
      <Box className="flex-none rounded-t-2xl border-b border-ink/12 bg-paper-warm p-4 text-center">
        <Text
          as="h3"
          className="font-display text-base font-bold tracking-tight text-ink"
        >
          {title}
        </Text>
      </Box>

      <Box className="min-h-0 flex-1 overflow-y-auto p-5">
        <Field label="Name" required error={errors.name?.message}>
          <input
            {...register("name", { required: "Required." })}
            type="text"
            autoComplete="name"
            placeholder="Enter Your Full Name*"
            aria-invalid={Boolean(errors.name)}
            className={inputClasses}
          />
        </Field>
        <Field
          label="Work email"
          required
          error={errors.workEmail?.message}
          className="mt-3"
        >
          <input
            {...register("workEmail", {
              required: "Please enter your work email address.",
              pattern: {
                value: EMAIL_PATTERN,
                message: "That email address does not look right.",
              },
              validate: (value) =>
                !FREE_MAIL_DOMAINS.has(value.split("@")[1]?.toLowerCase()) ||
                "Please use your work email so we can identify your organization.",
            })}
            type="email"
            autoComplete="email"
            placeholder="Enter Work Email Address*"
            aria-invalid={Boolean(errors.workEmail)}
            className={inputClasses}
          />
        </Field>
        <Field
          label="Job title"
          required
          error={errors.jobTitle?.message}
          className="mt-3"
        >
          <input
            {...register("jobTitle", { required: "Required." })}
            type="text"
            autoComplete="organization-title"
            placeholder="Enter Your Job Title*s"
            aria-invalid={Boolean(errors.jobTitle)}
            className={inputClasses}
          />
        </Field>

        <Field
          label="Company name"
          required
          error={errors.company?.message}
          className="mt-3"
        >
          <input
            {...register("company", {
              required: "Please enter your company name.",
            })}
            type="text"
            autoComplete="organization"
            placeholder="Enter Company Name*"
            aria-invalid={Boolean(errors.company)}
            className={inputClasses}
          />
        </Field>

        <Field label="Country" className="mt-3">
          <select {...register("country")} className={inputClasses}>
            {COUNTRY_DIAL_CODES.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Phone" className="mt-3">
          <Box className="flex items-stretch overflow-hidden rounded-[10px] border border-ink/22 focus-within:border-navy focus-within:bg-white">
            <Text
              as="span"
              className="flex items-center border-r border-ink/15 px-2.5 font-mono text-[12.5px] text-ink/60"
            >
              {dialCode || "—"}
            </Text>
            <input
              {...register("phone")}
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="201-555-0123"
              className="w-full bg-transparent p-2.5 text-[12px] text-ink outline-none placeholder:text-ink/35"
            />
          </Box>
        </Field>

        <Field label="Your training requirements" className="mt-3">
          <textarea
            {...register("requirements")}
            rows={3}
            placeholder="Tell Us About Your Training Requirements"
            className={cn(inputClasses, "resize-none")}
          />
        </Field>

        <Box className="mt-3.5 flex items-start gap-2.5">
          <input
            {...register("consent", { required: true })}
            type="checkbox"
            id="qp-consent"
            aria-invalid={Boolean(errors.consent)}
            className="mt-0.75 size-3 flex-none accent-navy"
          />
          <Text
            as="label"
            htmlFor="qp-consent"
            className="text-[10.5px] leading-normal text-ink/60"
          >
            I agree to be contacted about this request, per the{" "}
            <a href="/privacy-policy" className="underline hover:text-ink">
              privacy policy
            </a>
            .
          </Text>
        </Box>
        {errors.consent ? (
          <Text as="p" role="alert" className="mt-1 text-[11.5px] text-red-600">
            Please accept the privacy policy to continue.
          </Text>
        ) : null}

        <CtaButton
          type="submit"
          size="sm"
          block
          arrow
          disabled={isSubmitting}
          className="mt-4.5"
        >
          Request my quote
        </CtaButton>

        {slaNote ? (
          <Text as="p" className="mt-2.5 text-center text-[11.5px] text-ink/45">
            {slaNote}
          </Text>
        ) : null}
      </Box>
    </Box>
  );
}
