"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import V2Section from "@/components/sections/course/v2/section";
import V2Heading from "@/components/sections/course/v2/heading";
import { V2_BUTTON, V2ButtonArrow, V2_QUOTE_TOPIC_EVENT } from "@/components/sections/course/v2/buttons";
import CountryPhoneFields, { HoneypotField, phoneForSubmit } from "@/components/forms/country-phone-fields";
import { EMAIL_PATTERN, FREE_MAIL_DOMAINS } from "@/lib/constants";
import { submitEnquiry } from "@/lib/actions/submit-enquiry";
import { cn } from "@/lib/utils";

const INPUT =
  "w-full min-w-0 max-w-full rounded-[10px] border border-ink/12 bg-paper px-3 py-2.5 text-[14px] leading-normal font-normal text-ink outline-none placeholder:text-ink-muted focus:border-navy aria-[invalid=true]:border-error aria-[invalid=true]:shadow-[0_0_0_1px_var(--color-error)]";

/** The phone widget in the same look (react-phone-input-2 needs `!`). */
const PHONE_INPUT =
  "!h-auto !w-full !rounded-[10px] !border-ink/12 !bg-paper !py-2.5 !pl-[4.25rem] !pr-3 !font-body !text-[14px] !leading-normal !text-ink focus:!border-navy";

/**
 * One labelled field: label above, error below. With `inputId` only the
 * label text is a <label> (the phone widget's <div>s can't sit inside one);
 * otherwise the <label> wraps the control.
 */
function Field({ label, required = true, error, inputId, className, children }) {
  const labelText = (
    <span>
      {label}
      {required && " *"}
    </span>
  );
  return (
    <Box as={inputId ? "div" : "label"} className={cn("grid min-w-0 content-start gap-[5px] text-[12.5px] font-semibold text-ink", className)}>
      {inputId ? <label htmlFor={inputId}>{labelText}</label> : labelText}
      {children}
      {error && (
        <Text as="span" role="alert" className="text-[12px] leading-[1.4] font-medium text-error">
          {error}
        </Text>
      )}
    </Box>
  );
}

/**
 * v2 · Request a quote — the v2 section design (navy panel, package picker,
 * the "Your request" chip from the section CTAs, note and button) around the
 * LIVE course lead form's fields: Name, Work email, Company name, Job title,
 * Country, Phone and training requirements, with the same validation and
 * the same delivery as `components/forms/lead-form.jsx` — Zoho
 * "TrainingEnquiry" through `submitEnquiry`, Branch `course`, then
 * `/thank-you/course`. The picked package and the CTA topic travel in the
 * requirements message, so Zoho receives exactly the live form's fields.
 *
 * `data` is the CMS `leadForm` (heading, description, button label);
 * `quote` the local `course_quote` (packages heading, packages — none
 * picked by default — note, button label).
 * The section is `#quote` (every v2 CTA); the form `#apply` (the sticky footer).
 */
