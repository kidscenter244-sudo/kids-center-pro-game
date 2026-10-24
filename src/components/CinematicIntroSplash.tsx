import React, { useState, useEffect } from 'react';
import { CHARACTERS } from '../data/characters';
import { ThreeCanvas } from './ThreeCanvas';
import { sounds } from '../utils/audio';
import { Zap, ArrowRight, Play } from 'lucide-react';

interface CinematicIntroSplashProps {
  onComplete: () => void;
}

export const CinematicIntroSplash: React.FC<CinematicIntroSplashProps> = ({ onComplete }) => {
  const [secondsLeft, setSecondsLeft] = useState(5);
  const starterHero = CHARACTERS.find((c) => c.id === 'rookie-champ') || CHARACTERS[0];

  useEffect(() => {
    sounds.playStreak();

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    sounds.playKeyClick();
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900 flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300">
      <div className="w-full max-w-5xl bg-white border-4 border-neutral-900 rounded-3xl p-6 sm:p-12 shadow-[0_16px_0_0_#000000] overflow-hidden relative">
        {/* Top Progress Timer Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-neutral-100 overflow-hidden">
          <div
            className="h-full bg-amber-400 transition-all duration-1000 ease-linear"
            style={{ width: `${((5 - secondsLeft) / 5) * 100}%` }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          {/* Left Side: Kids Center Pro Games */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-400 border border-neutral-900 rounded-xl text-xs font-black uppercase text-neutral-900 shadow-[0_2px_0_0_#171717]">
              <Zap className="w-3.5 h-3.5 fill-neutral-900" />
              <span>Official Game Launch</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-neutral-900 tracking-tight leading-none">
              Kids Center <br />
              <span className="text-amber-500 underline decoration-neutral-900 decoration-wavy decoration-3">
                Pro Games
              </span>
            </h1>

            <p className="text-base sm:text-lg font-bold text-neutral-600 max-w-md">
              Next-Gen Mental Math Training with 24 Legendary 3D Roblox Football Stars & Superheroes!
            </p>

            {/* Countdown Badge & Skip */}
            <div className="flex items-center gap-3 pt-3">
              <div className="px-4 py-2 bg-neutral-900 text-white border-2 border-neutral-900 rounded-2xl font-mono font-black text-sm shadow-[0_3px_0_0_#171717]">
                ⏱️ Entering Arena in {secondsLeft}s...
              </div>

              <button
                onClick={handleSkip}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 border-2 border-neutral-900 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider text-neutral-900 shadow-[0_3px_0_0_#171717] active:translate-y-0.5 cursor-pointer flex items-center gap-2 transition-all"
              >
                <span>Skip Intro</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Side: 3D Roblox Starter Hero 360 Spin */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            <div className="w-full relative">
              <ThreeCanvas
                character={starterHero}
                stageId="stadium"
                isCompact={true}
                autoSpinSeconds={5}
              />
              <div className="absolute top-3 right-3 bg-white/95 border border-neutral-900 px-3 py-1 rounded-xl shadow-xs font-mono font-black text-xs text-neutral-900">
                💫 360° Spin
              </div>
            </div>

            <span className="text-xs font-black text-neutral-700 mt-3">
              Starter Avatar: {starterHero.name} • Roblox R15 Edition
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
