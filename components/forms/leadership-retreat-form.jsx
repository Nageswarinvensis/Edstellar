"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { CtaButton } from "@/components/common/cta-button";
import { FormField, formInputClasses } from "@/components/common/form-field";
import CountryPhoneFields, { HoneypotField, phoneForSubmit } from "@/components/forms/country-phone-fields";
import { submitRetreat } from "@/lib/actions/submit-retreat";
import { cn } from "@/lib/utils";
import { EMAIL_PATTERN, FREE_MAIL_DOMAINS } from "@/lib/constants";

/**
 * Leadership Retreats' "Request an invitation" form — name, work email,
 * company, job title, country, phone, "I am interested in" and a message —
 * sent to the live `/ceo-retreats` Zoho "Impremium" form through the
 * `submitRetreat` Server Action and the shared lead pipeline (`lib/leads/`).
 * Everything but the message is required, because Zoho requires it. Looks
 * like `RetreatForm`, which the other pages still use.
 *
 * Design: leadership-retreats `.contact`, `#leadForm`.
 */
export default function LeadershipRetreatForm({ data, id = "contact", thankYou = "request-invite" }) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { country: "", phone: "", dialCode: "1", retreatInterest: "" } });
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");

  if (!data) return null;

  async function onSubmit(values) {
    setSubmitError("");
    let result;
    try {
      result = await submitRetreat({
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
      for (const [field, message] of Object.entries(result.errors)) setError(field, { message });
      return;
    }
    setSubmitError(
      result?.error ||
        "We could not submit your request. Please try again, or email us at contact@edstellar.com.",
    );
  }

  return (
    <Section id={id} aria-labelledby="c-h" className="scroll-mt-32 bg-navy">
      <Reveal className="mx-auto mb-10 max-w-[64ch] text-center">
        <RichHeading
          as="h2"
          id="c-h"
          heading={data.heading}
          className="mb-4 text-paper"
          emphasisClassName="text-gold"
        />
        <Text as="p" className="text-[clamp(15px,1.2vw,17px)] leading-[1.7] text-paper/70">
          {data.description}
        </Text>
      </Reveal>

      <Reveal delay={1} className="mx-auto max-w-240">
        <Box
          as="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="relative rounded-[18px] bg-white p-6.5 sm:p-10"
        >
          <HoneypotField register={register} />

          <Box className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField label="Name" required error={errors.name?.message}>
              <input
                {...register("name", { required: "Please enter your name." })}
                type="text"
                autoComplete="name"
                placeholder="Enter your name"
                aria-invalid={Boolean(errors.name)}
                className={formInputClasses}
              />
            </FormField>

            <FormField label="Work email" required error={errors.workEmail?.message}>
              <input
                {...register("workEmail", {
                  required: "Please use your work email address.",
                  pattern: { value: EMAIL_PATTERN, message: "Please enter a valid email address." },
                  validate: (value) =>
                    !FREE_MAIL_DOMAINS.has(value.split("@")[1]?.toLowerCase()) ||
                    "Please use your work email address.",
                })}
                type="email"
                autoComplete="email"
                placeholder="Enter your work email"
                aria-invalid={Boolean(errors.workEmail)}
                className={formInputClasses}
              />
            </FormField>

            <FormField label="Company name" required error={errors.company?.message}>
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

            <CountryPhoneFields form={{ register, control, watch, setValue, errors }} phoneLabel="Phone" />

            <FormField label="I am interested in" required error={errors.retreatInterest?.message} className="sm:col-span-2">
              <select
                {...register("retreatInterest", { required: "Please select what you are interested in." })}
                aria-invalid={Boolean(errors.retreatInterest)}
                className={formInputClasses}
              >
                <option value="" disabled>
                  Select one
                </option>
                {data.interest_options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label={data.message_label} className="sm:col-span-2">
              <textarea
                {...register("message")}
                rows={4}
                placeholder={data.message_placeholder}
                className={cn(formInputClasses, "resize-y")}
              />
            </FormField>
          </Box>

          {submitError ? (
            <Text as="p" role="alert" className="mt-5 text-[13.5px] leading-normal text-red-600">
              {submitError}
            </Text>
          ) : null}

          <Box className="mt-6 flex flex-col gap-4 border-t border-ink/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <Text as="p" className="max-w-[44ch] text-[13px] leading-normal">
              {data.sla_note}
            </Text>
            <CtaButton type="submit" arrow disabled={isSubmitting} className="w-full text-gold sm:w-auto">
              {isSubmitting ? "Sending…" : data.submit_label}
            </CtaButton>
          </Box>
        </Box>
      </Reveal>
    </Section>
  );
}
