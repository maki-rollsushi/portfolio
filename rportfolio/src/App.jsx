import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Projects from "./components/Projects";
import Community from "./components/Community";
import Certifications from "./components/Certifications";
import Footer from "./components/Footer";
import CursorGlow from "./components/CursorGlow";

export default function App() {
  return (
    <>
      {/* Sits behind everything — pointer-events: none */}
      <CursorGlow />

      <Navbar />
      <Hero />
      <Stats />
      <Projects />
      <Community />
      <Certifications />
      <Footer />
    </>
  );
}
