"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Check } from "lucide-react";

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

const BACKGROUND_CLASSES = {
  "paper-warm": "bg-paper-warm",
  paper: "bg-paper",
  white: "bg-white",
};

export default function LeadForm({ data, background = "paper-warm" }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { country: "United States" } });
  const [submitted, setSubmitted] = useState(null);

  const dialCode =
    COUNTRY_DIAL_CODES.find((country) => country.name === watch("country"))
      ?.dialCode || "";

  if (!data) return null;

  function onSubmit(values) {
    setSubmitted(values);
  }

  return (
    <Section
      id="apply"
      aria-label="Request training"
      className={cn(
        "border-t border-ink/10",
        BACKGROUND_CLASSES[background] ?? BACKGROUND_CLASSES["paper-warm"],
      )}
    >
      <Reveal>
        <RichHeading heading={data.heading} className="mb-4 max-w-[25ch]" />
      </Reveal>

      <Reveal delay={1}>
        <Text
          as="p"
          className="mb-10 max-w-[64ch] text-[clamp(15px,1.2vw,17px)] leading-[1.7] text-ink/60"
        >
          {data.description}
        </Text>
      </Reveal>

      <Reveal delay={2}>
        <Box className="overflow-hidden rounded-[22px] border border-ink/12 bg-white shadow-[0_30px_70px_-50px_rgba(10,22,40,0.55)]">
          <Box className="p-6.5 sm:p-9 lg:p-13">
            {submitted ? (
              <Box tabIndex={-1} className="py-2 text-center">
                <Box className="mx-auto mb-5 grid size-13 place-items-center rounded-full bg-navy text-lime">
                  <Check size={24} strokeWidth={2.5} aria-hidden="true" />
                </Box>
                <Text
                  as="h3"
                  className="mb-2 font-display text-xl font-bold text-ink"
                >
                  Request received.
                </Text>
                <Text
                  as="p"
                  className="mx-auto mb-6 max-w-[46ch] text-[14.5px] leading-[1.6] text-ink/60"
                >
                  Thanks, a training specialist will reply within one business
                  day with a tailored proposal.
                </Text>

                <Box className="mx-auto mb-7 max-w-[36ch] rounded-[14px] bg-paper-warm p-4.5 text-left text-[13.5px] leading-[1.7] text-ink">
                  <Text
                    as="span"
                    className="mb-1.5 block font-mono text-[10px] tracking-[0.15em] text-ink/50 uppercase"
                  >
                    What we received
                  </Text>
                  {submitted.jobTitle && submitted.company
                    ? `${submitted.jobTitle} at ${submitted.company}`
                    : submitted.company}
                  {submitted.country ? (
                    <>
                      <br />
                      {submitted.country}
                    </>
                  ) : null}
                </Box>

                {data.pricing_href ? (
                  <CtaButton arrow render={<a href={data.pricing_href} />}>
                    See pricing while you wait
                  </CtaButton>
                ) : null}
              </Box>
            ) : (
              <Box as="form" noValidate onSubmit={handleSubmit(onSubmit)}>
                <Box className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FormField label="Name" required error={errors.name?.message}>
                    <input
                      {...register("name", {
                        required: "Please enter your name.",
                      })}
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your name"
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
                        required: "Please enter your work email address.",
                        pattern: {
                          value: EMAIL_PATTERN,
                          message: "That email address does not look right.",
                        },
                        validate: (value) =>
                          !FREE_MAIL_DOMAINS.has(
                            value.split("@")[1]?.toLowerCase(),
                          ) ||
                          "Please use your work email so we can identify your organization.",
                      })}
                      type="email"
                      autoComplete="email"
                      placeholder="Enter your work email"
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
                      className={formInputClasses}
                    />
                  </FormField>

                  <FormField label="Country">
                    <select
                      {...register("country")}
                      className={formInputClasses}
                    >
                      {COUNTRY_DIAL_CODES.map((country) => (
                        <option key={country.name} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <FormField label="Phone">
                    <Box className="flex items-stretch overflow-hidden rounded-xl border border-ink/15 focus-within:border-navy focus-within:bg-white">
                      <Text
                        as="span"
                        className="flex items-center border-r border-ink/12 px-3 font-mono text-[12.5px] text-ink/60"
                      >
                        {dialCode || "—"}
                      </Text>
                      <input
                        {...register("phone")}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel-national"
                        placeholder="201-555-0123"
                        className="w-full min-w-0 bg-transparent p-3 text-[13.5px] text-ink outline-none placeholder:text-ink/35"
                      />
                    </Box>
                  </FormField>

                  <FormField
                    label="Your training requirements"
                    className="sm:col-span-2"
                  >
                    <textarea
                      {...register("requirements")}
                      rows={4}
                      placeholder="Tell us about your training requirements: team size, delivery format, your production stack, and preferred timing."
                      className={cn(formInputClasses, "resize-none")}
                    />
                  </FormField>
                </Box>

                <Box className="mt-5 flex items-start gap-2.75">
                  <input
                    {...register("consent", { required: true })}
                    type="checkbox"
                    id="lf-consent"
                    aria-invalid={Boolean(errors.consent)}
                    className="mt-0.75 size-3.5 flex-none accent-navy"
                  />
                  <Text
                    as="label"
                    htmlFor="lf-consent"
                    className="text-[12.5px] leading-normal text-ink/60"
                  >
                    I agree that Edstellar may use my details to respond to my
                    training request and provide relevant training solutions, as
                    described in the{" "}
                    <a
                      href="/privacy-policy"
                      className="underline hover:text-ink"
                    >
                      privacy policy
                    </a>
                    .
                  </Text>
                </Box>
                {errors.consent ? (
                  <Text
                    role="alert"
                    className="mt-1.5 text-[11.5px] text-red-600"
                  >
                    Please accept the privacy policy to continue.
                  </Text>
                ) : null}

                <Box className="mt-6.5 flex flex-col items-start gap-4 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  {data.sla_note ? (
                    <Text
                      as="p"
                      className="max-w-[50ch] text-[12.5px] leading-[1.55] text-ink/60"
                    >
                      {data.sla_note}
                    </Text>
                  ) : null}
                  <CtaButton
                    type="submit"
                    arrow
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    Request my quote
                  </CtaButton>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Reveal>
    </Section>
  );
}
