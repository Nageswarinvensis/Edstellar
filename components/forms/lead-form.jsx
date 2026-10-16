"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

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
  navy: "bg-navy",
};

/**
 * The "request training" lead form. No submission backend yet: a valid
 * submit goes straight to `/thank-you/{thankYou}` — `consulting` by default,
 * `category` on domain pages, `course` on course pages.
 */
export default function LeadForm({ data, background = "paper-warm", id = "apply", thankYou = "consulting" }) {
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

  if (!data) return null;

  const dark = background === "navy";

  function onSubmit() {
    router.push(`/thank-you/${thankYou}`);
  }

  return (
    <Section
      id={id}
      aria-label="Request training"
      className={cn(
        "border-t border-ink/10",
        BACKGROUND_CLASSES[background] ?? BACKGROUND_CLASSES["paper-warm"],
      )}
    >
      <Reveal delay={1}>
        <RichHeading
          as="h2"
          heading={data.heading}
          className={cn(
            "max-w-[22ch] tracking-[-0.03em]",
            dark ? "mx-auto text-center text-white" : "text-ink",
          )}
          emphasisClassName={cn("font-normal italic", dark && "text-lime")}
        />

        <Text
          as="p"
          className={cn(
            "mt-4 mb-10 max-w-[64ch] text-[clamp(15px,1.2vw,17px)] leading-[1.7]",
            dark ? "mx-auto text-center text-white/70" : "text-ink/60",
          )}
        >
          {data.description}
        </Text>
      </Reveal>

      <Reveal delay={2}>
        <Box className="overflow-hidden rounded-[22px] border border-ink/12 bg-white shadow-[0_30px_70px_-50px_rgba(10,22,40,0.55)]">
          <Box className="p-6.5 sm:p-9 lg:p-13">
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
                        "Please use your work email address.",
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
                  label={data.requirements_label || "Your training requirements"}
                  className="sm:col-span-2"
                >
                  <textarea
                    {...register("requirements")}
                    rows={4}
                    placeholder={
                      data.requirements_placeholder ||
                      "Tell us about your training requirements: team size, delivery format, your production stack, and preferred timing."
                    }
                    className={cn(formInputClasses, "resize-none")}
                  />
                </FormField>
              </Box>

              <Box className="relative mt-5 flex items-start gap-2.75">
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
                  {/* `consent_text` (optional) replaces the default wording
                      up to the privacy-policy link. */}
                  {data.consent_text ||
                    "I agree that Edstellar may use my details to respond to my training request and provide relevant training solutions, as described in the"}{" "}
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
                  {/* `Button_Label` is the site-pages CMS field; `submit_label` the local-content one. */}
                  {data.Button_Label || data.submit_label || "Request my quote"}
                </CtaButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Reveal>
    </Section>
  );
}
