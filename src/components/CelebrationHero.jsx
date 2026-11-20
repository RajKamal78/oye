import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Wind, ArrowDown, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../utils/audioEngine';

export default function CelebrationHero({ onNavigateToLetter }) {
  const [candlesLit, setCandlesLit] = useState(true);
  const [showWishModal, setShowWishModal] = useState(false);
  const [wishGranted, setWishGranted] = useState(false);
  const [poppedBalloons, setPoppedBalloons] = useState({});

  const balloons = [
    { id: 1, color: 'from-pink-400 to-rose-500', left: '10%', top: '20%', delay: 0 },
    { id: 2, color: 'from-purple-400 to-indigo-500', left: '22%', top: '10%', delay: 0.4 },
    { id: 3, color: 'from-rose-400 to-pink-600', right: '12%', top: '15%', delay: 0.2 },
    { id: 4, color: 'from-amber-300 to-rose-400', right: '24%', top: '28%', delay: 0.6 },
  ];

  const handlePopBalloon = (id) => {
    if (poppedBalloons[id]) return;
    audioEngine.playPop();
    setPoppedBalloons((prev) => ({ ...prev, [id]: true }));

    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.4 },
      colors: ['#ff80bf', '#ff4d94', '#ffd700'],
    });
  };

  const handleOpenWishModal = () => {
    audioEngine.playChime();
    setShowWishModal(true);
  };

  const handleBlowCandles = () => {
    audioEngine.playBlow();
    setTimeout(() => {
      setCandlesLit(false);
      setWishGranted(true);
      audioEngine.playFanfare();

      // Giant celebratory confetti shower
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#ff1493', '#ff69b4', '#ffd700', '#ba55d3', '#ffffff'],
      });
    }, 400);
  };

  const handleRelight = () => {
    setCandlesLit(true);
    setWishGranted(false);
    setShowWishModal(false);
    audioEngine.playChime();
  };

  return (
    <section
      id="celebration"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16 overflow-hidden text-center"
    >
      {/* Floating Interactive Balloons */}
      {balloons.map((b) => {
        if (poppedBalloons[b.id]) return null;
        return (
          <motion.div
            key={b.id}
            initial={{ y: 0 }}
            animate={{ y: [-15, 10, -15] }}
            transition={{ duration: 4 + b.delay * 2, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
            onClick={() => handlePopBalloon(b.id)}
            style={{
              position: 'absolute',
              top: b.top,
              left: b.left,
              right: b.right,
            }}
            className="cursor-pointer z-10 hidden sm:flex flex-col items-center group"
            title="Click to pop!"
          >
            <div
              className={`w-14 h-20 sm:w-16 sm:h-24 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] bg-gradient-to-t ${b.color} shadow-lg shadow-pink-500/20 group-hover:scale-110 transition-transform relative`}
            >
              <span className="absolute top-2 left-3 w-3 h-6 bg-white/40 rounded-full rotate-[-20deg]" />
            </div>
            {/* Balloon string */}
            <div className="w-0.5 h-12 bg-pink-300/40" />
            <span className="text-[10px] text-pink-300/70 opacity-0 group-hover:opacity-100 transition-opacity">
              Pop me!
            </span>
          </motion.div>
        );
      })}

      {/* Main Container */}
      <div className="relative z-20 max-w-3xl mx-auto flex flex-col items-center">
        {/* Crown & Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-200 text-xs sm:text-sm font-medium mb-6 shadow-sm shadow-pink-900/40"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>It's Your Most Magical Day of the Year</span>
          <PartyPopper className="w-4 h-4 text-pink-400" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold font-serif-romantic tracking-tight mb-4 leading-tight"
        >
          <span className="text-white">HAPPY BIRTHDAY,</span> <br />
          <span className="text-romantic-gradient font-script text-5xl sm:text-7xl md:text-8xl">
            MY FAVOURITE HUMAN! 🎂
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-xl text-pink-200/90 max-w-xl mx-auto mb-10 font-sans leading-relaxed"
        >
          "Today, the world celebrates you, but I get to celebrate the happiness you bring into my life."
        </motion.p>

        {/* Animated 3D Interactive Birthday Cake */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative my-4 flex flex-col items-center"
        >
          {/* Candles */}
          <div className="flex items-end justify-center gap-6 mb-1 relative z-20">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center">
                {/* Flame */}
                <div className="h-7 flex items-center justify-center">
                  {candlesLit ? (
                    <div className="w-3.5 h-6 rounded-full bg-gradient-to-t from-amber-400 via-orange-300 to-yellow-100 candle-flame shadow-lg" />
                  ) : (
                    <motion.div
                      initial={{ opacity: 0.8, y: 0 }}
                      animate={{ opacity: 0, y: -15, scale: 1.5 }}
                      transition={{ duration: 1 }}
                      className="text-xs text-pink-300/70 font-mono"
                    >
                      💨
                    </motion.div>
                  )}
                </div>
                {/* Candle Stick */}
                <div className="w-2.5 h-10 bg-gradient-to-b from-pink-300 via-rose-300 to-pink-400 rounded-t-sm shadow-sm" />
              </div>
            ))}
          </div>

          {/* Cake Layers */}
          <div className="relative flex flex-col items-center">
            {/* Top Frosting / Layer 1 */}
            <div className="w-36 h-12 sm:w-44 sm:h-14 bg-gradient-to-r from-pink-300 via-pink-200 to-pink-300 rounded-t-2xl border-b-4 border-rose-400/40 relative flex items-center justify-center shadow-md">
              <span className="text-xs font-script text-pink-700 tracking-wider">With Love ❤️</span>
            </div>

            {/* Middle Layer 2 */}
            <div className="w-52 h-14 sm:w-64 sm:h-16 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400 border-b-4 border-rose-600/40 relative flex items-center justify-around px-4 shadow-lg">
              <span className="text-sm">🍓</span>
              <span className="text-sm">✨</span>
              <span className="text-sm">🍓</span>
              <span className="text-sm">✨</span>
              <span className="text-sm">🍓</span>
            </div>

            {/* Bottom Layer 3 */}
            <div className="w-64 h-16 sm:w-80 sm:h-20 bg-gradient-to-r from-pink-900 via-rose-900 to-pink-950 rounded-b-2xl border-t-2 border-pink-400/30 relative flex items-center justify-center shadow-2xl">
              <span className="text-xs sm:text-sm text-pink-200/90 font-medium tracking-wide">
                100% Sweet & Cute
              </span>
            </div>

            {/* Cake Stand / Plate */}
            <div className="w-72 h-4 sm:w-96 sm:h-5 bg-gradient-to-r from-pink-200/30 via-pink-100/50 to-pink-200/30 rounded-full blur-[1px] -mt-1 shadow-xl" />
          </div>

          {/* Interactive Wish Trigger / Status */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleOpenWishModal}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-rose-500 text-white font-semibold text-sm sm:text-base shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{candlesLit ? "Make a Wish ✨" : "Wish Made! (Relight? 🕯️)"}</span>
            </button>

            <button
              onClick={onNavigateToLetter}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#250d35]/80 border border-pink-500/40 text-pink-200 font-medium text-sm sm:text-base hover:bg-pink-900/40 hover:text-white transition-all hover:scale-105 active:scale-95"
            >
              <span>There's More For You 💌</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Wish Interactive Modal */}
      <AnimatePresence>
        {showWishModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-md bg-[#1d0b2e] border border-pink-500/40 rounded-3xl p-6 sm:p-8 text-center shadow-2xl shadow-pink-900/50"
            >
              {!wishGranted ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-amber-300 animate-pulse" />
                  </div>

                  <h3 className="text-2xl font-script text-pink-200 mb-3">
                    Time to Make Your Wish ✨
                  </h3>

                  <p className="text-pink-100/90 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                    "Close your eyes, make a beautiful wish, and blow those candles!
                    <br /><br />
                    I genuinely hope every little dream hidden inside your heart comes true. ❤️"
                  </p>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleBlowCandles}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-medium shadow-lg shadow-pink-600/40 hover:scale-105 active:scale-95 transition-all"
                    >
                      <Wind className="w-5 h-5" />
                      <span>Blow The Candles! 🕯️💨</span>
                    </button>
                    <button
                      onClick={() => setShowWishModal(false)}
                      className="text-xs text-pink-400 hover:text-pink-200 pt-1"
                    >
                      Wait, thinking of a wish...
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-rose-400 fill-rose-400 animate-bounce" />
                  </div>

                  <h3 className="text-2xl font-script text-pink-200 mb-2">
                    Wish Sent to the Stars! 🌟
                  </h3>

                  <p className="text-pink-100 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                    The universe (and I) heard it! Now take a deep breath, smile, and get ready for the rest of your little world. 🥹❤️
                  </p>

                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => setShowWishModal(false)}
                      className="px-6 py-2.5 rounded-full bg-pink-500 text-white font-medium text-sm hover:bg-pink-600 transition-colors"
                    >
                      Okay, Got It! 🥰
                    </button>
                    <button
                      onClick={handleRelight}
                      className="px-4 py-2.5 rounded-full bg-pink-950/60 border border-pink-500/30 text-pink-300 text-xs hover:text-white"
                    >
                      Relight Candles 🕯️
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
