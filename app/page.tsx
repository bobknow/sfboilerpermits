import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import WhyChooseUs from "@/sections/WhyChooseUs";
import HowItWorks from "@/sections/HowItWorks";
import WhoWeWorkWith from "@/sections/WhoWeWorkWith";
import CallToAction from "@/sections/CallToAction";
import ContactForm from "@/sections/ContactForm";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <WhyChooseUs />
      <HowItWorks />
      <WhoWeWorkWith />
      <CallToAction />
      <ContactForm />
      <Footer />
    </main>
  );
}