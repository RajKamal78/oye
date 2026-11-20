import React, { useState, useEffect } from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function FloatingParticles() {
  const [heartsShower, setHeartsShower] = useState([]);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Monitor scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerHeartBurst = (e) => {
    audioEngine.playPop();
    const burstCount = 12;
    const newHearts = [];
    const rect = e.currentTarget.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top;

    const emojis = ['💖', '💕', '💗', '💓', '✨', '🌸', '🥰'];

    for (let i = 0; i < burstCount; i++) {
      const id = `${Date.now()}-${Math.random()}`;
      newHearts.push({
        id,
        x: startX + (Math.random() * 80 - 40),
        y: startY,
        vx: (Math.random() - 0.5) * 160,
        vy: -(Math.random() * 200 + 150),
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        size: Math.random() * 16 + 18,
      });
    }

    setHeartsShower((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setHeartsShower((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
    }, 1800);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Background ambient glowing orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-2/3 right-10 w-[30rem] h-[30rem] bg-purple-600/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '3s' }} />
      </div>

      {/* Floating dynamic heart burst container */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {heartsShower.map((h) => (
          <span
            key={h.id}
            className="absolute transition-transform select-none animate-[floatUpFade_1.8s_ease-out_forwards]"
            style={{
              left: `${h.x}px`,
              top: `${h.y}px`,
              fontSize: `${h.size}px`,
              '--tw-translate-x': `${h.vx}px`,
              '--tw-translate-y': `${h.vy}px`,
            }}
          >
            {h.emoji}
          </span>
        ))}
      </div>

      {/* Action Buttons Floating at Bottom-Right */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3">
        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="p-3 rounded-full bg-pink-950/80 backdrop-blur-md border border-pink-500/30 text-pink-300 hover:text-white hover:bg-pink-900 shadow-lg shadow-pink-950/50 transition-all duration-300 active:scale-90"
            title="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Floating Heart Button */}
        <button
          onClick={triggerHeartBurst}
          aria-label="Send love hearts"
          className="group relative p-3.5 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 text-white shadow-xl shadow-pink-600/40 hover:shadow-pink-500/60 hover:scale-110 active:scale-95 transition-all duration-300"
          title="Tap to shower love!"
        >
          <Heart className="w-6 h-6 fill-white animate-pulse" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-2.5 py-1 rounded-full bg-pink-950/90 text-pink-200 text-xs font-medium border border-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            Tap for Love! 💖
          </span>
        </button>
      </div>
    </>
  );
}
