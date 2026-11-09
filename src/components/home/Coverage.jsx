import { PhoneCall, Wrench, Users, FileChartColumn } from "lucide-react";
import { Head, useReveal } from "@/components/ui/Page";
import { Photo } from "@/components/ui/Bits";
import { photos } from "@/content/media";

const STEPS = [
  { icon: PhoneCall, title: "Free fleet review", text: "A 20-minute call about your vehicles." },
  { icon: Wrench, title: "We install on site", text: "At your depot, in any of 29 cities." },
  { icon: Users, title: "Your team logs in", text: "Each manager sees only their vehicles." },
  { icon: FileChartColumn, title: "Reports from day one", text: "26 reports, ready to export." },
];

export default function Coverage() {
  const ref = useReveal();
  return (
    <section ref={ref} className="section setup" data-theme="paper" aria-labelledby="setup-title">
      <div className="wrap setup__grid">
        <Photo photo={photos.technician} className="setup__photo rv" />
        <div>
          <Head id="setup-title" tag="Getting started" title="Up and running in four steps" size="d-m" />
          <ol className="setup__steps">
            {STEPS.map((s, i) => (
              <li key={s.title} className="setup__step rv">
                <span className="setup__icon">
                  <s.icon size={22} strokeWidth={1.7} />
                  <em>{i + 1}</em>
                </span>
                <span>
                  <b>{s.title}</b>
                  <span>{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
