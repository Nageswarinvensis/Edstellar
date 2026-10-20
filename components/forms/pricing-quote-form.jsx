"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { CtaButton } from "@/components/common/cta-button";
import CountryPhoneFields, { HoneypotField, phoneForSubmit } from "@/components/forms/country-phone-fields";
import { cn } from "@/lib/utils";
import { EMAIL_PATTERN } from "@/lib/constants";
import { submitEnquiry } from "@/lib/actions/submit-enquiry";
import { PRICING_ENQUIRE_EVENT } from "@/components/sections/pricing/pricing-plans";

const inputClasses =
  "w-full min-w-0 rounded-xl border border-paper/12 bg-paper/5 px-3.5 py-3.25 font-body text-[14.5px] text-paper outline-none transition-colors placeholder:text-paper/50 focus:border-lime focus:bg-paper/8 aria-invalid:border-red-400";

/** A value still in its design placeholder form, e.g. "[X]", marked so it
 * cannot ship unnoticed. */
function WithPlaceholders({ text }) {
  return text.split(/(\[[^\]]+\])/).map((part, index) =>
    index % 2 ? (
      <Text
        as="span"
        key={index}
        className="rounded bg-lime/16 px-1 text-[length:inherit] font-semibold whitespace-nowrap text-lime outline-[1.5px] outline-offset-1 outline-lime outline-dashed"
      >
        {part}
      </Text>
    ) : (
      part
    ),
  );
}

function FieldError({ error }) {
  if (!error) return null;
  return (
    <Text as="span" role="alert" className="mt-1 block text-[12px] leading-[1.4] text-red-300">
      {error.message}
    </Text>
  );
}

/**
 * "Request a Training Quote" — the navy card beside the pricing FAQs (the
 * plans' "Enquire Now" target, `#quote`). Fields are labelled by their
 * placeholders visually and `aria-label` for assistive tech, as in the
 * design.
 *
 * A valid submit goes to Zoho Forms' "TrainingEnquiry" — the form the live
 * `/corporate-training-pricing` posts to, with the same fields — through the
 * `submitEnquiry` Server Action and the shared lead pipeline (`lib/leads/`).
 * On success the visitor lands on `/thank-you/{thankYou}` (default
 * `pricing`); a field the server rejects shows under that field, and a
 * failed delivery shows a message above the button. Country and phone are
 * the shared international phone input (`CountryPhoneFields`, `dark`).
 *
 * Arriving from a plan's "Enquire Now" (`PRICING_ENQUIRE_EVENT`) records the
 * package, as the live page's popup does: Zoho gets "{tab}: {plan} Package"
 * and the visitor lands on that package's own thank-you page instead.
 *
 * `data`: `id`, `label`, `heading`, `ask`, `ask_items`,
 * `requirements_placeholder`, `submit_label`.
 *
 * Design: corporate-training-pricing-v2 `.quote`, `.ask`.
 */
