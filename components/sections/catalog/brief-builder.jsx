"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import CountryPhoneFields, { HoneypotField, phoneForSubmit } from "@/components/forms/country-phone-fields";
import { submitGlobalNavigation } from "@/lib/actions/submit-global-navigation";
import { EMAIL_PATTERN } from "@/lib/constants";
import { BRIEF } from "@/lib/nav-data";
import { cn } from "@/lib/utils";

/** The three sentence blanks, in order: "We need {service} for {who} in {where}." */
const SLOTS = ["service", "who", "where"];
const slotOf = (key) => BRIEF.slots.find((slot) => slot.k === key);
const optionLabel = (key, value) => slotOf(key).options.find((option) => option.v === value)?.label ?? "";

const LABEL = "mb-1.25 block font-mono text-[11px] leading-[1.4] tracking-[0.12em] text-paper/65 uppercase";
const INPUT =
  "w-full min-h-11 rounded-[10px] border border-paper/24 bg-paper/6 px-3.25 py-2.5 font-body text-[15px] leading-[1.4] text-paper outline-none placeholder:text-paper/50 focus:border-lime focus:shadow-[0_0_0_3px_rgba(200,241,53,0.2)] aria-invalid:border-[#FF8A80]";

function Chevron({ open }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={cn("size-3.5 flex-none self-center opacity-70 transition-transform duration-200", open && "rotate-180")}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function Tick({ show }) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" className={cn("size-3.5 flex-none", !show && "invisible")}>
      <path d="M5 12l5 5L20 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A field's error line, under it. */
function FieldError({ message }) {
  return message ? (
    <Text as="span" role="alert" className="mt-1.25 block text-[13px] text-[#FFB4AB]">
      {message}
    </Text>
  ) : null;
}

/**
 * "Build your brief" — the catalog's sticky navy card. The same composer as
 * the navigation's "Build your brief" (same sentence options from `BRIEF`,
 * same fields), sent to the same Zoho form, "GlobalNavigationForm", through
 * `submitGlobalNavigation`: name, work email, organization, phone (the
 * contact-us phone field without its country — this Zoho form has none —
 * required as Zoho requires it), the three choices
 * and the free text. On success the visitor lands on `/thank-you/{thankYou}`.
 *
 * Design: corporate-training-catalog 29 `.brief-rail`, `.bf`, `.bf-slot`,
 * `.bf-list`, `.bf-next`, `.bf-sent`.
 */
export default function BriefBuilder({ data, thankYou = "catalog-build-your-brief" }) {
  const router = useRouter();
  const [choice, setChoice] = useState({ service: "", who: "", where: "" });
  const [openSlot, setOpenSlot] = useState(null);
  const [active, setActive] = useState(0);
  const [alert, setAlert] = useState("");
  const listRef = useRef(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { name: "", email: "", company: "", requirements: "", phone: "", dialCode: "1" } });

  useEffect(() => {
    if (openSlot) listRef.current?.focus();
  }, [openSlot]);

  function toggle(key) {
    setOpenSlot((current) => (current === key ? null : key));
    const index = slotOf(key).options.findIndex((option) => option.v === choice[key]);
    setActive(Math.max(0, index));
  }

  function pick(key, value) {
    setChoice((current) => ({ ...current, [key]: value }));
    setOpenSlot(null);
    if (key === "service") clearErrors("requirements");
    document.getElementById(`brief-${key}`)?.focus();
  }

  function onListKey(event) {
    const options = slotOf(openSlot).options;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => Math.min(options.length - 1, index + 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => Math.max(0, index - 1));
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      pick(openSlot, options[active].v);
    } else if (event.key === "Escape") {
      event.preventDefault();
      const key = openSlot;
      setOpenSlot(null);
      document.getElementById(`brief-${key}`)?.focus();
    }
  }

  function startOver() {
    setChoice({ service: "", who: "", where: "" });
    setOpenSlot(null);
    setAlert("");
    reset();
  }

  async function onSubmit(values) {
    if (!choice.service && !values.requirements.trim()) {
      setError("requirements", { message: "Choose a service in the sentence above, or describe what you need." });
      setAlert("");
      return;
    }
    setAlert("");

    let result;
    try {
      result = await submitGlobalNavigation({
        name: values.name.trim(),
        email: values.email.trim(),
        company: values.company.trim(),
        phone: phoneForSubmit(values.phone),
        dialCode: values.dialCode,
        briefService: optionLabel("service", choice.service),
        briefWho: optionLabel("who", choice.who),
        briefWhere: optionLabel("where", choice.where),
        message: values.requirements.trim(),
        company_website: values.company_website ?? "",
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
      const fields = { message: "requirements" };
      for (const [field, message] of Object.entries(result.errors)) setError(fields[field] ?? field, { message });
      setAlert("");
      return;
    }
    setAlert(result?.error || "We could not send your brief. Please try again, or email us at contact@edstellar.com.");
  }

  // Each invalid field shows its own message underneath — no summary.
  const onInvalid = () => setAlert("");

  return (
    <Box
      as="section"
      id="brief"
      aria-labelledby="brief-h"
      className="rounded-[14px] bg-navy p-6 text-paper shadow-lift max-sm:px-4 max-sm:py-7.5 lg:sticky lg:top-24 lg:max-h-[calc(100vh-120px)] lg:overflow-auto lg:overscroll-contain"
    >
      <Text as="h2" id="brief-h" className="mb-3 font-mono text-[11px] leading-[1.4] tracking-[0.24em] text-paper/65 uppercase">
        {data.title}
      </Text>
      <Text as="p" className="-mt-1 mb-2.5 text-[14px] leading-[1.55] text-paper/72">
        {data.intro}
      </Text>

      {/* The sentence: each blank is a listbox button. */}
      <Text as="p" className="font-display text-[19px] leading-[1.9] font-bold tracking-[-0.02em] text-paper">
        We need{" "}
        {SLOTS.map((key, index) => {
          const slot = slotOf(key);
          const value = choice[key];
          const isOpen = openSlot === key;
          return (
            <span key={key}>
              <button
                type="button"
                id={`brief-${key}`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls={`brief-${key}-list`}
                onClick={() => toggle(key)}
                className={cn(
                  "my-px inline-flex min-h-9 max-w-full cursor-pointer items-baseline gap-1.5 rounded-full bg-navy-soft px-2.5 py-0.5 text-left leading-[1.35] font-bold tracking-[-0.02em] transition-shadow hover:shadow-[inset_0_0_0_1px_rgba(200,241,53,0.6)]",
                  value ? "text-lime shadow-[inset_0_0_0_1px_rgba(250,250,247,0.14)]" : "text-paper shadow-[inset_0_0_0_1px_rgba(250,250,247,0.35)]",
                  isOpen && "outline-2 outline-offset-2 outline-lime",
                )}
              >
                <span className="sr-only">{slot.label}: </span>
                <span>{optionLabel(key, value) || slot.ph}</span>
                <Chevron open={isOpen} />
              </button>
              {index === 0 ? " for " : index === 1 ? " in " : "."}
            </span>
          );
        })}
      </Text>

      {openSlot ? (
        <Box
          as="ul"
          ref={listRef}
          id={`brief-${openSlot}-list`}
          role="listbox"
          tabIndex={0}
          aria-label={slotOf(openSlot).label}
          aria-activedescendant={`brief-${openSlot}-o${active}`}
          onKeyDown={onListKey}
          className="mt-3 max-h-70 list-none overflow-auto overscroll-contain rounded-[14px] border border-ink/22 bg-white p-1.5 text-ink shadow-lift focus:outline-2 focus:outline-offset-2 focus:outline-lime"
        >
          {slotOf(openSlot).options.map((option, index) => {
            const selected = choice[openSlot] === option.v;
            return (
              <li
                key={option.v}
                id={`brief-${openSlot}-o${index}`}
                role="option"
                aria-selected={selected}
                onMouseMove={() => setActive(index)}
                onClick={() => pick(openSlot, option.v)}
                className={cn(
                  "flex min-h-10 cursor-pointer items-center justify-between gap-2 rounded-[10px] px-2.5 py-2 font-body text-[14px] leading-[1.35] text-ink",
                  index === active && "bg-paper-warm",
                  selected ? "font-bold" : "font-medium",
                )}
              >
                {option.label}
                <Tick show={selected} />
              </li>
            );
          })}
        </Box>
      ) : null}

      <Box as="form" noValidate onSubmit={handleSubmit(onSubmit, onInvalid)} className="relative">
        {alert ? (
          <Text as="p" role="alert" className="mt-4 rounded-[10px] border border-[#FF8A80]/45 bg-[#FF8A80]/8 px-3 py-2.5 text-[13px] leading-[1.5] text-[#FFB4AB]">
            {alert}
          </Text>
        ) : null}
        <HoneypotField register={register} />

        <Box className="mt-4.5">
          <label htmlFor="brief-needs" className={cn(LABEL, "mb-2 tracking-[0.14em]")}>
            Or describe what you need in your own words
          </label>
          <Text as="p" id="brief-needs-hint" className="-mt-0.5 mb-2 text-[13px] leading-[1.5] text-paper/60">
            Goals, audience, number of people, locations, timelines. Optional if you chose a service above.
          </Text>
          <textarea
            id="brief-needs"
            rows={4}
            maxLength={2000}
            aria-describedby="brief-needs-hint"
            aria-invalid={Boolean(errors.requirements)}
            {...register("requirements")}
            className={cn(INPUT, "block min-h-24 resize-y leading-[1.5]")}
          />
          <FieldError message={errors.requirements?.message} />
        </Box>

        <Box className="mt-5 grid gap-2.5 border-t border-paper/14 pt-5">
          <Box>
            <label htmlFor="brief-name" className={LABEL}>Full name</label>
            <input id="brief-name" type="text" autoComplete="name" aria-invalid={Boolean(errors.name)} {...register("name", { required: "Enter your full name." })} className={INPUT} />
            <FieldError message={errors.name?.message} />
          </Box>
          <Box>
            <label htmlFor="brief-email" className={LABEL}>Work email</label>
            <input
              id="brief-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              {...register("email", {
                required: "Enter your work email.",
                pattern: { value: EMAIL_PATTERN, message: "Enter an email address like name@company.com." },
              })}
              className={INPUT}
            />
            <FieldError message={errors.email?.message} />
          </Box>
          <Box>
            <label htmlFor="brief-company" className={LABEL}>Organization</label>
            <input id="brief-company" type="text" autoComplete="organization" aria-invalid={Boolean(errors.company)} {...register("company", { required: "Enter your organization's name." })} className={INPUT} />
            <FieldError message={errors.company?.message} />
          </Box>
          <CountryPhoneFields form={{ register, control, watch, setValue, errors }} phoneLabel="Phone" dark labelled country={false} />

          <Text as="p" className="mt-1.5 text-[13px] leading-[1.5] text-paper/55">
            Edstellar uses these details to reply to your brief. See the{" "}
            <a href="/privacy-policy" className="text-paper underline underline-offset-3">privacy policy</a>.
          </Text>
          <Box className="mt-1.5 flex flex-wrap items-center gap-3.5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="min-h-11 cursor-pointer rounded-full bg-paper px-5.5 py-2.5 font-body text-[14px] leading-none font-bold text-navy transition-shadow hover:shadow-[0_10px_24px_-12px_rgba(250,250,247,0.5)] disabled:cursor-progress disabled:opacity-70"
            >
              {isSubmitting ? "Sending…" : "Send your brief"}
            </button>
            <button type="button" onClick={startOver} className="min-h-10 cursor-pointer px-1 font-body text-[14px] leading-none font-semibold text-lime">
              Start over
            </button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
