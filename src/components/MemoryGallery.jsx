import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Heart, Upload, X, ZoomIn, Sparkles, Camera } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function MemoryGallery() {
  const defaultMemories = [
    {
      id: 1,
      title: 'Our Sunset Strolls 🌅',
      caption: 'Reserved for that golden hour walk where we talk about everything and nothing.',
      tag: 'Quiet Moments',
      gradient: 'from-amber-600/30 via-rose-600/30 to-purple-800/40',
      icon: '🌅',
      likes: 12,
    },
    {
      id: 2,
      title: 'Coffee, Chai & Endless Rants ☕',
      caption: 'For the times you take 20 minutes explaining one 30-second story and I love every bit.',
      tag: 'Daily Conversations',
      gradient: 'from-orange-600/30 via-pink-600/30 to-amber-900/40',
      icon: '☕',
      likes: 24,
    },
    {
      id: 3,
      title: 'That Adorable Pout & Gussa 🥺',
      caption: 'Frame dedicated to your signature angry face right before you give up and smile.',
      tag: 'Nok-Jhok Special',
      gradient: 'from-rose-600/30 via-pink-600/30 to-red-900/40',
      icon: '🥰',
      likes: 38,
    },
    {
      id: 4,
      title: 'Starry Nights & 2 AM Talks 🌙',
      caption: 'Under the same sky, sharing deep thoughts that nobody else knows.',
      tag: 'Midnight Peace',
      gradient: 'from-indigo-600/30 via-purple-700/30 to-slate-900/40',
      icon: '✨',
      likes: 19,
    },
    {
      id: 5,
      title: 'Silly Laughter & Food Dates 🍕',
      caption: 'When food arrives and your eyes light up like a child on festival day.',
      tag: 'Pure Happiness',
      gradient: 'from-pink-600/30 via-rose-500/30 to-yellow-800/40',
      icon: '🍰',
      likes: 45,
    },
    {
      id: 6,
      title: 'A Thousand Tomorrow Promises 🌸',
      caption: 'Waiting to be filled with all the road trips, laughs, and adventures ahead.',
      tag: 'The Future',
      gradient: 'from-emerald-600/30 via-teal-600/30 to-purple-900/40',
      icon: '🌟',
      likes: 56,
    },
  ];

  const [memories, setMemories] = useState(() => {
    try {
      const saved = localStorage.getItem('birthday_gallery_memories');
      return saved ? JSON.parse(saved) : defaultMemories;
    } catch {
      return defaultMemories;
    }
  });

  const [activeLightbox, setActiveLightbox] = useState(null);

  const handleLike = (id, e) => {
    e.stopPropagation();
    audioEngine.playPop();
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, likes: m.likes + 1 } : m))
    );
  };

  const handleFileUpload = (id, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    audioEngine.playChime();
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target?.result;
      const updated = memories.map((m) =>
        m.id === id ? { ...m, customImage: base64 } : m
      );
      setMemories(updated);
      try {
        localStorage.setItem('birthday_gallery_memories', JSON.stringify(updated));
      } catch (err) {
        console.warn('LocalStorage image quota exceeded:', err);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="memories" className="relative py-20 px-4 max-w-6xl mx-auto z-20">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs sm:text-sm font-medium mb-3">
          <ImageIcon className="w-4 h-4 text-pink-400" />
          <span>Little Moments & Keepsakes</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-script text-pink-100 mb-3">
          A Little Memory Gallery 📸
        </h2>
        <p className="text-pink-300/80 text-sm sm:text-base max-w-lg mx-auto font-sans">
          Frames holding the warmth of our journey. Tap any photo to view in detail, or add your real photos into the frames!
        </p>
      </div>

      {/* Polaroid Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {memories.map((m, idx) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => setActiveLightbox(m)}
            className="cursor-pointer group bg-[#230f33]/90 border border-pink-500/30 rounded-3xl p-4 shadow-xl shadow-pink-950/40 hover:border-pink-400/60 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Visual Frame */}
            <div
              className={`relative w-full h-56 sm:h-60 rounded-2xl bg-gradient-to-br ${m.gradient} border border-pink-500/20 flex flex-col items-center justify-center overflow-hidden mb-4`}
            >
              {m.customImage ? (
                <img
                  src={m.customImage}
                  alt={m.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex flex-col items-center text-center p-4">
                  <span className="text-5xl mb-2 filter drop-shadow-md">{m.icon}</span>
                  <span className="text-xs uppercase tracking-wider text-pink-300/80 font-semibold px-2 py-0.5 rounded-full bg-pink-950/60 border border-pink-500/30">
                    {m.tag}
                  </span>
                  <span className="text-[11px] text-pink-300/70 font-sans mt-2">
                    Placeholder frame for our picture
                  </span>
                </div>
              )}

              {/* Zoom overlay hint */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-2.5 rounded-full bg-pink-600/80 text-white">
                  <ZoomIn className="w-5 h-5" />
                </span>
              </div>
            </div>

            {/* Caption & Title */}
            <div className="px-1 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold font-serif-romantic text-white mb-1">
                  {m.title}
                </h3>
                <p className="text-pink-200 text-sm font-handwriting text-lg leading-relaxed mb-4">
                  "{m.caption}"
                </p>
              </div>

              {/* Action Bar (Upload Real Photo + Heart Likes) */}
              <div className="flex items-center justify-between border-t border-pink-500/20 pt-3 text-xs">
                {/* Upload Button */}
                <label
                  onClick={(e) => e.stopPropagation()}
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-950/60 hover:bg-pink-900 border border-pink-500/30 text-pink-300 hover:text-white transition-colors"
                  title="Upload real photo into this frame"
                >
                  <Camera className="w-3.5 h-3.5 text-pink-400" />
                  <span>{m.customImage ? 'Change Photo' : 'Add Real Photo'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(m.id, e)}
                    className="hidden"
                  />
                </label>

                {/* Love Reaction Button */}
                <button
                  onClick={(e) => handleLike(m.id, e)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-pink-300 hover:text-rose-400 transition-colors"
                >
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                  <span className="font-mono text-xs">{m.likes}</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightbox && (
          <div
            onClick={() => setActiveLightbox(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl bg-[#1e0b2e] border border-pink-500/50 rounded-3xl p-6 sm:p-8 text-center shadow-2xl cursor-default"
            >
              <button
                onClick={() => setActiveLightbox(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-pink-400 hover:text-white hover:bg-pink-900/40"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Preview */}
              <div
                className={`w-full h-64 sm:h-80 rounded-2xl bg-gradient-to-br ${activeLightbox.gradient} border border-pink-500/30 flex items-center justify-center overflow-hidden mb-6`}
              >
                {activeLightbox.customImage ? (
                  <img
                    src={activeLightbox.customImage}
                    alt={activeLightbox.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-7xl mb-3">{activeLightbox.icon}</span>
                    <span className="text-xs text-pink-300 uppercase tracking-widest bg-pink-950/80 px-3 py-1 rounded-full border border-pink-500/30">
                      {activeLightbox.tag}
                    </span>
                  </div>
                )}
              </div>

              <h3 className="text-2xl font-serif-romantic text-white mb-2">
                {activeLightbox.title}
              </h3>

              <p className="text-pink-100 text-lg sm:text-xl font-handwriting leading-relaxed mb-6">
                "{activeLightbox.caption}"
              </p>

              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={(e) => handleLike(activeLightbox.id, e)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-500/30 hover:bg-pink-500/50 border border-pink-400 text-pink-200 text-sm font-semibold transition-all"
                >
                  <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
                  <span>Send Love ({activeLightbox.likes})</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
