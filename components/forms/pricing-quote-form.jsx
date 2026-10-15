"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { CtaButton } from "@/components/common/cta-button";
import { cn } from "@/lib/utils";
import { COUNTRY_DIAL_CODES, EMAIL_PATTERN } from "@/lib/constants";

const PHONE_PATTERN = /^[\d\s()+-]{6,20}$/;

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
 * There is no submission backend yet: a valid submit goes straight to
 * `/thank-you/{thankYou}` (default `pricing`).
 *
 * `data`: `id`, `label`, `heading`, `ask`, `ask_items`,
 * `requirements_placeholder`, `submit_label`.
 *
 * Design: corporate-training-pricing-v2 `.quote`, `.ask`.
 */
export default function PricingQuoteForm({ data, thankYou = "pricing" }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { country: "United States" } });
  const router = useRouter();

  const dialCode =
    COUNTRY_DIAL_CODES.find((country) => country.name === watch("country"))?.dialCode || "+1";

  function onSubmit() {
    router.push(`/thank-you/${thankYou}`);
  }

  return (
    <Box
      as="aside"
      id={data.id}
      aria-label={data.heading}
      className="relative scroll-mt-24 overflow-hidden rounded-[22px] bg-navy px-7 py-8 text-paper before:absolute before:inset-x-0 before:top-0 before:h-0.75 before:bg-lime before:content-[''] min-[961px]:sticky min-[961px]:top-24"
    >
      <Text as="p" className="mb-2 font-mono text-[10px] leading-[1.5] tracking-[0.2em] text-lime uppercase">
        {data.label}
      </Text>
      <Text as="h3" className="mb-5.5 text-[24px] leading-[1.2] text-paper">
        {data.heading}
      </Text>

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


      <Box as="form" noValidate onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
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

        <Box>
          <select
            {...register("country", { required: "Please select your country." })}
            aria-label="Country"
            aria-invalid={Boolean(errors.country)}
            className={cn(
              inputClasses,
              "appearance-none bg-[linear-gradient(45deg,transparent_50%,var(--color-lime)_50%),linear-gradient(135deg,var(--color-lime)_50%,transparent_50%)] bg-[length:5px_5px] bg-[position:calc(100%-18px)_55%,calc(100%-13px)_55%] bg-no-repeat pr-9 [&_option]:text-ink",
            )}
          >
            <option value="" disabled>
              Select Country*
            </option>
            {COUNTRY_DIAL_CODES.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          <FieldError error={errors.country} />
        </Box>

        <Box>
          <Box className="grid grid-cols-[96px_1fr] gap-2">
            <Text
              as="span"
              aria-label="Country code"
              className="flex items-center rounded-xl border border-paper/12 bg-paper/5 px-3.5 font-body text-[14.5px] leading-none text-paper"
            >
              {dialCode}
            </Text>
            <input
              {...register("phone", {
                pattern: { value: PHONE_PATTERN, message: "Please enter a valid phone number." },
              })}
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="201-555-0123"
              aria-label="Phone number"
              aria-invalid={Boolean(errors.phone)}
              className={inputClasses}
            />
          </Box>
          <FieldError error={errors.phone} />
        </Box>

        <textarea
          {...register("requirements")}
          placeholder={data.requirements_placeholder}
          aria-label="Training requirements"
          className={cn(inputClasses, "min-h-24 resize-y")}
        />

        <CtaButton type="submit" color="lime" block arrow disabled={isSubmitting} className="mt-1.5">
          {data.submit_label}
        </CtaButton>
      </Box>
    </Box>
  );
}
