"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

let fired = null;

// Fires the GA4 key event once per page load of /thank-you/ (spec §9.8).
export default function LeadEvent({ formLocation, service, fleetSize }) {
  useEffect(() => {
    if (!fleetSize) return; // direct visits are not leads
    const key = `${formLocation}|${service}|${fleetSize}|${location.href}`;
    if (fired === key) return;
    fired = key;
    track("generate_lead", { form_location: formLocation, service, fleet_size: fleetSize });
  }, [formLocation, service, fleetSize]);
  return null;
}
