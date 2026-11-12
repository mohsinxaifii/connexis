import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import { gsap } from "./lib/motion";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/home.css";
import "./styles/pages.css";

// During the first-visit intro, hold page animations so the hero plays as the iris opens.
if (document.documentElement.classList.contains("intro-on")) {
  gsap.globalTimeline.pause();
  setTimeout(() => gsap.globalTimeline.resume(), 1850);
}

const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || undefined;
const root = document.getElementById("root");
const app = (
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
