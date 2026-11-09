import { useRef, useState } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import { track } from "@/lib/analytics";
import { site } from "@/content/site";

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

// Web3Forms relays the POST to the sales inbox by email (its access key is a public form id).
// An optional webhook (CRM / Zapier / Make) receives the same lead as JSON.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
const WEBHOOK = import.meta.env.VITE_LEAD_WEBHOOK_URL;

const clean = (v) => String(v || "").replace(/<[^>]*>/g, "").replace(/[\u0000-\u001f]/g, " ").trim();

function validate(v) {
  const e = {};
  if (v.name.length < 2) e.name = "Please enter your name";
  if (v.company.length < 2) e.company = "Please enter your company";
  if (!/^[\d\s-]{6,19}$/.test(v.phone)) e.phone = "Please enter a valid phone number";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) e.email = "Please enter a valid email";
  if (!FLEET.includes(v.fleet)) e.fleet = "Please choose your fleet size";
  if (v.city.length < 2) e.city = "Please enter your city";
  return e;
}

async function deliver(lead) {
  const jobs = [];
  if (WEB3FORMS_KEY) {
    jobs.push(
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Demo request: ${lead.company} (${lead.fleet} vehicles)`,
          from_name: "Connexis website",
          replyto: lead.email,
          ...lead,
          interests: lead.interests.join(", "),
        }),
      }).then(async (r) => {
        const d = await r.json().catch(() => ({}));
        if (!r.ok || !d.success) throw new Error(d.message || "Web3Forms rejected the lead");
      })
    );
  }
  if (WEBHOOK) {
    jobs.push(fetch(WEBHOOK, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead), mode: "no-cors" }));
  }
  if (!jobs.length) {
    if (import.meta.env.DEV) {
      console.info("[lead] no VITE_WEB3FORMS_KEY set; lead not sent", lead);
      return;
    }
    throw new Error("Lead delivery is not configured");
  }
  const results = await Promise.allSettled(jobs);
  if (results.every((r) => r.status === "rejected")) throw results[0].reason;
}

export default function DemoForm({ location = "page", service, caseSlug, id = "demo-form" }) {
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);
  const started = useRef(false);
  const alertRef = useRef(null);

  const onStart = () => {
    if (started.current) return;
    started.current = true;
    track("form_start", { form_location: location });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("website")) return;
    const v = {
      name: clean(fd.get("name")),
      company: clean(fd.get("company")),
      phone: clean(fd.get("phone")),
      email: clean(fd.get("email")),
      fleet: clean(fd.get("fleet")),
      interests: fd.getAll("interests").map(clean),
      city: clean(fd.get("city")),
    };
    const errs = validate(v);
    setErrors(errs);
    setFormError("");
    if (Object.keys(errs).length) {
      requestAnimationFrame(() => alertRef.current?.focus());
      return;
    }
    const lead = {
      ...v,
      phone: `${clean(fd.get("dial")) || "+92"} ${v.phone}`,
      service: service || "",
      caseSlug: caseSlug || "",
      location,
      page: window.location.href,
      submittedAt: new Date().toISOString(),
    };
    setPending(true);
    try {
      await deliver(lead);
      track("generate_lead", { form_location: location, fleet_size: lead.fleet, service: lead.service || lead.interests[0] || "" });
      const q = new URLSearchParams({ fleet: lead.fleet, service: lead.service || lead.interests[0] || "" });
      window.dispatchEvent(new CustomEvent("cx:navigate", { detail: { to: `/thank-you/?${q}` } }));
    } catch {
      setFormError(`We couldn't send your request. Please call ${site.phones[0].label} or WhatsApp us, and we'll set up the demo by phone.`);
      requestAnimationFrame(() => alertRef.current?.focus());
    } finally {
      setPending(false);
    }
  };

  const errCount = Object.keys(errors).length;
  const describe = (k) => (errors[k] ? { "aria-invalid": true, "aria-describedby": `${id}-${k}-err` } : {});

  return (
    <form className="form" id={id} noValidate onSubmit={onSubmit} onFocus={onStart} aria-describedby={`${id}-note`}>
      <div className="hp" aria-hidden="true">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {(errCount > 0 || formError) && (
        <div ref={alertRef} tabIndex={-1} role="alert" className="form__alert">
          {formError || `Please check ${errCount === 1 ? "one field" : `${errCount} fields`} below.`}
        </div>
      )}

      <div className="form__grid">
        <Field id={`${id}-name`} label="Name" error={errors.name}>
          <input id={`${id}-name`} name="name" autoComplete="name" className="field" required {...describe("name")} />
        </Field>
        <Field id={`${id}-company`} label="Company" error={errors.company}>
          <input id={`${id}-company`} name="company" autoComplete="organization" className="field" required {...describe("company")} />
        </Field>
        <Field id={`${id}-phone`} label="Phone" error={errors.phone}>
          <div className="form__phone">
            <label htmlFor={`${id}-dial`} className="sr-only">
              Country code
            </label>
            <select id={`${id}-dial`} name="dial" defaultValue="+92" className="field">
              {DIAL.map(([val, label]) => (
                <option key={val} value={val}>
                  {label}
                </option>
              ))}
            </select>
            <input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="300 1234567" className="field" required {...describe("phone")} />
          </div>
        </Field>
        <Field id={`${id}-email`} label="Work email" error={errors.email}>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" className="field" required {...describe("email")} />
        </Field>
      </div>

      <fieldset className="form__set" {...(errors.fleet ? { "aria-describedby": `${id}-fleet-err` } : {})}>
        <legend>Fleet size</legend>
        <div className="form__fleet">
          {FLEET.map((f) => (
            <label key={f} className="opt">
              <input type="radio" name="fleet" value={f} required />
              <span className="num">{FLEET_LABEL[f]}</span>
            </label>
          ))}
        </div>
        {errors.fleet && <ErrorText id={`${id}-fleet-err`}>{errors.fleet}</ErrorText>}
      </fieldset>

      <fieldset className="form__set">
        <legend>
          Interested in <span className="form__opt">(optional)</span>
        </legend>
        <div className="form__chips">
          {INTERESTS.map((it) => (
            <label key={it} className="opt opt--chip">
              <input type="checkbox" name="interests" value={it} defaultChecked={service === it} />
              <span>{it}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field id={`${id}-city`} label="City" error={errors.city}>
        <input id={`${id}-city`} name="city" list={`${id}-cities`} autoComplete="address-level2" className="field" required {...describe("city")} />
        <datalist id={`${id}-cities`}>
          {CITIES.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </Field>

      <button type="submit" disabled={pending} className="btn btn--signal btn--block form__submit">
        {pending ? (
          <>
            <Loader2 size={18} className="spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          <>
            Book my live demo <ArrowRight size={18} />
          </>
        )}
      </button>
      <p id={`${id}-note`} className="form__note mono">
        No spam. {site.callbackPromise}
      </p>
    </form>
  );
}

function Field({ id, label, error, children }) {
  return (
    <div className="form__field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <ErrorText id={`${id}-err`}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }) {
  return (
    <p id={id} className="form__err">
      {children}
    </p>
  );
}
