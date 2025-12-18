'use client';

import LoginGate from "../components/LoginGate";
import Hero from "../components/Hero";
import Experience from "../components/Experience";
import EducationTimeline from "../components/EducationTimeline";
import Downloads from "../components/Downloads";

export default function Home() {
  return (
    <LoginGate>
      <main>
        <Hero />
        <Experience />
        <EducationTimeline />
        <Downloads />
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Louis Christ. Alle Rechte vorbehalten.</p>
      </footer>
    </LoginGate>
  );
}
