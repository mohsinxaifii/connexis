"use client";

import { useEffect, useState } from "react";

const fmt = () => new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Karachi", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(new Date());

export default function LiveClock() {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{t}</span>;
}
