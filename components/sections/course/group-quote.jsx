"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft, Check, Minus, Plus, Search } from "lucide-react";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import Section from "@/components/ui/Section";
import RichHeading from "@/components/shared/rich-heading";
import Reveal from "@/components/shared/reveal";
import SecCta from "@/components/shared/sec-cta";
import { CtaButton } from "@/components/shared/CtaButton";
import { FormField, formInputClasses } from "@/components/shared/form-field";
import { cn } from "@/lib/utils";
import {
  COUNTRY_DIAL_CODES,
  EMAIL_PATTERN,
  FREE_MAIL_DOMAINS,
} from "@/lib/constants";
import {
  GROUP_QUOTE_CATALOG,
  LICENSE_PACKAGES,
} from "@/lib/content/group-quote-catalog";

const TABS = [
  { id: "one-time", label: "One-time training" },
  { id: "multiple", label: "Multiple training" },
];
const TEAM_SIZE_OPTIONS = ["1-10", "11-25", "26-50", "51-100", "custom"];
const SESSION_OPTIONS = ["2", "4", "8", "custom"];

// Dial code shown on the final step's phone field is guessed from the
// visitor's timezone — there's no country selector on this compact form.
const TIMEZONE_COUNTRY = {
  "Asia/Kolkata": "India",
  "Asia/Calcutta": "India",
  "Europe/London": "United Kingdom",
  "Europe/Dublin": "Ireland",
  "Europe/Berlin": "Germany",
  "Europe/Paris": "France",
  "Europe/Amsterdam": "Netherlands",
  "Europe/Madrid": "Spain",
  "Europe/Rome": "Italy",
  "Asia/Dubai": "United Arab Emirates",
  "Asia/Singapore": "Singapore",
  "Asia/Tokyo": "Japan",
  "Australia/Sydney": "Australia",
  "Africa/Johannesburg": "South Africa",
  "America/Toronto": "Canada",
  "America/Sao_Paulo": "Brazil",
};

function guessCountry() {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return TIMEZONE_COUNTRY[timeZone] || "United States";
  } catch {
    return "United States";
  }
}

function pathFor(mode) {
  return mode === "multiple"
    ? ["size", "programs", "frequency", "review"]
    : ["size", "frequency", "review"];
}

function stripTrainingSuffix(name) {
  return name.replace(/ Training$/, "");
}

/**
 * Group-quote wizard — qualifies a training request in a few clicks (team
 * size, programs, frequency), then sends it from its own contact form on the
 * last step. This section stands alone and does not hand off to `LeadForm`
 * elsewhere on the page — each has its own independent submit.
 */
