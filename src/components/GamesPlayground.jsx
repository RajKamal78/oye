import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Heart, Gift, HelpCircle, Sparkles, RefreshCw, Trophy, Flame, CheckCircle, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../utils/audioEngine';

export default function GamesPlayground() {
  const [activeGame, setActiveGame] = useState('quiz'); // 'quiz', 'catch', 'boxes', 'memory', 'lovemeter'

  return (
    <section id="games" className="relative py-20 px-4 max-w-5xl mx-auto z-20">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs sm:text-sm font-medium mb-3">
          <Gamepad2 className="w-4 h-4 text-pink-400" />
          <span>Interactive Entertainment Zone</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-script text-pink-100 mb-3">
          Fun Interactive Games 🎮✨
        </h2>
        <p className="text-pink-300/80 text-sm sm:text-base max-w-lg mx-auto font-sans">
          Specially crafted mini-games just for you. Play, win, and claim your cute rewards!
        </p>
      </div>

      {/* Game Selector Tabs */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {[
          { id: 'quiz', label: '1. Know Me Quiz', icon: HelpCircle },
          { id: 'catch', label: '2. Catch Hearts', icon: Heart },
          { id: 'boxes', label: '3. Mystery Boxes', icon: Gift },
          { id: 'memory', label: '4. Memory Match', icon: Sparkles },
          { id: 'lovemeter', label: '5. Love Meter', icon: Flame },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeGame === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                audioEngine.playPop();
                setActiveGame(tab.id);
              }}
              className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/30 scale-105'
                  : 'bg-[#1e0d2d]/80 text-pink-300/80 hover:text-white hover:bg-pink-900/40 border border-pink-500/20'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Game Container */}
      <div className="bg-[#1b0a2a]/85 backdrop-blur-xl border border-pink-500/30 rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl shadow-pink-950/50 min-h-[460px] flex flex-col justify-center">
        {activeGame === 'quiz' && <GameKnowMe />}
        {activeGame === 'catch' && <GameCatchHearts />}
        {activeGame === 'boxes' && <GameMysteryBoxes />}
        {activeGame === 'memory' && <GameMemoryMatch />}
        {activeGame === 'lovemeter' && <GameLoveMeter />}
      </div>
    </section>
  );
}

