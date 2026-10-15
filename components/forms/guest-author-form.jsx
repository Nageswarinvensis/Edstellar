"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { CtaButton } from "@/components/common/cta-button";
import { FormField, formInputClasses } from "@/components/common/form-field";
import { cn } from "@/lib/utils";
import { EMAIL_PATTERN } from "@/lib/constants";

/**
 * Guest-author pitch form on `/become-a-guest-author`: name, email, LinkedIn,
 * job title and the blog idea. No submission backend yet (same as
 * `LeadForm`): a valid submit shows the thank-you message and clears the form.
 *
 * `data`: `submit_label`, `note`, `thanks`.
 *
 * Design: become-a-guest-author `#author-form`, `.form-card`, `.field`.
 */
export default function GuestAuthorForm({ data }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [sent, setSent] = useState(false);

  function onSubmit() {
    setSent(true);
    reset();
  }

  return (
    <Box className="rounded-[14px] border border-ink/12 bg-white p-6 shadow-[0_6px_24px_rgba(10,22,40,0.08)] sm:p-12">
      {sent ? (
        <Text
          as="p"
          role="status"
          className="mb-6 rounded-xl border border-olive/40 bg-lime/15 px-4 py-3.5 text-[15px] leading-[1.6] text-ink"
        >
          {data.thanks}
        </Text>
      ) : null}

      <Text as="p" className="mb-8 font-mono text-[12px] leading-[1.5] tracking-[0.04em] text-ink/60 uppercase">
        Fields marked <Text as="span" className="text-red-600">*</Text> are required
      </Text>

      <Box as="form" noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
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

        <Box>
          <CtaButton type="submit" color="lime" block disabled={isSubmitting}>
            {data.submit_label}
          </CtaButton>
          {data.note ? (
            <Text as="p" className="mt-4 text-[13px] leading-[1.6] text-ink/60">
              {data.note}
            </Text>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}
