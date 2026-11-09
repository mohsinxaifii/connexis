export default function SectionHead({ eyebrow, title, intro, align = "left", as: H = "h2", id, className = "", dark = false }) {
  const center = align === "center";
  return (
    <div className={`max-w-[760px] ${center ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && (
        <p className={`eyebrow reveal mb-4 ${dark ? "!text-white/60" : ""}`}>{eyebrow}</p>
      )}
      <H id={id} data-split className="t-h2">
        {title}
      </H>
      {intro && <p className={`reveal mt-5 text-[17px] md:text-[19px] ${dark ? "text-white/70" : "text-grey-600"}`}>{intro}</p>}
    </div>
  );
}
