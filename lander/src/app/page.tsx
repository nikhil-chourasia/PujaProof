"use client";

import React, { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import HowItWorks from '@/components/HowItWorks';
import FeaturesGrid from '@/components/FeaturesGrid';
import DashboardPreview from '@/components/DashboardPreview';
import VoiceAssistant from '@/components/VoiceAssistant';
import AudienceSplit from '@/components/AudienceSplit';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  // Simple intersection observer to add animation classes
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('section > div').forEach((el) => {
      if (!el.classList.contains('animate-fade-in-up')) {
        el.classList.add('opacity-0');
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <FeaturesGrid />
        <DashboardPreview />
        <VoiceAssistant />
        <AudienceSplit />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
