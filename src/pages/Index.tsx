import { Layout } from "@/components/layout/Layout";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Index() {
  return (
    <Layout>
      <Hero />
      <Services />
      <Projects />
      <About />
      <Team />
      <Testimonials />
      <Contact />
    </Layout>
  );
}