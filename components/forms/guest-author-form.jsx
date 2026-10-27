"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { CtaButton } from "@/components/common/cta-button";
import { FormField, formInputClasses } from "@/components/common/form-field";
import { HoneypotField } from "@/components/forms/country-phone-fields";
import { submitGuestAuthor } from "@/lib/actions/submit-guest-author";
import { cn } from "@/lib/utils";
import { EMAIL_PATTERN } from "@/lib/constants";

/**
 * Guest-author pitch form on `/become-a-guest-author`: name, email, LinkedIn,
 * job title and the blog idea, sent to Zoho "BecomeAGuestAuthor" through the
 * `submitGuestAuthor` Server Action and the shared lead pipeline
 * (`lib/leads/`); the idea is Zoho's Message. On success the visitor lands on
 * `/thank-you/{thankYou}` (default `become-a-guest-author`); a field the server rejects shows
 * under that field, and a failed delivery shows a message above the button.
 *
 * `data`: `submit_label`, `note`.
 *
 * Design: become-a-guest-author `#author-form`, `.form-card`, `.field`.
 */
export default function GuestAuthorForm({ data, thankYou = "become-a-guest-author" }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");

  async function onSubmit(values) {
    setSubmitError("");
    let result;
    try {
      result = await submitGuestAuthor({
        ...values,
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
        "We could not submit your pitch. Please try again, or email us at contact@edstellar.com.",
    );
  }

  return (
    <Box className="rounded-[14px] border border-ink/12 bg-white px-4 py-7.5 shadow-[0_6px_24px_rgba(10,22,40,0.08)] sm:p-12">

      <Text as="p" className="mb-8 font-mono text-[12px] leading-[1.5] tracking-[0.04em] text-ink-muted uppercase">
        Fields marked <Text as="span" className="text-red-600">*</Text> are required
      </Text>

      <Box as="form" aria-label="Guest author pitch" noValidate onSubmit={handleSubmit(onSubmit)} className="relative flex flex-col gap-6">
        <HoneypotField register={register} />

        <FormField label="Full name" required error={errors.name?.message}>
          <input
            {...register("name", { required: "Please enter your full name." })}
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            className={formInputClasses}
          />
        </FormField>

        <FormField label="Email" required error={errors.email?.message}>
          <input
            {...register("email", {
              required: "Please enter a valid email address.",
              pattern: { value: EMAIL_PATTERN, message: "Please enter a valid email address." },
            })}
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            className={formInputClasses}
          />
        </FormField>

        <FormField label="LinkedIn profile" required error={errors.linkedin?.message}>
          <input
            {...register("linkedin", { required: "Please enter your LinkedIn profile URL." })}
            type="url"
            autoComplete="url"
            placeholder="https://www.linkedin.com/in/..."
            aria-invalid={Boolean(errors.linkedin)}
            className={formInputClasses}
          />
        </FormField>

        <FormField label="Job title" required error={errors.jobTitle?.message}>
          <input
            {...register("jobTitle", { required: "Please enter your job title." })}
            type="text"
            autoComplete="organization-title"
            aria-invalid={Boolean(errors.jobTitle)}
            className={formInputClasses}
          />
        </FormField>

        <FormField label="Your blog post idea" required error={errors.idea?.message}>
          <textarea
            {...register("idea", { required: "Please share your blog post idea." })}
            rows={5}
            placeholder="In 200 words or less, tell us your idea and blog title, with an outline or key points you plan to cover."
            aria-invalid={Boolean(errors.idea)}
            className={cn(formInputClasses, "resize-y")}
          />
        </FormField>

        {submitError ? (
          <Text as="p" role="alert" className="text-[13.5px] leading-normal text-red-600">
            {submitError}
          </Text>
        ) : null}

        <Box>
          <CtaButton type="submit" color="lime" block disabled={isSubmitting}>
            {isSubmitting ? "Submitting…" : data.submit_label}
          </CtaButton>
          {data.note ? (
            <Text as="p" className="mt-4 text-[13px] leading-[1.6] text-ink-muted">
              {data.note}
            </Text>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}
