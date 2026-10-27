"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import CountryPhoneFields, { phoneForSubmit } from "@/components/forms/country-phone-fields";
import { submitGlobalNavigation } from "@/lib/actions/submit-global-navigation";
import { BRIEF } from "@/lib/nav-data";
import { cn } from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function Chevron({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const labelFor = (slot, value) =>
  slot.options.find((o) => o.v === value)?.label || slot.ph;

/* One inline sentence slot — a listbox styled as a highlighted word. */
function Slot({ slot, value, open, onToggle, onPick, onClose, idPrefix }) {
  const ref = useRef(null);
  const menuRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (ev) => {
      if (ref.current && !ref.current.contains(ev.target)) onClose();
    };
    document.addEventListener("pointerdown", onDoc);
    if (menuRef.current) menuRef.current.focus();
    return () => document.removeEventListener("pointerdown", onDoc);
  }, [open, onClose]);

  const onKey = (ev) => {
    if (ev.key === "ArrowDown") {
      ev.preventDefault();
      setActive((i) => Math.min(slot.options.length - 1, i + 1));
    } else if (ev.key === "ArrowUp") {
      ev.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      onPick(slot.k, slot.options[active].v);
    } else if (ev.key === "Escape") {
      ev.preventDefault();
      onClose();
    }
  };

  const empty = !value;

  return (
    <span ref={ref} className="relative inline-block align-baseline">
      <Box
        as="button"
        type="button"
        id={`${idPrefix}-${slot.k}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => onToggle(slot.k)}
        onKeyDown={(ev) => {
          if (!open && (ev.key === "ArrowDown" || ev.key === "ArrowUp")) {
            ev.preventDefault();
            onToggle(slot.k);
          }
        }}
        className="group/slot inline-flex cursor-pointer items-center gap-1.5 rounded-t-lg rounded-b border-b-2 border-navy bg-lime-soft px-2.5 py-0.5 leading-snug text-navy transition-shadow duration-200 hover:shadow-[0_1px_2px_rgba(10,22,40,0.07),0_4px_12px_rgba(10,22,40,0.07)]"
      >
        <span className="sr-only">{slot.label}: </span>
        <span className={empty ? "text-ink-muted" : undefined}>{labelFor(slot, value)}</span>
        <Chevron open={open} />
      </Box>
      {open && (
        <ul
          role="listbox"
          aria-label={slot.label}
          tabIndex={-1}
          onKeyDown={onKey}
          ref={menuRef}
          className="absolute left-0 top-[calc(100%+6px)] z-30 max-h-80 min-w-60 max-w-[calc(100vw-32px)] list-none overflow-y-auto rounded-[14px] border border-ink/12 bg-white p-1.5 font-body shadow-[0_12px_32px_rgba(10,22,40,0.10)] outline-none"
        >
          {slot.options.map((o, i) => {
            const selected = o.v === value;
            return (
              <li
                key={o.v}
                role="option"
                aria-selected={selected}
                onMouseMove={() => setActive(i)}
                onClick={() => onPick(slot.k, o.v)}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-md px-2.5 py-2 text-[14px] leading-snug text-navy ${
                  i === active ? "bg-paper-warm" : ""
                } ${selected ? "font-semibold" : "font-normal"}`}
              >
                {o.label}
                {selected && (
                  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" className="size-3.5 flex-none">
                    <path d="M5 12l5 5L20 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </span>
  );
}

const FIELD_INPUT =
  "w-full rounded-[10px] border border-ink/22 bg-white px-3 py-[9px] font-body text-[14px] text-navy outline-none focus:border-navy focus:shadow-[0_0_0_1px_var(--color-navy),0_0_0_4px_rgba(10,22,40,0.10)] aria-[invalid=true]:border-error aria-[invalid=true]:shadow-[0_0_0_1px_var(--color-error)]";

/** The phone input in this form's field look — `FIELD_INPUT`, as `!`
 * overrides of react-phone-input-2's own styles, room left for the flag. */
const PHONE_INPUT =
  "!h-auto !w-full !rounded-[10px] !border-ink/22 !bg-white !py-[9px] !pl-[4.25rem] !pr-3 !font-body !text-[14px] !leading-normal !text-navy focus:!border-navy focus:!shadow-[0_0_0_1px_var(--color-navy),0_0_0_4px_rgba(10,22,40,0.10)] aria-[invalid=true]:!border-error aria-[invalid=true]:!shadow-[0_0_0_1px_var(--color-error)]";

/** `CountryPhoneFields`' wrapper in this form's look: `Field`'s label and
 * error line around the phone input. */
function PhoneFieldShell({ label, error, inputId, className, children }) {
  return (
    <Box className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <Text as="label" htmlFor={inputId} className="font-body text-[12.5px] font-semibold text-ink">
        {label}
      </Text>
      {children}
      <Text as="span" role={error ? "alert" : undefined} className="min-h-0 text-right text-[12px] text-error empty:hidden">
        {error}
      </Text>
    </Box>
  );
}

function Field({ id, name, label, type = "text", optional, autoComplete, error, onInput }) {
  return (
    <Box className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="font-body text-[12.5px] font-semibold text-ink">
        {label}
        {optional && <span className="font-normal text-ink-muted"> (optional)</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={`${id}-err`}
        onInput={onInput}
        className={FIELD_INPUT}
      />
      <Text as="span" id={`${id}-err`} className="min-h-0 text-right text-[12px] text-error empty:hidden">
        {error}
      </Text>
    </Box>
  );
}

/**
 * "Build your brief" composer — the interactive sentence builder plus a short
 * contact form. Client Component (form + dropdown state). Controlled `open` by
 * SiteHeader; renders as a full-width panel on desktop and a full-screen sheet
 * on mobile. A valid brief goes to Zoho "GlobalNavigationForm" through the
 * `submitGlobalNavigation` Server Action and the shared lead pipeline
 * (`lib/leads/`): the three sentence choices, the free text as the message,
 * and the contact-us form's international phone field (`CountryPhoneFields`
 * without its country dropdown — this Zoho form has no country), required as
 * Zoho requires it. Once Zoho has the brief the composer closes and the
 * visitor lands on `/thank-you/{thankYou}`.
 */
export default function BriefComposer({ open, onClose, variant = "desktop", idPrefix = "bd", thankYou = "build-your-brief" }) {
  const router = useRouter();
  const pid = (suffix) => `${idPrefix}-${suffix}`;
  const [state, setState] = useState({ service: "", who: "", where: "" });
  const [openSlot, setOpenSlot] = useState(null);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef(null);
  const phoneForm = useForm({ defaultValues: { phone: "", dialCode: "1" } });

  useEffect(() => {
    if (!open) {
      setOpenSlot(null);
      return undefined;
    }
    const onKey = (ev) => {
      if (ev.key === "Escape" && !openSlot) onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, openSlot]);

  // Lock background scroll while the full-screen mobile sheet is open.
  useEffect(() => {
    if (variant !== "mobile" || !open) return undefined;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [variant, open]);

  const slot = (k) => BRIEF.slots.find((s) => s.k === k);

  const pick = (k, v) => {
    setState((s) => ({ ...s, [k]: v }));
    setOpenSlot(null);
    if (k === "service") setErrors((e) => ({ ...e, needs: "" }));
  };

  const validate = (data) => {
    const next = {};
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const org = String(data.get("organization") || "").trim();
    const needs = String(data.get("requirements") || "").trim();

    if (!state.service && !needs)
      next.needs = "Choose a service in the sentence above, or describe what you need.";
    if (!name) next.name = "Enter your full name.";
    if (!email) next.email = "Enter your work email.";
    else if (!EMAIL_RE.test(email))
      next.email = "Enter an email address like name@company.com.";
    if (!org) next.company = "Enter your organization's name.";
    return next;
  };

  // A slot's chosen option label — Zoho's own dropdown value — or "".
  const chosen = (k) => slot(k).options.find((o) => o.v === state[k])?.label ?? "";

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const data = new FormData(formRef.current);
    const next = validate(data);
    setErrors(next);
    const phoneOk = await phoneForm.trigger("phone");
    // Each invalid field shows its own message underneath — no summary.
    setAlert("");
    if (Object.keys(next).length || !phoneOk) return;

    setSubmitting(true);
    const { phone, dialCode } = phoneForm.getValues();
    let result;
    try {
      result = await submitGlobalNavigation({
        name: String(data.get("name") || "").trim(),
        email: String(data.get("email") || "").trim(),
        company: String(data.get("organization") || "").trim(),
        phone: phoneForSubmit(phone),
        dialCode,
        briefService: chosen("service"),
        briefWho: chosen("who"),
        briefWhere: chosen("where"),
        message: String(data.get("requirements") || "").trim(),
        company_website: String(data.get("website") || ""),
        page: window.location.pathname,
      });
    } catch {
      result = null;
    }
    setSubmitting(false);

    if (result?.ok) {
      onClose();
      router.push(`/thank-you/${thankYou}`);
      return;
    }
    if (result?.errors) {
      // The pipeline's field names → this form's.
      const FIELD = { company: "company", message: "needs", name: "name", email: "email" };
      const mine = {};
      const unplaced = [];
      for (const [field, msg] of Object.entries(result.errors)) {
        if (field === "phone") phoneForm.setError(field, { message: msg });
        else if (FIELD[field]) mine[FIELD[field]] = msg;
        // No field of its own to show under (e.g. a sentence choice).
        else unplaced.push(msg);
      }
      setErrors(mine);
      if (unplaced.length) setAlert(unplaced.join(" "));
      return;
    }
    setAlert(
      result?.error ||
        "We could not send your brief. Please try again, or email us at contact@edstellar.com.",
    );
  };

  const clearError = (key) => () =>
    setErrors((e) => (e[key] ? { ...e, [key]: "" } : e));

  const isSheet = variant === "mobile";

  return (
    <Box
      id={pid("panel")}
      role="region"
      aria-label="Build your brief"
      aria-hidden={!open}
      className={`${
        isSheet
          ? `fixed inset-x-0 top-17 bottom-0 z-[899] overflow-y-auto nav:hidden transition-[opacity,visibility] duration-200 ${
              open ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
            }`
          : `absolute inset-x-0 top-full z-20 max-h-[calc(100vh-72px)] overflow-y-auto border-b border-ink/12 shadow-[0_12px_32px_rgba(10,22,40,0.10)] max-nav:hidden transition-[opacity,transform,visibility] duration-200 ${
              open ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible -translate-y-1.5 opacity-0"
            }`
      } bg-paper-warm`}
    >
      <Box className="mx-auto max-w-[1360px] px-10 pt-7 pb-8 max-sm:px-4">
        {/* Header row */}
        <Box className="relative pr-14">
          <Box
            as="button"
            type="button"
            onClick={onClose}
            aria-label="Close Build your brief"
            className="absolute -top-2 right-0 grid size-11 cursor-pointer place-items-center rounded-full border border-ink/22 bg-white text-navy transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(10,22,40,0.07),0_4px_12px_rgba(10,22,40,0.07)]"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true" className="size-5">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </Box>
          <Text as="p" className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
            Build your brief
          </Text>
          <Text
            as="p"
            className="mt-2 font-display text-[clamp(18px,2vw,20px)] font-semibold leading-loose tracking-[-0.01em] text-navy"
          >
            We need{" "}
            <Slot slot={slot("service")} value={state.service} open={openSlot === "service"} onToggle={setOpenSlot} onPick={pick} onClose={() => setOpenSlot(null)} idPrefix={idPrefix} />{" "}
            for{" "}
            <Slot slot={slot("who")} value={state.who} open={openSlot === "who"} onToggle={setOpenSlot} onPick={pick} onClose={() => setOpenSlot(null)} idPrefix={idPrefix} />{" "}
            in{" "}
            <Slot slot={slot("where")} value={state.where} open={openSlot === "where"} onToggle={setOpenSlot} onPick={pick} onClose={() => setOpenSlot(null)} idPrefix={idPrefix} />.
          </Text>
        </Box>

        <Box as="form" aria-label="Build your brief" ref={formRef} onSubmit={onSubmit} noValidate className="mt-5 border-t border-ink/12 pt-5">
          {alert && (
            <Box role="alert" className="mb-3.5 rounded-[10px] border border-error bg-white px-3 py-2.5 text-[13px] text-error">
              {alert}
            </Box>
          )}
          {/* Honeypot */}
          <Box aria-hidden="true" className="absolute left-[-10000px] h-px w-px overflow-hidden">
            <label htmlFor={pid("website")}>Leave this field empty</label>
            <input type="text" id={pid("website")} name="website" tabIndex={-1} autoComplete="off" />
          </Box>

          <Box
            className="grid gap-8 max-nav:gap-6"
            style={isSheet ? undefined : { gridTemplateColumns: "minmax(0, 5fr) minmax(0, 7fr)" }}
          >
            <Box className="flex min-w-0 flex-col gap-1.5">
              <label htmlFor={pid("needs")} className="font-body text-[12.5px] font-semibold text-ink">
                Or describe what you need in your own words
              </label>
              <Text as="p" id={pid("needs-hint")} className="-mt-0.5 text-[12px] text-ink-muted">
                Goals, audience, number of people, locations, timelines. Optional if you chose a service above.
              </Text>
              <textarea
                id={pid("needs")}
                name="requirements"
                rows={7}
                maxLength={2000}
                aria-describedby={`${pid("needs-hint")} ${pid("needs-err")}`}
                aria-invalid={errors.needs ? "true" : undefined}
                onInput={clearError("needs")}
                className="min-h-42 w-full flex-1 resize-y rounded-[10px] border border-ink/22 bg-white px-3 py-2.5 font-body text-[14px] leading-normal text-navy outline-none focus:border-navy focus:shadow-[0_0_0_1px_var(--color-navy),0_0_0_4px_rgba(10,22,40,0.10)] aria-[invalid=true]:border-error aria-[invalid=true]:shadow-[0_0_0_1px_var(--color-error)]"
              />
              <Text as="span" id={pid("needs-err")} className="min-h-0 text-right text-[12px] text-error empty:hidden">
                {errors.needs}
              </Text>
            </Box>

            <Box className="min-w-0 rounded-[14px] border border-ink/12 bg-white p-4.5 max-sm:px-4 max-sm:py-7.5">
              <Box className="grid grid-cols-2 gap-3 max-[899px]:grid-cols-1">
                <Field id={pid("name")} name="name" label="Full name" autoComplete="name" error={errors.name} onInput={clearError("name")} />
                <Field id={pid("email")} name="email" label="Work email" type="email" autoComplete="email" error={errors.email} onInput={clearError("email")} />
                <Field id={pid("company")} name="organization" label="Organization" autoComplete="organization" error={errors.company} onInput={clearError("company")} />
                <CountryPhoneFields
                  form={{
                    register: phoneForm.register,
                    control: phoneForm.control,
                    watch: phoneForm.watch,
                    setValue: phoneForm.setValue,
                    errors: phoneForm.formState.errors,
                  }}
                  phoneLabel="Phone"
                  country={false}
                  renderField={PhoneFieldShell}
                  phoneInputClassName={PHONE_INPUT}
                />
              </Box>
              <Box className="mt-3.5 flex flex-wrap items-center justify-between gap-3">
                <Text as="p" className="max-w-80 text-[11.5px] text-ink-muted">
                  Edstellar uses these details to reply to your brief. See the{" "}
                  <a href={BRIEF.privacyHref} className="text-navy underline underline-offset-[3px]">
                    privacy policy
                  </a>
                  .
                </Text>
                <Box
                  as="button"
                  type="submit"
                  disabled={submitting}
                  className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-navy px-5 py-3 font-body text-[14px] font-semibold text-lime whitespace-nowrap transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(10,22,40,0.07),0_4px_12px_rgba(10,22,40,0.07)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Sending" : "Send your brief"}
                  <Arrow />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
