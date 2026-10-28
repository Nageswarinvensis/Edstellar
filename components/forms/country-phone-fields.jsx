"use client";

import { useId, useState } from "react";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import Box from "@/components/ui/Box";
import Text from "@/components/ui/Text";
import { FormField, formInputClasses } from "@/components/common/form-field";
import { cn } from "@/lib/utils";
import { COUNTRIES, PHONE_LOCALIZATION, PREFERRED_COUNTRIES } from "@/lib/countries";

/** react-phone-input-2's value is the full number as digits, dial code
 * first ("919876543210") — at least 6 digits must follow the dial code. */
function validPhone(value, dialCode) {
  const digits = (value ?? "").replace(/\D/g, "");
  return digits.length - (dialCode ?? "").length >= 6 || "Please enter a valid phone number.";
}

/** The `dark` variant's field look — the pricing quote card's navy inputs. */
const darkInputClasses =
  "w-full min-w-0 rounded-xl border border-paper/12 bg-paper/5 px-3.5 py-3.25 font-body text-[14.5px] text-paper outline-none transition-colors placeholder:text-paper/50 focus:border-lime focus:bg-paper/8 aria-invalid:border-red-400";

/**
 * One field's wrapper: the labelled `FormField`, or — in the `dark` variant —
 * no visible label (the control carries an `aria-label`) and the error below
 * the field, as the pricing card's other fields do.
 */
function Field({ dark, labelled, label, error, inputId, className, children }) {
  if (!dark) {
    return (
      <FormField label={label} required error={error} htmlFor={inputId} className={className}>
        {children}
      </FormField>
    );
  }
  return (
    <Box className={className}>
      {labelled ? (
        <Text as="span" aria-hidden="true" className="mb-1.25 block font-mono text-[11px] leading-[1.4] tracking-[0.12em] text-paper/65 uppercase">
          {label}
        </Text>
      ) : null}
      {children}
      {error ? (
        <Text as="span" role="alert" className="mt-1 block text-[12px] leading-[1.4] text-red-300">
          {error}
        </Text>
      ) : null}
    </Box>
  );
}

/** The phone value as the lead pipeline expects it: `+` and the digits. */
export function phoneForSubmit(phone) {
  return phone ? `+${phone}` : "";
}

/**
 * The Country dropdown and international phone input shared by the lead
 * forms, as on the live site: the dropdown lists every country the phone
 * input knows (`lib/countries.js`) — US, UK, India, Australia and Canada
 * first — and the two follow each other: picking a country sets the flag,
 * picking a flag sets the country.
 *
 * Registers `country`, `phone` (digits, dial code first) and `dialCode` on
 * the caller's react-hook-form, whose `useForm` should default them to
 * `""`, `""` and `"1"`. `form` is `{ register, control, watch, setValue,
 * errors }`; the class names place each field in the caller's grid.
 *
 * `dark` drops the visible labels (placeholders and `aria-label`s instead)
 * and styles both fields for a navy card; `labelled` puts small light mono
 * labels back above them (the catalog's Build your brief card).
 * `country={false}` leaves the dropdown out (the header's Build your brief
 * form, whose Zoho form has no country): the phone input alone, with the
 * dial code still taken from its flag.
 *
 * `dropUp` opens the flag list above the field — for a container that
 * clips below it (the header's brief panel scrolls, so a list opening
 * downward is cut off at its bottom edge).
 *
 * `renderField({ label, error, className, children })` replaces the field
 * wrapper (label + error) and `phoneInputClassName` the phone input's look,
 * for a form whose own fields look different (the header's brief composer).
 *
 * react-phone-input-2 is client-only and ships its own stylesheet, imported
 * here; Tailwind overrides need `!` (TASTE.md §7.2).
 */
