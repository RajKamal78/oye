import React, { useState, useEffect } from 'react';
import { Cake, Mail, Laugh, Gamepad2, HelpCircle, Image, HeartHandshake, Gift, Sparkles, RefreshCw } from 'lucide-react';

export default function Navbar({ onReplayIntro }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('celebration');

  const navItems = [
    { id: 'celebration', label: 'Celebration', icon: Cake },
    { id: 'letter', label: 'Love Letter', icon: Mail },
    { id: 'nokjhok', label: 'Nok-Jhok', icon: Laugh },
    { id: 'games', label: 'Playground', icon: Gamepad2 },
    { id: 'quiz', label: 'Our Quiz', icon: HelpCircle },
    { id: 'memories', label: 'Memories', icon: Image },
    { id: 'promises', label: 'Promises', icon: HeartHandshake },
    { id: 'surprise', label: 'Surprise', icon: Gift },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Check active section
      const scrollPos = window.scrollY + 250;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-pink-950/40 z-50">
        <div
          className="h-full bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 transition-all duration-150 ease-out shadow-sm shadow-pink-500/50"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Navigation Pill */}
      <header className="fixed top-3 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] w-auto">
        <nav className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#170a24]/80 backdrop-blur-lg border border-pink-500/30 rounded-full shadow-xl shadow-pink-950/40 overflow-x-auto no-scrollbar">
          {/* Replay Intro Button */}
          <button
            onClick={onReplayIntro}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-pink-300 hover:text-white hover:bg-pink-900/50 rounded-full transition-all duration-200 border border-pink-500/20 whitespace-nowrap"
            title="Replay magical intro envelope"
          >
            <RefreshCw className="w-3 h-3 text-pink-400" />
            <span className="hidden md:inline">Replay Intro</span>
          </button>

          <div className="h-4 w-px bg-pink-500/30 mx-1 hidden sm:block" />

          {/* Navigation Links */}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md shadow-pink-600/30 scale-105'
                    : 'text-pink-200/80 hover:text-white hover:bg-pink-900/30'
                }`}
                title={item.label}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-pink-400'}`} />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </header>
    </>
  );
}