export default function PricingQuoteForm({ data, thankYou = "pricing" }) {
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
  // The package last asked about from the plan cards: `{ origin, thankYou }`.
  const [enquiry, setEnquiry] = useState(null);

  useEffect(() => {
    const onEnquire = (event) => setEnquiry(event.detail);
    window.addEventListener(PRICING_ENQUIRE_EVENT, onEnquire);
    return () => window.removeEventListener(PRICING_ENQUIRE_EVENT, onEnquire);
  }, []);

  async function onSubmit(values) {
    setSubmitError("");
    const thankYouSlug = enquiry?.thankYou ?? thankYou;
    let result;
    try {
      result = await submitEnquiry({
        ...values,
        phone: phoneForSubmit(values.phone),
        page: window.location.pathname,
        origin: enquiry?.origin,
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
        "We could not submit your enquiry. Please try again, or email us at contact@edstellar.com.",
    );
  }

  return (
    <Box
      as="aside"
      id={data.id}
      aria-label={data.heading}
      className="relative scroll-mt-24 overflow-hidden rounded-[22px] bg-navy px-7 py-8 max-sm:px-4 max-sm:py-7.5 text-paper before:absolute before:inset-x-0 before:top-0 before:h-0.75 before:bg-lime before:content-[''] min-[961px]:sticky min-[961px]:top-24"
    >
      <Text as="p" className="mb-2 font-mono text-[10px] leading-[1.5] tracking-[0.2em] text-lime uppercase">
        {data.label}
      </Text>
      <Text as="h3" className="mb-5.5 text-[24px] leading-[1.2] text-paper">
        {data.heading}
      </Text>

      {enquiry ? (
        <Text as="p" className="-mt-3 mb-5 text-[13px] leading-[1.5] text-paper/72">
          Enquiring about: <Text as="span" className="font-semibold text-lime">{enquiry.origin}</Text>
        </Text>
      ) : null}

      {data.ask ? (
        <Box className="-mt-2 mb-5 text-[14px] leading-[1.6] text-paper/72">
          <WithPlaceholders text={data.ask} />
          {data.ask_items?.length ? (
            <Box as="ul" className="mt-2.5 flex list-none flex-wrap gap-1.5">
              {data.ask_items.map((item) => (
                <Box
                  as="li"
                  key={item}
                  className="rounded-full border border-paper/12 px-2.5 py-1.25 font-mono text-[10px] leading-none tracking-[0.1em] text-paper uppercase"
                >
                  {item}
                </Box>
              ))}
            </Box>
          ) : null}
        </Box>
      ) : null}


      <Box as="form" noValidate onSubmit={handleSubmit(onSubmit)} className="relative grid gap-3">
        <HoneypotField register={register} />
        <Box>
          <input
            {...register("name", { required: "Please enter your name." })}
            type="text"
            autoComplete="name"
            placeholder="Enter your Name*"
            aria-label="Name"
            aria-invalid={Boolean(errors.name)}
            className={inputClasses}
          />
          <FieldError error={errors.name} />
        </Box>

        <Box>
          <input
            {...register("email", {
              required: "Please enter a valid work email address.",
              pattern: { value: EMAIL_PATTERN, message: "Please enter a valid work email address." },
            })}
            type="email"
            autoComplete="email"
            placeholder="Enter your Work Email*"
            aria-label="Work Email"
            aria-invalid={Boolean(errors.email)}
            className={inputClasses}
          />
          <FieldError error={errors.email} />
        </Box>

        <Box>
          <input
            {...register("company", { required: "Please enter your company name." })}
            type="text"
            autoComplete="organization"
            placeholder="Enter your Company Name*"
            aria-label="Company Name"
            aria-invalid={Boolean(errors.company)}
            className={inputClasses}
          />
          <FieldError error={errors.company} />
        </Box>

        <Box>
          <input
            {...register("jobTitle", { required: "Please enter your job title." })}
            type="text"
            autoComplete="organization-title"
            placeholder="Enter your Job Title*"
            aria-label="Job Title"
            aria-invalid={Boolean(errors.jobTitle)}
            className={inputClasses}
          />
          <FieldError error={errors.jobTitle} />
        </Box>

        <CountryPhoneFields form={{ register, control, watch, setValue, errors }} dark />

        <textarea
          {...register("requirements")}
          placeholder={data.requirements_placeholder}
          aria-label="Training requirements"
          className={cn(inputClasses, "min-h-24 resize-y")}
        />

        {submitError ? (
          <Text as="p" role="alert" className="text-[12.5px] leading-[1.5] text-red-300">
            {submitError}
          </Text>
        ) : null}

        <CtaButton type="submit" color="lime" block arrow disabled={isSubmitting} className="mt-1.5">
          {isSubmitting ? "Submitting…" : data.submit_label}
        </CtaButton>
      </Box>
    </Box>
  );
}
