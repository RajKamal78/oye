import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, X } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function ComplimentToast() {
  const compliments = [
    "Reminder: You have the sweetest smile in the entire world! 🌸",
    "Did you drink water today? Take care of yourself, Cutie! 🥤",
    "Pause and smile right now! Yes, right this second! 😊",
    "Warning: Too much cuteness detected on this screen! 🚨",
    "Fun fact: Seeing your text notification makes my whole day 10x better. ❤️",
    "You don't need to be perfect. You are already my favorite human. ✨",
    "Arey, zyada socho mat, today is all about celebrating YOU! 🎉",
    "In case no one told you today: You are doing amazing! 💖",
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show first compliment after 12 seconds
    const firstTimer = setTimeout(() => {
      setIsVisible(true);
      audioEngine.playPop();
    }, 12000);

    // Then interval every 45 seconds
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % compliments.length);
      setIsVisible(true);
    }, 45000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const handleNextCompliment = () => {
    audioEngine.playPop();
    setCurrentIdx((prev) => (prev + 1) % compliments.length);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-40 max-w-sm w-[90vw]"
        >
          <div className="bg-[#240e36]/90 backdrop-blur-lg border border-pink-400/40 rounded-2xl p-4 shadow-xl shadow-pink-950/60 flex items-start gap-3 text-left">
            <div className="p-2 rounded-xl bg-pink-500/20 text-pink-300 shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>

            <div className="flex-1 pr-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-pink-400 block mb-0.5">
                Little Thought For You
              </span>
              <p className="text-pink-100 text-xs sm:text-sm font-handwriting text-base leading-snug">
                "{compliments[currentIdx]}"
              </p>
              <button
                onClick={handleNextCompliment}
                className="text-[10px] text-pink-400 hover:text-pink-200 mt-1 underline"
              >
                Another one? 💕
              </button>
            </div>

            <button
              onClick={handleDismiss}
              className="text-pink-400/60 hover:text-pink-200 p-1 rounded-md"
              title="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
