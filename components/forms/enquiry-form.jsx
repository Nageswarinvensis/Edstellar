"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Reveal from "@/components/common/reveal";
import { CtaButton } from "@/components/common/cta-button";
import { FormField, formInputClasses } from "@/components/common/form-field";
import { cn } from "@/lib/utils";
import { EMAIL_PATTERN } from "@/lib/constants";
import { COUNTRIES, PREFERRED_COUNTRIES } from "@/lib/countries";
import { submitEnquiry } from "@/lib/actions/submit-enquiry";

/** react-phone-input-2's value is the full number as digits, dial code
 * first ("919876543210") — at least 6 digits must follow the dial code. */
function validPhone(value, dialCode) {
  const digits = (value ?? "").replace(/\D/g, "");
  return digits.length - (dialCode ?? "").length >= 6 || "Please enter a valid phone number.";
}

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

  // The Country dropdown and the phone input's flag follow each other, as on
  // the live form: picking a country sets the flag, and picking a flag that
  // is in the dropdown's list sets the country.
  const selectedIso =
    COUNTRIES.find((country) => country.name === watch("country"))?.iso2 || "us";

  function onPhoneChange(field, value, data) {
    field.onChange(value);
    setValue("dialCode", data?.dialCode ?? "");
    const match = COUNTRIES.find((country) => country.iso2 === data?.countryCode);
    if (match && match.name !== watch("country")) setValue("country", match.name);
  }

  async function onSubmit(values) {
    setSubmitError("");
    let result;
    try {
      result = await submitEnquiry({
        ...values,
        phone: values.phone ? `+${values.phone}` : "",
        page: window.location.pathname,
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
        {queryParam ? <input type="hidden" {...register("program")} /> : null}

        {/* Honeypot (TASTE.md §7.1): off-screen and out of the tab order, so
            only a bot fills it — the server then drops the submission. */}
        <input
          {...register("company_website")}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] size-px opacity-0"
        />

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

        <FormField label="Country" required error={errors.country?.message} className="sm:col-span-2">
          <select
            {...register("country", { required: "Please select your country." })}
            aria-invalid={Boolean(errors.country)}
            className={formInputClasses}
          >
            <option value="" disabled>
              Select your country
            </option>
            {/* Same list and order as the phone input's: preferred
                countries, a divider, then everything A–Z. */}
            {PREFERRED_COUNTRIES.map((iso2) => COUNTRIES.find((country) => country.iso2 === iso2)).map((country) => (
              <option key={`preferred-${country.iso2}`} value={country.name}>
                {country.name}
              </option>
            ))}
            <option disabled>──────────</option>
            {COUNTRIES.filter((country) => !PREFERRED_COUNTRIES.includes(country.iso2)).map((country) => (
              <option key={country.iso2} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Phone number" required error={errors.phone?.message} className="sm:col-span-2">
          <input type="hidden" {...register("dialCode")} />
          <Controller
            name="phone"
            control={control}
            rules={{ validate: (value) => validPhone(value, watch("dialCode")) }}
            render={({ field }) => (
              <PhoneInput
                country={selectedIso}
                preferredCountries={PREFERRED_COUNTRIES}
                // Territories (Bermuda, Gibraltar…) are hidden by default;
                // shown so the flag list matches the Country dropdown.
                enableTerritories
                value={field.value}
                onChange={(value, data) => onPhoneChange(field, value, data)}
                onBlur={field.onBlur}
                inputProps={{
                  name: field.name,
                  ref: field.ref,
                  autoComplete: "tel",
                  "aria-invalid": Boolean(errors.phone),
                }}
                containerClass={cn(
                  "!w-full !font-body",
                  // Flag button: no box of its own — a divider inside the
                  // field's border, with a light hover/open tint.
                  "[&_.flag-dropdown]:!rounded-l-xl [&_.flag-dropdown]:!border-transparent [&_.flag-dropdown]:!border-r-ink/12 [&_.flag-dropdown]:!bg-transparent",
                  "[&_.flag-dropdown.open]:!bg-transparent [&_.flag-dropdown.open_.selected-flag]:!bg-ink/5",
                  "[&_.selected-flag]:!w-14 [&_.selected-flag]:!rounded-l-xl [&_.selected-flag]:!pl-4 [&_.selected-flag:hover]:!bg-ink/5 [&_.selected-flag:focus]:!bg-ink/5",
                )}
                inputClass="!h-auto !w-full !rounded-xl !border-ink/15 !bg-paper !py-3 !pl-[4.25rem] !pr-3.5 !text-[13.5px] !leading-normal !text-ink focus:!border-navy focus:!bg-white"
                dropdownClass={cn(
                  "!mt-2 !w-[min(22rem,calc(100vw-5rem))] !max-h-64 !rounded-xl !border !border-ink/12 !bg-white !py-1.5 !text-[13.5px] !text-ink !shadow-[0_18px_40px_-20px_rgba(10,22,40,0.45)]",
                  "[&_.country]:!flex [&_.country]:!items-center [&_.country]:!gap-2.5 [&_.country]:!px-3.5 [&_.country]:!py-2.5",
                  "[&_.country_.flag]:!m-0 [&_.country_.flag]:!shrink-0 [&_.country-name]:!mr-0",
                  "[&_.country:hover]:!bg-paper [&_.country.highlight]:!bg-paper [&_.dial-code]:!text-ink/45 [&_.divider]:!mx-3 [&_.divider]:!border-ink/10",
                )}
              />
            )}
          />
        </FormField>

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
