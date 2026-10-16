"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { CtaButton } from "@/components/common/cta-button";
import { FormField, formInputClasses } from "@/components/common/form-field";
import { cn } from "@/lib/utils";
import { COUNTRY_DIAL_CODES, EMAIL_PATTERN, FREE_MAIL_DOMAINS } from "@/lib/constants";

const PHONE_PATTERN = /^[\d\s()+-]{6,20}$/;

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
 * - `audience="business"` — name, work email (personal mail domains are
 *   rejected), company, country + phone, partnership type, target segment,
 *   comments.
 * - `audience="individual"` — name, email (any domain), country + phone,
 *   partnership type, comments.
 *
 * Phone and comments are optional, as in the design; everything else and
 * the privacy consent are required. The country sets the phone's dial code.
 *
 * No submission backend yet: a valid submit goes straight to
 * `/thank-you/{thankYou}` (default `contact-us` — there is no partner
 * thank-you page yet).
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
  thankYou = "contact-us",
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { country: "United States" } });
  const router = useRouter();

  const business = audience === "business";
  const dialCode =
    COUNTRY_DIAL_CODES.find((country) => country.name === watch("country"))?.dialCode || "";

  function onSubmit() {
    router.push(`/thank-you/${thankYou}`);
  }

  return (
    <Box className="overflow-hidden rounded-[22px] border border-ink/12 bg-white shadow-[0_30px_70px_-50px_rgba(10,22,40,0.55)]">
      <Box
        as="form"
        noValidate
        aria-label={business ? "Partner application for businesses" : "Partner application for individuals"}
        onSubmit={handleSubmit(onSubmit)}
        className="px-6.5 py-8 min-[901px]:px-13 min-[901px]:py-11"
      >
        <Box className="grid grid-cols-1 gap-x-4.5 gap-y-5 min-[901px]:grid-cols-2">
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

          <FormField label={business ? "Work email" : "Email"} required error={errors.email?.message}>
            <input
              {...register("email", {
                required: "Please enter your email address.",
                pattern: { value: EMAIL_PATTERN, message: "That email does not look right." },
                validate: business
                  ? (value) =>
                      !FREE_MAIL_DOMAINS.has(value.split("@")[1]?.toLowerCase()) ||
                      "Please use your work email."
                  : undefined,
              })}
              type="email"
              autoComplete="email"
              placeholder={business ? "Enter your work email" : "Enter your email"}
              aria-invalid={Boolean(errors.email)}
              className={formInputClasses}
            />
          </FormField>

          {business ? (
            <FormField label="Company name" required error={errors.company?.message}>
              <input
                {...register("company", { required: "Please enter your company name." })}
                type="text"
                autoComplete="organization"
                placeholder="Enter company name"
                aria-invalid={Boolean(errors.company)}
                className={formInputClasses}
              />
            </FormField>
          ) : null}

          <FormField label="Country" required error={errors.country?.message}>
            <select
              {...register("country", { required: "Please select your country." })}
              autoComplete="country-name"
              aria-invalid={Boolean(errors.country)}
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
            <Box className="flex items-stretch overflow-hidden rounded-xl border border-ink/15 bg-paper focus-within:border-navy focus-within:bg-white">
              <Text
                as="span"
                className="flex items-center border-r border-ink/12 px-3 font-mono text-[12.5px] text-ink/60"
              >
                {dialCode || "—"}
              </Text>
              <input
                {...register("phone", {
                  pattern: { value: PHONE_PATTERN, message: "Please enter a valid phone number." },
                })}
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder="201-555-0123"
                aria-invalid={Boolean(errors.phone)}
                className="w-full min-w-0 bg-transparent p-3 text-[13.5px] text-ink outline-none placeholder:text-ink/35"
              />
            </Box>
          </FormField>

          <SelectField
            label="Partnership type"
            required
            error={errors.partnershipType?.message}
            placeholder="Select partnership type"
            options={partnershipTypes}
            registration={register("partnershipType", { required: "Please select a partnership type." })}
          />

          {business ? (
            <SelectField
              label="Target segment"
              required
              error={errors.targetSegment?.message}
              placeholder="Select target segment"
              options={targetSegments}
              registration={register("targetSegment", { required: "Please select a target segment." })}
            />
          ) : null}

          <FormField label="Comments" className="min-[901px]:col-span-2">
            <textarea
              {...register("comments")}
              rows={4}
              placeholder="Comments"
              className={cn(formInputClasses, "min-h-26 resize-y leading-[1.6]")}
            />
          </FormField>
        </Box>

        <Box className="relative mt-5 flex items-start gap-2.75">
          <input
            {...register("consent", { required: true })}
            type="checkbox"
            id={`${id}-consent`}
            aria-invalid={Boolean(errors.consent)}
            className="mt-0.75 size-3.5 flex-none accent-navy"
          />
          <Text as="label" htmlFor={`${id}-consent`} className="text-[12.5px] leading-normal text-ink/60">
            I agree that Edstellar may use my details to respond to my partner application, as described in the{" "}
            <a href="/privacy-policy" title="Click Here to View Privacy Policy" className="underline hover:text-ink">
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

        <Box className="mt-6.5 flex border-t border-ink/12 pt-6">
          <CtaButton type="submit" arrow disabled={isSubmitting} className="w-full min-[901px]:w-auto">
            {submitLabel}
          </CtaButton>
        </Box>
      </Box>
    </Box>
  );
}
