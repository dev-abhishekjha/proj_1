import About from "@/components/About";
import Connect from "@/components/Connect";
import CTABanner from "@/components/CTABanner";
import DarshanTimings from "@/components/DarshanTimings";
import DeitiesSlider from "@/components/DeitiesSlider";
import Donate from "@/components/Donate";
import FAQ from "@/components/FAQ";
import FloatingActionButtons from "@/components/FloatingActionButtons";
import FoodForLife from "@/components/FoodForLife";
import Footer from "@/components/Footer";
import FounderAcharya from "@/components/FounderAcharya";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import MainNav from "@/components/MainNav";
import TempleMap from "@/components/Map";
import Programs from "@/components/Programs";
import Shloka from "@/components/Shloka";
import TopBar from "@/components/TopBar";
import VedicCalendar from "@/components/VedicCalendar";

export default function Home() {
  return (
    <main className="bg-[var(--bg)] text-[var(--text-primary)] font-serif">
      <TopBar />
      <MainNav />
      <Hero />
      <About />
      <FounderAcharya />
      <DarshanTimings />
      <DeitiesSlider />
      <Programs />
      <FoodForLife />
      <Gallery />
      <Shloka />
      <Donate />
      <VedicCalendar />
      <FAQ />
      <Connect />
      <TempleMap />
      <CTABanner />
      <Footer />
      <FloatingActionButtons />
    </main>
  );
}
