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
import { cn } from "@/lib/utils";
import { EMAIL_PATTERN, FREE_MAIL_DOMAINS } from "@/lib/constants";
import { submitConsulting } from "@/lib/actions/submit-consulting";
import {
  BUDGET_RANGES,
  CHALLENGES_BY_INTEREST,
  COMPANY_SIZES,
  CONSULTING_INTERESTS,
  EMPLOYEES_IMPACTED,
  TIMELINES,
} from "@/content/consulting-form";

/** Every challenge once, "Other" last — offered before an interest is picked. */
const ALL_CHALLENGES = [
  ...new Set(Object.values(CHALLENGES_BY_INTEREST).flat().filter((item) => item !== "Other")),
  "Other",
];

const BACKGROUND_CLASSES = {
  "paper-warm": "bg-paper-warm",
  paper: "bg-paper",
  white: "bg-white",
  navy: "bg-navy",
};

/** A labelled `<select>` with a blank first option as its prompt. */
function SelectField({ label, required, error, placeholder, options, registration, className }) {
  return (
    <FormField label={label} required={required} error={error} className={className}>
      <select
        {...registration}
        aria-invalid={Boolean(error)}
        className={formInputClasses}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FormField>
  );
}

/**
 * The consulting enquiry form — used on the L&D, OD, talent assessment,
 * coaching and managed learning / managed training hubs and their
 * sub-pages. LeadForm's look (section heading and description from `data`,
 * white card, labelled fields) with the live consulting form's fields:
 * name, work email, company, job title, country + phone, company size,
 * primary consulting interest, current challenge, employees impacted,
 * timeline, budget and a free-text brief.
 *
 * Choosing a primary interest narrows "Current challenge" to that
 * interest's list (`CHALLENGES_BY_INTEREST`) and clears a challenge that no
 * longer fits. Country and phone are the shared international phone input
 * (`CountryPhoneFields`), synced both ways.
 *
 * A valid submit goes to Zoho Forms' "EdstellarLDConsultingform1" — the same
 * form, with the same fields and option values, as the live consulting
 * pages — through the `submitConsulting` Server Action and the shared lead
 * pipeline (`lib/leads/`). On success the visitor lands on
 * `/thank-you/{thankYou}` (default `consulting`); a field the server rejects
 * shows under that field, and a failed delivery shows a message above the
 * button instead of a false thank-you.
 *
 * `data`: `heading`, `description`, `Button_Label` / `submit_label`,
 * `sla_note` — the same CMS fields LeadForm reads.
 */
export default function ConsultingForm({ data, background = "navy", id = "apply", thankYou = "consulting" }) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { country: "", phone: "", dialCode: "1" } });
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");

  const interest = watch("interest");
  const challenges = CHALLENGES_BY_INTEREST[interest] ?? ALL_CHALLENGES;

  if (!data) return null;

  const dark = background === "navy";

  function onInterestChange(event) {
    const next = CHALLENGES_BY_INTEREST[event.target.value] ?? ALL_CHALLENGES;
    if (!next.includes(getValues("challenge"))) setValue("challenge", "");
  }

  async function onSubmit(values) {
    setSubmitError("");
    let result;
    try {
      result = await submitConsulting({
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
        "We could not submit your enquiry. Please try again, or email us at contact@edstellar.com.",
    );
  }

  return (
    <Section
      id={id}
      aria-label="Consulting enquiry"
      className={cn("border-t border-ink/10", BACKGROUND_CLASSES[background] ?? BACKGROUND_CLASSES.navy)}
    >
      <Reveal delay={1}>
        <RichHeading
          as="h2"
          heading={data.heading}
          className={cn("max-w-[22ch] tracking-[-0.03em]", dark ? "mx-auto text-center text-white" : "text-ink")}
          emphasisClassName={cn("font-normal italic", dark && "text-lime")}
        />
        {data.description ? (
          <Text
            as="p"
            className={cn(
              "mt-4 mb-10 max-w-[64ch] text-[clamp(15px,1.2vw,17px)] leading-[1.7]",
              dark ? "mx-auto text-center text-white/70" : "text-ink/60",
            )}
          >
            {data.description}
          </Text>
        ) : null}
      </Reveal>

      <Reveal delay={2}>
        <Box className="overflow-hidden rounded-[22px] border border-ink/12 bg-white shadow-[0_30px_70px_-50px_rgba(10,22,40,0.55)]">
          <Box as="form" noValidate onSubmit={handleSubmit(onSubmit)} className="p-6.5 sm:p-9 lg:p-13">
            <HoneypotField register={register} />
            <Box className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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

              <FormField label="Work email" required error={errors.workEmail?.message}>
                <input
                  {...register("workEmail", {
                    required: "Please enter your work email address.",
                    pattern: { value: EMAIL_PATTERN, message: "That email address does not look right." },
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

              <CountryPhoneFields
                form={{ register, control, watch, setValue, errors }}
                phoneLabel="Phone"
              />

              <SelectField
                label="Company size"
                required
                error={errors.companySize?.message}
                placeholder="Select company size"
                options={COMPANY_SIZES}
                registration={register("companySize", { required: "Please select your company size." })}
              />

              <SelectField
                label="Primary consulting interest"
                required
                error={errors.interest?.message}
                placeholder="Select your primary interest"
                options={CONSULTING_INTERESTS}
                registration={register("interest", {
                  required: "Please select your primary interest.",
                  onChange: onInterestChange,
                })}
              />

              <SelectField
                label="Current challenge"
                required
                error={errors.challenge?.message}
                placeholder="Select your current challenge"
                options={challenges}
                registration={register("challenge", { required: "Please select your current challenge." })}
              />

              <SelectField
                label="Employees to be impacted"
                placeholder="Select a range"
                options={EMPLOYEES_IMPACTED}
                registration={register("employeesImpacted")}
              />

              <SelectField
                label="Timeline for implementation"
                required
                error={errors.timeline?.message}
                placeholder="Select a timeline"
                options={TIMELINES}
                registration={register("timeline", { required: "Please select a timeline." })}
              />

              <SelectField
                label="Budget range"
                placeholder="Select a budget range"
                options={BUDGET_RANGES}
                registration={register("budget")}
              />

              <FormField label="Your challenges and goals" className="sm:col-span-2">
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="Share your challenges, desired outcomes, or specific areas where you need support…"
                  className={cn(formInputClasses, "resize-y")}
                />
              </FormField>
            </Box>

            {submitError ? (
              <Text as="p" role="alert" className="mt-6 text-[13.5px] leading-[1.5] text-destructive">
                {submitError}
              </Text>
            ) : null}

            <Box className="mt-6.5 flex flex-col items-start gap-4 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              {data.sla_note ? (
                <Text as="p" className="max-w-[50ch] text-[12.5px] leading-[1.55] text-ink/60">
                  {data.sla_note}
                </Text>
              ) : null}
              <CtaButton type="submit" arrow disabled={isSubmitting} className="w-full sm:w-auto">
                {/* `Button_Label` is the site-pages CMS field; `submit_label` the local-content one. */}
                {isSubmitting ? "Submitting…" : data.Button_Label || data.submit_label || "Submit"}
              </CtaButton>
            </Box>
          </Box>
        </Box>
      </Reveal>
    </Section>
  );
}
