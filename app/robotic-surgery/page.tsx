import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { doctor, images, media, meta, pageName, reviews } from "@/content/pages/robotic-surgery";
import { pages } from "@/content/pages";
import { pageViewport } from "@/lib/seo";

import { HeroSlider } from "@/components/pages/robotic-surgery/HeroSlider";
import { IntroSection } from "@/components/pages/robotic-surgery/IntroSection";
import { RoboticsInOncology } from "@/components/pages/robotic-surgery/RoboticsInOncology";
import { SurgicalTechniques } from "@/components/pages/robotic-surgery/SurgicalTechniques";
import { RoboticVsOpen } from "@/components/pages/robotic-surgery/RoboticVsOpen";
import { ComparingModalities } from "@/components/pages/robotic-surgery/ComparingModalities";
import { SurgeryNumbers } from "@/components/pages/robotic-surgery/SurgeryNumbers";
import { CancersWeTreat } from "@/components/pages/robotic-surgery/CancersWeTreat";
import { Benefits } from "@/components/pages/robotic-surgery/Benefits";
import { RoboticJsonLd } from "@/components/pages/robotic-surgery/RoboticJsonLd";
import { pillLook } from "@/components/pages/robotic-surgery/pills";
import { roboticFormStyles } from "@/components/pages/robotic-surgery/form-styles";
import { DoctorCard } from "@/components/shared/DoctorCard";
import { Videos } from "@/components/shared/Videos";
import { Reviews } from "@/components/shared/Reviews";
import { AppointmentSection } from "@/components/shared/AppointmentSection";
import { Locations } from "@/components/shared/Locations";
import { FinalCta } from "@/components/shared/FinalCta";

// Below the fold and JS-heavy (scroll-driven): split into its own chunk.
const InsideTheRobot = dynamic(() =>
  import("@/components/pages/robotic-surgery/InsideTheRobot").then((m) => m.InsideTheRobot),
);

export const metadata: Metadata = {
  title: { absolute: meta.title },
  description: meta.description,
  alternates: { canonical: meta.canonical },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: meta.canonical,
    title: meta.title,
    description: meta.description,
    images: [{ url: meta.ogImage.src, width: meta.ogImage.width, height: meta.ogImage.height }],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
    images: [meta.ogImage.src],
  },
};

export function generateViewport(): Viewport {
  return pageViewport(pages["robotic-surgery"]);
}

// Header, footer, WhatsApp and the appointment context come from app/robotic-surgery/layout.tsx (SiteShell).
export default function RoboticSurgeryPage() {
  return (
    <>
      <RoboticJsonLd />
      <HeroSlider /> {/* 1  #hero             black   */}
      <IntroSection /> {/* 2  #overview         white   */}
      <RoboticsInOncology /> {/* 3  #why-robotic      surface */}
      <SurgicalTechniques /> {/* 4  #techniques       white   */}
      <InsideTheRobot /> {/* 5  #inside-the-robot black   */}
      <RoboticVsOpen /> {/* 6  #outcomes         ink     */}
      <ComparingModalities /> {/* 7  #compare          white   */}
      <SurgeryNumbers /> {/* 8  #numbers          black   */}
      <CancersWeTreat /> {/* 9  #cancers          surface */}
      <Benefits /> {/* 10 #benefits         white   */}
      <DoctorCard id="doctor" tone="surface" look="classic" {...doctor} ctaLook={pillLook.primary} />{" "}
      {/* 11 #doctor           surface */}
      <Videos
        id="media"
        tone="white"
        look="classic"
        eyebrow={media.eyebrow}
        title={media.heading}
        ids={media.videos}
        labels={media.a11y}
      />{" "}
      {/* 12 #media            white   */}
      <Reviews tone="surface" look="classic" title={reviews.heading} reviews={reviews.items} />{" "}
      {/* 13 #reviews          surface */}
      <AppointmentSection tone="white" look="classic" page={pageName} formStyles={roboticFormStyles} />{" "}
      {/* 14 #appointment      white   */}
      <Locations tone="surface" look="classic" /> {/* 15 #locations        surface */}
      <FinalCta look="classic" image={images.armsBlack} /> {/* 16 ink → teal band */}
    </>
  );
}