export default function V2QuoteForm({ data, quote = {} }) {
  // No package is picked by default; the visitor chooses one, or none.
  const { packages = [], packages_heading, note } = quote;

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { country: "", phone: "", dialCode: "1", package: "" } });
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const onTopic = (event) => setTopic(String(event.detail ?? ""));
    window.addEventListener(V2_QUOTE_TOPIC_EVENT, onTopic);
    return () => window.removeEventListener(V2_QUOTE_TOPIC_EVENT, onTopic);
  }, []);

  if (!data) return null;
  const submitLabel = data.Button_Label || quote.submit || "Submit Request";

  async function onSubmit({ workEmail, package: pkg, requirements, ...values }) {
    setSubmitError("");
    let result;
    try {
      result = await submitEnquiry({
        ...values,
        email: workEmail,
        phone: phoneForSubmit(values.phone),
        requirements: [topic && `Request: ${topic}`, pkg && `Package: ${pkg}`, requirements?.trim()].filter(Boolean).join("\n"),
        page: window.location.pathname,
        thankYou: "course",
        branch: "course",
      });
    } catch {
      result = null;
    }

    if (result?.ok) {
      router.push("/thank-you/course");
      return;
    }
    if (result?.errors) {
      const FIELD = { email: "workEmail", message: "requirements" };
      for (const [field, message] of Object.entries(result.errors)) setError(FIELD[field] ?? field, { message });
      return;
    }
    setSubmitError(result?.error || "We could not submit your enquiry. Please try again, or email us at contact@edstellar.com.");
  }

  return (
    <V2Section id="quote" aria-label="Request a quote">
      <Box className="grid gap-[30px] rounded-3xl bg-navy p-7 text-white lg:grid-cols-[0.9fr_1.1fr] lg:p-11">
        <Box className="min-w-0">
          <V2Heading parts={data.heading} className="mb-3.5 text-white" emClassName="text-lime" />
          {data.description && <Text className="text-[15px] text-white/72">{data.description.trim()}</Text>}
          {packages.length > 0 && (
            // Native radios tied to the form by `form="apply"`, so the pick is
            // keyboard-operable and travels with the enquiry.
            <Box className="mt-6">
            {packages_heading && (
              <Text as="h3" id="quote-packages" className="mb-3 text-[18px] leading-[1.3] text-white">
                {packages_heading}
              </Text>
            )}
            <Box
              role="radiogroup"
              aria-labelledby={packages_heading ? "quote-packages" : undefined}
              aria-label={packages_heading ? undefined : "Training plans"}
              className="grid grid-cols-1 gap-2"
            >
              {packages.map((p) => (
                <label
                  key={p.name}
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/16 p-3 transition-colors hover:border-white/40 has-checked:border-lime has-checked:bg-lime/10 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-lime"
                >
                  <input type="radio" value={p.name} form="apply" autoComplete="off" {...register("package")} className="peer sr-only" />
                  <Box
                    as="span"
                    aria-hidden="true"
                    className="mt-[3px] grid size-4 flex-none place-items-center rounded-full border-[1.5px] border-white/40 peer-checked:border-lime after:size-2 after:rounded-full after:bg-transparent after:content-[''] peer-checked:after:bg-lime"
                  />
                  <span className="min-w-0">
                    <b className="block font-display text-[15px] font-medium">{p.name}</b>
                    <span className="text-[12.5px] text-white/60">{p.text}</span>
                  </span>
                </label>
              ))}
            </Box>
            </Box>
          )}
        </Box>

        <Box
          as="form"
          id="apply"
          aria-label="Training enquiry"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="relative grid min-w-0 scroll-mt-[76px] gap-3 rounded-[18px] bg-white p-[22px] text-ink min-[640px]:grid-cols-2"
        >
          <HoneypotField register={register} />

          {topic && (
            <p className="col-span-full rounded-[10px] bg-lime-soft px-3 py-2 text-[13.5px] text-ink">
              Your request: <b>{topic}</b>
            </p>
          )}

          <Field label="Name" error={errors.name?.message}>
            <input
              {...register("name", { required: "Please enter your name." })}
              type="text"
              autoComplete="name"
              placeholder="Enter your name"
              aria-invalid={Boolean(errors.name)}
              className={INPUT}
            />
          </Field>

          <Field label="Work email" error={errors.workEmail?.message}>
            <input
              {...register("workEmail", {
                required: "Please enter your work email address.",
                pattern: { value: EMAIL_PATTERN, message: "That email address does not look right." },
                validate: (value) =>
                  !FREE_MAIL_DOMAINS.has(value.split("@")[1]?.toLowerCase()) || "Please use your work email address.",
              })}
              type="email"
              autoComplete="email"
              placeholder="Enter your work email"
              aria-invalid={Boolean(errors.workEmail)}
              className={INPUT}
            />
          </Field>

          <Field label="Company name" error={errors.company?.message}>
            <input
              {...register("company", { required: "Please enter your company name." })}
              type="text"
              autoComplete="organization"
              placeholder="Enter your company name"
              aria-invalid={Boolean(errors.company)}
              className={INPUT}
            />
          </Field>

          <Field label="Job title" error={errors.jobTitle?.message}>
            <input
              {...register("jobTitle", { required: "Please enter your job title." })}
              type="text"
              autoComplete="organization-title"
              placeholder="Enter your job title"
              aria-invalid={Boolean(errors.jobTitle)}
              className={INPUT}
            />
          </Field>

          <CountryPhoneFields
            form={{ register, control, watch, setValue, errors }}
            phoneLabel="Phone"
            renderField={Field}
            selectClassName={INPUT}
            phoneInputClassName={PHONE_INPUT}
          />

          <Field label={data.requirements_label || "Your training requirements"} required={false} className="col-span-full">
            <textarea
              {...register("requirements")}
              rows={3}
              placeholder={
                data.requirements_placeholder ||
                "Tell us about your training requirements: team size, delivery format, tools you use, and preferred timing."
              }
              className={cn(INPUT, "resize-none")}
            />
          </Field>

          <Box className="col-span-full flex flex-col gap-3 min-[640px]:flex-row min-[640px]:items-center min-[640px]:justify-between">
            {(data.sla_note || note) && <p className="text-[12px] text-ink-muted">{data.sla_note || note}</p>}
            <button
              type="submit"
              disabled={isSubmitting}
              title="Click here to submit your training request"
              className={cn(V2_BUTTON.primary, "disabled:opacity-60 min-[640px]:ml-auto")}
            >
              {isSubmitting ? "Sending…" : submitLabel}
              <V2ButtonArrow />
            </button>
          </Box>
          {submitError && (
            <p role="alert" className="col-span-full text-[13px] text-error">
              {submitError}
            </p>
          )}
        </Box>
      </Box>
    </V2Section>
  );
}
