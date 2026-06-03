import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Feautures";
import BackgroundShapes from "../../components/landing/BackgroundShapes";
import HowItWorks from "../../components/landing/HowItWorks";
import Footer from "../../components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f8faf8] text-[#06110d] transition-colors duration-500 dark:bg-[#020807] dark:text-white">
      <BackgroundShapes />
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
}