// GAME 1: How Well Do You Know Me?
function GameKnowMe() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      q: '1. Who gets angry first during our random debates? 😂',
      options: [
        'You obviously! (Super short temper)',
        'Me (just pretending to be serious)',
        'Secretly both of us at the same time',
        'Depends entirely on whether you are hungry!',
      ],
      comment: 'Haha! Hunger is definitely a trigger! 🍕',
    },
    {
      q: '2. Who says sorry first to break the cold war? 🕊️',
      options: [
        'Me, because I value peace & your smile more ❤️',
        'You, once in a blue moon with puppy eyes 🥺',
        'Neither, we just randomly send food reels instead',
        'Whoever is craving attention first!',
      ],
      comment: 'Food reels are our peace treaty! 😂',
    },
    {
      q: '3. Who is more childish when nobody is looking? 🍼',
      options: [
        'You 100%! With all the cute pouting',
        'Me, doing silly dances to make you laugh',
        'Both of us become literal kindergarteners together',
        'Only you when you want something sweet',
      ],
      comment: 'We both have zero maturity when together! 🧸',
    },
    {
      q: '4. Who misses the other more during a busy day? 💭',
      options: [
        'Me (constantly checking my phone)',
        'You (even if you act too cool to admit)',
        'It is an infinite tie every single day ❤️',
        'Whoever is stuck doing boring chores!',
      ],
      comment: 'It really is an infinite tie! 💖',
    },
    {
      q: '5. Who is more dramatic when minor inconveniences happen? 🎬',
      options: [
        'Bollywood Award Winner: YOU! 😂',
        'Me, complaining about little things',
        'Equally theatrical when plans change',
        'Depends on the weather and coffee intake!',
      ],
      comment: 'Pure Bollywood level entertainment! 🌟',
    },
  ];

  const handleSelectOption = (index) => {
    audioEngine.playPop();
    setSelectedAnswers((prev) => ({ ...prev, [currentQ]: index }));
  };

  const handleNext = () => {
    audioEngine.playChime();
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ff69b4', '#ff1493', '#ffd700'],
      });
    }
  };

  const handleReset = () => {
    setCurrentQ(0);
    setSelectedAnswers({});
    setShowResult(false);
  };

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-6 flex flex-col items-center"
      >
        <div className="w-16 h-16 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center mb-4">
          <Trophy className="w-8 h-8 text-amber-300 animate-bounce" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-script text-pink-200 mb-2">
          Quiz Completed! 100% Certified Us! ❤️
        </h3>
        <p className="text-pink-100 text-sm sm:text-base max-w-md mx-auto mb-6 font-handwriting text-xl leading-relaxed">
          "Regardless of who gets angry or dramatic first, the truth is: life with you is 100x more fun, chaotic, and beautiful. You passed with flying colors!"
        </p>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-medium text-sm transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Play Again</span>
        </button>
      </motion.div>
    );
  }

  const q = questions[currentQ];
  const hasSelected = selectedAnswers[currentQ] !== undefined;

  return (
    <div className="max-w-xl mx-auto w-full">
      <div className="flex items-center justify-between text-xs text-pink-400 mb-4 font-semibold uppercase tracking-wider">
        <span>Question {currentQ + 1} of {questions.length}</span>
        <span>Game 1: How Well Do You Know Me?</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-pink-950/60 h-2 rounded-full mb-6 overflow-hidden">
        <div
          className="bg-gradient-to-r from-pink-500 to-rose-500 h-full transition-all duration-300"
          style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
        />
      </div>

      <h3 className="text-lg sm:text-xl font-bold font-serif-romantic text-white mb-6">
        {q.q}
      </h3>

      <div className="space-y-3 mb-6">
        {q.options.map((opt, idx) => {
          const isSelected = selectedAnswers[currentQ] === idx;
          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                isSelected
                  ? 'bg-pink-500/30 border-pink-400 text-white shadow-md shadow-pink-500/20'
                  : 'bg-pink-950/30 border-pink-500/20 text-pink-200 hover:bg-pink-900/30 hover:border-pink-500/40'
              }`}
            >
              <span className="text-sm sm:text-base font-sans">{opt}</span>
              {isSelected && <CheckCircle className="w-5 h-5 text-pink-400 shrink-0 ml-2" />}
            </button>
          );
        })}
      </div>

      {hasSelected && (
        <p className="text-pink-300 font-script text-lg text-center mb-4 animate-fade-in">
          {q.comment}
        </p>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={!hasSelected}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
            hasSelected
              ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg hover:scale-105 active:scale-95'
              : 'bg-pink-950/50 text-pink-400/50 cursor-not-allowed'
          }`}
        >
          {currentQ === questions.length - 1 ? 'See Results 🎉' : 'Next Question →'}
        </button>
      </div>
    </div>
  );
}

