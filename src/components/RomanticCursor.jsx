import React, { useEffect, useState } from 'react';

export default function RomanticCursor() {
  const [particles, setParticles] = useState([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    let lastTime = 0;
    const symbols = ['💖', '✨', '🌸', '💕', '⭐'];

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTime < 50) return; // throttle
      lastTime = now;

      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const id = `${now}-${Math.random()}`;

      setParticles((prev) => [
        ...prev.slice(-18),
        {
          id,
          x: e.clientX,
          y: e.clientY,
          symbol,
          size: Math.random() * 12 + 10,
        },
      ]);

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id));
      }, 700);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 select-none animate-[fadeOut_0.7s_forwards]"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            fontSize: `${p.size}px`,
            filter: 'drop-shadow(0 0 6px rgba(244,114,182,0.6))',
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
}
