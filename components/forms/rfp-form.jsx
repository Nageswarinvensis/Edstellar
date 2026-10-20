"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Check, ChevronDown, FileText, X } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import RichHeading from "@/components/common/rich-heading";
import { CtaButton } from "@/components/common/cta-button";
import { COUNTRY_DIAL_CODES, EMAIL_PATTERN, FREE_MAIL_DOMAINS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const PHONE_PATTERN = /^[\d\s()+-]{6,20}$/;
const ACCEPT = [".pdf", ".docx", ".xlsx"];
const INPUT =
  "w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-[15px] text-ink outline-none placeholder:text-ink/40 focus:border-navy aria-[invalid=true]:border-red-500";

const pad = (n) => String(n).padStart(2, "0");

function Field({ id, label, optional, hint, error, className, children }) {
  return (
    <Box className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-[14.5px] font-semibold text-ink">
        {label} {optional ? <Text as="span" className="text-[14px] font-normal text-ink-muted">(optional)</Text> : null}
      </label>
      {children}
      {error ? (
        <Text as="span" role="alert" className="text-[12.5px] text-red-600">
          {error}
        </Text>
      ) : hint ? (
        <Text as="span" className="text-[12.5px] text-ink-muted">
          {hint}
        </Text>
      ) : null}
    </Box>
  );
}

function Select({ id, registration, placeholder, options, invalid }) {
  return (
    <Box className="relative">
      <select id={id} {...registration} defaultValue="" aria-invalid={invalid} className={cn(INPUT, "cursor-pointer appearance-none pr-10")}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown size={16} aria-hidden="true" className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink" />
    </Box>
  );
}

/** A checkbox or radio styled as a pill; checked pills fill navy. */
function Pill({ type, registration, value, label }) {
  return (
    <label className="cursor-pointer">
      <input type={type} value={value} {...registration} className="peer sr-only" />
      <Text
        as="span"
        className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 bg-white px-4 py-2 text-[14.5px] text-ink transition-colors peer-checked:border-navy peer-checked:bg-navy peer-checked:text-lime peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-navy"
      >
        {label}
      </Text>
    </label>
  );
}

function Part({ number, title, children }) {
  return (
    <Box as="fieldset" className="m-0 border-0 border-b border-ink/12 p-0 pb-9 not-first:pt-9 last:border-b-0">
      <legend className="sr-only">{title}</legend>
      <Text as="p" aria-hidden="true" className="mb-6 flex items-baseline gap-3 font-display text-[21px] font-semibold text-ink">
        <Text as="span" className="font-mono text-[11px] text-ink-muted">
          {pad(number)}
        </Text>
        {title}
      </Text>
      {children}
    </Box>
  );
}

/**
 * "Send Edstellar your RFP." — a four-part form (about you, about your RFP,
 * files and links, before you send) beside the "After you submit" panel.
 * Documents can be dropped or browsed: PDF, DOCX or XLSX, up to
 * `files.max_files` files and `files.max_mb` MB in total, checked here.
 * Like the site's other forms there is no endpoint yet; a valid submit goes
 * to the thank-you page.
 * Design: request-for-proposal `#submit`, `.f2-form`.
 */
export default function RfpForm({ data, thankYou = "consulting" }) {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState("");
  const [dragging, setDragging] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  function addFiles(list) {
    const incoming = [...list];
    const bad = incoming.find((file) => !ACCEPT.some((ext) => file.name.toLowerCase().endsWith(ext)));
    if (bad) return setFileError(`${bad.name} is not a PDF, DOCX or XLSX file.`);
    const next = [...files, ...incoming].slice(0, data.files.max_files);
    const size = next.reduce((sum, file) => sum + file.size, 0);
    if (files.length + incoming.length > data.files.max_files) return setFileError(`Up to ${data.files.max_files} files.`);
    if (size > data.files.max_mb * 1024 * 1024) return setFileError(`Files must total ${data.files.max_mb}MB or less.`);
    setFileError("");
    setFiles(next);
  }

  const onSubmit = () => router.push(`/thank-you/${thankYou}`);
  const required = (message) => ({ required: message });

  return (
    <Box className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.65fr_1fr]">
      <Box as="form" noValidate onSubmit={handleSubmit(onSubmit)} className="rounded-[20px] border border-ink/12 bg-white px-4 py-7.5 shadow-[0_30px_70px_-50px_rgba(10,22,40,0.55)] sm:p-10">
        <Part number={1} title="About you">
          <Box className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field id="rfp-name" label="Full name" error={errors.name?.message}>
              <input id="rfp-name" {...register("name", required("Please enter your name."))} autoComplete="name" placeholder="Your name" aria-invalid={Boolean(errors.name)} className={INPUT} />
            </Field>
            <Field id="rfp-email" label="Work email" error={errors.email?.message}>
              <input
                id="rfp-email"
                type="email"
                {...register("email", {
                  required: "Please enter your work email.",
                  pattern: { value: EMAIL_PATTERN, message: "Please enter a valid email address." },
                  validate: (value) => !FREE_MAIL_DOMAINS.has(value.split("@")[1]?.toLowerCase()) || "Please use your work email address.",
                })}
                autoComplete="email"
                placeholder="name@company.com"
                aria-invalid={Boolean(errors.email)}
                className={INPUT}
              />
            </Field>
            <Field id="rfp-company" label="Company" error={errors.company?.message}>
              <input id="rfp-company" {...register("company", required("Please enter your company."))} autoComplete="organization" placeholder="Company name" aria-invalid={Boolean(errors.company)} className={INPUT} />
            </Field>
            <Field id="rfp-title" label="Job title" error={errors.job_title?.message}>
              <input id="rfp-title" {...register("job_title", required("Please enter your job title."))} autoComplete="organization-title" placeholder="Your role" aria-invalid={Boolean(errors.job_title)} className={INPUT} />
            </Field>
            <Field id="rfp-country" label="Country" error={errors.country?.message}>
              <Select id="rfp-country" registration={register("country", required("Please select your country."))} placeholder="Select country" options={COUNTRY_DIAL_CODES.map((c) => c.name)} invalid={Boolean(errors.country)} />
            </Field>
            <Field id="rfp-phone" label="Phone" hint="Include the country code" error={errors.phone?.message}>
              <input
                id="rfp-phone"
                type="tel"
                {...register("phone", { required: "Please enter your phone number.", pattern: { value: PHONE_PATTERN, message: "Please enter a valid phone number." } })}
                autoComplete="tel"
                placeholder="+65 6123 4567"
                aria-invalid={Boolean(errors.phone)}
                className={INPUT}
              />
            </Field>
            <Field id="rfp-org" label="Organization type" optional className="sm:col-span-2">
              <Select id="rfp-org" registration={register("org_type")} placeholder="Select type" options={data.org_types} />
            </Field>
          </Box>
        </Part>

        <Part number={2} title="About your RFP">
          <Box className="flex flex-col gap-6">
            <Box role="radiogroup" aria-label="Document type">
              <Text as="p" className="mb-2.5 text-[14.5px] font-semibold text-ink">
                Document type
              </Text>
              <Box className="flex flex-wrap gap-2">
                {data.doc_types.map((type) => (
                  <Pill key={type} type="radio" value={type} label={type} registration={register("doc_type", required("Please choose the document type."))} />
                ))}
              </Box>
              {errors.doc_type ? (
                <Text as="p" role="alert" className="mt-2 text-[12.5px] text-red-600">
                  {errors.doc_type.message}
                </Text>
              ) : null}
            </Box>
            <Box className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field id="rfp-deadline" label="Submission deadline" hint="The date your RFP closes" error={errors.deadline?.message}>
                <input id="rfp-deadline" type="date" {...register("deadline", required("Please enter the submission deadline."))} aria-invalid={Boolean(errors.deadline)} className={INPUT} />
              </Field>
              <Field id="rfp-headcount" label="Approximate headcount" error={errors.headcount?.message}>
                <Select id="rfp-headcount" registration={register("headcount", required("Please select a range."))} placeholder="Select a range" options={data.headcounts} invalid={Boolean(errors.headcount)} />
              </Field>
            </Box>
            <Box role="group" aria-label="Services in scope">
              <Text as="p" className="mb-2.5 text-[14.5px] font-semibold text-ink">
                Services in scope <Text as="span" className="text-[14px] font-normal text-ink-muted">(choose all that apply)</Text>
              </Text>
              <Box className="flex flex-wrap gap-2">
                {data.services.map((service) => (
                  <Pill key={service} type="checkbox" value={service} label={service} registration={register("services", { validate: (value) => (Array.isArray(value) ? value.length : value) ? true : "Please choose at least one service." })} />
                ))}
              </Box>
              {errors.services ? (
                <Text as="p" role="alert" className="mt-2 text-[12.5px] text-red-600">
                  {errors.services.message}
                </Text>
              ) : null}
            </Box>
            <Field id="rfp-countries" label="Delivery countries" error={errors.delivery_countries?.message}>
              <input id="rfp-countries" {...register("delivery_countries", required("Please list the delivery countries."))} placeholder="Every country where training will run" aria-invalid={Boolean(errors.delivery_countries)} className={INPUT} />
            </Field>
          </Box>
        </Part>

        <Part number={3} title="Files and links">
          <Box
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              addFiles(event.dataTransfer.files);
            }}
            className={cn("flex flex-wrap items-center gap-4 rounded-[14px] border border-dashed px-6 py-5", dragging ? "border-navy bg-lime-soft/40" : "border-ink/25 bg-paper")}
          >
            <Box as="span" className="grid size-12 flex-none place-items-center rounded-full border border-ink/15 bg-white text-ink">
              <FileText size={19} aria-hidden="true" />
            </Box>
            <Box className="min-w-0 flex-1">
              <Text as="p" className="font-display text-[16px] font-semibold text-ink">
                {data.files.title}
              </Text>
              <Text as="p" className="text-[13.5px] text-ink-muted">
                {data.files.hint}
              </Text>
            </Box>
            <label htmlFor="rfp-files" className="cursor-pointer rounded-full border border-ink px-5 py-2.5 font-display text-[14.5px] font-semibold text-ink hover:bg-ink hover:text-paper">
              {data.files.button}
            </label>
            <input
              id="rfp-files"
              type="file"
              multiple
              accept={ACCEPT.join(",")}
              onChange={(event) => {
                addFiles(event.target.files);
                event.target.value = "";
              }}
              className="sr-only"
            />
          </Box>
          {fileError ? (
            <Text as="p" role="alert" className="mt-2 text-[12.5px] text-red-600">
              {fileError}
            </Text>
          ) : null}
          {files.length ? (
            <Box as="ul" className="m-0 mt-3 flex list-none flex-col gap-2 p-0">
              {files.map((file) => (
                <li key={file.name + file.size} className="flex items-center justify-between gap-3 rounded-lg bg-paper px-4 py-2.5 text-[14px] text-ink">
                  <Text as="span" className="truncate text-[14px] text-ink">
                    {file.name}
                  </Text>
                  <button
                    type="button"
                    aria-label={`Remove ${file.name}`}
                    onClick={() => setFiles((current) => current.filter((item) => item !== file))}
                    className="grid size-7 flex-none cursor-pointer place-items-center rounded-full hover:bg-ink/8"
                  >
                    <X size={15} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </Box>
          ) : null}
          <Field id="rfp-portal" label="Portal or tender link" optional className="mt-5">
            <input id="rfp-portal" type="url" {...register("portal_link")} placeholder="https://" className={INPUT} />
          </Field>
        </Part>

        <Part number={4} title="Before you send">
          <Field id="rfp-msg" label="Anything else Edstellar should know" optional>
            <textarea id="rfp-msg" rows={4} {...register("message")} placeholder="Evaluation criteria, documents you need, key dates" className={cn(INPUT, "resize-y")} />
          </Field>
          <Box className="mt-5 flex flex-col gap-3 text-[14.5px] text-ink">
            <label className="flex items-start gap-3">
              <input type="checkbox" {...register("nda_required")} className="mt-0.5 size-4.5 flex-none accent-navy" />
              An NDA is required before we share full details
            </label>
            <label className="flex items-start gap-3">
              <input type="checkbox" {...register("privacy_consent", { required: true })} aria-invalid={Boolean(errors.privacy_consent)} className="mt-0.5 size-4.5 flex-none accent-navy" />
              <Text as="span" className={cn("text-[14.5px]", errors.privacy_consent ? "text-red-600" : "text-ink")}>
                I agree to Edstellar&apos;s{" "}
                <a href="/privacy-policy" target="_blank" rel="noopener" className="underline">
                  privacy notice
                </a>
                . <Text as="span" className="text-[14px] text-ink-muted">(required)</Text>
              </Text>
            </label>
            <label className="flex items-start gap-3">
              <input type="checkbox" {...register("marketing_consent")} className="mt-0.5 size-4.5 flex-none accent-navy" />
              Send me occasional updates on Edstellar programs
            </label>
          </Box>
          <Box className="mt-7 flex flex-wrap items-center gap-4">
            <CtaButton type="submit" arrow disabled={isSubmitting}>
              {data.submit_label}
            </CtaButton>
            <Text as="p" className="text-[13.5px] text-ink-muted">
              {data.submit_note}
            </Text>
          </Box>
        </Part>
      </Box>

      <Box as="aside" aria-labelledby="rfp-after-h" className="rounded-[20px] bg-navy p-8 text-paper lg:sticky lg:top-24">
        <Text as="p" className="mb-2 font-mono text-[11px] tracking-[0.16em] text-lime uppercase">
          {data.after.kicker}
        </Text>
        <RichHeading as="h3" id="rfp-after-h" heading={data.after.heading} className="mb-6 text-paper" emphasisClassName="text-lime" />
        <Box as="ol" className="m-0 list-none p-0">
          {data.after.steps.map((step, index) => (
            <li key={step.title} className="relative flex gap-4 pb-6 last:pb-0">
              {index < data.after.steps.length - 1 ? <Box aria-hidden="true" className="absolute top-10 bottom-0 left-5 w-px bg-paper/20" /> : null}
              <Text
                as="span"
                className={cn(
                  "relative grid size-10 flex-none place-items-center rounded-full border font-display text-[15px] font-semibold",
                  index === data.after.steps.length - 1 ? "border-lime bg-lime text-navy" : "border-paper/30 text-paper",
                )}
              >
                {index + 1}
              </Text>
              <Box className="pt-1.5">
                <Text as="span" className="block font-display text-[16px] font-semibold text-paper">
                  {step.title}
                </Text>
                <Text as="span" className="mt-0.5 block text-[13.5px] text-paper/65">
                  {step.text}
                </Text>
              </Box>
            </li>
          ))}
        </Box>
        <Box as="ul" className="m-0 mt-6 flex list-none flex-col gap-2.5 border-t border-paper/15 p-0 pt-6">
          {data.after.points.map((point) => (
            <li key={point} className="flex items-center gap-2.5 text-[14px] text-paper/85">
              <Check size={15} aria-hidden="true" className="flex-none text-lime" />
              {point}
            </li>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
