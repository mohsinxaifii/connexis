"use client";

import { useActionState, useEffect, useRef } from "react";
import Script from "next/script";
import { Loader2 } from "lucide-react";
import { submitLead } from "@/app/actions";
import { track } from "@/lib/analytics";

const FLEET = ["1-10", "11-50", "51-200", "200+"];
const FLEET_LABEL = { "1-10": "1–10", "11-50": "11–50", "51-200": "51–200", "200+": "200+" };
const INTERESTS = ["Tracking", "Fuel", "Genset", "Dashcam", "Temperature", "Assets"];
const DIAL = [
  ["+92", "PK +92"],
  ["+971", "AE +971"],
  ["+966", "SA +966"],
  ["+44", "UK +44"],
  ["+1", "US +1"],
];
const CITIES = ["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta", "Gilgit", "Sialkot", "Gujranwala", "Hyderabad"];

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// The demo form (spec §5.10). Same component everywhere; `service` pre-selects an interest chip.
export default function DemoForm({ location = "page", service, caseSlug, compact = false, id = "demo-form" }) {
  const [state, action, pending] = useActionState(submitLead, { ok: null });
  const started = useRef(false);
  const errorRef = useRef(null);
  const v = state?.values || {};
  const err = state?.errors || {};

  useEffect(() => {
    if (state?.errors || state?.formError) errorRef.current?.focus();
  }, [state]);

  const onStart = () => {
    if (started.current) return;
    started.current = true;
    track("form_start", { form_location: location });
  };

  const selected = v.interests || (service ? [service] : []);
  const errCount = Object.keys(err).length;

  return (
    <form action={action} onFocus={onStart} noValidate className="grid gap-5" id={id} aria-describedby={`${id}-note`}>
      <input type="hidden" name="location" value={location} />
      {service && <input type="hidden" name="service" value={service} />}
      {caseSlug && <input type="hidden" name="case" value={caseSlug} />}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {(errCount > 0 || state?.formError) && (
        <div ref={errorRef} tabIndex={-1} role="alert" className="rounded-lg border border-red-500 bg-red-050 p-4 text-[15px] text-ink-900 outline-none">
          {state.formError || `Please check ${errCount === 1 ? "one field" : `${errCount} fields`} below.`}
        </div>
      )}

      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <Field id={`${id}-name`} label="Name" error={err.name}>
          <input id={`${id}-name`} name="name" autoComplete="name" defaultValue={v.name} className="field" aria-invalid={!!err.name} aria-describedby={err.name ? `${id}-name-err` : undefined} required />
        </Field>
        <Field id={`${id}-company`} label="Company" error={err.company}>
          <input id={`${id}-company`} name="company" autoComplete="organization" defaultValue={v.company} className="field" aria-invalid={!!err.company} aria-describedby={err.company ? `${id}-company-err` : undefined} required />
        </Field>
        <Field id={`${id}-phone`} label="Phone" error={err.phone}>
          <div className="flex gap-2">
            <label htmlFor={`${id}-dial`} className="sr-only">
              Country code
            </label>
            <select id={`${id}-dial`} name="dial" defaultValue={v.dial || "+92"} className="field !w-[104px] shrink-0 !px-3">
              {DIAL.map(([val, label]) => (
                <option key={val} value={val}>
                  {label}
                </option>
              ))}
            </select>
            <input
              id={`${id}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="300 1234567"
              defaultValue={v.phone}
              className="field"
              aria-invalid={!!err.phone}
              aria-describedby={err.phone ? `${id}-phone-err` : undefined}
              required
            />
          </div>
        </Field>
        <Field id={`${id}-email`} label="Work email" error={err.email}>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" defaultValue={v.email} className="field" aria-invalid={!!err.email} aria-describedby={err.email ? `${id}-email-err` : undefined} required />
        </Field>
      </div>

      <fieldset aria-describedby={err.fleet ? `${id}-fleet-err` : undefined}>
        <legend className="mb-2 text-[15px] font-medium">Fleet size</legend>
        <div className="grid grid-cols-4 gap-2">
          {FLEET.map((f) => (
            <label key={f} className="relative cursor-pointer">
              <input type="radio" name="fleet" value={f} defaultChecked={v.fleet === f} className="peer sr-only" required />
              <span className="flex min-h-[48px] items-center justify-center rounded-lg border border-grey-200 bg-white text-[15px] font-medium tabular-nums transition-colors hover:border-grey-400 peer-checked:border-ink-900 peer-checked:bg-ink-900 peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-red-500">
                {FLEET_LABEL[f]}
              </span>
            </label>
          ))}
        </div>
        {err.fleet && <ErrorText id={`${id}-fleet-err`}>{err.fleet}</ErrorText>}
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-[15px] font-medium">
          Interested in <span className="font-normal text-grey-600">(optional)</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((it) => (
            <label key={it} className="relative cursor-pointer">
              <input type="checkbox" name="interests" value={it} defaultChecked={selected.includes(it)} className="peer sr-only" />
              <span className="inline-flex min-h-[44px] items-center rounded-full border border-grey-200 bg-white px-4 text-[15px] font-medium transition-colors hover:border-grey-400 peer-checked:border-red-500 peer-checked:bg-red-050 peer-checked:text-red-600 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-red-500">
                {it}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field id={`${id}-city`} label="City" error={err.city}>
        <input id={`${id}-city`} name="city" list={`${id}-cities`} autoComplete="address-level2" defaultValue={v.city} className="field" aria-invalid={!!err.city} aria-describedby={err.city ? `${id}-city-err` : undefined} required />
        <datalist id={`${id}-cities`}>
          {CITIES.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </Field>

      {SITE_KEY && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
          <div className="cf-turnstile" data-sitekey={SITE_KEY} data-size="invisible" />
        </>
      )}

      <button type="submit" disabled={pending} className="btn btn-primary w-full !min-h-[54px] text-[17px] disabled:opacity-70">
        {pending ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          "Book my live demo"
        )}
      </button>
      <p id={`${id}-note`} className="t-small -mt-2 text-center text-grey-600">
        No spam. We only use your details to arrange the demo.
      </p>
    </form>
  );
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[15px] font-medium">
        {label}
      </label>
      {children}
      {error && <ErrorText id={`${id}-err`}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }) {
  return (
    <p id={id} className="mt-1.5 text-[14px] font-medium text-red-600">
      {children}
    </p>
  );
}
