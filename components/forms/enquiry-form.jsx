"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import { CtaButton } from "@/components/common/cta-button";
import { FormField, formInputClasses } from "@/components/common/form-field";
import CountryPhoneFields, { HoneypotField, phoneForSubmit } from "@/components/forms/country-phone-fields";
import { cn } from "@/lib/utils";
import { EMAIL_PATTERN } from "@/lib/constants";
import { submitEnquiry } from "@/lib/actions/submit-enquiry";

/**
 * Training enquiry card — the form on `/contact-us`, `/enquiry-now` and
 * `/training-for-universities-enquiry`.
 * Name, work email, company, job title, country, phone and requirements.
 *
 * A valid submit goes to Zoho Forms' "TrainingEnquiry" form — the same one
 * the live site's `/enquiry-form` posts to — through the `submitEnquiry`
 * Server Action and the shared lead pipeline (`lib/leads/`). On success the
 * visitor lands on `/thank-you/{thankYou}` (default `contact-us`); a field
 * the server rejects shows under that field, and a failed delivery shows a
 * message above the button instead of a false thank-you.
 *
 * `data`: `heading`, `requirements_placeholder` (optional), `submit_label`.
 * Name and email sit side by side, as company and job title do. `queryParam` (optional) copies that URL
 * parameter into a hidden `program` field as `{queryParam}-{value}` — e.g.
 * `?university-program=x` → `university-program-x` — so the enquiry records
 * which program link the visitor came from. Read on the client, so the page
 * itself stays static.
 *
 * Design: contact-us / enquiry-form `.form-card`, `.field`, `.phone-group`.
 */
export default function EnquiryForm({ data, thankYou = "contact-us", queryParam, className }) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { country: "", phone: "", dialCode: "1" } });
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (!queryParam) return;
    const value = new URLSearchParams(window.location.search).get(queryParam);
    if (value) setValue("program", `${queryParam}-${value}`);
  }, [queryParam, setValue]);

  async function onSubmit(values) {
    setSubmitError("");
    let result;
    try {
      result = await submitEnquiry({
        ...values,
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
        setError(field === "message" ? "requirements" : field, { message });
      }
      return;
    }
    setSubmitError(
      result?.error ||
        "We could not submit your enquiry. Please try again, or email us at contact@edstellar.com.",
    );
  }

  return (
    <Reveal
      className={cn(
        "rounded-[14px] border border-ink/12 bg-white px-4 py-7.5 text-ink shadow-[0_18px_50px_-24px_rgba(10,22,40,0.35)] sm:p-12",
        className,
      )}
    >
      <Text as="h2" className="mb-1.5">
        {data.heading}
      </Text>
      <Text as="p" className="mb-8 text-[15px] leading-[1.6] text-ink-muted">
        Fields marked <Text as="span" className="text-red-600">*</Text> are required.
      </Text>


      <Box as="form" aria-label="Training enquiry" noValidate onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {queryParam ? <input type="hidden" {...register("program")} /> : null}

        <HoneypotField register={register} />

        <FormField
          label="Full name"
          required
          error={errors.name?.message}
        >
          <input
            {...register("name", { required: "Please enter your full name." })}
            type="text"
            autoComplete="name"
            placeholder="Enter your name"
            aria-invalid={Boolean(errors.name)}
            className={formInputClasses}
          />
        </FormField>

        <FormField
          label="Work email"
          required
          error={errors.email?.message}
        >
          <input
            {...register("email", {
              required: "Please enter a valid work email address.",
              pattern: { value: EMAIL_PATTERN, message: "Please enter a valid work email address." },
            })}
            type="email"
            autoComplete="email"
            placeholder="Enter your work email"
            aria-invalid={Boolean(errors.email)}
            className={formInputClasses}
          />
        </FormField>

        <FormField label="Company name" required error={errors.company?.message}>
          <input
            {...register("company", { required: "Please enter your company name." })}
            type="text"
            autoComplete="organization"
            placeholder="Company name"
            aria-invalid={Boolean(errors.company)}
            className={formInputClasses}
          />
        </FormField>

        <FormField label="Job title" required error={errors.jobTitle?.message}>
          <input
            {...register("jobTitle", { required: "Please enter your job title." })}
            type="text"
            autoComplete="organization-title"
            placeholder="Job title"
            aria-invalid={Boolean(errors.jobTitle)}
            className={formInputClasses}
          />
        </FormField>

        <CountryPhoneFields form={{ register, control, watch, setValue, errors }} />

        <FormField label="Training requirements" className="sm:col-span-2">
          <textarea
            {...register("requirements")}
            rows={4}
            placeholder={data.requirements_placeholder || "Tell us about your training requirements."}
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
            {isSubmitting ? "Submitting…" : data.submit_label}
          </CtaButton>
          <Text as="p" className="mt-4 text-[13px] leading-[1.6] text-ink-muted">
            Your details are used only to respond to your enquiry. See our{" "}
            <a href="/privacy-policy" className="underline hover:text-ink">
              Privacy Policy
            </a>
            .
          </Text>
        </Box>
      </Box>
    </Reveal>
  );
}
