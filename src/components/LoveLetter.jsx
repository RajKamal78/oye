import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Feather, BookmarkCheck, ChevronDown } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function LoveLetter() {
  const [showExtraNote, setShowExtraNote] = useState(false);

  const handleReadMore = () => {
    audioEngine.playChime();
    setShowExtraNote(true);
  };

  return (
    <section id="letter" className="relative py-20 px-4 max-w-4xl mx-auto z-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs sm:text-sm font-medium mb-3">
          <Feather className="w-4 h-4 text-pink-400" />
          <span>Straight From The Heart</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-script text-pink-100 mb-3">
          Things I Don't Say Every Day... 💌
        </h2>
        <p className="text-pink-300/80 text-sm sm:text-base max-w-md mx-auto font-sans">
          No filters, no pretenses — just raw feelings written down for you.
        </p>
      </div>

      {/* Parchment Styled Love Letter Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-b from-[#2a133d] to-[#1c0c2a] border border-pink-400/30 rounded-3xl p-6 sm:p-10 md:p-14 shadow-2xl shadow-pink-950/60 backdrop-blur-xl"
      >
        {/* Decorative corner ornaments */}
        <div className="absolute top-4 left-4 text-pink-400/40 text-xs">✦</div>
        <div className="absolute top-4 right-4 text-pink-400/40 text-xs">✦</div>
        <div className="absolute bottom-4 left-4 text-pink-400/40 text-xs">✦</div>
        <div className="absolute bottom-4 right-4 text-pink-400/40 text-xs">✦</div>

        {/* Letter Stamp */}
        <div className="flex items-center justify-between border-b border-pink-500/20 pb-4 mb-8">
          <span className="text-xs uppercase tracking-widest text-pink-300/70 font-sans">
            A Handwritten Note • To My Favourite Person
          </span>
          <span className="flex items-center gap-1 text-xs text-pink-300 font-script text-base">
            Sealed with honesty <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 inline" />
          </span>
        </div>

        {/* Letter Body */}
        <div className="space-y-6 text-pink-100 text-base sm:text-xl font-handwriting leading-relaxed tracking-wide">
          <p className="text-2xl sm:text-3xl font-script text-pink-300">
            Areyyy, ek baat bolun? ❤️
          </p>

          <p>
            You know, I am not always the best with words. Sometimes I get caught up in everyday life, work, and routines, and I forget to say out loud what actually matters the most.
          </p>

          <p>
            Tu kabhi kabhi itna gussa karti hai na, but honestly, tere ye nakhre bhi cute lagte hain. 😂 When you puff your cheeks, go silent for five minutes just to see if I notice, or start your little drama over small things — I might act troubled on the outside, but inside I just look at you and smile thinking how lucky I am.
          </p>

          <p>
            Main har baar express nahi kar pata, but iska matlab ye nahi ki tu mere liye special nahi hai. Your smile has this weird superpower of fixing my bad days within seconds. Just knowing that you are on the other side of the phone, telling me your random stories about who said what, turns the most exhausting day into peace.
          </p>

          <p>
            I genuinely want to see you win in life. I want to see you achieve every single goal and wild ambition you whisper about. You deserve respect, endless happiness, unconditional peace, and someone who stands by you like a rock — through your high tides and your quiet moments.
          </p>

          <p>
            Bas hamesha khush rehna, baaki tujhe pareshan karne ke liye main hoon hi. ❤️
          </p>

          <div className="pt-4 text-right">
            <span className="font-script text-2xl sm:text-3xl text-pink-300 block">
              Always by your side,
            </span>
            <span className="text-sm text-pink-400 font-sans">
              Your Person 🫶
            </span>
          </div>
        </div>

        {/* Extra Note Reveal Button */}
        {!showExtraNote ? (
          <div className="mt-10 pt-6 border-t border-pink-500/20 text-center">
            <button
              onClick={handleReadMore}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-200 hover:text-white hover:bg-pink-500/40 font-medium text-sm sm:text-base transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-pink-900/30"
            >
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              <span>Read One More Thing ❤️</span>
            </button>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.6 }}
              className="mt-8 pt-6 border-t border-pink-500/30"
            >
              <div className="bg-gradient-to-r from-pink-950/70 via-rose-950/60 to-purple-950/70 border border-pink-400/40 rounded-2xl p-6 shadow-inner text-pink-100 font-handwriting text-lg sm:text-xl leading-relaxed">
                <div className="flex items-center gap-2 text-pink-300 text-sm font-sans mb-3">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span className="font-semibold tracking-wide uppercase text-xs">P.S. From The Deepest Corner:</span>
                </div>
                <p>
                  "Sometimes in the middle of a crowded room or a noisy day, my mind just wanders to you. How pure your heart is, how much you care about the people around you, and how easily you light up my life without even trying. Thank you for choosing to share your world with me. I wouldn't trade our memories, our giggles, or even our little silly arguments for anything in the entire universe. 🥹💖"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </section>
  );
}
