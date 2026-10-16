"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import { CtaButton } from "@/components/common/cta-button";
import { FormField, formInputClasses } from "@/components/common/form-field";
import { cn } from "@/lib/utils";
import { COUNTRY_DIAL_CODES, EMAIL_PATTERN } from "@/lib/constants";

const PHONE_PATTERN = /^[\d\s()+-]{6,20}$/;

/**
 * Training enquiry card — the form on `/contact-us` and `/enquiry-now`.
 * Name, work email, company, job title, country, phone and requirements.
 *
 * There is no submission backend yet: a valid submit goes straight to
 * `/thank-you/{thankYou}` (default `contact-us`).
 *
 * `data`: `heading`, `requirements_placeholder`, `submit_label`.
 * `inlineIdentity` puts name and email side by side (the contact page) —
 * the enquiry page stacks them.
 *
 * Design: contact-us / enquiry-form `.form-card`, `.field`, `.phone-group`.
 */
export default function EnquiryForm({ data, thankYou = "contact-us", inlineIdentity = false, className }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { country: "" } });
  const router = useRouter();

  const dialCode =
    COUNTRY_DIAL_CODES.find((country) => country.name === watch("country"))
      ?.dialCode || "+1";

  function onSubmit() {
    router.push(`/thank-you/${thankYou}`);
  }

  return (
    <Reveal
      className={cn(
        "rounded-[14px] border border-ink/12 bg-white p-6 text-ink shadow-[0_18px_50px_-24px_rgba(10,22,40,0.35)] sm:p-12",
        className,
      )}
    >
      <Text as="h2" className="mb-1.5">
        {data.heading}
      </Text>
      <Text as="p" className="mb-8 text-[15px] leading-[1.6] text-ink/60">
        Fields marked <Text as="span" className="text-red-600">*</Text> are required.
      </Text>


      <Box as="form" noValidate onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          label="Full name"
          required
          error={errors.name?.message}
          className={cn(!inlineIdentity && "sm:col-span-2")}
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
          className={cn(!inlineIdentity && "sm:col-span-2")}
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

        <FormField label="Country" required error={errors.country?.message} className="sm:col-span-2">
          <select
            {...register("country", { required: "Please select your country." })}
            aria-invalid={Boolean(errors.country)}
            className={formInputClasses}
          >
            <option value="" disabled>
              Select your country
            </option>
            {COUNTRY_DIAL_CODES.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Phone number" required error={errors.phone?.message} className="sm:col-span-2">
          <Box className="flex items-stretch overflow-hidden rounded-xl border border-ink/15 bg-paper focus-within:border-navy focus-within:bg-white">
            <Text
              as="span"
              className="flex w-16 flex-none items-center justify-center border-r border-ink/12 font-mono text-[12.5px] text-ink/60"
            >
              {dialCode}
            </Text>
            <input
              {...register("phone", {
                required: "Please enter a valid phone number.",
                pattern: { value: PHONE_PATTERN, message: "Please enter a valid phone number." },
              })}
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="201-555-0123"
              aria-invalid={Boolean(errors.phone)}
              className="w-full min-w-0 bg-transparent px-3.5 py-3 text-[13.5px] text-ink outline-none placeholder:text-ink/35"
            />
          </Box>
        </FormField>

        <FormField label="Training requirements" className="sm:col-span-2">
          <textarea
            {...register("requirements")}
            rows={4}
            placeholder={data.requirements_placeholder}
            className={cn(formInputClasses, "resize-y")}
          />
        </FormField>

        <Box className="sm:col-span-2">
          <CtaButton type="submit" color="lime" block disabled={isSubmitting}>
            {data.submit_label}
          </CtaButton>
          <Text as="p" className="mt-4 text-[13px] leading-[1.6] text-ink/60">
            Your details are used only to respond to your enquiry. See our{" "}
            <a href="/privacy-policy" title="Click Here to View Privacy Policy" className="underline hover:text-ink">
              Privacy Policy
            </a>
            .
          </Text>
        </Box>
      </Box>
    </Reveal>
  );
}
