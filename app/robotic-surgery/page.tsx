import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { meta } from "@/content/robotic-surgery";

import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppWidget } from "@/components/layout/WhatsAppWidget";

import { HeroSlider } from "@/components/robotic/HeroSlider";
import { IntroSection } from "@/components/robotic/IntroSection";
import { RoboticsInOncology } from "@/components/robotic/RoboticsInOncology";
import { SurgicalTechniques } from "@/components/robotic/SurgicalTechniques";
import { RoboticVsOpen } from "@/components/robotic/RoboticVsOpen";
import { ComparingModalities } from "@/components/robotic/ComparingModalities";
import { SurgeryNumbers } from "@/components/robotic/SurgeryNumbers";
import { CancersWeTreat } from "@/components/robotic/CancersWeTreat";
import { Benefits } from "@/components/robotic/Benefits";
import { MeetTheDoctor } from "@/components/robotic/MeetTheDoctor";
import { VideosGallery } from "@/components/robotic/VideosGallery";
import { Testimonials } from "@/components/robotic/Testimonials";
import { ContactSection } from "@/components/robotic/ContactSection";
import { Locations } from "@/components/robotic/Locations";
import { FinalCta } from "@/components/robotic/FinalCta";
import { AppointmentProvider } from "@/components/robotic/AppointmentContext";
import { JsonLd } from "@/components/robotic/JsonLd";

// Below the fold and JS-heavy (scroll-driven): split into its own chunk.
const InsideTheRobot = dynamic(() => import("@/components/robotic/InsideTheRobot").then((m) => m.InsideTheRobot));

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

export default function RoboticSurgeryPage() {
  return (
    <AppointmentProvider>
      <JsonLd />
      {/* 0 */}
      <TopBar />
      <Navbar appointmentHref="#appointment" />

      <main id="main">
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
        <MeetTheDoctor /> {/* 11 #doctor           surface */}
        <VideosGallery /> {/* 12 #media            white   */}
        <Testimonials /> {/* 13 #reviews          surface */}
        <ContactSection /> {/* 14 #appointment      white   */}
        <Locations /> {/* 15 #locations        surface */}
        <FinalCta /> {/* 16 ink → teal band */}
      </main>

      <Footer />
      <WhatsAppWidget />
    </AppointmentProvider>
  );
}
