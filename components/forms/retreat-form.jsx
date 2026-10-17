"use client";

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
import { cn } from "@/lib/utils";
import {
  COUNTRY_DIAL_CODES,
  EMAIL_PATTERN,
  FREE_MAIL_DOMAINS,
} from "@/lib/constants";

const PHONE_PATTERN = /^[\d\s()+-]{6,20}$/;

/**
 * The short navy lead form — name, work email, company, title, country,
 * phone, an optional "interested in" select (`data.interest_options`) and a
 * free-text message. Same submit behaviour as `ConsultingForm` (no endpoint
 * yet; a valid submit goes to the thank-you page). `accent` colours the
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
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { country: "United States" } });
  const router = useRouter();

  const dialCode =
    COUNTRY_DIAL_CODES.find((country) => country.name === watch("country"))
      ?.dialCode || "";

  function onSubmit() {
    router.push(`/thank-you/${thankYou}`);
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
            className="rounded-[18px] bg-white p-6.5 sm:p-10"
          >
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

              <FormField label="Country">
                <select
                  {...register("country")}
                  autoComplete="country-name"
                  className={formInputClasses}
                >
                  {COUNTRY_DIAL_CODES.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Phone" error={errors.phone?.message}>
                <Box className="flex">
                  <Text
                    as="span"
                    className="flex items-center rounded-l-xl border border-r-0 border-ink/15 bg-paper px-3 text-[13.5px] text-ink/60"
                  >
                    {dialCode}
                  </Text>
                  <input
                    {...register("phone", {
                      validate: (value) =>
                        !value ||
                        PHONE_PATTERN.test(value) ||
                        "Please enter a valid phone number.",
                    })}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    placeholder="201-555-0123"
                    aria-invalid={Boolean(errors.phone)}
                    className={cn(formInputClasses, "rounded-l-none")}
                  />
                </Box>
              </FormField>

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

            <Box
              as="label"
              className="mt-6 flex items-start gap-3 text-[13px] leading-normal text-ink/65"
            >
              <input
                {...register("consent", { required: true })}
                type="checkbox"
                aria-invalid={Boolean(errors.consent)}
                className="mt-0.5 size-4.5 flex-none accent-navy"
              />
              <Text
                as="span"
                className={cn("text-[13px]", errors.consent && "text-red-600")}
              >
                I agree that Edstellar may contact me about this request and
                store my details as described in the{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener"
                  className="font-semibold text-ink underline"
                >
                  privacy policy
                </a>
                .{" "}
                <Text as="span" className="text-red-600">
                  *
                </Text>
              </Text>
            </Box>

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