export default function CountryPhoneFields({
  form: { register, control, watch, setValue, errors },
  countryClassName,
  phoneClassName,
  phoneLabel = "Phone number",
  dark = false,
  labelled = false,
  country: withCountry = true,
  renderField,
  phoneInputClassName,
  dropUp = false,
}) {
  // React's ids look like `«R1a»`; keep only [A-Za-z0-9_-] so a checker that
  // matches `label[for]` with a plain selector still pairs label and input.
  const phoneId = `phone-${useId().replace(/[^\w-]/g, "")}`;
  // The ~235 country <option>s render only once the dropdown is first
  // touched: this field sits in up to three forms per course page, and the
  // full lists otherwise add ~700 elements to the initial HTML. Mounted on
  // pointer-down and key-down as well as focus, so the list is in place
  // before the native dropdown opens.
  const [listMounted, setListMounted] = useState(false);
  const mountList = () => setListMounted(true);
  const selectedCountry = watch("country");
  const selectedIso =
    COUNTRIES.find((country) => country.name === watch("country"))?.iso2 || "us";

  function onPhoneChange(field, value, data) {
    field.onChange(value);
    setValue("dialCode", data?.dialCode ?? "");
    const match = COUNTRIES.find((country) => country.iso2 === data?.countryCode);
    if (match && match.name !== watch("country")) setValue("country", match.name);
  }

  // A plain call, not a component defined in render — that would remount
  // the phone input (and drop its focus) on every keystroke.
  const phoneField = (props) =>
    renderField ? renderField(props) : <Field dark={dark} labelled={labelled} {...props} />;

  return (
    <>
      {withCountry ? (
      <Field dark={dark} labelled={labelled} label="Country" error={errors.country?.message} className={countryClassName}>
        <select
          {...register("country", { required: "Please select your country." })}
          autoComplete="country-name"
          aria-label="Country"
          aria-invalid={Boolean(errors.country)}
          onPointerDown={mountList}
          onKeyDown={mountList}
          onFocus={mountList}
          className={
            dark
              ? cn(
                  darkInputClasses,
                  "appearance-none bg-[linear-gradient(45deg,transparent_50%,var(--color-lime)_50%),linear-gradient(135deg,var(--color-lime)_50%,transparent_50%)] bg-[length:5px_5px] bg-[position:calc(100%-18px)_55%,calc(100%-13px)_55%] bg-no-repeat pr-9 [&_option]:text-ink",
                )
              : formInputClasses
          }
        >
          <option value="" disabled>
            {dark ? "Select Country*" : "Select your country"}
          </option>
          {listMounted ? (
            <>
              {/* Same list and order as the phone input's: preferred
                  countries, a divider, then everything A–Z. */}
              {PREFERRED_COUNTRIES.map((iso2) => COUNTRIES.find((country) => country.iso2 === iso2)).map((country) => (
                <option key={`preferred-${country.iso2}`} value={country.name}>
                  {country.name}
                </option>
              ))}
              <option disabled>──────────</option>
              {COUNTRIES.filter((country) => !PREFERRED_COUNTRIES.includes(country.iso2)).map((country) => (
                <option key={country.iso2} value={country.name}>
                  {country.name}
                </option>
              ))}
            </>
          ) : selectedCountry ? (
            // A value set before the list mounts (e.g. by picking a phone
            // flag) still needs its own <option> for the select to show it.
            <option value={selectedCountry}>{selectedCountry}</option>
          ) : null}
        </select>
      </Field>
      ) : null}

      {phoneField({
        label: phoneLabel,
        error: errors.phone?.message,
        // The wrapper labels the input with `htmlFor` rather than wrapping it:
        // the widget's <div>s are not allowed inside a <label>.
        inputId: phoneId,
        className: phoneClassName,
        children: (
          <>
            <input type="hidden" {...register("dialCode")} />
            <Controller
              name="phone"
              control={control}
              rules={{ validate: (value) => validPhone(value, watch("dialCode")) }}
              render={({ field }) => (
                <PhoneInput
                  country={selectedIso}
                  preferredCountries={PREFERRED_COUNTRIES}
                  // Keep the chosen country fixed. Without these, the input
                  // re-guesses the country from the national digits as they are
                  // typed (observed flipping US → Russia → India on a plain
                  // local number) and lets the dial code be edited away. The
                  // country still changes only when the user picks it — from
                  // the dropdown (via `selectedIso`) or the flag menu.
                  disableCountryGuess
                  countryCodeEditable={false}
                  // Territories (Bermuda, Gibraltar…) are hidden by default;
                  // shown so the flag list matches the Country dropdown.
                  enableTerritories
                  // A search box at the top of the flag menu, as on the
                  // platform pages' phone field. 16px text so iOS does not
                  // zoom in when it is tapped.
                  enableSearch
                  disableSearchIcon
                  searchPlaceholder="Search country"
                  searchNotFound="No country found"
                  // Our names over the library's dated ones (Macedonia,
                  // Swaziland, two "Congo"s) — see `lib/countries.js`.
                  localization={PHONE_LOCALIZATION}
                  value={field.value}
                  onChange={(value, data) => onPhoneChange(field, value, data)}
                  onBlur={field.onBlur}
                  inputProps={{
                    id: phoneId,
                    name: field.name,
                    ref: field.ref,
                    autoComplete: "tel",
                    "aria-label": dark ? phoneLabel : undefined,
                    "aria-invalid": Boolean(errors.phone),
                  }}
                  containerClass={cn(
                    // A size container, so the flag list (positioned inside
                    // the flag button, not the field) can be sized to the
                    // whole field with `cqw`.
                    "@container !w-full !font-body",
                    // Flag button: no box of its own — a divider inside the
                    // field's border, with a light hover/open tint.
                    "[&_.flag-dropdown]:!rounded-l-xl [&_.flag-dropdown]:!border-transparent [&_.flag-dropdown]:!border-r-ink/12 [&_.flag-dropdown]:!bg-transparent",
                    "[&_.flag-dropdown.open]:!bg-transparent [&_.flag-dropdown.open_.selected-flag]:!bg-ink/5",
                    "[&_.selected-flag]:!w-14 [&_.selected-flag]:!rounded-l-xl [&_.selected-flag]:!pl-4 [&_.selected-flag:hover]:!bg-ink/5 [&_.selected-flag:focus]:!bg-ink/5",
                    dark &&
                      "[&_.flag-dropdown]:!border-r-paper/12 [&_.flag-dropdown.open_.selected-flag]:!bg-paper/10 [&_.selected-flag:hover]:!bg-paper/10 [&_.selected-flag:focus]:!bg-paper/10 [&_.selected-flag_.arrow]:!border-t-paper/70",
                  )}
                  inputClass={
                    phoneInputClassName ??
                    (dark
                      ? "!h-auto !w-full !rounded-xl !border-paper/12 !bg-paper/5 !py-3.25 !pl-[4.25rem] !pr-3.5 !font-body !text-[14.5px] !leading-normal !text-paper focus:!border-lime focus:!bg-paper/8"
                      : "!h-auto !w-full !rounded-xl !border-ink/15 !bg-paper !py-3 !pl-[4.25rem] !pr-3.5 !text-[13.5px] !leading-normal !text-ink focus:!border-navy focus:!bg-white")
                  }
                  dropdownClass={cn(
                    // As wide as the input, no wider; the search box sits flush at the
                    // top so rows don't show above it while scrolling.
                    "!-ml-px !w-[100cqw] !max-h-64 !rounded-xl !border !border-ink/12 !bg-white !pt-0 !pb-1.5 !text-[13.5px] !text-ink !shadow-[0_18px_40px_-20px_rgba(10,22,40,0.45)]",
                    "[&_.country]:!flex [&_.country]:!items-center [&_.country]:!gap-2.5 [&_.country]:!px-3.5 [&_.country]:!py-2.5",
                    "[&_.country_.flag]:!m-0 [&_.country_.flag]:!shrink-0 [&_.country-name]:!mr-0",
                    dropUp ? "!top-auto !bottom-full !mt-0 !mb-2 !max-h-52" : "!mt-2",
                    "[&_.country:hover]:!bg-paper [&_.country.highlight]:!bg-paper [&_.dial-code]:!text-ink-muted [&_.divider]:!mx-3 [&_.divider]:!border-ink/10",
                    // The search box: pinned above the list while it scrolls.
                    "[&_.search]:!sticky [&_.search]:!top-0 [&_.search]:!z-[1] [&_.search]:!-mt-1.5 [&_.search]:!bg-white [&_.search]:!px-2.5 [&_.search]:!pt-2.5 [&_.search]:!pb-2",
                    "[&_.search-box]:!m-0 [&_.search-box]:!w-full [&_.search-box]:!rounded-lg [&_.search-box]:!border [&_.search-box]:!border-ink/15 [&_.search-box]:!bg-paper [&_.search-box]:!px-3 [&_.search-box]:!py-2 [&_.search-box]:!font-body [&_.search-box]:!text-base [&_.search-box]:!leading-normal [&_.search-box]:!text-ink [&_.search-box]:placeholder:!text-ink/45 [&_.search-box:focus]:!border-navy [&_.search-box:focus]:!bg-white [&_.search-box:focus]:!outline-none",
                    "[&_.no-entries-message]:!px-3.5 [&_.no-entries-message]:!py-2.5 [&_.no-entries-message]:!text-ink-muted",
                  )}
                />
              )}
            />
          </>
        ),
      })}
    </>
  );
}

/** The honeypot (TASTE.md §7.1): off-screen and out of the tab order, so only
 * a bot fills it — the lead pipeline then drops the submission. */
export function HoneypotField({ register }) {
  return (
    <input
      {...register("company_website")}
      type="text"
      aria-label="Leave this field empty"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="absolute -left-[9999px] size-px opacity-0"
    />
  );
}
