import { CalendarCheck, Headset, LayoutDashboard, Wrench } from "lucide-react";

const STEPS = [
  { t: "Fleet review", d: "A 20-minute call to map the vehicles, sensors and reports you need.", icon: CalendarCheck },
  { t: "Installation", d: "Our technicians fit devices at your depot, in any of 29 cities.", icon: Wrench },
  { t: "Your dashboard", d: "Custom geofences, alerts and reports, plus training for your team.", icon: LayoutDashboard },
  { t: "Ongoing support", d: "Monitoring, maintenance and an account manager.", icon: Headset },
];

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="section bg-white">
      <div className="container-x">
        <p className="inline-flex items-center gap-2.5 text-[14px] text-grey-600">
          <span className="h-2 w-2 rounded-full bg-red-500" /> How it works
        </p>
        <h2 id="how-title" data-split className="mt-4 max-w-[900px] font-display text-[44px] font-bold leading-[0.95] tracking-[-0.05em] md:text-[80px]">
          From first call to live map.
        </h2>
        <ol className="relative mt-16 grid gap-10 border-t border-grey-200 pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <span className="absolute left-0 top-[-1px] h-[2px] w-[10%] bg-red-500" aria-hidden="true" />
          {STEPS.map((s, i) => {
            const I = s.icon;
            return (
              <li key={s.t} className="reveal" style={{ "--i": i }}>
                <span className="text-[14px] font-semibold tabular-nums text-red-500">0{i + 1}</span>
                <span className="mt-6 grid h-14 w-14 place-items-center rounded-full bg-grey-100">
                  <I size={22} strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 font-display text-[26px] font-bold tracking-[-0.035em]">{s.t}</h3>
                <p className="mt-3 max-w-[300px] text-[16px] text-grey-600">{s.d}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
