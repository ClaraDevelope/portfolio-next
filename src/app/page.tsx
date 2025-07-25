'use client';
import AboutMe from "@/components/about/AboutMe";
import CertificationsSection from "@/components/certifications/CertificationsSection";
import ContactSection from "@/components/contact/ContactSection";
import Hero from "@/components/hero/Hero";
import ProjectsSection from "@/components/projects/ProjectsSection";
import TechnologiesSection from "@/components/technologies/TechnologiesSection";
import { useEffect } from "react";

export default function Page() {
useEffect(() => {
  const source = 'portfolio';
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

  fetch(`${backendUrl}/api/register-visit?source=${source}`)
    .then(res => res.json())
    .then(data => console.log('Visita registrada:', data))
    .catch(err => console.error('Error registrando visita:', err));
}, []);

  return (
    <div>
      <Hero/>
      <ProjectsSection/>
      <CertificationsSection/>
      <TechnologiesSection/>
      <AboutMe/>
      <ContactSection/>
    </div>
  );
}