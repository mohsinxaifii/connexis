"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { promises as fs } from "fs";
import path from "path";

// Lead handling (spec §9.9): validate, check Turnstile, rate-limit, strip HTML, deliver, back up,
// then redirect to /thank-you/ which fires generate_lead.

const FLEET = ["1-10", "11-50", "51-200", "200+"];
const INTERESTS = ["Tracking", "Fuel", "Genset", "Dashcam", "Temperature", "Assets"];

const strip = (v) => (typeof v === "string" ? v.replace(/<[^>]*>/g, "").replace(/[\u0000-\u001f]/g, " ").trim() : v);

const schema = z.object({
  name: z.string().min(2, "Please enter your name").max(80),
  company: z.string().min(2, "Please enter your company").max(120),
  phone: z
    .string()
    .min(7, "Please enter a phone number")
    .max(20)
    .regex(/^[+\d][\d\s-]{6,19}$/, "Please enter a valid phone number"),
  email: z.email("Please enter a valid email").max(120),
  fleet: z.enum(FLEET, { message: "Please choose your fleet size" }),
  interests: z.array(z.enum(INTERESTS)).max(6),
  city: z.string().min(2, "Please enter your city").max(60),
  service: z.string().max(60).optional(),
  caseSlug: z.string().max(80).optional(),
  location: z.string().max(40).optional(),
});

const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 60 * 60 * 1000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Not configured yet (local / staging)
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const data = await res.json().catch(() => ({}));
  return Boolean(data.success);
}

async function deliver(lead) {
  const jobs = [];
  // CRM (HubSpot/Zoho) or automation webhook, e.g. a Zapier/Make hook that also pings sales on WhatsApp
  if (process.env.LEAD_WEBHOOK_URL) {
    jobs.push(
      fetch(process.env.LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      })
    );
  }
  // Email to sales through Resend
  if (process.env.RESEND_API_KEY && process.env.LEAD_EMAIL_TO) {
    jobs.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.LEAD_EMAIL_FROM || "Connexis Website <leads@connexistracking.com>",
          to: process.env.LEAD_EMAIL_TO.split(","),
          reply_to: lead.email,
          subject: `Demo request: ${lead.company} (${lead.fleet} vehicles)`,
          text: Object.entries(lead)
            .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v ?? ""}`)
            .join("\n"),
        }),
      })
    );
  }
  // Backup copy (local disk; on Vercel use the CRM/webhook as the system of record)
  jobs.push(
    (async () => {
      const dir = path.join(process.cwd(), ".data");
      await fs.mkdir(dir, { recursive: true });
      await fs.appendFile(path.join(dir, "leads.jsonl"), JSON.stringify(lead) + "\n");
    })()
  );
  const results = await Promise.allSettled(jobs);
  results.filter((r) => r.status === "rejected").forEach((r) => console.error("[lead] delivery failed:", r.reason));
  if (!jobs.length || process.env.NODE_ENV !== "production") console.info("[lead]", lead);
}

export async function submitLead(_prev, formData) {
  const h = await headers();
  const ip = (h.get("x-forwarded-for") || "").split(",")[0].trim() || h.get("x-real-ip") || "unknown";

  const values = {
    name: strip(formData.get("name") || ""),
    company: strip(formData.get("company") || ""),
    phone: strip(`${formData.get("dial") || "+92"} ${formData.get("phone") || ""}`.trim()),
    email: strip(formData.get("email") || ""),
    fleet: strip(formData.get("fleet") || ""),
    interests: formData.getAll("interests").map(strip),
    city: strip(formData.get("city") || ""),
    service: strip(formData.get("service") || "") || undefined,
    caseSlug: strip(formData.get("case") || "") || undefined,
    location: strip(formData.get("location") || "") || undefined,
  };
  // Keep what the visitor typed (without the dial code) so the form can be re-filled on error
  const echo = { ...values, phone: strip(formData.get("phone") || ""), dial: formData.get("dial") || "+92" };

  // Honeypot
  if (formData.get("website")) redirect("/thank-you/");

  if (rateLimited(ip)) {
    return { ok: false, values: echo, formError: "Too many requests from this connection. Please call us or try again in an hour." };
  }

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const errors = {};
    for (const issue of parsed.error.issues) errors[issue.path[0]] ??= issue.message;
    return { ok: false, values: echo, errors };
  }

  const human = await verifyTurnstile(formData.get("cf-turnstile-response"), ip);
  if (!human) {
    return { ok: false, values: echo, formError: "We couldn't verify the request. Please refresh the page and try again." };
  }

  const lead = { ...parsed.data, submittedAt: new Date().toISOString(), ip, page: h.get("referer") || "" };
  await deliver(lead);

  const q = new URLSearchParams({ fleet: lead.fleet, service: lead.service || lead.interests[0] || "", loc: lead.location || "" });
  redirect(`/thank-you/?${q}`);
}
