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
import { submitEnquiry } from "@/lib/actions/submit-enquiry";

const BACKGROUND_CLASSES = {
  "paper-warm": "bg-paper-warm",
  paper: "bg-paper",
  white: "bg-white",
  navy: "bg-navy",
};

/**
 * The "request training" lead form on domain and course pages. Its own
 * design, the enquiry form's behavior: a valid submit goes to Zoho Forms'
 * "TrainingEnquiry" form — the one the live category and course pages post
 * to — through the `submitEnquiry` Server Action and the shared lead
 * pipeline (`lib/leads/`), with the shared country + international phone
 * fields. On success the visitor lands on `/thank-you/{thankYou}` —
 * `category` on domain pages, `course` on course pages; a field the server
 * rejects shows under that field, and a failed delivery shows a message
 * above the button instead of a false thank-you. `branch` is Zoho's Branch
 * on a dynamic page ("course" on course pages, where the page name is the
 * slug); without it Zoho gets the page name in both, as on static pages.
 */
export default function LeadForm({ data, background = "paper-warm", id = "apply", thankYou = "consulting", branch }) {
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

  if (!data) return null;

  const dark = background === "navy";

  async function onSubmit({ workEmail, ...values }) {
    setSubmitError("");
    let result;
    try {
      result = await submitEnquiry({
        ...values,
        email: workEmail,
        phone: phoneForSubmit(values.phone),
        page: window.location.pathname,
        thankYou,
        branch,
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
      const FIELD = { email: "workEmail", message: "requirements" };
      for (const [field, message] of Object.entries(result.errors)) {
        setError(FIELD[field] ?? field, { message });
      }
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
            dark ? "mx-auto text-center text-white/70" : "text-ink-muted",
          )}
        >
          {data.description}
        </Text>
      </Reveal>

      <Reveal delay={2}>
        <Box className="overflow-hidden rounded-[22px] border border-ink/12 bg-white shadow-[0_30px_70px_-50px_rgba(10,22,40,0.55)]">
          <Box className="px-4 py-7.5 sm:p-9 lg:p-13">
            <Box as="form" noValidate onSubmit={handleSubmit(onSubmit)}>
              <HoneypotField register={register} />
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

                <CountryPhoneFields
                  form={{ register, control, watch, setValue, errors }}
                  phoneLabel="Phone"
                />

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

              {submitError ? (
                <Text as="p" role="alert" className="mt-6 text-[13.5px] leading-[1.5] text-destructive">
                  {submitError}
                </Text>
              ) : null}

              <Box className="mt-6.5 flex flex-col items-start gap-4 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                {data.sla_note ? (
                  <Text
                    as="p"
                    className="max-w-[50ch] text-[12.5px] leading-[1.55] text-ink-muted"
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
                  {isSubmitting ? "Submitting…" : data.Button_Label || data.submit_label || "Submit Request"}
                </CtaButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Reveal>
    </Section>
  );
}
