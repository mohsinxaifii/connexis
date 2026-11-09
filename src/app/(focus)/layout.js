import Header from "@/components/layout/Header";
import StickyContact from "@/components/layout/StickyContact";
import MotionRoot from "@/components/motion/MotionRoot";
import Cursor from "@/components/motion/Cursor";

// Landing-page shell for ads and CTAs: logo and phone only, no menu, to cut exits (spec §7.5).
export default function FocusLayout({ children }) {
  return (
    <>
      <Header minimal />
      <main id="main">{children}</main>
      <StickyContact />
      <MotionRoot />
      <Cursor />
    </>
  );
}