export default function GroupQuote({ data }) {
  const cardRef = useRef(null);

  const [mode, setMode] = useState("one-time");
  const [stepIndex, setStepIndex] = useState(0);
  const [showError, setShowError] = useState(false);

  const [teamSize, setTeamSize] = useState("");
  const [teamSizeCustom, setTeamSizeCustom] = useState(120);

  const [frequency, setFrequency] = useState("");
  const [sessions, setSessions] = useState("");
  const [sessionsCustom, setSessionsCustom] = useState(12);

  const [programMode, setProgramMode] = useState("catalog");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(
    () => new Set(data?.lockedProgram ? [data.lockedProgram] : []),
  );
  const [fileName, setFileName] = useState("");

  const path = useMemo(() => pathFor(mode), [mode]);
  const currentStep = path[stepIndex];

  const filteredCatalog = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GROUP_QUOTE_CATALOG.map((group) => ({
      group: group.group,
      items: group.items.filter(
        (item) => !q || item.name.toLowerCase().includes(q),
      ),
    })).filter((group) => group.items.length > 0);
  }, [query]);

  const [dialCountry, setDialCountry] = useState("United States");
  useEffect(() => {
    setDialCountry(guessCountry());
  }, []);
  const dialCode =
    COUNTRY_DIAL_CODES.find((country) => country.name === dialCountry)
      ?.dialCode || "+1";

  const {
    register: registerContact,
    handleSubmit: handleContactSubmit,
    formState: { errors: contactErrors, isSubmitting: contactSubmitting },
  } = useForm();
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactCompany, setContactCompany] = useState("");

  function onContactSubmit(values) {
    setContactCompany(values.company);
    setContactSubmitted(true);
  }

  if (!data) return null;

  function isStepValid(step) {
    if (step === "size") {
      if (!teamSize) return false;
      if (teamSize === "custom") return teamSizeCustom > 0;
      return true;
    }
    if (step === "programs") {
      return selected.size > 0 || fileName !== "";
    }
    if (step === "frequency") {
      if (!frequency) return false;
      if (frequency === "Recurring") {
        if (!sessions) return false;
        if (sessions === "custom") return sessionsCustom > 1;
      }
      return true;
    }
    return true;
  }

  function scrollCardIntoView() {
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function handleTab(nextMode) {
    setMode(nextMode);
    setStepIndex(0);
    setShowError(false);
  }

  function handleNext() {
    if (!isStepValid(currentStep)) {
      setShowError(true);
      return;
    }
    setShowError(false);
    setStepIndex((i) => Math.min(i + 1, path.length - 1));
    scrollCardIntoView();
  }

  function handleBack() {
    setShowError(false);
    setStepIndex((i) => Math.max(i - 1, 0));
    scrollCardIntoView();
  }

  function toggleProgram(name) {
    if (name === data.lockedProgram) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
    setShowError(false);
  }

  function clearPrograms() {
    setSelected(new Set(data.lockedProgram ? [data.lockedProgram] : []));
  }

  function sizeText() {
    if (!teamSize) return "";
    return teamSize === "custom"
      ? `${teamSizeCustom} people`
      : `${teamSize} people`;
  }

  function freqText() {
    if (!frequency) return "";
    if (frequency === "One time") return "One time";
    if (!sessions) return "Recurring";
    return `Recurring, ${sessions === "custom" ? sessionsCustom : sessions} sessions`;
  }

  function programsText() {
    const list = [...selected];
    const bits = [];
    if (list.length) {
      bits.push(
        `${list.length} program${list.length === 1 ? "" : "s"}: ${list
          .map(stripTrainingSuffix)
          .join(", ")}`,
      );
    }
    if (fileName) bits.push(`list attached (${fileName})`);
    return bits.join(" · ") || "Not selected";
  }

  let stepBody;

  if (currentStep === "size") {
    stepBody = (
      <Box>
        <Text
          as="h3"
          className="mb-6 text-center font-display text-[clamp(19px,2vw,25px)] font-bold tracking-[-0.025em] text-ink"
        >
          How many team members need training?
        </Text>

        <Box className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
          {TEAM_SIZE_OPTIONS.map((option) => (
            <Box
              as="label"
              key={option}
              className={cn(
                "flex cursor-pointer items-center justify-center rounded-xl border px-4 py-4 text-center text-[14px] text-ink transition-colors duration-200",
                teamSize === option
                  ? "border-navy bg-lime/15 shadow-[0_0_0_3px_rgba(10,22,40,0.07)]"
                  : "border-ink/15 hover:border-navy",
              )}
            >
              <input
                type="radio"
                name="gq-team-size"
                value={option}
                checked={teamSize === option}
                onChange={() => {
                  setTeamSize(option);
                  setShowError(false);
                }}
                className="sr-only"
              />
              {option === "custom" ? "Custom" : `${option} people`}
            </Box>
          ))}
        </Box>

        {teamSize === "custom" ? (
          <Box className="mx-auto mt-4 flex w-44 items-stretch overflow-hidden rounded-xl border border-ink/15">
            <button
              type="button"
              onClick={() => setTeamSizeCustom((n) => Math.max(1, n - 1))}
              title="Click Here to View Decrease number of team members"
              aria-label="Decrease number of team members"
              className="grid w-11 flex-none place-items-center bg-paper-warm text-ink transition-colors duration-200 hover:bg-paper-cream"
            >
              <Minus size={14} />
            </button>
            <input
              type="number"
              min={1}
              value={teamSizeCustom}
              onChange={(e) =>
                setTeamSizeCustom(Math.max(1, Number(e.target.value) || 1))
              }
              aria-label="Number of team members"
              className="w-full min-w-0 border-none bg-white text-center font-mono text-[15px] text-ink outline-none"
            />
            <button
              type="button"
              onClick={() => setTeamSizeCustom((n) => n + 1)}
              title="Click Here to View Increase number of team members"
              aria-label="Increase number of team members"
              className="grid w-11 flex-none place-items-center bg-paper-warm text-ink transition-colors duration-200 hover:bg-paper-cream"
            >
              <Plus size={14} />
            </button>
          </Box>
        ) : null}

        {showError && !isStepValid("size") ? (
          <Text
            role="alert"
            className="mt-4 text-center text-[12.5px] text-red-600"
          >
            Please choose a team size, or enter your own number.
          </Text>
        ) : null}

        <WizardNav showBack={false} nextLabel="Next" onNext={handleNext} />
      </Box>
    );
  } else if (currentStep === "programs") {
    stepBody = (
      <Box>
        <Text
          as="h3"
          className="mb-5 text-center font-display text-[clamp(19px,2vw,25px)] font-bold tracking-[-0.025em] text-ink"
        >
          Which programs do you need?
        </Text>

        <Box className="mx-auto mb-5.5 flex w-max rounded-full border border-ink/15 bg-white p-1">
          <button
            type="button"
            onClick={() => setProgramMode("catalog")}
            title="Click Here to View Select from the catalog"
            className={cn(
              "rounded-full px-4.5 py-2 font-body text-[12.5px] font-semibold transition-colors duration-200",
              programMode === "catalog" ? "bg-navy text-lime" : "text-ink/60",
            )}
          >
            Select from the catalog
          </button>
          <button
            type="button"
            onClick={() => setProgramMode("upload")}
            title="Click Here to View Upload a list"
            className={cn(
              "rounded-full px-4.5 py-2 font-body text-[12.5px] font-semibold transition-colors duration-200",
              programMode === "upload" ? "bg-navy text-lime" : "text-ink/60",
            )}
          >
            Upload a list
          </button>
        </Box>

        {programMode === "catalog" ? (
          <Box className="mx-auto max-w-[440px]">
            <Box className="relative mb-3.5">
              <Search
                size={15}
                className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-ink/40"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search 2,000+ programs by name"
                aria-label="Search programs"
                className="w-full rounded-full border border-ink/15 bg-white py-2.75 pr-4 pl-9.5 text-[13.5px] text-ink outline-none transition-colors focus:border-navy"
              />
            </Box>

            <Box className="mb-2.5 flex items-center justify-between gap-3">
              <Text as="span" className="text-[13px] text-ink/60">
                {selected.size} program{selected.size === 1 ? "" : "s"} selected
              </Text>
              {selected.size > 1 ? (
                <button
                  type="button"
                  onClick={clearPrograms}
                  title="Click Here to View Clear all"
                  className="text-[13px] text-ink/60 underline underline-offset-3 hover:text-ink"
                >
                  Clear all
                </button>
              ) : null}
            </Box>

            <Box className="max-h-[266px] overflow-y-auto rounded-xl border border-ink/12 bg-white">
              {filteredCatalog.length ? (
                filteredCatalog.map((group) => (
                  <Box key={group.group}>
                    <Text
                      as="p"
                      className="bg-paper-warm px-3.5 py-2 font-mono text-[10px] tracking-[0.12em] text-ink/50 uppercase"
                    >
                      {group.group}
                    </Text>
                    {group.items.map((item) => {
                      const locked = item.name === data.lockedProgram;
                      const checked = selected.has(item.name);
                      return (
                        <Box
                          as="label"
                          key={item.name}
                          className={cn(
                            "flex cursor-pointer items-start gap-2.75 border-b border-ink/10 px-3.5 py-2.5 text-[13.5px] text-ink transition-colors duration-150 last:border-b-0 hover:bg-paper-warm",
                            locked && "cursor-default bg-paper-warm/70",
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={locked}
                            onChange={() => toggleProgram(item.name)}
                            className="mt-0.5 size-4.25 flex-none accent-lime"
                          />
                          <Box>
                            {stripTrainingSuffix(item.name)}
                            {item.hours || locked ? (
                              <Text
                                as="span"
                                className="mt-0.5 block font-mono text-[10px] tracking-[0.05em] text-ink/45"
                              >
                                {[item.hours, locked ? "this course" : null]
                                  .filter(Boolean)
                                  .join(" · ")}
                              </Text>
                            ) : null}
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                ))
              ) : (
                <Text
                  as="p"
                  className="p-4 text-center text-[13px] leading-[1.6] text-ink/60"
                >
                  No program matches that. Use{" "}
                  <b className="text-ink">Upload a list</b> and send us the full
                  set, or add it in the message field on the form.
                </Text>
              )}
            </Box>
          </Box>
        ) : (
          <Box className="mx-auto max-w-[440px]">
            <Box as="ol" className="mb-4.5 list-none p-0">
              <Box
                as="li"
                className="relative mb-3 pl-8 text-[13.5px] leading-[1.6] text-ink/60"
              >
                <Box className="absolute top-0 left-0 grid size-5.25 place-items-center rounded-full bg-navy font-mono text-[10px] text-lime">
                  1
                </Box>
                Download the{" "}
                <a
                  href="https://cdn.prod.website-files.com/6482a3cf7db698c2a80cc5e6/667ea8fe9eec28c6354305f8_Edstellar-Training%20Requirement%20Template%20-%20Revised%20FInal%20(1)%20(1).xlsx"
                  className="text-ink underline underline-offset-3"
                >
                  training requirement template
                </a>
              </Box>
              <Box
                as="li"
                className="relative mb-3 pl-8 text-[13.5px] leading-[1.6] text-ink/60"
              >
                <Box className="absolute top-0 left-0 grid size-5.25 place-items-center rounded-full bg-navy font-mono text-[10px] text-lime">
                  2
                </Box>
                Add the workshops your teams need, with rough headcount for each
              </Box>
              <Box
                as="li"
                className="relative pl-8 text-[13.5px] leading-[1.6] text-ink/60"
              >
                <Box className="absolute top-0 left-0 grid size-5.25 place-items-center rounded-full bg-navy font-mono text-[10px] text-lime">
                  3
                </Box>
                Upload it below, or email it to{" "}
                <a
                  href="mailto:contact@edstellar.com"
                  className="text-ink underline underline-offset-3"
                >
                  contact@edstellar.com
                </a>
              </Box>
            </Box>

            <Box
              as="label"
              className="flex cursor-pointer flex-col items-center gap-1 rounded-xl border border-dashed border-ink/25 bg-paper-warm px-5 py-6.5 text-center transition-colors duration-200 hover:border-navy hover:bg-white"
            >
              <input
                type="file"
                accept=".xls,.xlsx,.csv"
                className="sr-only"
                onChange={(e) => {
                  setFileName(e.target.files?.[0]?.name || "");
                  setShowError(false);
                }}
              />
              <Text as="span" className="text-[14px] font-semibold text-ink">
                Choose a file
              </Text>
              <Text
                as="span"
                className="font-mono text-[10px] tracking-[0.1em] text-ink/50 uppercase"
              >
                .xls, .xlsx or .csv
              </Text>
            </Box>

            {fileName ? (
              <Text as="p" className="mt-3 text-center text-[13px] text-ink">
                Attached: {fileName}
              </Text>
            ) : null}
          </Box>
        )}

        {selected.size >= 3 ? (
          <Box className="mx-auto mt-4 max-w-[440px] rounded-[10px] bg-paper-warm px-4 py-3.25 text-[13px] leading-[1.55] text-ink/70">
            Selecting several programs? We will quote per-program{" "}
            <b className="text-ink">and</b> as an annual package, and tell you
            which comes out cheaper. Nothing to choose here.
          </Box>
        ) : null}

        {showError && !isStepValid("programs") ? (
          <Text
            role="alert"
            className="mt-4 text-center text-[12.5px] text-red-600"
          >
            Select at least one program, or upload your list.
          </Text>
        ) : null}

        <WizardNav onBack={handleBack} onNext={handleNext} nextLabel="Next" />
      </Box>
    );
  } else if (currentStep === "frequency") {
    stepBody = (
      <Box>
        <Text
          as="h3"
          className="mb-6 text-center font-display text-[clamp(19px,2vw,25px)] font-bold tracking-[-0.025em] text-ink"
        >
          Is this a one-time program or a recurring one?
        </Text>

        <Box className="mx-auto grid max-w-lg grid-cols-1 gap-2.5 sm:grid-cols-2">
          {["One time", "Recurring"].map((option) => (
            <Box
              as="label"
              key={option}
              className={cn(
                "flex cursor-pointer items-center justify-center rounded-xl border px-4 py-4 text-center text-[14.5px] text-ink transition-colors duration-200",
                frequency === option
                  ? "border-navy bg-lime/15 shadow-[0_0_0_3px_rgba(10,22,40,0.07)]"
                  : "border-ink/15 hover:border-navy",
              )}
            >
              <input
                type="radio"
                name="gq-frequency"
                value={option}
                checked={frequency === option}
                onChange={() => {
                  setFrequency(option);
                  if (option !== "Recurring") setSessions("");
                  setShowError(false);
                }}
                className="sr-only"
              />
              {option}
            </Box>
          ))}
        </Box>

        {frequency === "Recurring" ? (
          <Box className="mt-6.5">
            <Text
              as="p"
              className="mb-3.5 text-center font-mono text-[10.5px] tracking-[0.15em] text-ink/50 uppercase"
            >
              How many sessions do you expect?
            </Text>
            <Box className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {SESSION_OPTIONS.map((option) => (
                <Box
                  as="label"
                  key={option}
                  className={cn(
                    "flex cursor-pointer items-center justify-center rounded-xl border px-4 py-3.5 text-center text-[14px] text-ink transition-colors duration-200",
                    sessions === option
                      ? "border-navy bg-lime/15 shadow-[0_0_0_3px_rgba(10,22,40,0.07)]"
                      : "border-ink/15 hover:border-navy",
                  )}
                >
                  <input
                    type="radio"
                    name="gq-sessions"
                    value={option}
                    checked={sessions === option}
                    onChange={() => {
                      setSessions(option);
                      setShowError(false);
                    }}
                    className="sr-only"
                  />
                  {option === "custom" ? "Custom" : option}
                </Box>
              ))}
            </Box>

            {sessions === "custom" ? (
              <Box className="mx-auto mt-4 flex w-44 items-stretch overflow-hidden rounded-xl border border-ink/15">
                <button
                  type="button"
                  onClick={() => setSessionsCustom((n) => Math.max(2, n - 1))}
                  title="Click Here to View Decrease number of sessions"
                  aria-label="Decrease number of sessions"
                  className="grid w-11 flex-none place-items-center bg-paper-warm text-ink transition-colors duration-200 hover:bg-paper-cream"
                >
                  <Minus size={14} />
                </button>
                <input
                  type="number"
                  min={2}
                  value={sessionsCustom}
                  onChange={(e) =>
                    setSessionsCustom(Math.max(2, Number(e.target.value) || 2))
                  }
                  aria-label="Number of sessions"
                  className="w-full min-w-0 border-none bg-white text-center font-mono text-[15px] text-ink outline-none"
                />
                <button
                  type="button"
                  onClick={() => setSessionsCustom((n) => n + 1)}
                  title="Click Here to View Increase number of sessions"
                  aria-label="Increase number of sessions"
                  className="grid w-11 flex-none place-items-center bg-paper-warm text-ink transition-colors duration-200 hover:bg-paper-cream"
                >
                  <Plus size={14} />
                </button>
              </Box>
            ) : null}
          </Box>
        ) : null}

        {showError && !isStepValid("frequency") ? (
          <Text
            role="alert"
            className="mt-4 text-center text-[12.5px] text-red-600"
          >
            Please choose one option to continue.
          </Text>
        ) : null}

        <WizardNav onBack={handleBack} onNext={handleNext} nextLabel="Next" />
      </Box>
    );
  } else {
    stepBody = (
      <Box>
        <Text
          as="h3"
          className="mb-6 text-center font-display text-[clamp(19px,2vw,25px)] font-bold tracking-[-0.025em] text-ink"
        >
          Review and send your request.
        </Text>

        <Box className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[2fr_3fr]">
          <Box
            as="dl"
            className="grid grid-cols-1 gap-x-6 gap-y-2.5 rounded-[14px] bg-paper-warm p-5.5 sm:grid-cols-[auto_1fr] lg:sticky lg:top-24"
          >
            <Box as="dt" className="text-[13.5px] text-ink/60">
              Team members
            </Box>
            <Box
              as="dd"
              className="m-0 text-[13.5px] font-semibold text-ink sm:text-right"
            >
              {sizeText() || "Not selected"}
            </Box>

            <Box as="dt" className="text-[13.5px] text-ink/60">
              Request type
            </Box>
            <Box
              as="dd"
              className="m-0 text-[13.5px] font-semibold text-ink sm:text-right"
            >
              {mode === "multiple" ? "Multiple training" : "One-time training"}
            </Box>

            <Box as="dt" className="text-[13.5px] text-ink/60">
              Frequency
            </Box>
            <Box
              as="dd"
              className="m-0 text-[13.5px] font-semibold text-ink sm:text-right"
            >
              {freqText() || "Not selected"}
            </Box>

            {mode === "multiple" ? (
              <>
                <Box as="dt" className="text-[13.5px] text-ink/60">
                  Programs
                </Box>
                <Box
                  as="div"
                  className="m-0 text-[13.5px] font-semibold text-ink sm:text-right"
                >
                  {programsText()}
                </Box>
              </>
            ) : null}
          </Box>

          <Box className="rounded-[14px] border border-ink/15 bg-white p-6 sm:p-6.5">
            {contactSubmitted ? (
              <Box className="pt-1 text-center">
                <Box className="mx-auto mb-4.5 grid size-12 place-items-center rounded-full bg-navy text-lime">
                  <Check size={22} strokeWidth={2.5} aria-hidden="true" />
                </Box>
                <Text
                  as="h4"
                  className="mb-1.5 font-display text-lg font-semibold text-ink"
                >
                  Request received.
                </Text>
                <Text
                  as="p"
                  className="mb-5 text-[13.5px] leading-[1.6] text-ink/60"
                >
                  Thanks, a training specialist will reply within one business
                  day with a tailored proposal.
                </Text>
                <Box className="rounded-[14px] bg-paper-warm p-4.5 text-left text-[13.5px] leading-[1.7] text-ink">
                  <Text
                    as="span"
                    className="mb-1.5 block font-mono text-[10px] tracking-[0.15em] text-ink/50 uppercase"
                  >
                    What we received
                  </Text>
                  {contactCompany}
                  <br />
                  {[sizeText(), freqText()].filter(Boolean).join(" · ")}
                  <br />
                  {dialCountry}
                </Box>
              </Box>
            ) : (
              <>
                <Text
                  as="h4"
                  className="mb-1 font-display text-lg font-semibold text-ink"
                >
                  Your contact details
                </Text>
                <Text
                  as="p"
                  className="mb-5 text-[13px] leading-[1.6] text-ink/60"
                >
                  Send this requirement straight from here. A training
                  specialist replies within one business day with a tailored
                  proposal.
                </Text>

                <Box
                  as="form"
                  noValidate
                  onSubmit={handleContactSubmit(onContactSubmit)}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                  <FormField
                    label="Name"
                    required
                    error={contactErrors.name?.message}
                  >
                    <input
                      {...registerContact("name", {
                        required: "Please enter your name.",
                      })}
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your name"
                      className={formInputClasses}
                    />
                  </FormField>

                  <FormField
                    label="Work email"
                    required
                    error={contactErrors.workEmail?.message}
                  >
                    <input
                      {...registerContact("workEmail", {
                        required: "Please enter your work email address.",
                        pattern: {
                          value: EMAIL_PATTERN,
                          message: "That email address does not look right.",
                        },
                        validate: (value) =>
                          !FREE_MAIL_DOMAINS.has(
                            value.split("@")[1]?.toLowerCase(),
                          ) ||
                          "Please use your work email so we can identify your organization.",
                      })}
                      type="email"
                      autoComplete="email"
                      placeholder="Enter your work email"
                      className={formInputClasses}
                    />
                  </FormField>

                  <FormField
                    label="Company name"
                    required
                    error={contactErrors.company?.message}
                  >
                    <input
                      {...registerContact("company", {
                        required: "Please enter your company name.",
                      })}
                      type="text"
                      autoComplete="organization"
                      placeholder="Enter your company name"
                      className={formInputClasses}
                    />
                  </FormField>

                  <FormField label="Phone">
                    <Box className="flex items-stretch overflow-hidden rounded-xl border border-ink/15 focus-within:border-navy focus-within:bg-white">
                      <Text
                        as="span"
                        className="flex items-center border-r border-ink/12 px-2.5 font-mono text-[12.5px] text-ink/60"
                      >
                        {dialCode}
                      </Text>
                      <input
                        {...registerContact("phone")}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel-national"
                        placeholder="201-555-0123"
                        className="w-full min-w-0 bg-transparent p-3 text-[13.5px] text-ink outline-none placeholder:text-ink/35"
                      />
                    </Box>
                  </FormField>

                  <Box className="flex items-start gap-2.5 sm:col-span-2">
                    <input
                      {...registerContact("consent", { required: true })}
                      type="checkbox"
                      id="gq-consent"
                      aria-invalid={Boolean(contactErrors.consent)}
                      className="mt-0.75 size-3.5 flex-none accent-navy"
                    />
                    <Text
                      as="label"
                      htmlFor="gq-consent"
                      className="text-[12px] leading-normal text-ink/60"
                    >
                      I agree that Edstellar may use my details to respond to my
                      training request and provide relevant training solutions,
                      as described in the{" "}
                      <a
                        href="/privacy-policy"
                        className="underline hover:text-ink"
                      >
                        privacy policy
                      </a>
                      .
                    </Text>
                  </Box>
                  {contactErrors.consent ? (
                    <Text
                      role="alert"
                      className="-mt-2.5 text-[11.5px] text-red-600 sm:col-span-2"
                    >
                      Please accept the privacy policy to continue.
                    </Text>
                  ) : null}

                  <Box className="border-t border-ink/10 pt-4.5 sm:col-span-2">
                    <CtaButton
                      type="submit"
                      arrow
                      disabled={contactSubmitting}
                    >
                      Request my quote
                    </CtaButton>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Box>

        <WizardNav onBack={handleBack} />
      </Box>
    );
  }

  return (
    <Section
      aria-label="Group training quote wizard"
      id="group-quote"
      className="border-t border-ink/10 bg-paper-warm"
    >
      <Reveal delay={1}>
        <RichHeading
          as="h2"
          parts={data.title?.parts}
          className="mb-5 max-w-[18ch] font-display text-[clamp(28px,4vw,46px)] font-bold leading-[1.08] tracking-[-0.03em] text-ink"
        />
      </Reveal>

      <Reveal delay={2}>
        <Text
          as="p"
          className="mb-11 max-w-[64ch] text-[15px] leading-[1.7] text-ink/60 lg:text-[17px]"
        >
          {data.description}
        </Text>
      </Reveal>

      <Reveal delay={2}>
        <Box
          ref={cardRef}
          className="overflow-hidden rounded-[20px] border border-ink/15 bg-white shadow-[0_1px_0_rgba(10,22,40,0.04),0_30px_60px_-40px_rgba(10,22,40,0.4)]"
        >
          <Box
            role="tablist"
            aria-label="Quote request type"
            className="flex border-b border-ink/10 bg-paper-warm"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                title={`Click Here to View ${tab.label}`}
                aria-selected={mode === tab.id}
                onClick={() => handleTab(tab.id)}
                className={cn(
                  "flex-1 border-b-2 px-3 py-4 font-body text-[13px] font-semibold transition-colors duration-200 sm:px-5 sm:text-[14px]",
                  mode === tab.id
                    ? "border-navy bg-white text-ink"
                    : "border-transparent text-ink/50 hover:text-ink",
                )}
              >
                {tab.label}
              </button>
            ))}
          </Box>

          <Box className="p-5.5 sm:p-8 lg:p-10">
            <Box
              as="ol"
              aria-hidden="true"
              className="mb-8 flex items-center justify-center"
            >
              {path.map((key, index) => (
                <Box as="li" key={key} className="flex items-center">
                  {index > 0 ? (
                    <Box className="h-px w-8 flex-none border-t border-dashed border-ink/25 sm:w-14" />
                  ) : null}
                  <Box
                    className={cn(
                      "grid size-7.5 flex-none place-items-center rounded-full border font-mono text-[12px] transition-colors duration-200",
                      index === stepIndex
                        ? "border-navy bg-white text-ink"
                        : index < stepIndex
                          ? "border-lime bg-lime text-ink"
                          : "border-ink/20 bg-white text-ink/40",
                    )}
                  >
                    {index + 1}
                  </Box>
                </Box>
              ))}
            </Box>

            {stepBody}
          </Box>
        </Box>
      </Reveal>

      <Reveal delay={2}>
        <Box className="mt-12 border-t border-ink/10 pt-9 lg:mt-14">
          <Text
            as="h3"
            className="mb-2.5 max-w-[26ch] font-display text-[clamp(19px,2vw,24px)] font-bold leading-[1.25] tracking-[-0.025em] text-ink"
          >
            ML Model Monitoring Training Packages & Pricing
          </Text>
          <Text
            as="p"
            className="mb-7 max-w-[78ch] text-[13.5px] leading-[1.7] text-ink/60"
          >
            Where L&amp;D holds an annual budget, license packages price the
            whole year at once instead of raising a purchase order per workshop.
            Hours and licenses are pooled across teams, programs and locations,
            so unused capacity is not stranded in one department.
          </Text>

          <Box className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LICENSE_PACKAGES.map((pack) => (
              <Box
                key={pack.name}
                className={cn(
                  "flex flex-col rounded-2xl border bg-white p-5.5",
                  pack.best ? "border-2 border-navy" : "border-ink/12",
                )}
              >
                <Box className="mb-2.5 h-[19px]">
                  {pack.best ? (
                    <Text
                      as="span"
                      className="inline-block rounded bg-lime px-2 py-0.75 font-mono text-[10px] tracking-[0.1em] text-navy uppercase"
                    >
                      Most chosen
                    </Text>
                  ) : null}
                </Box>
                <Text
                  as="p"
                  className="mb-3 font-display text-base font-bold tracking-[-0.02em] text-ink"
                >
                  {pack.name}
                </Text>
                <Text
                  as="p"
                  className="font-display text-[clamp(22px,2.4vw,28px)] leading-none font-bold tracking-[-0.035em] text-ink"
                >
                  {pack.figure}
                </Text>
                <Text
                  as="span"
                  className="mt-1.5 mb-3.5 block font-mono text-[10px] tracking-[0.1em] text-ink/50 uppercase"
                >
                  {pack.unit}
                </Text>
                <Text
                  as="p"
                  className="border-t border-ink/10 pt-3 text-[13px] leading-[1.5] text-ink"
                >
                  {pack.hours}
                </Text>
                <Text
                  as="p"
                  className="mt-auto pt-2.5 text-xs leading-[1.5] text-ink/50"
                >
                  {pack.who}
                </Text>
              </Box>
            ))}
          </Box>

          <SecCta {...data.sectionCta} />
        </Box>
      </Reveal>
    </Section>
  );
}

function WizardNav({ onBack, onNext, nextLabel, showBack = true }) {
  return (
    <Box className="mt-7 flex flex-col-reverse items-stretch justify-end gap-3 border-t border-ink/10 pt-5.5 sm:flex-row sm:items-center">
      {showBack ? (
        <CtaButton
          type="button"
          variant="ghost"
          onClick={onBack}
          className="sm:mr-auto"
        >
          <ArrowLeft size={15} strokeWidth={2.25} aria-hidden="true" />
          Previous
        </CtaButton>
      ) : null}
      {onNext ? (
        <CtaButton type="button" arrow onClick={onNext}>
          {nextLabel}
        </CtaButton>
      ) : null}
    </Box>
  );
}
