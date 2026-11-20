import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, Sparkles, Download, Award, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import * as htmlToImage from 'html-to-image';
import { audioEngine } from '../utils/audioEngine';

export default function FinalSurprise() {
  const [surpriseRevealed, setSurpriseRevealed] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef(null);

  const handleOpenFinalSurprise = () => {
    audioEngine.playFanfare();
    setSurpriseRevealed(true);

    // Continuous fireworks show simulation
    const end = Date.now() + 4 * 1000;
    const colors = ['#ff1493', '#ff69b4', '#ffd700', '#ba55d3', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleDownloadCertificate = async () => {
    if (!certificateRef.current) return;
    try {
      setIsDownloading(true);
      audioEngine.playChime();
      const dataUrl = await htmlToImage.toPng(certificateRef.current, { quality: 0.95 });
      const link = document.createElement('a');
      link.download = 'Birthday-Keepsake-Certificate.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.warn('Error saving certificate:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section id="surprise" className="relative py-24 px-4 max-w-4xl mx-auto z-20 text-center">
      {/* Section Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs sm:text-sm font-medium mb-3">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>The Grand Finale</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-script text-pink-100 mb-4">
          One Last Thing... ❤️
        </h2>
      </div>

      {/* Heartfelt Letter Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-b from-[#210931]/95 to-[#150422]/95 border border-pink-500/30 rounded-3xl p-6 sm:p-10 md:p-14 shadow-2xl shadow-pink-950/70 backdrop-blur-xl mb-12"
      >
        <div className="space-y-5 text-pink-100 text-base sm:text-xl font-handwriting leading-relaxed max-w-2xl mx-auto text-left sm:text-center">
          <p>
            "I don't know what the future holds, and I cannot promise that every single day will be perfect.
          </p>
          <p>
            But I genuinely hope life gives you everything your heart has ever been wishing for.
          </p>
          <p>
            I hope you always find reasons to smile, even on the quietest days.
          </p>
          <p>
            I hope you never stop dreaming, and never doubt how extraordinary you are.
          </p>
          <p>
            I hope you always feel loved, valued, and appreciated — because you truly deserve nothing less.
          </p>
          <p>
            And if I can be a small reason behind your happiness, that would mean the entire world to me.
          </p>
          <p className="pt-2 text-pink-200">
            Thank you for being you.
          </p>
          <p className="text-pink-200">
            Thank you for being a beautiful part of my life.
          </p>
          <p className="text-2xl sm:text-3xl font-script text-romantic-gradient pt-2">
            Happy Birthday once again, my favourite human! 🥹❤️"
          </p>
        </div>

        {/* Surprise Button */}
        {!surpriseRevealed ? (
          <div className="mt-10 pt-6 border-t border-pink-500/20">
            <button
              onClick={handleOpenFinalSurprise}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 text-white font-bold text-base sm:text-lg shadow-2xl shadow-pink-600/50 hover:shadow-pink-500/80 hover:scale-105 active:scale-95 transition-all animate-pulse"
            >
              <Gift className="w-6 h-6" />
              <span>Open Your Final Surprise 🎁</span>
            </button>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mt-10 pt-8 border-t border-pink-500/30"
            >
              {/* Handwritten Note Banner */}
              <div className="bg-gradient-to-r from-pink-950/80 via-rose-950/70 to-purple-950/80 border border-pink-400/40 rounded-3xl p-6 sm:p-8 mb-8 shadow-xl">
                <span className="text-4xl mb-3 block">🎆💖</span>
                <p className="text-pink-100 text-xl sm:text-2xl font-handwriting leading-relaxed mb-4">
                  "Bas ek baat yaad rakhna...
                  <br />
                  Tu special hai, bahut zyada.
                  <br />
                  Aur haan, birthday hai toh aaj saare nakhre allowed hain! 😂❤️"
                </p>
                <div className="text-xs uppercase tracking-widest text-pink-400 font-semibold font-sans">
                  Made With Love, Just For You. ❤️
                </div>
              </div>

              {/* Keepsake Certificate Card */}
              <div className="flex flex-col items-center">
                <div
                  ref={certificateRef}
                  className="w-full max-w-lg bg-gradient-to-b from-[#2a113a] via-[#1f0b2f] to-[#160623] border-4 border-amber-300/60 rounded-3xl p-6 sm:p-8 text-center relative shadow-2xl overflow-hidden"
                >
                  {/* Decorative corner ribbons */}
                  <div className="absolute top-2 left-2 text-amber-300 text-xs">✦</div>
                  <div className="absolute top-2 right-2 text-amber-300 text-xs">✦</div>
                  <div className="absolute bottom-2 left-2 text-amber-300 text-xs">✦</div>
                  <div className="absolute bottom-2 right-2 text-amber-300 text-xs">✦</div>

                  {/* Stamp */}
                  <div className="w-14 h-14 rounded-full bg-amber-400/20 border-2 border-amber-300/60 flex items-center justify-center mx-auto mb-3">
                    <Award className="w-8 h-8 text-amber-300" />
                  </div>

                  <span className="text-[11px] uppercase tracking-widest text-amber-300/90 font-mono font-semibold block mb-1">
                    Official Lifetime Certificate
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-serif-romantic font-bold text-white mb-2">
                    MOST WONDERFUL HUMAN IN THE UNIVERSE
                  </h3>

                  <p className="text-pink-200 text-sm sm:text-base font-handwriting leading-relaxed mb-4">
                    Awarded for possessing the brightest smile, an unmatched heart of gold, irresistible cute drama, and bringing endless warmth into my life.
                  </p>

                  <div className="flex items-center justify-between border-t border-pink-500/30 pt-3 text-xs text-pink-300 font-sans">
                    <div>
                      <span className="block text-[10px] text-pink-400/80 uppercase">Date of Issue</span>
                      <span className="font-semibold">Today (Your Special Day)</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] text-pink-400/80 uppercase">Signed With Love</span>
                      <span className="font-script text-base text-pink-200">Your Special Person 🫶</span>
                    </div>
                  </div>
                </div>

                {/* Download Certificate Action */}
                <button
                  onClick={handleDownloadCertificate}
                  disabled={isDownloading}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pink-600 hover:bg-pink-500 text-white font-medium text-sm shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>{isDownloading ? 'Generating Card...' : 'Save Keepsake Certificate 📜'}</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>

      {/* Footer Tag */}
      <footer className="pt-8 text-center text-xs text-pink-400/70 font-sans">
        <p className="flex items-center justify-center gap-1">
          Crafted with every ounce of my heart <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> just for you.
        </p>
        <p className="text-[11px] text-pink-400/50 mt-1">
          Forever & Always • Happy Birthday! ✨
        </p>
      </footer>
    </section>
  );
}