// GAME 2: Catch The Hearts ❤️
function GameCatchHearts() {
  const [gameState, setGameState] = useState('idle'); // 'idle', 'playing', 'finished'
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [fallingItems, setFallingItems] = useState([]);
  const canvasAreaRef = useRef(null);

  useEffect(() => {
    let timer = null;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('finished');
      audioEngine.playFanfare();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  // Spawn falling hearts
  useEffect(() => {
    let spawnTimer = null;
    if (gameState === 'playing') {
      spawnTimer = setInterval(() => {
        const id = `${Date.now()}-${Math.random()}`;
        const items = ['💖', '💕', '⭐', '🍓', '🧁', '🌸'];
        const emoji = items[Math.floor(Math.random() * items.length)];
        const left = Math.random() * 85 + 5; // 5% to 90%
        const speed = Math.random() * 1.5 + 2.5; // 2.5s to 4s fall

        setFallingItems((prev) => [
          ...prev.slice(-12),
          { id, emoji, left, speed, top: 0 },
        ]);
      }, 550);
    }
    return () => clearInterval(spawnTimer);
  }, [gameState]);

  const handleStartGame = () => {
    audioEngine.playChime();
    setScore(0);
    setTimeLeft(30);
    setFallingItems([]);
    setGameState('playing');
  };

  const handleCatchItem = (id) => {
    audioEngine.playPop();
    setScore((prev) => prev + 10);
    setFallingItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto">
      {gameState === 'idle' && (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-pink-400 fill-pink-400 animate-pulse" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif-romantic text-white mb-2">
            Catch The Hearts ❤️
          </h3>
          <p className="text-pink-200/90 text-sm sm:text-base max-w-sm mx-auto mb-6 font-sans">
            Hearts and treats are raining down! Tap or click as many as you can before the 30-second timer runs out.
          </p>
          <button
            onClick={handleStartGame}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold text-base shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            Start Game ⏱️
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="w-full flex flex-col items-center">
          {/* Header Bar: Score & Timer */}
          <div className="w-full flex items-center justify-between bg-pink-950/60 border border-pink-500/30 rounded-2xl px-5 py-2.5 mb-4">
            <div className="flex items-center gap-2 text-pink-200 text-sm font-semibold">
              <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
              <span>Score: {score}</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-300 text-sm font-semibold">
              <Clock className="w-4 h-4" />
              <span>{timeLeft}s left</span>
            </div>
          </div>

          {/* Interactive Playfield Area */}
          <div
            ref={canvasAreaRef}
            className="relative w-full h-80 sm:h-96 bg-[#130720] border-2 border-dashed border-pink-500/30 rounded-2xl overflow-hidden select-none touch-none"
          >
            {fallingItems.map((item) => (
              <span
                key={item.id}
                onClick={() => handleCatchItem(item.id)}
                className="absolute cursor-pointer select-none text-3xl sm:text-4xl active:scale-125 transition-transform animate-[fallDown_3s_linear_forwards] hover:opacity-80"
                style={{
                  left: `${item.left}%`,
                  animationDuration: `${item.speed}s`,
                }}
              >
                {item.emoji}
              </span>
            ))}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] text-pink-400/60 font-sans pointer-events-none">
              Tap fast on the falling hearts!
            </div>
          </div>
        </div>
      )}

      {gameState === 'finished' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-6"
        >
          <div className="text-5xl mb-3">🏆</div>
          <h3 className="text-2xl sm:text-3xl font-serif-romantic text-white mb-2">
            Time's Up! You Scored {score} Points!
          </h3>
          <p className="text-pink-100 text-base sm:text-lg max-w-md mx-auto mb-6 font-handwriting leading-relaxed">
            {score >= 120
              ? '👑 PRO CUDDLER & MASTER HEART CATCHER! You caught virtually every single drop of love! Redeem this for unlimited treats anytime!'
              : '🥰 Great effort, Cutie! Every single heart you caught has been officially credited as 1 free warm hug!'}
          </p>
          <button
            onClick={handleStartGame}
            className="px-6 py-2.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-medium text-sm transition-all"
          >
            Play Again 🔄
          </button>
        </motion.div>
      )}
    </div>
  );
}

