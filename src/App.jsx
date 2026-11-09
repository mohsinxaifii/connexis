import { Routes, Route, useParams } from "react-router";
import Shell from "@/components/layout/Shell";
import Home from "@/pages/Home";
import Service from "@/pages/Service";
import Platform from "@/pages/Platform";
import { Industries, Industry } from "@/pages/Industries";
import { Cases, Case } from "@/pages/Cases";
import About from "@/pages/About";
import { Contact, Demo, ThankYou } from "@/pages/Contact";
import Faq from "@/pages/Faq";
import { Privacy, Terms } from "@/pages/Legal";
import NotFound from "@/pages/NotFound";
import { getService } from "@/content/services";

function ServiceOr404() {
  const { slug } = useParams();
  const s = getService(slug);
  return s ? <Service key={s.slug} service={s} /> : <NotFound />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route index element={<Home />} />
        <Route path="platform" element={<Platform />} />
        <Route path="industries" element={<Industries />} />
        <Route path="industries/:slug" element={<Industry />} />
        <Route path="case-studies" element={<Cases />} />
        <Route path="case-studies/:slug" element={<Case />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="request-a-demo" element={<Demo />} />
        <Route path="thank-you" element={<ThankYou />} />
        <Route path="faq" element={<Faq />} />
        <Route path="privacy-policy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path=":slug" element={<ServiceOr404 />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
