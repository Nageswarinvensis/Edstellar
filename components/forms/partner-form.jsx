"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { CtaButton } from "@/components/common/cta-button";
import { FormField, formInputClasses } from "@/components/common/form-field";
import CountryPhoneFields, { HoneypotField, phoneForSubmit } from "@/components/forms/country-phone-fields";
import { cn } from "@/lib/utils";
import { EMAIL_PATTERN } from "@/lib/constants";
import { submitPartnership } from "@/lib/actions/submit-partnership";

/** A labelled `<select>` with a blank first option as its prompt. */
function SelectField({ label, required, error, placeholder, options, registration }) {
  return (
    <FormField label={label} required={required} error={error}>
      <select {...registration} aria-invalid={Boolean(error)} className={formInputClasses}>
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
 * The Partner Program application form, in two variants:
 *
 * - `audience="business"` — name, email, company, country + phone,
 *   partnership type, target segment, comments.
 * - `audience="individual"` — name, email, country + phone, partnership
 *   type, comments.
 *
 * Fields, placeholders and error messages are the live `/partner-program`
 * form's: any email domain is accepted, comments are optional, everything
 * else is required, and there is no consent checkbox. Country and phone are
 * the shared international phone input (`CountryPhoneFields`), synced both
 * ways.
 *
 * A valid submit goes to Zoho Forms' "PartnershipForm" — the same form, with
 * the same fields and option values, as the live `/partner-program` — through
 * the `submitPartnership` Server Action and the shared lead pipeline
 * (`lib/leads/`). On success the visitor lands on `/thank-you/{thankYou}`; a
 * field the server rejects shows under that field, and a failed delivery
 * shows a message above the button instead of a false thank-you.
 *
 * Design: partner-program.html `[data-cmp="contact-form"]` `.lead`,
 * `.lead-body`, `.pform`, `.fgrid`, `.f`, `.tel`, `.lead-foot`.
 */
export default function PartnerForm({
  audience = "business",
  partnershipTypes = [],
  targetSegments = [],
  submitLabel = "Submit",
  id = "partner-form",
  thankYou,
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

  const business = audience === "business";
  // Each tab has its own thank-you page, as on the live site.
  const thankYouSlug = thankYou ?? (business ? "partnership-groups" : "partnership-individuals");

  async function onSubmit(values) {
    setSubmitError("");
    let result;
    try {
      result = await submitPartnership({
        ...values,
        phone: phoneForSubmit(values.phone),
        audience,
        page: window.location.pathname,
        thankYou: thankYouSlug,
      });
    } catch {
      result = null;
    }

    if (result?.ok) {
      router.push(`/thank-you/${thankYouSlug}`);
      return;
    }
    if (result?.errors) {
      for (const [field, message] of Object.entries(result.errors)) setError(field, { message });
      return;
    }
    setSubmitError(
      result?.error ||
        "We could not submit your application. Please try again, or email us at contact@edstellar.com.",
    );
  }

  return (
    <Box className="overflow-hidden rounded-[22px] border border-ink/12 bg-white shadow-[0_30px_70px_-50px_rgba(10,22,40,0.55)]">
      <Box
        as="form"
        aria-label="Partner program application"
        id={id}
        noValidate
        aria-label={business ? "Partner application for businesses" : "Partner application for individuals"}
        onSubmit={handleSubmit(onSubmit)}
        className="px-6.5 py-8 max-sm:px-4 max-sm:py-7.5 min-[901px]:px-13 min-[901px]:py-11"
      >
        <HoneypotField register={register} />
        <Box className="grid grid-cols-1 gap-x-4.5 gap-y-5 min-[901px]:grid-cols-2">
          <FormField label="Full Name" required error={errors.name?.message}>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              autoComplete="name"
              placeholder="Enter Your Full Name"
              aria-invalid={Boolean(errors.name)}
              className={formInputClasses}
            />
          </FormField>

          <FormField label="Email" required error={errors.email?.message}>
            <input
              {...register("email", {
                required: "Email address is required",
                pattern: { value: EMAIL_PATTERN, message: "Email address is invalid" },
              })}
              type="email"
              autoComplete="email"
              placeholder="Enter Your Full Email"
              aria-invalid={Boolean(errors.email)}
              className={formInputClasses}
            />
          </FormField>

          {business ? (
            <FormField label="Company Name" required error={errors.company?.message}>
              <input
                {...register("company", { required: "Company name is required" })}
                type="text"
                autoComplete="organization"
                placeholder="Enter Company Name"
                aria-invalid={Boolean(errors.company)}
                className={formInputClasses}
              />
            </FormField>
          ) : null}

          <CountryPhoneFields form={{ register, control, watch, setValue, errors }} phoneLabel="Phone Number" />

          <SelectField
            label="Partnership Type"
            required
            error={errors.partnershipType?.message}
            placeholder="Partnership Type"
            options={partnershipTypes}
            registration={register("partnershipType", { required: "Select a Partnership from the dropdown" })}
          />

          {business ? (
            <SelectField
              label="Target Segment"
              required
              error={errors.targetSegment?.message}
              placeholder="Target Segment"
              options={targetSegments}
              registration={register("targetSegment", { required: "Select a Target from the dropdown" })}
            />
          ) : null}

          <FormField label="Comments" error={errors.comments?.message} className="min-[901px]:col-span-2">
            <textarea
              {...register("comments")}
              rows={4}
              placeholder="Comments"
              className={cn(formInputClasses, "min-h-26 resize-y leading-[1.6]")}
            />
          </FormField>
        </Box>

        {submitError ? (
          <Text as="p" role="alert" className="mt-5 text-[13.5px] leading-[1.5] text-destructive">
            {submitError}
          </Text>
        ) : null}

        <Box className="mt-6.5 flex justify-end border-t border-ink/12 pt-6">
          <CtaButton type="submit" arrow disabled={isSubmitting} className="w-full min-[901px]:w-auto">
            {isSubmitting ? "Submitting…" : submitLabel}
          </CtaButton>
        </Box>
      </Box>
    </Box>
  );
}
