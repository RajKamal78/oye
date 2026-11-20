import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Check, Heart, Sparkles, Trophy, ArrowRight, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../utils/audioEngine';

export default function BirthdayQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const questions = [
    {
      question: "1. What makes any ordinary day instantly special?",
      options: [
        { text: "Winning the lottery 💰", correct: false, note: "Money is nice, but nah! 😂" },
        { text: "Your smile and a random talk with you ❤️", correct: true, note: "Spot on! That's literally all it takes." },
        { text: "An extra 2 hours of sleep 😴", correct: false, note: "Tempting, but still #2!" },
        { text: "Unlimited pizza 🍕", correct: false, note: "Pizza is close, but you beat pizza!" },
      ],
    },
    {
      question: "2. What is my absolute favourite thing about you?",
      options: [
        { text: "When you win arguments smugly 😏", correct: false, note: "Haha, you enjoy that too much!" },
        { text: "Your caring heart & the way your eyes sparkle when you laugh ✨", correct: true, note: "100%! That laughter is pure magic." },
        { text: "Your ability to sleep 12 hours straight 🛌", correct: false, note: "An impressive skill, but not the top one!" },
        { text: "How you steal all my hoodies / attention 🧸", correct: false, note: "Cute theft, but there's something deeper!" },
      ],
    },
    {
      question: "3. What should you do whenever you get angry with me?",
      options: [
        { text: "Give the silent treatment for 3 days 🤐", correct: false, note: "Please have mercy on my soul! 🥺" },
        { text: "Tell me straight away, eat chocolates, and let me pamper you 🍫", correct: true, note: "Yes! Communication + snacks = peace!" },
        { text: "Throw pillows across the room 🛋️", correct: false, note: "Save the poor pillows!" },
        { text: "Pretend nothing happened while plotting revenge 😼", correct: false, note: "A classic, but let's choose hugs!" },
      ],
    },
    {
      question: "4. Which matters more in our little universe?",
      options: [
        { text: "Fancy expensive gifts 💎", correct: false, note: "Things fade, efforts don't." },
        { text: "Little honest efforts, being there, and making each other smile 🌸", correct: true, note: "Always. The small things are the big things." },
        { text: "Having 10,000 Instagram likes 📱", correct: false, note: "We care about our real world!" },
        { text: "Never having any disagreements at all 🤐", correct: false, note: "Real love learns to grow through disagreements!" },
      ],
    },
    {
      question: "5. What is the certified golden rule for today (Your Birthday)?",
      options: [
        { text: "You must do dishes and chores 🧹", correct: false, note: "Illegal! Strictly banned today!" },
        { text: "All your nakhre, wishes, and pampering are 100% permitted! 👑", correct: true, note: "Queen behavior only today!" },
        { text: "Act like a serious responsible adult 👔", correct: false, note: "No seriousness allowed on birthdays!" },
        { text: "Share your birthday cake with nobody 🎂", correct: false, note: "At least give me one bite! 🥺" },
      ],
    },
    {
      question: "6. What is the one thing I never want you to forget?",
      options: [
        { text: "My phone number 📞", correct: false, note: "Useful, but not the deepest thing!" },
        { text: "That you are deeply loved, endlessly special, and never alone. ❤️", correct: true, note: "Always remember this, no matter what." },
        { text: "To turn off the stove 🍳", correct: false, note: "Important safety tip, but not romantic! 😂" },
        { text: "That I am always right 😜", correct: false, note: "We both know you will never agree anyway!" },
      ],
    },
  ];

  const handleSelectOption = (idx) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);
    const isCorrect = questions[currentIdx].options[idx].correct;
    if (isCorrect) {
      audioEngine.playChime();
      setScore((prev) => prev + 1);
    } else {
      audioEngine.playPop();
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
    } else {
      setIsFinished(true);
      audioEngine.playFanfare();
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff69b4', '#ff1493', '#ffd700'],
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setIsFinished(false);
  };

  const currentQ = questions[currentIdx];

  return (
    <section id="quiz" className="relative py-20 px-4 max-w-4xl mx-auto z-20">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs sm:text-sm font-medium mb-3">
          <HelpCircle className="w-4 h-4 text-pink-400" />
          <span>Romantic Knowledge Check</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-script text-pink-100 mb-3">
          Let's See How Well You Know This Little World Of Ours! 💗
        </h2>
        <p className="text-pink-300/80 text-sm sm:text-base max-w-md mx-auto font-sans">
          Answer with your heart. Every choice comes with a secret note!
        </p>
      </div>

      {/* Quiz Card */}
      <div className="bg-[#1e0c2f]/90 border border-pink-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-pink-950/50 backdrop-blur-xl">
        {!isFinished ? (
          <div>
            {/* Progress Bar & Indicators */}
            <div className="flex items-center justify-between text-xs text-pink-300/80 mb-3 font-semibold uppercase tracking-wider">
              <span>Question {currentIdx + 1} of {questions.length}</span>
              <span>Score: {score} ❤️</span>
            </div>

            <div className="w-full bg-pink-950/60 h-2 rounded-full mb-8 overflow-hidden">
              <div
                className="bg-gradient-to-r from-pink-500 via-rose-500 to-amber-300 h-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <h3 className="text-xl sm:text-2xl font-serif-romantic text-white mb-6">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOpt === idx;
                let btnStyle = 'bg-pink-950/30 border-pink-500/20 text-pink-200 hover:bg-pink-900/30 hover:border-pink-500/40';

                if (selectedOpt !== null) {
                  if (opt.correct) {
                    btnStyle = 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200 shadow-md shadow-emerald-900/30';
                  } else if (isSelected && !opt.correct) {
                    btnStyle = 'bg-rose-950/60 border-rose-500/60 text-rose-200';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={selectedOpt !== null}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between font-sans text-sm sm:text-base ${btnStyle}`}
                  >
                    <span>{opt.text}</span>
                    {selectedOpt !== null && opt.correct && (
                      <Check className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback Note */}
            <AnimatePresence>
              {selectedOpt !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-pink-900/30 border border-pink-400/30 rounded-2xl p-4 mb-6 text-center"
                >
                  <p className="text-pink-200 font-handwriting text-xl">
                    "{currentQ.options[selectedOpt].note}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next Button */}
            {selectedOpt !== null && (
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-medium text-sm shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                  <span>{currentIdx === questions.length - 1 ? "Finish Quiz 🎉" : "Next Question"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Final Results Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6 flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center mb-6 shadow-xl shadow-pink-600/40">
              <Heart className="w-10 h-10 text-white fill-white animate-pulse" />
            </div>

            <h3 className="text-3xl sm:text-4xl font-script text-pink-200 mb-4">
              Quiz Completed, Beautiful! 💖
            </h3>

            {/* Heartfelt ending message from prompt */}
            <div className="bg-pink-950/60 border border-pink-400/30 rounded-3xl p-6 sm:p-8 max-w-lg mx-auto mb-8 shadow-inner">
              <p className="text-pink-100 text-lg sm:text-2xl font-handwriting leading-relaxed mb-4">
                "Whether your answers were right or wrong, there's one thing you should always know...
              </p>
              <p className="text-2xl sm:text-4xl font-serif-romantic text-romantic-gradient font-bold tracking-wide">
                YOU ARE SPECIAL. ❤️
              </p>
              <p className="text-xs sm:text-sm text-pink-300/80 font-sans mt-4">
                No quiz can score how irreplaceable you are.
              </p>
            </div>

            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-pink-500/30 hover:bg-pink-500/50 border border-pink-400/40 text-pink-200 text-sm font-medium transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
