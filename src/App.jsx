import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import IntroScreen from './components/IntroScreen';
import Navbar from './components/Navbar';
import AudioPlayer from './components/AudioPlayer';
import RomanticCursor from './components/RomanticCursor';
import FloatingParticles from './components/FloatingParticles';
import CelebrationHero from './components/CelebrationHero';
import LoveLetter from './components/LoveLetter';
import NokJhokZone from './components/NokJhokZone';
import GamesPlayground from './components/GamesPlayground';
import BirthdayQuiz from './components/BirthdayQuiz';
import MemoryGallery from './components/MemoryGallery';
import PromiseWall from './components/PromiseWall';
import FinalSurprise from './components/FinalSurprise';
import ComplimentToast from './components/ComplimentToast';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleExplore = () => {
    setShowIntro(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  const scrollToLetter = () => {
    const el = document.getElementById('letter');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0e0517] text-[#fce7f3] selection:bg-pink-500 selection:text-white overflow-x-hidden font-sans">
      {/* Sparkle cursor trail for desktop */}
      <RomanticCursor />

      {/* Floating ambient particles and floating heart shower button */}
      <FloatingParticles />

      {/* Persistent Audio Player */}
      <AudioPlayer />

      {/* Compliment Toasts appearing occasionally */}
      <ComplimentToast />

      {/* Animate between Intro Envelope and Main Experience */}
      <AnimatePresence mode="wait">
        {showIntro ? (
          <IntroScreen key="intro" onExplore={handleExplore} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            {/* Top Navigation & Scroll Progress */}
            <Navbar onReplayIntro={handleReplayIntro} />

            <main className="space-y-12">
              {/* SECTION 1: THE BIRTHDAY CELEBRATION */}
              <CelebrationHero onNavigateToLetter={scrollToLetter} />

              {/* SECTION 2: A PERSONALIZED LOVE LETTER */}
              <LoveLetter />

              {/* SECTION 3: OUR CUTE NOK-JHOK & GUSSA ZONE 😂 */}
              <NokJhokZone />

              {/* SECTION 4: FUN INTERACTIVE GAMES (5 GAMES) */}
              <GamesPlayground />

              {/* SECTION 5: A LITTLE BIRTHDAY QUIZ */}
              <BirthdayQuiz />

              {/* SECTION 6: A LITTLE MEMORY GALLERY */}
              <MemoryGallery />

              {/* SECTION 7: THE PROMISE WALL */}
              <PromiseWall />

              {/* FINAL SECTION: THE BIGGEST SURPRISE & CERTIFICATE */}
              <FinalSurprise />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
