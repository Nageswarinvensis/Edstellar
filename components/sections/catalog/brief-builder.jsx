"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { EMAIL_PATTERN, FREE_MAIL_DOMAINS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const PHONE_PATTERN = /^[\d\s()+-]{6,20}$/;
const SLOTS = ["service", "who", "where"];
const INPUT =
  "w-full rounded-[10px] border border-paper/15 bg-navy-soft px-3.5 py-3 text-[14.5px] text-paper outline-none placeholder:text-paper/40 focus:border-lime";

/**
 * "Build a brief" — a fill-in-the-blanks sentence ("We need {a service} for
 * {a team} in {our sector}."), each blank opening a list of options or a
 * free-text answer, or a plain written requirement instead; then work email
 * and phone. Same submit behaviour as the site's other forms (no endpoint
 * yet; a valid brief goes to the thank-you page).
 * Design: corporate-training-catalog `#brief`, `.bf-slot`, `.bf-pop`.
 */
export default function BriefBuilder({ data, thankYou = "consulting" }) {
  const router = useRouter();
  const [picked, setPicked] = useState({ service: null, who: null, where: null });
  const [custom, setCustom] = useState({ service: "", who: "", where: "" });
  const [pop, setPop] = useState(null);
  const [draft, setDraft] = useState("");
  const [requirement, setRequirement] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  const labelOf = (slot) => custom[slot] || (picked[slot] !== null ? data.options[slot][picked[slot]].label : data.blanks[slot]);
  const filled = (slot) => picked[slot] !== null || Boolean(custom[slot]);
  const sentenceDone = SLOTS.every(filled);

  function openPop(slot) {
    setPop((current) => (current === slot ? null : slot));
    setDraft(custom[slot]);
  }

  function choose(slot, index) {
    setPicked((current) => ({ ...current, [slot]: index }));
    setCustom((current) => ({ ...current, [slot]: "" }));
    setPop(null);
  }

  function applyDraft() {
    if (!pop || !draft.trim()) return;
    setCustom((current) => ({ ...current, [pop]: draft.trim() }));
    setPicked((current) => ({ ...current, [pop]: null }));
    setPop(null);
  }

  function reset() {
    setPicked({ service: null, who: null, where: null });
    setCustom({ service: "", who: "", where: "" });
    setPop(null);
    setRequirement("");
    setEmail("");
    setPhone("");
    setErrors({});
  }

  function onSubmit(event) {
    event.preventDefault();
    const domain = email.split("@")[1]?.toLowerCase();
    const next = {
      blank: !sentenceDone && !requirement.trim(),
      email: !EMAIL_PATTERN.test(email) || FREE_MAIL_DOMAINS.has(domain),
      phone: !PHONE_PATTERN.test(phone),
    };
    setErrors(next);
    if (!Object.values(next).some(Boolean)) router.push(`/thank-you/${thankYou}`);
  }

  // Options grouped under their heading ("Corporate training", "Role", …).
  const groups = pop
    ? data.options[pop].reduce((acc, option, index) => {
        (acc[option.group] ??= []).push({ ...option, index });
        return acc;
      }, {})
    : {};

  return (
    <Box as="aside" aria-labelledby="brief-h" className="rounded-[18px] bg-navy p-6 text-paper lg:sticky lg:top-24">
      <Text as="h2" id="brief-h" className="mb-3 font-mono text-[11px] leading-none tracking-[0.18em] text-paper/70 uppercase">
        {data.title}
      </Text>
      <Text as="p" className="mb-4 text-[14.5px] leading-[1.55] text-paper/75">
        {data.intro}
      </Text>

      <Text as="p" className="font-display text-[clamp(19px,1.6vw,21px)] leading-[2.2] font-semibold text-paper">
        We need{" "}
        {SLOTS.map((slot, index) => (
          <span key={slot}>
            <button
              type="button"
              aria-expanded={pop === slot}
              aria-controls="brief-pop"
              onClick={() => openPop(slot)}
              className={cn(
                // Own line height: inheriting the sentence's tall one made a
                // pill taller than its line, so pills on adjacent lines touched.
                "cursor-pointer rounded-full border px-2.5 py-0.5 leading-[1.35] box-decoration-clone transition-colors",
                filled(slot) ? "border-lime bg-lime text-navy" : "border-paper/35 text-paper hover:border-lime",
                pop === slot && "ring-2 ring-lime/50",
              )}
            >
              {labelOf(slot)}
            </button>
            {index === 0 ? " for " : index === 1 ? " in " : "."}
          </span>
        ))}
      </Text>

      {pop ? (
        <Box id="brief-pop" role="group" aria-labelledby="brief-pop-h" className="mt-4 rounded-[14px] border border-paper/12 bg-navy-soft p-4">
          <Text as="p" id="brief-pop-h" className="mb-3 font-mono text-[11px] tracking-[0.14em] text-lime uppercase">
            {data.titles[pop]}
          </Text>
          <Box className="max-h-64 overflow-y-auto pr-1">
            {Object.entries(groups).map(([group, options]) => (
              <Box key={group} className="mb-3 last:mb-0">
                <Text as="p" className="mb-1.5 text-[12px] text-paper/50">
                  {group}
                </Text>
                <Box className="flex flex-wrap gap-1.5">
                  {options.map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      aria-pressed={picked[pop] === option.index}
                      onClick={() => choose(pop, option.index)}
                      className={cn(
                        "cursor-pointer rounded-full border px-3 py-1 text-[13.5px] transition-colors",
                        picked[pop] === option.index ? "border-lime bg-lime text-navy" : "border-paper/20 text-paper hover:border-lime",
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
          <label htmlFor="brief-draft" className="mt-4 mb-1.5 block text-[12.5px] text-paper/70">
            {data.custom_label}
          </label>
          <Box className="flex gap-2">
            <input
              id="brief-draft"
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && (event.preventDefault(), applyDraft())}
              placeholder={data.hints[pop]}
              autoComplete="off"
              className={cn(INPUT, "py-2.5")}
            />
            <button type="button" onClick={applyDraft} className="flex-none cursor-pointer rounded-[10px] bg-lime px-3.5 text-[13.5px] font-semibold text-navy">
              {data.custom_button}
            </button>
          </Box>
        </Box>
      ) : null}

      <label htmlFor="brief-req" className="mt-5 mb-2 block font-mono text-[11px] tracking-[0.14em] text-paper/70 uppercase">
        {data.own_label}
      </label>
      <textarea id="brief-req" rows={3} value={requirement} onChange={(event) => setRequirement(event.target.value)} placeholder={data.own_placeholder} className={cn(INPUT, "resize-y")} />

      <Box as="form" noValidate onSubmit={onSubmit} className="mt-5 border-t border-paper/12 pt-5">
        <Text as="p" className="mb-4 text-[14px] leading-[1.55] text-paper/75">
          {data.send_text}
        </Text>
        {errors.blank ? (
          <Text as="p" role="alert" className="mb-3 text-[13px] text-red-300">
            {data.blank_error}
          </Text>
        ) : null}
        <label htmlFor="brief-email" className="mb-1.5 block font-mono text-[11px] tracking-[0.14em] text-paper/70 uppercase">
          {data.email_label}
        </label>
        <input id="brief-email" type="email" inputMode="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@company.com" aria-invalid={Boolean(errors.email)} className={INPUT} />
        {errors.email ? (
          <Text as="p" role="alert" className="mt-1 text-[12.5px] text-red-300">
            {data.email_error}
          </Text>
        ) : null}
        <label htmlFor="brief-phone" className="mt-3.5 mb-1.5 block font-mono text-[11px] tracking-[0.14em] text-paper/70 uppercase">
          {data.phone_label}
        </label>
        <input id="brief-phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+1 682 297 4830" aria-invalid={Boolean(errors.phone)} className={INPUT} />
        {errors.phone ? (
          <Text as="p" role="alert" className="mt-1 text-[12.5px] text-red-300">
            {data.phone_error}
          </Text>
        ) : null}
        <Box className="mt-5 flex flex-wrap items-center gap-4">
          <button type="submit" className="cursor-pointer rounded-full bg-paper px-5.5 py-3 font-display text-[14.5px] font-semibold text-navy hover:bg-white">
            {data.submit}
          </button>
          <button type="button" onClick={reset} className="cursor-pointer font-display text-[14px] font-semibold text-lime">
            {data.reset}
          </button>
        </Box>
        <Text as="p" className="mt-4 text-[12.5px] leading-normal text-paper/55">
          {data.fine_print}
        </Text>
      </Box>
    </Box>
  );
}
