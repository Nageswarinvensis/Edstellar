"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import { CtaButton } from "@/components/common/cta-button";
import { FormField, formInputClasses } from "@/components/common/form-field";
import CountryPhoneFields, { HoneypotField, phoneForSubmit } from "@/components/forms/country-phone-fields";
import { COMPANY_SIZES } from "@/content/consulting-form";
import { cn } from "@/lib/utils";
import { EMAIL_PATTERN } from "@/lib/constants";
import { submitEnquiry } from "@/lib/actions/submit-enquiry";

/**
 * The homepage briefing form (`#contact`) — the design's own fields, in the
 * enquiry form's look: the same card, `FormField` labels, input style,
 * country + phone pair, lime submit button and error handling as
 * `components/forms/enquiry-form.jsx`, without its heading.
 *
 * Fields: full name, work email, company, job title, country (+ phone — the
 * TrainingEnquiry pipeline requires one), company size, where to start, and
 * capability goals. It posts to the same Zoho "TrainingEnquiry" form through
 * `submitEnquiry`; company size and the starting point are not fields on that
 * Zoho form, so they travel in the message with the goals, nothing lost.
 *
 * Design: `edstellar-homepage-capability-development.html` → `#contact .form`.
 */
export default function CapabilityBriefingForm({ data, thankYou = "contact-us", className }) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { country: "", phone: "", dialCode: "1", companySize: "", start: "" } });
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");

  async function onSubmit(values) {
    setSubmitError("");
    const { companySize, start, goals, ...rest } = values;
    const requirements = [
      companySize && `Company size: ${companySize}`,
      start && `Start with: ${start}`,
      goals?.trim() && `Goals: ${goals.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");

    let result;
    try {
      result = await submitEnquiry({
        ...rest,
        requirements,
        phone: phoneForSubmit(values.phone),
        page: window.location.pathname,
        thankYou,
      });
    } catch {
      result = null;
    }

    if (result?.ok) {
      router.push(`/thank-you/${thankYou}`);
      return;
    }
    if (result?.errors) {
      for (const [field, message] of Object.entries(result.errors)) {
        setError(field === "message" ? "goals" : field, { message });
      }
      return;
    }
    setSubmitError(
      result?.error || "We could not send your request. Please try again, or email us at contact@edstellar.com.",
    );
  }

  return (
    <Reveal
      className={cn(
        "rounded-[14px] border border-ink/12 bg-white px-4 py-7.5 text-ink shadow-[0_18px_50px_-24px_rgba(10,22,40,0.35)] sm:p-12",
        className,
      )}
    >
      <Box
        as="form"
        aria-label="Plan a capability development program"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2"
      >
        <HoneypotField register={register} />

        <FormField label="Full name" required error={errors.name?.message}>
          <input
            {...register("name", { required: "Please enter your full name." })}
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            aria-invalid={Boolean(errors.name)}
            className={formInputClasses}
          />
        </FormField>

        <FormField label="Work email" required error={errors.email?.message}>
          <input
            {...register("email", {
              required: "Please enter a valid work email address.",
              pattern: { value: EMAIL_PATTERN, message: "Please enter a valid work email address." },
            })}
            type="email"
            autoComplete="email"
            placeholder="Enter your work email address"
            aria-invalid={Boolean(errors.email)}
            className={formInputClasses}
          />
        </FormField>

        <FormField label="Company" required error={errors.company?.message}>
          <input
            {...register("company", { required: "Please enter your company name." })}
            type="text"
            autoComplete="organization"
            placeholder="Enter your company name"
            aria-invalid={Boolean(errors.company)}
            className={formInputClasses}
          />
        </FormField>

        <FormField label="Job title" required error={errors.jobTitle?.message}>
          <input
            {...register("jobTitle", { required: "Please enter your job title." })}
            type="text"
            autoComplete="organization-title"
            placeholder="Enter your job title"
            aria-invalid={Boolean(errors.jobTitle)}
            className={formInputClasses}
          />
        </FormField>

        <CountryPhoneFields form={{ register, control, watch, setValue, errors }} />

        <FormField label="Company size" required error={errors.companySize?.message}>
          <select
            {...register("companySize", { required: "Please select your company size." })}
            aria-invalid={Boolean(errors.companySize)}
            className={formInputClasses}
          >
            <option value="" disabled>
              Select company size
            </option>
            {COMPANY_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label={data?.start_label || "Where do you want to start?"} required error={errors.start?.message}>
          <select
            {...register("start", { required: "Please choose where you want to start." })}
            aria-invalid={Boolean(errors.start)}
            className={formInputClasses}
          >
            <option value="" disabled>
              Select an option
            </option>
            {(data?.start_options ?? []).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label={data?.goals_label || "Your capability goals"} error={errors.goals?.message} className="sm:col-span-2">
          <textarea
            {...register("goals")}
            rows={4}
            placeholder={data?.goals_placeholder}
            className={cn(formInputClasses, "resize-y")}
          />
        </FormField>

        <Box className="sm:col-span-2">
          {submitError ? (
            <Text as="p" role="alert" className="mb-4 text-[13.5px] leading-[1.5] text-destructive">
              {submitError}
            </Text>
          ) : null}
          <CtaButton type="submit" color="lime" block arrow disabled={isSubmitting}>
            {isSubmitting ? "Sending…" : data?.submit_label || "Schedule a briefing"}
          </CtaButton>
          {data?.note && (
            <Text as="p" className="mt-4 text-[13px] leading-[1.6] text-ink-muted">
              {data.note}
            </Text>
          )}
        </Box>
      </Box>
    </Reveal>
  );
}
