import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartHandshake, Check, Sparkles, Heart, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../utils/audioEngine';

export default function PromiseWall() {
  const [sealedPromises, setSealedPromises] = useState({});

  const promises = [
    {
      id: 1,
      text: "I will always respect your feelings — even when we see things differently or moods get tangled.",
      tag: "Respect & Understanding",
      number: "01",
    },
    {
      id: 2,
      text: "I will celebrate your smallest achievements — because seeing you proud of yourself is my favorite victory.",
      tag: "Your Biggest Fan",
      number: "02",
    },
    {
      id: 3,
      text: "I will listen to your random stories — from workplace tea to 2 AM random thoughts about aliens.",
      tag: "All Ears, Always",
      number: "03",
    },
    {
      id: 4,
      text: "I will always want to see you happy — through easy sunny seasons and tough stormy weather.",
      tag: "Pure Care",
      number: "04",
    },
    {
      id: 5,
      text: "I will support your dreams — standing right behind you whenever you take a leap of faith.",
      tag: "Unwavering Support",
      number: "05",
    },
    {
      id: 6,
      text: "I will never stop teasing you — because that cute annoyed expression is my lifetime entertainment! 😂",
      tag: "Cute Nakhre Clause",
      number: "06",
    },
    {
      id: 7,
      text: "I will keep making little efforts to bring a smile to your face — today, tomorrow, and endlessly.",
      tag: "Forever Effort",
      number: "07",
    },
  ];

  const handleSealPromise = (id) => {
    audioEngine.playChime();
    const updated = { ...sealedPromises, [id]: true };
    setSealedPromises(updated);

    if (Object.keys(updated).length === promises.length) {
      audioEngine.playFanfare();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff1493', '#ff69b4', '#ffd700', '#ffffff'],
      });
    }
  };

  const sealedCount = Object.keys(sealedPromises).length;

  return (
    <section id="promises" className="relative py-20 px-4 max-w-4xl mx-auto z-20">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs sm:text-sm font-medium mb-3">
          <HeartHandshake className="w-4 h-4 text-pink-400" />
          <span>Non-Negotiable Vows</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-script text-pink-100 mb-3">
          Some Little Promises From My Side ❤️
        </h2>
        <p className="text-pink-300/80 text-sm sm:text-base max-w-md mx-auto font-sans mb-4">
          Not just words on a screen, but lifetime intentions. Tap each promise to seal it with a pinky vow!
        </p>

        {/* Counter Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pink-950/60 border border-pink-500/30 text-xs text-pink-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{sealedCount} of 7 Promises Pinky-Sealed</span>
        </div>
      </div>

      {/* Promises List */}
      <div className="space-y-4 sm:space-y-6">
        {promises.map((p, idx) => {
          const isSealed = sealedPromises[p.id];
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`relative bg-[#1f0b2f]/80 backdrop-blur-xl border rounded-3xl p-5 sm:p-7 shadow-xl transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isSealed
                  ? 'border-amber-400/50 bg-gradient-to-r from-pink-950/60 to-purple-950/60 shadow-pink-900/40'
                  : 'border-pink-500/25 hover:border-pink-400/50'
              }`}
            >
              {/* Left Number & Text */}
              <div className="flex items-start gap-4">
                <span className="font-serif-romantic text-2xl sm:text-3xl font-bold text-pink-400/50 shrink-0">
                  {p.number}
                </span>
                <div>
                  <span className="text-[11px] font-mono tracking-wider uppercase text-pink-400 font-semibold mb-1 block">
                    {p.tag}
                  </span>
                  <p className="text-pink-100 text-base sm:text-xl font-handwriting leading-relaxed">
                    "{p.text}"
                  </p>
                </div>
              </div>

              {/* Pinky Seal Button */}
              <div className="shrink-0 self-end sm:self-center">
                <button
                  onClick={() => handleSealPromise(p.id)}
                  disabled={isSealed}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    isSealed
                      ? 'bg-amber-400/20 border border-amber-400/50 text-amber-200'
                      : 'bg-pink-600/30 hover:bg-pink-600/50 border border-pink-400/40 text-pink-200 hover:scale-105 active:scale-95'
                  }`}
                >
                  {isSealed ? (
                    <>
                      <Check className="w-4 h-4 text-amber-300" />
                      <span>Pinky Sealed 🤙</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4 text-rose-400" />
                      <span>Seal Promise 🤙</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Completed All Promises Milestone Banner */}
      {sealedCount === promises.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-500/20 border border-amber-400/40 rounded-3xl p-6 text-center shadow-2xl"
        >
          <Award className="w-10 h-10 text-amber-300 mx-auto mb-2 animate-bounce" />
          <h4 className="text-xl sm:text-2xl font-serif-romantic text-white mb-1">
            All 7 Promises Sealed In Stone! 🌟
          </h4>
          <p className="text-pink-200 font-handwriting text-lg sm:text-xl">
            "These promises are now permanently active. Forever non-negotiable!"
          </p>
        </motion.div>
      )}
    </section>
  );
}
