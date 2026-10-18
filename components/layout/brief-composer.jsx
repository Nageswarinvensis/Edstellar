"use client";

import { useEffect, useRef, useState } from "react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { BRIEF } from "@/lib/nav-data";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s.-]{7,20}$/;

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
        <span className={empty ? "text-ink/60" : undefined}>{labelFor(slot, value)}</span>
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

function Field({ id, name, label, type = "text", optional, autoComplete, error, onInput }) {
  return (
    <Box className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="font-body text-[12.5px] font-semibold text-ink">
        {label}
        {optional && <span className="font-normal text-ink/60"> (optional)</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={`${id}-err`}
        onInput={onInput}
        className="w-full rounded-[10px] border border-ink/22 bg-white px-3 py-[9px] font-body text-[14px] text-navy outline-none focus:border-navy focus:shadow-[0_0_0_1px_var(--color-navy),0_0_0_4px_rgba(10,22,40,0.10)] aria-[invalid=true]:border-error aria-[invalid=true]:shadow-[0_0_0_1px_var(--color-error)]"
      />
      <Text as="span" id={`${id}-err`} className="min-h-0 text-[12px] text-error empty:hidden">
        {error}
      </Text>
    </Box>
  );
}

/**
 * "Build your brief" composer — the interactive sentence builder plus a short
 * contact form. Client Component (form + dropdown state). Controlled `open` by
 * SiteHeader; renders as a full-width panel on desktop and a full-screen sheet
 * on mobile. With no CRM endpoint wired it runs in preview mode: a valid submit
 * shows the success state after a short delay (mirrors the launch design).
 */
export default function BriefComposer({ open, onClose, variant = "desktop", idPrefix = "bd" }) {
  const pid = (suffix) => `${idPrefix}-${suffix}`;
  const [state, setState] = useState({ service: "", who: "", where: "" });
  const [openSlot, setOpenSlot] = useState(null);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(null);
  const formRef = useRef(null);
  const doneRef = useRef(null);

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

  useEffect(() => {
    if (done && doneRef.current) doneRef.current.focus();
  }, [done]);

  // Lock background scroll while the full-screen mobile sheet is open.
  useEffect(() => {
    if (variant !== "mobile" || !open) return undefined;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [variant, open]);

  const slot = (k) => BRIEF.slots.find((s) => s.k === k);
  const sentence = () =>
    `We need ${labelFor(slot("service"), state.service)} for ${labelFor(
      slot("who"),
      state.who,
    )} in ${labelFor(slot("where"), state.where)}.`;

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
    const phone = String(data.get("phone") || "").trim();
    const needs = String(data.get("requirements") || "").trim();

    if (!state.service && !needs)
      next.needs = "Choose a service in the sentence above, or describe what you need.";
    if (!name) next.name = "Enter your full name.";
    if (!email) next.email = "Enter your work email.";
    else if (!EMAIL_RE.test(email))
      next.email = "Enter an email address like name@company.com.";
    if (!org) next.company = "Enter your organization's name.";
    if (phone && !(PHONE_RE.test(phone) && phone.replace(/\D/g, "").length >= 7))
      next.phone = "Enter a phone number with at least 7 digits, or leave it empty.";
    return next;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const data = new FormData(formRef.current);
    const next = validate(data);
    setErrors(next);
    const count = Object.keys(next).length;
    if (count) {
      setAlert(`Please fix ${count === 1 ? "1 field" : `${count} fields`} before sending your brief.`);
      return;
    }
    setAlert("");
    const firstName = String(data.get("name")).trim().split(/\s+/)[0];
    const finish = () => setDone({ name: firstName, sentence: state.service ? sentence() : "" });
    if (data.get("website")) {
      finish();
      return;
    }
    setSubmitting(true);
    // No CRM endpoint wired yet — simulate the request, then show success.
    setTimeout(() => {
      setSubmitting(false);
      finish();
    }, 500);
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
      <Box className="mx-auto max-w-7xl px-10 pt-7 pb-8 max-sm:px-4">
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
          <Text as="p" className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60">
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

        {done ? (
          <Box
            ref={doneRef}
            role="status"
            tabIndex={-1}
            className="mt-5 rounded-[14px] border border-ink/12 bg-white p-6 outline-none"
          >
            <Text as="h3" className="font-display text-[20px] font-semibold text-navy">
              Thanks, {done.name}.
            </Text>
            <Text as="p" className="mt-2 text-[14px] text-ink/60">
              An Edstellar expert will be in touch
              {done.sentence ? ` about your brief: ${done.sentence}` : " about your brief."}
            </Text>
          </Box>
        ) : (
          <Box as="form" ref={formRef} onSubmit={onSubmit} noValidate className="mt-5 border-t border-ink/12 pt-5">
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
                <Text as="p" id={pid("needs-hint")} className="-mt-0.5 text-[12px] text-ink/60">
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
                <Text as="span" id={pid("needs-err")} className="min-h-0 text-[12px] text-error empty:hidden">
                  {errors.needs}
                </Text>
              </Box>

              <Box className="min-w-0 rounded-[14px] border border-ink/12 bg-white p-4.5 max-sm:p-3.5">
                <Box className="grid grid-cols-2 gap-3 max-[899px]:grid-cols-1">
                  <Field id={pid("name")} name="name" label="Full name" autoComplete="name" error={errors.name} onInput={clearError("name")} />
                  <Field id={pid("email")} name="email" label="Work email" type="email" autoComplete="email" error={errors.email} onInput={clearError("email")} />
                  <Field id={pid("company")} name="organization" label="Organization" autoComplete="organization" error={errors.company} onInput={clearError("company")} />
                  <Field id={pid("phone")} name="phone" label="Phone" type="tel" optional autoComplete="tel" error={errors.phone} onInput={clearError("phone")} />
                </Box>
                <Box className="mt-3.5 flex flex-wrap items-center justify-between gap-3">
                  <Text as="p" className="max-w-80 text-[11.5px] text-ink/60">
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
        )}
      </Box>
    </Box>
  );
}