// GAME 3: Find Your Birthday Surprise 🎁
function GameMysteryBoxes() {
  const [openedBox, setOpenedBox] = useState(null);

  const boxes = [
    {
      id: 1,
      title: 'Box #1',
      color: 'from-pink-500 to-rose-600',
      ribbon: 'bg-amber-300',
      reward: '🎟️ VIP FOOD VOUCHER: 1 Free Late-Night Ice Cream & Long Drive with Zero Complaints or Excuses!',
    },
    {
      id: 2,
      title: 'Box #2',
      color: 'from-purple-500 to-pink-600',
      ribbon: 'bg-pink-300',
      isGrand: true,
      reward: '👑 THE GRAND PRIZE: A Lifetime Subscription to My Love, 24/7 Unlimited Pampering & Free Cuddles on Demand! (Non-refundable ❤️)',
    },
    {
      id: 3,
      title: 'Box #3',
      color: 'from-rose-500 to-amber-500',
      ribbon: 'bg-white',
      reward: '📜 GOLDEN ARGUMENT PASS: You Automatically Win the Next 100 Little Arguments! (Use wisely, madam 😂)',
    },
  ];

  const handleOpenBox = (id) => {
    audioEngine.playFanfare();
    setOpenedBox(id);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto text-center">
      <h3 className="text-2xl sm:text-3xl font-serif-romantic text-white mb-2">
        Find Your Birthday Surprise 🎁
      </h3>
      <p className="text-pink-200/90 text-sm sm:text-base max-w-md mx-auto mb-8 font-sans">
        Three mystery gift boxes. One contains the Grand Surprise, but every box has a sweet secret for you! Tap to open.
      </p>

      {/* 3 Gift Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-8">
        {boxes.map((b) => {
          const isOpen = openedBox === b.id;
          return (
            <motion.div
              key={b.id}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleOpenBox(b.id)}
              className="cursor-pointer flex flex-col items-center p-5 bg-[#250f35]/70 border border-pink-500/30 rounded-2xl shadow-lg relative group transition-all"
            >
              {/* Box Graphic */}
              <div
                className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr ${b.color} shadow-xl flex items-center justify-center relative overflow-hidden group-hover:shadow-pink-500/30`}
              >
                {/* Ribbons */}
                <div className={`absolute inset-x-0 h-4 ${b.ribbon} top-1/2 -translate-y-1/2 shadow-sm`} />
                <div className={`absolute inset-y-0 w-4 ${b.ribbon} left-1/2 -translate-x-1/2 shadow-sm`} />
                <span className="text-3xl relative z-10">{isOpen ? '✨' : '🎁'}</span>
              </div>

              <span className="mt-3 text-sm font-semibold text-pink-200">
                {b.title}
              </span>
              <span className="text-xs text-pink-400">
                {isOpen ? 'Opened! 🎉' : 'Tap to open'}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Opened Box Reward Card */}
      <AnimatePresence>
        {openedBox && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full bg-gradient-to-r from-pink-900/60 to-purple-900/60 border border-pink-400/40 rounded-2xl p-6 text-center shadow-xl"
          >
            <span className="text-xs uppercase tracking-widest text-pink-300 font-semibold mb-2 block">
              Surprise Unlocked!
            </span>
            <p className="text-pink-100 text-lg sm:text-xl font-handwriting leading-relaxed">
              "{boxes.find((b) => b.id === openedBox)?.reward}"
            </p>
            <p className="text-xs text-pink-400 mt-3 font-sans">
              (Feel free to tap the other boxes too! You get all of them today 😉)
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// GAME 4: Memory Match
function GameMemoryMatch() {
  const symbols = ['🎂', '💖', '🌹', '🎁', '🧸', '💌'];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  const initGame = () => {
    const deck = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((sym, idx) => ({ id: idx, sym }));
    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (idx) => {
    if (flipped.length === 2 || flipped.includes(idx) || matched.includes(cards[idx].sym)) return;

    audioEngine.playPop();
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = newFlipped;
      if (cards[first].sym === cards[second].sym) {
        audioEngine.playChime();
        setMatched((prev) => [...prev, cards[first].sym]);
        setFlipped([]);
        if (matched.length + 1 === symbols.length) {
          audioEngine.playFanfare();
          confetti({
            particleCount: 70,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  const isGameOver = matched.length === symbols.length;

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto text-center">
      <div className="flex items-center justify-between w-full mb-4 px-2">
        <h3 className="text-xl sm:text-2xl font-serif-romantic text-white">
          Memory Match 🃏
        </h3>
        <span className="text-xs text-pink-300 bg-pink-950/60 px-3 py-1 rounded-full border border-pink-500/30">
          Moves: {moves}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2.5 sm:gap-3 w-full mb-6">
        {cards.map((c, idx) => {
          const isCardFlipped = flipped.includes(idx) || matched.includes(c.sym);
          return (
            <motion.div
              key={c.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCardClick(idx)}
              className={`h-20 sm:h-24 rounded-2xl flex items-center justify-center text-3xl cursor-pointer select-none border transition-all duration-300 ${
                isCardFlipped
                  ? 'bg-gradient-to-tr from-pink-500 to-rose-600 border-pink-300 shadow-md shadow-pink-500/30'
                  : 'bg-[#261038] border-pink-500/30 hover:border-pink-400'
              }`}
            >
              {isCardFlipped ? c.sym : '❓'}
            </motion.div>
          );
        })}
      </div>

      {isGameOver && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-4"
        >
          <p className="text-pink-200 font-script text-2xl mb-3">
            Awesome! Matched in {moves} moves! 🎉
          </p>
          <button
            onClick={initGame}
            className="px-5 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white text-xs font-semibold"
          >
            Play Again 🔄
          </button>
        </motion.div>
      )}
    </div>
  );
}

// GAME 5: How Much Do I Love You?
function GameLoveMeter() {
  const [calculating, setCalculating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [exploded, setExploded] = useState(false);

  const handleStartMeter = () => {
    audioEngine.playPop();
    setCalculating(true);
    setExploded(false);
    setProgress(0);

    let curr = 0;
    const interval = setInterval(() => {
      curr += 7;
      setProgress(curr);
      if (curr >= 120) {
        clearInterval(interval);
        audioEngine.playBoop();
        setExploded(true);
        setCalculating(false);
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.5 },
        });
      }
    }, 90);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto text-center py-4">
      <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center mb-3">
        <Flame className="w-8 h-8 text-rose-400 animate-pulse" />
      </div>

      <h3 className="text-2xl sm:text-3xl font-serif-romantic text-white mb-2">
        How Much Do I Love You? ❤️
      </h3>
      <p className="text-pink-200/90 text-sm max-w-sm mx-auto mb-6 font-sans">
        Click to run the quantum boyfriend emotional love calculator algorithm.
      </p>

      {/* Love Meter Gauge */}
      <div className="w-full bg-pink-950/70 border border-pink-500/40 rounded-2xl p-6 mb-6">
        <div className="flex justify-between text-xs text-pink-300 font-mono mb-2">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
          <span>MAX</span>
        </div>

        <div className="w-full bg-[#12051d] h-6 rounded-full overflow-hidden p-1 border border-pink-500/30 mb-4">
          <div
            className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 rounded-full transition-all duration-100"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>

        <div className="text-pink-300 font-mono text-sm">
          {calculating && `Calculating... ${progress}%`}
          {!calculating && !exploded && 'Ready to calculate...'}
        </div>
      </div>

      {!calculating && !exploded && (
        <button
          onClick={handleStartMeter}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-medium shadow-lg hover:scale-105 active:scale-95 transition-all text-sm sm:text-base"
        >
          Calculate Love 📈
        </button>
      )}

      {/* Exploded / Error 404 Result */}
      <AnimatePresence>
        {exploded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-rose-950/70 border border-rose-500/50 rounded-2xl p-6 text-center shadow-xl"
          >
            <div className="text-4xl mb-2">💥🚀</div>
            <h4 className="text-lg font-bold text-rose-300 mb-1 font-mono">
              SYSTEM OVERLOAD! ERROR 404
            </h4>
            <p className="text-pink-100 text-lg sm:text-xl font-handwriting leading-relaxed mb-4">
              "Error 404: Love cannot be measured! 😂❤️
              <br />
              The counter literally broke through the universe ceiling! My feelings for you exceed any math or physics known to humanity."
            </p>
            <button
              onClick={handleStartMeter}
              className="text-xs text-pink-400 hover:text-pink-200 underline"
            >
              Try recalculating? (It will overload again 😂)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
