"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Check, Globe, User } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import Reveal from "@/components/common/reveal";
import RichHeading from "@/components/common/rich-heading";
import { CtaButton } from "@/components/common/cta-button";
import { FormField, formInputClasses } from "@/components/common/form-field";
import CountryPhoneFields, { HoneypotField, phoneForSubmit } from "@/components/forms/country-phone-fields";
import { submitEnquiry } from "@/lib/actions/submit-enquiry";
import { cn } from "@/lib/utils";
import { EMAIL_PATTERN, FREE_MAIL_DOMAINS } from "@/lib/constants";

/**
 * The short navy lead form — name, work email, company, title, country,
 * phone, an optional "interested in" select (`data.interest_options`) and a
 * free-text message. It submits as the contact-us form does: a Training
 * Enquiry, sent to Zoho "TrainingEnquiry" through the `submitEnquiry` Server
 * Action (the message as the training requirements), with the contact-us
 * form's own country + international phone fields (`CountryPhoneFields`),
 * both required as Zoho requires them. `accent` colours the
 * heading emphasis and submit text: gold on Leadership Retreats, lime on
 * About Us. `split` sets the heading beside the form instead of above it;
 * `data.points` (`{ icon, title, text }[]`) lists reassurances under it.
 * Design: leadership-retreats / about-us `.contact`, `#leadForm`.
 */
const ACCENT = { gold: "text-gold", lime: "text-lime" };

/** Icons for the optional `data.points` listed beside the form. */
const POINT_ICONS = { user: User, check: Check, globe: Globe };

export default function RetreatForm({
  data,
  id = "contact",
  thankYou = "consulting",
  accent = "gold",
  split = false,
}) {
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

  async function onSubmit({ workEmail, message, ...values }) {
    setSubmitError("");
    let result;
    try {
      result = await submitEnquiry({
        ...values,
        email: workEmail,
        requirements: message,
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
      // The pipeline's field names → this form's.
      const FIELD = { email: "workEmail", requirements: "message" };
      for (const [field, msg] of Object.entries(result.errors)) {
        setError(FIELD[field] ?? field, { message: msg });
      }
      return;
    }
    setSubmitError(
      result?.error ||
        "We could not submit your enquiry. Please try again, or email us at contact@edstellar.com.",
    );
  }

  return (
    <Section id={id} aria-labelledby="c-h" className="scroll-mt-32 bg-navy">
      <Box
        className={
          split
            ? "grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14"
            : undefined
        }
      >
        <Reveal
          className={
            split ? "max-w-[44ch]" : "mx-auto mb-10 max-w-[64ch] text-center"
          }
        >
          <RichHeading
            as="h2"
            id="c-h"
            heading={data.heading}
            className="mb-4 text-paper"
            emphasisClassName={ACCENT[accent]}
          />
          <Text
            as="p"
            className="text-[clamp(15px,1.2vw,17px)] leading-[1.7] text-paper/70"
          >
            {data.description}
          </Text>
          {data.points?.length ? (
            <Box as="ul" className="m-0 mt-8 flex list-none flex-col gap-5 p-0">
              {data.points.map((point) => {
                const Icon = POINT_ICONS[point.icon];
                return (
                  <Box as="li" key={point.title} className="flex gap-4">
                    {Icon ? <Icon size={22} strokeWidth={1.8} aria-hidden="true" className={cn("mt-0.5 flex-none", ACCENT[accent])} /> : null}
                    <Box>
                      <Text as="span" className="block font-display text-[17px] font-semibold text-paper">
                        {point.title}
                      </Text>
                      <Text as="span" className="mt-1 block text-[14px] text-paper/65">
                        {point.text}
                      </Text>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ) : null}
        </Reveal>

        <Reveal delay={1} className={split ? "w-full" : "mx-auto max-w-240"}>
          <Box
            as="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="relative rounded-[18px] bg-white px-4 py-7.5 sm:p-10"
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

              <FormField
                label="Work email"
                required
                error={errors.workEmail?.message}
              >
                <input
                  {...register("workEmail", {
                    required: "Please use your work email address.",
                    pattern: {
                      value: EMAIL_PATTERN,
                      message: "Please enter a valid email address.",
                    },
                    validate: (value) =>
                      !FREE_MAIL_DOMAINS.has(
                        value.split("@")[1]?.toLowerCase(),
                      ) || "Please use your work email address.",
                  })}
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your work email"
                  aria-invalid={Boolean(errors.workEmail)}
                  className={formInputClasses}
                />
              </FormField>

              <FormField
                label="Company name"
                required
                error={errors.company?.message}
              >
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

              <FormField
                label="Job title"
                required
                error={errors.jobTitle?.message}
              >
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

              <CountryPhoneFields
                form={{ register, control, watch, setValue, errors }}
                phoneLabel="Phone"
              />

              {data.interest_options?.length ? (
                <FormField label="I am interested in" className="sm:col-span-2">
                  <select
                    {...register("interest")}
                    defaultValue=""
                    className={formInputClasses}
                  >
                    <option value="">Select one</option>
                    {data.interest_options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </FormField>
              ) : null}

              <FormField
                label={data.message_label || "What you want from the retreat"}
                className="sm:col-span-2"
              >
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
              <CtaButton
                type="submit"
                arrow
                disabled={isSubmitting}
                className={cn("w-full sm:w-auto", ACCENT[accent])}
              >
                {data.submit_label}
              </CtaButton>
            </Box>
          </Box>
        </Reveal>
      </Box>
    </Section>
  );
}
