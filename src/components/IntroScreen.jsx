import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Gift, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../utils/audioEngine';

export default function IntroScreen({ onExplore }) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const fullMessage = `Okayyy, so finally you're here! 🥹❤️

I know you might be wondering what this is...

Well, it's a little something made just for you.

I couldn't put all my feelings into one simple message, so I thought... why not create an entire little world for you?

So take your time, explore everything, click every button, play the games, and don't skip anything!

Because every little thing here has a reason.

And yes, don't smile too much... warna nazar lag jayegi! 😂❤️`;

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);
    audioEngine.playFanfare();
    audioEngine.startMusic();

    // Trigger sweet confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#ff85a2', '#fbcfe8', '#ffd700'],
    });
  };

  // Typing effect for the letter inside envelope
  useEffect(() => {
    if (!isOpen) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < fullMessage.length) {
        setDisplayedText(fullMessage.slice(0, index + 1));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(interval);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleSkipTyping = () => {
    setDisplayedText(fullMessage);
    setIsTypingComplete(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-[#12051e] via-[#1f082e] to-[#0c0214] overflow-y-auto"
    >
      {/* Background magical elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative w-full max-w-lg my-auto py-8 flex flex-col items-center text-center z-10">
        {!isOpen ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            {/* Header prompt */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-sm font-medium mb-5">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>A Personal Surprise Awaits</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-script text-pink-200 mb-3 drop-shadow-md">
              Hey You! ❤️
            </h1>
            <p className="text-base sm:text-lg text-pink-200/80 mb-8 max-w-md font-sans">
              I made something special for you...
            </p>

            {/* Interactive Envelope Graphic */}
            <div
              onClick={handleOpenEnvelope}
              className="group relative cursor-pointer mb-8 transition-transform duration-300 hover:scale-105"
            >
              <div className="w-64 h-44 sm:w-72 sm:h-48 bg-gradient-to-br from-pink-900/60 to-rose-950/70 border-2 border-pink-400/50 rounded-2xl shadow-2xl shadow-pink-950 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-md">
                {/* Envelope Flap visual */}
                <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-pink-500/20 to-transparent border-b border-pink-400/30 clip-envelope-flap" />

                {/* Wax seal heart */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center shadow-lg shadow-pink-600/50 border border-pink-200/40 group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 text-white fill-white animate-pulse" />
                </div>

                <span className="mt-4 text-xs font-medium text-pink-300 tracking-wider uppercase font-sans">
                  Tap to Break Seal
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleOpenEnvelope}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-medium shadow-xl shadow-pink-600/40 hover:shadow-pink-500/60 hover:scale-105 active:scale-95 transition-all text-base"
            >
              <Gift className="w-5 h-5" />
              <span>Open Your Surprise 🎁</span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full bg-[#1e0a2b]/90 border border-pink-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-pink-950 text-left relative"
          >
            {/* Stamp / Decorative header */}
            <div className="flex items-center justify-between border-b border-pink-500/20 pb-4 mb-5">
              <span className="font-script text-2xl text-pink-300">A Message For You</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 font-medium">
                Confidential & Special 💌
              </span>
            </div>

            {/* Typewritten Message */}
            <div className="text-pink-100 text-base sm:text-lg leading-relaxed whitespace-pre-line font-handwriting min-h-[220px]">
              {displayedText}
              {!isTypingComplete && (
                <span className="inline-block w-2 h-5 bg-pink-400 ml-1 animate-pulse" />
              )}
            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-4 border-t border-pink-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              {!isTypingComplete ? (
                <button
                  onClick={handleSkipTyping}
                  className="text-xs text-pink-400/80 hover:text-pink-200 transition-colors underline"
                >
                  Skip typing animation
                </button>
              ) : (
                <span className="text-xs text-pink-400 font-script text-lg">
                  Ready to step inside? ✨
                </span>
              )}

              <button
                onClick={onExplore}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-medium shadow-lg shadow-pink-600/40 hover:shadow-pink-500/60 hover:scale-105 active:scale-95 transition-all text-sm"
              >
                <span>Let's Explore ✨</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
