import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyContact from "@/components/layout/StickyContact";
import MotionRoot from "@/components/motion/MotionRoot";
import Cursor from "@/components/motion/Cursor";

// Main site shell. `modal` is the parallel slot used by the case-study popup (spec §5.4).
export default function SiteLayout({ children, modal }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <StickyContact />
      <MotionRoot />
      <Cursor />
      {modal}
    </>
  );
}
