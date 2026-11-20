import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Laugh, Flame, ShieldAlert, Heart, IceCream, MessageCircleWarning, X, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function NokJhokZone() {
  const [activeReaction, setActiveReaction] = useState(null);

  const cards = [
    {
      title: 'When You Get Angry 😤',
      subtitle: 'Danger Level: Maximum Voltage',
      message: 'Jab tum gussa hoti ho na, tab samajh nahi aata manaun ya khud hi sorry bol dun. 😂',
      color: 'from-rose-500/20 to-red-600/10',
      border: 'border-rose-500/30',
      icon: Flame,
    },
    {
      title: 'Your Cute Attitude 👑',
      subtitle: 'Certified Drama Queen',
      message: 'Attitude toh aisa hai jaise duniya tumhare naam pe chalti ho... but honestly, cute lagta hai. ❤️',
      color: 'from-amber-500/20 to-pink-600/10',
      border: 'border-amber-500/30',
      icon: Sparkles,
    },
    {
      title: 'Our Little Fights ⚔️',
      subtitle: 'World War 3 over silly things',
      message: 'Chhoti-chhoti baaton pe ladna, phir normal ho jaana... ye sab bhi toh apna hi part hai.',
      color: 'from-purple-500/20 to-indigo-600/10',
      border: 'border-purple-500/30',
      icon: MessageCircleWarning,
    },
    {
      title: 'My Favourite Thing 🥰',
      subtitle: 'The ultimate truce',
      message: 'Chahe kitna bhi gussa ho, tumhari smile sabse zyada achhi lagti hai.',
      color: 'from-pink-500/20 to-rose-600/10',
      border: 'border-pink-500/30',
      icon: Heart,
    },
  ];

  const reactions = {
    angry: {
      title: 'RED ALERT! Dangerously Cute Anger Detected! 🚨',
      message: 'Calling all emergency units! 🚒 Dispatching unlimited virtual ice creams 🍨, dark chocolates 🍫, and unconditional pampering. Any complaints will be immediately settled with a tight hug!',
      emoji: '😤🍫',
      color: 'from-rose-600 to-red-600',
    },
    fine: {
      title: 'Suspicious Alert! 🧐',
      message: 'Wait, did you really just say "I\'m Fine"?! Is this the actual truth or is it the silence before a massive hurricane? 🌪️ Taking no chances: You are still getting extra love today!',
      emoji: '😂👀',
      color: 'from-amber-500 to-orange-600',
    },
    manalo: {
      title: 'Mission: Manana In Progress! 🥺❤️',
      message: 'Achha baba, sorryyy! Ab maan bhi jao. Kitni baar sorry bolun? 🥺❤️ Here is a lifetime voucher of: 100 cuddles, your choice of food, and me agreeing that you are always right!',
      emoji: '🥺🍨',
      color: 'from-pink-500 to-purple-600',
    },
    sorry: {
      title: 'Kaan Pakad Ke Sorry! 🙇‍♂️✨',
      message: 'Sorrryyyyy! Dono kaan pakad ke, uthak-baithak karke sorry! 🙏 Ab please ek pyaari si smile de do warna mera pura din kharab ho jayega!',
      emoji: '❤️🙏',
      color: 'from-rose-500 to-pink-600',
    },
  };

  const handleTriggerReaction = (type) => {
    audioEngine.playPop();
    setActiveReaction(reactions[type]);
  };

  return (
    <section id="nokjhok" className="relative py-20 px-4 max-w-5xl mx-auto z-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs sm:text-sm font-medium mb-3">
          <Laugh className="w-4 h-4 text-pink-400" />
          <span>Our Daily Drama Protocol</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-script text-pink-100 mb-3">
          Okay, Madam... Thoda Gussa Kam Kiya Karo! 😂
        </h2>
        <p className="text-pink-300/80 text-sm sm:text-base max-w-lg mx-auto font-sans">
          A purely scientific and highly affectionate review of your cute tantrums and mood swings.
        </p>
      </div>

      {/* 4 Animated Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`relative bg-gradient-to-br ${card.color} bg-[#190924]/80 backdrop-blur-xl border ${card.border} rounded-3xl p-6 sm:p-8 shadow-xl shadow-pink-950/40 transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider text-pink-400/80 font-semibold">
                  {card.subtitle}
                </span>
                <div className="p-2.5 rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-serif-romantic text-white mb-3">
                {card.title}
              </h3>

              <p className="text-pink-100/90 text-base sm:text-lg font-handwriting leading-relaxed">
                "{card.message}"
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Mood Responder Buttons */}
      <div className="bg-[#200c30]/80 backdrop-blur-xl border border-pink-500/30 rounded-3xl p-6 sm:p-8 text-center shadow-2xl">
        <h4 className="text-lg sm:text-xl font-medium text-pink-200 mb-2 font-sans">
          Quick Mood Check! What's Your Current State of Mind? 🤔
        </h4>
        <p className="text-xs sm:text-sm text-pink-400/80 mb-6">
          Click any button below to receive an instant boyfriend reaction.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => handleTriggerReaction('angry')}
            className="px-5 py-3 rounded-full bg-rose-600/30 hover:bg-rose-600/50 border border-rose-500/50 text-rose-200 font-medium text-sm sm:text-base hover:scale-105 active:scale-95 transition-all shadow-md"
          >
            I'm Angry 😤
          </button>

          <button
            onClick={() => handleTriggerReaction('fine')}
            className="px-5 py-3 rounded-full bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/50 text-amber-200 font-medium text-sm sm:text-base hover:scale-105 active:scale-95 transition-all shadow-md"
          >
            Okay, I'm Fine 😂
          </button>

          <button
            onClick={() => handleTriggerReaction('manalo')}
            className="px-5 py-3 rounded-full bg-pink-600/30 hover:bg-pink-600/50 border border-pink-500/50 text-pink-200 font-medium text-sm sm:text-base hover:scale-105 active:scale-95 transition-all shadow-md"
          >
            Manalo Mujhe 🥺
          </button>

          <button
            onClick={() => handleTriggerReaction('sorry')}
            className="px-5 py-3 rounded-full bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/50 text-purple-200 font-medium text-sm sm:text-base hover:scale-105 active:scale-95 transition-all shadow-md"
          >
            Sorry Bolooo ❤️
          </button>
        </div>
      </div>

      {/* Reaction Popup Modal */}
      <AnimatePresence>
        {activeReaction && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-md bg-[#220d33] border border-pink-500/50 rounded-3xl p-6 sm:p-8 text-center shadow-2xl shadow-pink-900/60"
            >
              <button
                onClick={() => setActiveReaction(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-pink-400 hover:text-white hover:bg-pink-900/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-5xl mb-4 select-none animate-bounce">
                {activeReaction.emoji}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-serif-romantic text-white mb-3">
                {activeReaction.title}
              </h3>

              <p className="text-pink-100 text-base sm:text-lg font-handwriting leading-relaxed mb-6">
                "{activeReaction.message}"
              </p>

              <button
                onClick={() => setActiveReaction(null)}
                className={`w-full py-3 rounded-full bg-gradient-to-r ${activeReaction.color} text-white font-medium shadow-lg hover:scale-105 active:scale-95 transition-all text-sm`}
              >
                Haha, Okay Fine! I Smile Now 🥰
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
