// Next, React
import { FC, useState } from 'react';
import pkg from '../../../package.json';

// ❌ DO NOT EDIT ANYTHING ABOVE THIS LINE

export const HomeView: FC = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState<'feed' | 'casino' | 'kids'>('feed');

  // Sound function for welcome screen
  const playWelcomeSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
      oscillator.type = 'triangle';
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
      
      // Add a second note for a pleasant welcome sound
      setTimeout(() => {
        const oscillator2 = audioContext.createOscillator();
        const gainNode2 = audioContext.createGain();
        
        oscillator2.connect(gainNode2);
        gainNode2.connect(audioContext.destination);
        
        oscillator2.frequency.setValueAtTime(659, audioContext.currentTime);
        oscillator2.type = 'triangle';
        gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator2.start(audioContext.currentTime);
        oscillator2.stop(audioContext.currentTime + 0.5);
      }, 200);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  const handleStartGames = () => {
    playWelcomeSound();
    setShowWelcome(false);
  };

  // Welcome Screen
  if (showWelcome) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* Background GIF - Your Scrolly Games animated background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-gradient-to-b from-purple-900 via-indigo-900 to-slate-900"
          style={{
            backgroundImage: `url('/backy.gif')`, // Your animated background GIF
          }}
        ></div>

        {/* Play Button - Positioned at bottom center */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-end pb-20 lg:pb-32">
          <button
            onClick={handleStartGames}
            className="group relative px-16 py-5 lg:px-20 lg:py-6 text-2xl lg:text-3xl font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 active:scale-95 transform hover:-translate-y-2"
          >
            <span className="relative z-10 group-hover:animate-pulse">
              ▶ PLAY
            </span>
            
            {/* Animated glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    );
  }

  // Games Screen (existing content)
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* HEADER – fake Scrolly feed tabs */}
      <header className="flex items-center justify-between border-b border-white/10 py-3 px-4">
        {/* Back to Welcome Button */}
        <button
          onClick={() => setShowWelcome(true)}
          className="flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 hover:scale-105 active:scale-95 text-white/80 hover:text-white"
        >
          <span className="text-sm">←</span>
          <span className="text-xs lg:text-sm">Back</span>
        </button>

        <div className="flex items-center gap-2 rounded-full bg-white/5 px-2 py-1 text-[11px] lg:text-[12px]">
          <button 
            onClick={() => setActiveTab('feed')}
            className={`rounded-full px-3 py-1 font-semibold lg:px-4 lg:py-1.5 transition-colors ${
              activeTab === 'feed' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Feed
          </button>
          <button 
            onClick={() => setActiveTab('casino')}
            className={`rounded-full px-3 py-1 font-semibold lg:px-4 lg:py-1.5 transition-colors ${
              activeTab === 'casino' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Casino
          </button>
          <button 
            onClick={() => setActiveTab('kids')}
            className={`rounded-full px-3 py-1 font-semibold lg:px-4 lg:py-1.5 transition-colors ${
              activeTab === 'kids' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Kids
          </button>
        </div>

        {/* Empty div for spacing */}
        <div className="w-16"></div>
      </header>

      {/* MAIN – central game area (phone frame) */}
      <main className="flex flex-1 items-center justify-center px-4 py-3 lg:px-8 lg:py-6">
        <div className="relative aspect-[9/16] w-full max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-xl h-[600px] lg:h-[700px] xl:h-[800px] 2xl:h-[900px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 shadow-[0_0_40px_rgba(56,189,248,0.35)] lg:shadow-[0_0_60px_rgba(56,189,248,0.4)]">
          {/* Fake “feed card” top bar inside the phone */}
          <div className="flex items-center justify-between px-3 py-2 lg:px-4 lg:py-3 text-[10px] lg:text-[11px] text-slate-400">
            <span className="rounded-full bg-white/5 px-2 py-1 lg:px-3 lg:py-1.5 text-[9px] lg:text-[10px] uppercase tracking-wide">
              {activeTab === 'feed' ? 'Scrolly Game' : activeTab === 'casino' ? 'Casino Zone' : 'Kids Corner'}
            </span>
            <span className="text-[9px] lg:text-[10px] opacity-70">#NoCodeJam</span>
          </div>

          {/* The game lives INSIDE this phone frame */}
          <div className="flex h-[calc(100%-26px)] lg:h-[calc(100%-32px)] flex-col items-center justify-start px-3 lg:px-4 pb-3 lg:pb-4 pt-1 lg:pt-2">
            <div className="w-full h-full">
              {activeTab === 'feed' && <BubblePopGame />}
              {activeTab === 'casino' && <CasinoGame />}
              {activeTab === 'kids' && <KidsGame />}
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER – tiny version text */}
      <footer className="flex h-5 lg:h-6 items-center justify-border-t border-white/10 px-2 text-[9px] text-slate-500">
        <span>Scrolly · v{pkg.version}</span>
      </footer>
    </div>
  );
};

// ✅ THIS IS THE ONLY PART YOU EDIT FOR THE JAM
// Replace this entire GameSandbox component with the one AI generates.
// Keep the name `GameSandbox` and the `FC` type.

const BubblePopGame: FC = () => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [bubbles, setBubbles] = useState<Array<{id: number, x: number, y: number, color: string, size: number}>>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const colors = ['bg-pink-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-purple-400', 'bg-red-400'];

  // Sound generation functions
  const playSound = (frequency: number, duration: number, type: 'sine' | 'square' | 'triangle' = 'sine', volume = 0.3) => {
    if (isMuted) return;
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;
      gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  const playButtonClick = () => playSound(800, 0.1, 'square', 0.2);
  const playBubblePop = () => {
    playSound(400 + Math.random() * 400, 0.2, 'sine', 0.3);
    setTimeout(() => playSound(600 + Math.random() * 200, 0.1, 'triangle', 0.2), 50);
  };
  const playGameStart = () => {
    playSound(523, 0.2, 'triangle', 0.4);
    setTimeout(() => playSound(659, 0.2, 'triangle', 0.4), 200);
    setTimeout(() => playSound(784, 0.3, 'triangle', 0.4), 400);
  };
  const playGameOver = () => {
    playSound(400, 0.3, 'sine', 0.3);
    setTimeout(() => playSound(350, 0.3, 'sine', 0.3), 300);
    setTimeout(() => playSound(300, 0.5, 'sine', 0.3), 600);
  };
  const playVictory = () => {
    playSound(523, 0.2, 'triangle', 0.4);
    setTimeout(() => playSound(659, 0.2, 'triangle', 0.4), 150);
    setTimeout(() => playSound(784, 0.2, 'triangle', 0.4), 300);
    setTimeout(() => playSound(1047, 0.4, 'triangle', 0.4), 450);
  };

  const startGame = () => {
    playButtonClick();
    playGameStart();
    setIsLoading(true);
    
    setTimeout(() => {
      setScore(0);
      setGameOver(false);
      setTimeLeft(30);
      setGameStarted(true);
      setBubbles([]);
      setIsLoading(false);
      
      // Start timer
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameOver(true);
            setGameStarted(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Generate bubbles
      const bubbleGenerator = setInterval(() => {
        if (Math.random() > 0.3) {
          const newBubble = {
            id: Date.now() + Math.random(),
            x: Math.random() * 80 + 5,
            y: Math.random() * 70 + 15,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 25 + 35
          };
          setBubbles(prev => [...prev, newBubble]);
        }
      }, 800);

      // Clean up bubbles after 3 seconds
      const bubbleCleaner = setInterval(() => {
        setBubbles(prev => prev.slice(-8));
      }, 3000);

      // Cleanup on game end
      setTimeout(() => {
        clearInterval(bubbleGenerator);
        clearInterval(bubbleCleaner);
        if (score >= 200) playVictory();
        else playGameOver();
      }, 30000);
    }, 500);
  };

  const popBubble = (id: number) => {
    playBubblePop();
    setBubbles(prev => prev.filter(bubble => bubble.id !== id));
    setScore(prev => prev + 10);
  };

  const restart = () => {
    playButtonClick();
    setBubbles([]);
    startGame();
  };

  if (!gameStarted && !gameOver) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center space-y-4 lg:space-y-6 text-center min-h-[500px] lg:min-h-[600px] xl:min-h-[700px] relative">
        {/* Mute Button */}
        <button
          onClick={() => {
            setIsMuted(!isMuted);
            playButtonClick();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <span className="text-lg">{isMuted ? '🔇' : '🔊'}</span>
        </button>

        <div className="text-4xl lg:text-5xl xl:text-6xl animate-bounce">🫧</div>
        <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-white animate-pulse">Bubble Pop!</h2>
        <p className="text-sm lg:text-base xl:text-lg text-slate-300 px-4 lg:px-6">Pop as many bubbles as you can in 30 seconds!</p>
        
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        ) : (
          <button 
            onClick={startGame}
            onMouseEnter={() => !isMuted && playSound(600, 0.05, 'triangle', 0.1)}
            className="group rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 lg:px-8 lg:py-4 xl:px-10 xl:py-5 font-bold text-white text-sm lg:text-base xl:text-lg shadow-lg hover:shadow-2xl hover:shadow-pink-500/25 hover:scale-110 active:scale-95 transition-all duration-200 transform hover:-translate-y-1"
          >
            <span className="group-hover:animate-pulse">START GAME</span>
          </button>
        )}
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center space-y-4 lg:space-y-6 text-center min-h-[500px] lg:min-h-[600px] xl:min-h-[700px] relative">
        {/* Mute Button */}
        <button
          onClick={() => {
            setIsMuted(!isMuted);
            playButtonClick();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <span className="text-lg">{isMuted ? '🔇' : '🔊'}</span>
        </button>

        <div className="text-4xl lg:text-5xl xl:text-6xl animate-bounce">
          {score >= 200 ? '🏆' : '🎉'}
        </div>
        <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-white">Game Over!</h2>
        <div className="text-3xl lg:text-4xl xl:text-5xl font-bold text-yellow-400 animate-pulse">
          Score: {score}
        </div>
        <p className="text-sm lg:text-base xl:text-lg text-slate-300 px-4 lg:px-6">
          {score >= 200 ? "Amazing! Bubble Master! 🌟" : 
           score >= 100 ? "Great job! Bubble Pro! 💫" : 
           "Good try! Keep popping! 💪"}
        </p>
        <button 
          onClick={restart}
          onMouseEnter={() => !isMuted && playSound(600, 0.05, 'triangle', 0.1)}
          className="group rounded-full bg-gradient-to-r from-green-500 to-blue-500 px-6 py-3 lg:px-8 lg:py-4 xl:px-10 xl:py-5 font-bold text-white text-sm lg:text-base xl:text-lg shadow-lg hover:shadow-2xl hover:shadow-green-500/25 hover:scale-110 active:scale-95 transition-all duration-200 transform hover:-translate-y-1"
        >
          <span className="group-hover:animate-pulse">PLAY AGAIN</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-b from-sky-200 via-sky-100 to-blue-200">
      {/* Mute Button */}
      <button
        onClick={() => {
          setIsMuted(!isMuted);
          playButtonClick();
        }}
        className="absolute top-2 right-2 z-20 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg"
      >
        <span className="text-sm">{isMuted ? '🔇' : '🔊'}</span>
      </button>

      {/* Game UI */}
      <div className="absolute top-2 lg:top-3 xl:top-4 left-2 lg:left-3 xl:left-4 right-12 lg:right-16 xl:right-20 flex justify-between items-center z-10">
        <div className="rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 lg:px-4 lg:py-1.5 xl:px-5 xl:py-2 text-sm lg:text-base xl:text-lg font-bold text-slate-800 shadow-lg border border-white/20">
          Score: {score}
        </div>
        <div className={`rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 lg:px-4 lg:py-1.5 xl:px-5 xl:py-2 text-sm lg:text-base xl:text-lg font-bold shadow-lg border border-white/20 ${
          timeLeft <= 10 ? 'text-red-600 animate-pulse' : 'text-slate-800'
        }`}>
          Time: {timeLeft}s
        </div>
      </div>

      {/* Bubbles */}
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          onClick={() => popBubble(bubble.id)}
          className={`absolute cursor-pointer rounded-full ${bubble.color} opacity-80 hover:opacity-100 transition-all duration-200 hover:scale-125 active:scale-75 shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animation: `float 2s ease-in-out infinite ${Math.random() * 2}s, glow 3s ease-in-out infinite ${Math.random() * 3}s`
          }}
        >
          <div className="absolute inset-2 lg:inset-3 rounded-full bg-white/40 animate-pulse"></div>
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/60 to-transparent"></div>
        </div>
      ))}

      {/* Enhanced animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(255,255,255,0.5); }
          50% { box-shadow: 0 0 20px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.4); }
        }
      `}</style>
    </div>
  );
};

// Casino Game - Simple Slot Machine
const CasinoGame: FC = () => {
  const [credits, setCredits] = useState(100);
  const [spinning, setSpinning] = useState(false);
  const [reels, setReels] = useState(['🍒', '🍒', '🍒']);
  const [lastWin, setLastWin] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showWinAnimation, setShowWinAnimation] = useState(false);

  const symbols = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎'];

  // Sound functions for casino
  const playSound = (frequency: number, duration: number, type: 'sine' | 'square' | 'triangle' = 'sine', volume = 0.3) => {
    if (isMuted) return;
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;
      gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  const playButtonClick = () => playSound(800, 0.1, 'square', 0.2);
  const playSpinSound = () => {
    for (let i = 0; i < 20; i++) {
      setTimeout(() => playSound(200 + i * 20, 0.05, 'square', 0.1), i * 100);
    }
  };
  const playWinSound = () => {
    playSound(523, 0.3, 'triangle', 0.4);
    setTimeout(() => playSound(659, 0.3, 'triangle', 0.4), 200);
    setTimeout(() => playSound(784, 0.4, 'triangle', 0.4), 400);
  };
  const playJackpotSound = () => {
    for (let i = 0; i < 8; i++) {
      setTimeout(() => playSound(523 + i * 100, 0.2, 'triangle', 0.3), i * 100);
    }
  };

  const spin = () => {
    if (credits < 10 || spinning) return;
    
    playButtonClick();
    playSpinSound();
    setCredits(prev => prev - 10);
    setSpinning(true);
    setLastWin(0);
    setShowWinAnimation(false);

    // Animate spinning
    const spinInterval = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ]);
    }, 100);

    setTimeout(() => {
      clearInterval(spinInterval);
      const finalReels = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ];
      setReels(finalReels);
      
      // Check for wins
      let winAmount = 0;
      if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
        if (finalReels[0] === '💎') {
          winAmount = 500;
          playJackpotSound();
        } else if (finalReels[0] === '⭐') {
          winAmount = 200;
          playWinSound();
        } else {
          winAmount = 100;
          playWinSound();
        }
      } else if (finalReels[0] === finalReels[1] || finalReels[1] === finalReels[2] || finalReels[0] === finalReels[2]) {
        winAmount = 20;
        playWinSound();
      }
      
      if (winAmount > 0) {
        setCredits(prev => prev + winAmount);
        setLastWin(winAmount);
        setShowWinAnimation(true);
        setTimeout(() => setShowWinAnimation(false), 2000);
      }
      
      setSpinning(false);
    }, 2000);
  };

  const resetCredits = () => {
    playButtonClick();
    setCredits(100);
    setLastWin(0);
    setShowWinAnimation(false);
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center space-y-4 lg:space-y-6 text-center min-h-[500px] lg:min-h-[600px] xl:min-h-[700px] bg-gradient-to-b from-red-900 via-red-800 to-black rounded-2xl p-4 overflow-hidden">
      {/* Mute Button */}
      <button
        onClick={() => {
          setIsMuted(!isMuted);
          playButtonClick();
        }}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 hover:scale-110 active:scale-95 z-10"
      >
        <span className="text-lg">{isMuted ? '🔇' : '🔊'}</span>
      </button>

      {/* Win Animation Overlay */}
      {showWinAnimation && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="text-6xl lg:text-8xl animate-ping">💰</div>
        </div>
      )}

      <div className="text-3xl lg:text-4xl xl:text-5xl font-bold text-yellow-400 animate-pulse">
        🎰 SLOTS 🎰
      </div>
      
      <div className="bg-black/50 rounded-xl p-4 lg:p-6 shadow-2xl border border-yellow-500/20">
        <div className="flex justify-center space-x-2 lg:space-x-4 mb-4">
          {reels.map((symbol, index) => (
            <div 
              key={index} 
              className={`text-4xl lg:text-5xl xl:text-6xl bg-gradient-to-b from-white to-gray-200 rounded-lg p-2 lg:p-3 shadow-lg border-2 border-gray-300 transition-all duration-200 ${
                spinning ? 'animate-spin scale-110' : 'hover:scale-105'
              } ${showWinAnimation ? 'animate-bounce' : ''}`}
            >
              {symbol}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xl lg:text-2xl font-bold text-green-400 bg-black/30 rounded-full px-4 py-2">
          Credits: {credits}
        </div>
        {lastWin > 0 && (
          <div className={`text-lg lg:text-xl font-bold animate-bounce bg-yellow-400/20 rounded-full px-4 py-2 ${
            lastWin >= 500 ? 'text-yellow-300 text-2xl' : 'text-yellow-400'
          }`}>
            {lastWin >= 500 ? '🎉 JACKPOT! 🎉' : 'WIN!'} +{lastWin} credits!
          </div>
        )}
      </div>

      <div className="space-y-2">
        <button 
          onClick={spin}
          onMouseEnter={() => !isMuted && !spinning && playSound(600, 0.05, 'triangle', 0.1)}
          disabled={credits < 10 || spinning}
          className={`group rounded-full px-6 py-3 lg:px-8 lg:py-4 font-bold text-white text-sm lg:text-base shadow-lg transition-all duration-200 ${
            credits < 10 || spinning 
              ? 'bg-gray-600 cursor-not-allowed' 
              : 'bg-gradient-to-r from-yellow-500 to-red-500 hover:scale-110 hover:shadow-2xl hover:shadow-yellow-500/25 active:scale-95 transform hover:-translate-y-1'
          }`}
        >
          <span className={spinning ? 'animate-pulse' : 'group-hover:animate-pulse'}>
            {spinning ? 'SPINNING...' : 'SPIN (10 credits)'}
          </span>
        </button>
        
        {credits < 10 && (
          <button 
            onClick={resetCredits}
            onMouseEnter={() => !isMuted && playSound(600, 0.05, 'triangle', 0.1)}
            className="group rounded-full bg-gradient-to-r from-green-500 to-blue-500 px-4 py-2 lg:px-6 lg:py-3 font-bold text-white text-xs lg:text-sm shadow-lg hover:scale-110 hover:shadow-2xl hover:shadow-green-500/25 active:scale-95 transition-all duration-200 transform hover:-translate-y-1"
          >
            <span className="group-hover:animate-pulse">RESET CREDITS</span>
          </button>
        )}
      </div>

      <div className="text-xs lg:text-sm text-slate-300 px-4 bg-black/20 rounded-lg py-2">
        Match 3 symbols to win! 💎=500, ⭐=200, Others=100, Pairs=20
      </div>
    </div>
  );
};

// Kids Game - Fruit Swipe (Candy Crush style)
const KidsGame: FC = () => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
  const [moves, setMoves] = useState(20);
  const [isMuted, setIsMuted] = useState(false);
  const [matchingCells, setMatchingCells] = useState<{row: number, col: number}[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fruits = ['🍎', '🍊', '🍌', '🍇', '🍓', '🥝'];
  const gridSize = 6;

  // Sound functions for kids game
  const playSound = (frequency: number, duration: number, type: 'sine' | 'square' | 'triangle' = 'sine', volume = 0.3) => {
    if (isMuted) return;
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;
      gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  const playButtonClick = () => playSound(800, 0.1, 'square', 0.2);
  const playFruitSelect = () => playSound(600, 0.1, 'triangle', 0.3);
  const playMatch = () => {
    playSound(523, 0.2, 'triangle', 0.4);
    setTimeout(() => playSound(659, 0.2, 'triangle', 0.4), 100);
    setTimeout(() => playSound(784, 0.3, 'triangle', 0.4), 200);
  };
  const playGameStart = () => {
    playSound(440, 0.2, 'triangle', 0.3);
    setTimeout(() => playSound(554, 0.2, 'triangle', 0.3), 150);
    setTimeout(() => playSound(659, 0.3, 'triangle', 0.3), 300);
  };
  const playGameOver = () => {
    playSound(523, 0.3, 'sine', 0.3);
    setTimeout(() => playSound(440, 0.3, 'sine', 0.3), 300);
    setTimeout(() => playSound(349, 0.5, 'sine', 0.3), 600);
  };

  const createRandomGrid = (): string[][] => {
    const newGrid: string[][] = [];
    for (let row = 0; row < gridSize; row++) {
      newGrid[row] = [];
      for (let col = 0; col < gridSize; col++) {
        newGrid[row][col] = fruits[Math.floor(Math.random() * fruits.length)];
      }
    }
    return newGrid;
  };

  const findMatches = (grid: string[][]): {row: number, col: number}[] => {
    const matches: {row: number, col: number}[] = [];
    
    // Check horizontal matches (3 or more)
    for (let row = 0; row < gridSize; row++) {
      let count = 1;
      let currentFruit = grid[row][0];
      for (let col = 1; col < gridSize; col++) {
        if (grid[row][col] === currentFruit) {
          count++;
        } else {
          if (count >= 3) {
            for (let i = col - count; i < col; i++) {
              matches.push({row, col: i});
            }
          }
          count = 1;
          currentFruit = grid[row][col];
        }
      }
      if (count >= 3) {
        for (let i = gridSize - count; i < gridSize; i++) {
          matches.push({row, col: i});
        }
      }
    }

    // Check vertical matches (3 or more)
    for (let col = 0; col < gridSize; col++) {
      let count = 1;
      let currentFruit = grid[0][col];
      for (let row = 1; row < gridSize; row++) {
        if (grid[row][col] === currentFruit) {
          count++;
        } else {
          if (count >= 3) {
            for (let i = row - count; i < row; i++) {
              matches.push({row: i, col});
            }
          }
          count = 1;
          currentFruit = grid[row][col];
        }
      }
      if (count >= 3) {
        for (let i = gridSize - count; i < gridSize; i++) {
          matches.push({row: i, col});
        }
      }
    }

    return matches;
  };

  const removeMatches = (grid: string[][], matches: {row: number, col: number}[]): string[][] => {
    const newGrid = grid.map(row => [...row]);
    matches.forEach(({row, col}) => {
      newGrid[row][col] = '';
    });
    return newGrid;
  };

  const dropFruits = (grid: string[][]): string[][] => {
    const newGrid = grid.map(row => [...row]);
    
    for (let col = 0; col < gridSize; col++) {
      // Get all non-empty fruits in this column
      const fruits = [];
      for (let row = gridSize - 1; row >= 0; row--) {
        if (newGrid[row][col] !== '') {
          fruits.push(newGrid[row][col]);
        }
      }
      
      // Clear the column
      for (let row = 0; row < gridSize; row++) {
        newGrid[row][col] = '';
      }
      
      // Place fruits at the bottom
      for (let i = 0; i < fruits.length; i++) {
        newGrid[gridSize - 1 - i][col] = fruits[i];
      }
      
      // Fill empty spaces with new random fruits
      for (let row = 0; row < gridSize - fruits.length; row++) {
        newGrid[row][col] = fruits[Math.floor(Math.random() * fruits.length)];
      }
    }
    
    return newGrid;
  };

  const processMatches = (grid: string[][]) => {
    const matches = findMatches(grid);
    if (matches.length > 0) {
      playMatch();
      setMatchingCells(matches);
      setScore(prev => prev + matches.length * 10);
      
      setTimeout(() => {
        const gridWithoutMatches = removeMatches(grid, matches);
        const droppedGrid = dropFruits(gridWithoutMatches);
        setGrid(droppedGrid);
        setMatchingCells([]);
        
        // Check for new matches after dropping
        setTimeout(() => {
          processMatches(droppedGrid);
        }, 300);
      }, 500);
    }
  };

  const initializeGame = () => {
    playButtonClick();
    playGameStart();
    setIsLoading(true);
    
    setTimeout(() => {
      let newGrid = createRandomGrid();
      // Make sure we don't start with matches
      while (findMatches(newGrid).length > 0) {
        newGrid = createRandomGrid();
      }
      setGrid(newGrid);
      setScore(0);
      setMoves(20);
      setSelectedCell(null);
      setMatchingCells([]);
      setGameStarted(true);
      setIsLoading(false);
    }, 800);
  };

  const swapFruits = (row1: number, col1: number, row2: number, col2: number) => {
    const newGrid = grid.map(row => [...row]);
    const temp = newGrid[row1][col1];
    newGrid[row1][col1] = newGrid[row2][col2];
    newGrid[row2][col2] = temp;
    
    // Check if this swap creates matches
    const matches = findMatches(newGrid);
    if (matches.length > 0) {
      setGrid(newGrid);
      setMoves(prev => prev - 1);
      setTimeout(() => processMatches(newGrid), 100);
    }
    // If no matches, don't allow the swap (swap back)
  };

  const handleCellClick = (row: number, col: number) => {
    if (!selectedCell) {
      playFruitSelect();
      setSelectedCell({row, col});
    } else {
      const {row: selectedRow, col: selectedCol} = selectedCell;
      
      // Check if cells are adjacent
      const isAdjacent = 
        (Math.abs(row - selectedRow) === 1 && col === selectedCol) ||
        (Math.abs(col - selectedCol) === 1 && row === selectedRow);
      
      if (isAdjacent) {
        playFruitSelect();
        swapFruits(selectedRow, selectedCol, row, col);
      }
      
      setSelectedCell(null);
    }
  };

  const isGameOver = moves <= 0;

  if (!gameStarted) {
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center space-y-4 lg:space-y-6 text-center min-h-[500px] lg:min-h-[600px] xl:min-h-[700px] bg-gradient-to-b from-pink-300 via-purple-300 to-blue-300 rounded-2xl overflow-hidden">
        {/* Mute Button */}
        <button
          onClick={() => {
            setIsMuted(!isMuted);
            playButtonClick();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-all duration-200 hover:scale-110 active:scale-95 z-10"
        >
          <span className="text-lg">{isMuted ? '🔇' : '🔊'}</span>
        </button>

        {/* Floating fruit animations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 text-2xl animate-bounce" style={{animationDelay: '0s'}}>🍎</div>
          <div className="absolute top-20 right-16 text-2xl animate-bounce" style={{animationDelay: '0.5s'}}>🍊</div>
          <div className="absolute bottom-20 left-20 text-2xl animate-bounce" style={{animationDelay: '1s'}}>🍌</div>
          <div className="absolute bottom-16 right-12 text-2xl animate-bounce" style={{animationDelay: '1.5s'}}>🍇</div>
        </div>

        <div className="text-4xl lg:text-5xl xl:text-6xl animate-bounce">🍓</div>
        <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-white drop-shadow-lg">Fruit Swipe!</h2>
        <p className="text-sm lg:text-base xl:text-lg text-white px-4 lg:px-6 drop-shadow">Match 3 or more fruits in a row!</p>
        
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        ) : (
          <button 
            onClick={initializeGame}
            onMouseEnter={() => !isMuted && playSound(600, 0.05, 'triangle', 0.1)}
            className="group rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 lg:px-8 lg:py-4 xl:px-10 xl:py-5 font-bold text-white text-sm lg:text-base xl:text-lg shadow-lg hover:shadow-2xl hover:shadow-pink-500/25 hover:scale-110 active:scale-95 transition-all duration-200 transform hover:-translate-y-1"
          >
            <span className="group-hover:animate-pulse">START GAME</span>
          </button>
        )}
      </div>
    );
  }

  if (isGameOver) {
    setTimeout(() => {
      if (score >= 500) playMatch();
      else playGameOver();
    }, 100);

    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center space-y-4 lg:space-y-6 text-center min-h-[500px] lg:min-h-[600px] xl:min-h-[700px] bg-gradient-to-b from-pink-300 via-purple-300 to-blue-300 rounded-2xl overflow-hidden">
        {/* Mute Button */}
        <button
          onClick={() => {
            setIsMuted(!isMuted);
            playButtonClick();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-all duration-200 hover:scale-110 active:scale-95 z-10"
        >
          <span className="text-lg">{isMuted ? '🔇' : '🔊'}</span>
        </button>

        {/* Celebration animation */}
        {score >= 500 && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 text-3xl animate-ping">🎉</div>
            <div className="absolute top-1/3 right-1/4 text-3xl animate-ping" style={{animationDelay: '0.2s'}}>🏆</div>
            <div className="absolute bottom-1/3 left-1/3 text-3xl animate-ping" style={{animationDelay: '0.4s'}}>⭐</div>
          </div>
        )}

        <div className="text-4xl lg:text-5xl xl:text-6xl animate-bounce">
          {score >= 500 ? '🏆' : score >= 300 ? '🌟' : '🎉'}
        </div>
        <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-white drop-shadow-lg">Game Over!</h2>
        <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-yellow-300 drop-shadow-lg animate-pulse bg-white/20 rounded-full px-4 py-2">
          Score: {score}
        </div>
        <p className="text-sm lg:text-base text-white px-4 drop-shadow">
          {score >= 500 ? "Fruit Master! 🏆" : score >= 300 ? "Great Job! 🌟" : "Keep Trying! 💪"}
        </p>
        <button 
          onClick={initializeGame}
          onMouseEnter={() => !isMuted && playSound(600, 0.05, 'triangle', 0.1)}
          className="group rounded-full bg-gradient-to-r from-green-500 to-blue-500 px-6 py-3 lg:px-8 lg:py-4 xl:px-10 xl:py-5 font-bold text-white text-sm lg:text-base xl:text-lg shadow-lg hover:shadow-2xl hover:shadow-green-500/25 hover:scale-110 active:scale-95 transition-all duration-200 transform hover:-translate-y-1"
        >
          <span className="group-hover:animate-pulse">PLAY AGAIN</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-start space-y-2 lg:space-y-3 min-h-[500px] lg:min-h-[600px] xl:min-h-[700px] bg-gradient-to-b from-pink-300 via-purple-300 to-blue-300 rounded-2xl p-3 lg:p-4 overflow-hidden">
      {/* Mute Button */}
      <button
        onClick={() => {
          setIsMuted(!isMuted);
          playButtonClick();
        }}
        className="absolute top-2 right-2 z-20 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-all duration-200 hover:scale-110 active:scale-95"
      >
        <span className="text-sm">{isMuted ? '🔇' : '🔊'}</span>
      </button>

      {/* Game UI */}
      <div className="flex justify-between w-full max-w-sm z-10">
        <div className="text-sm lg:text-base font-bold text-white bg-white/30 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg border border-white/20">
          Score: {score}
        </div>
        <div className={`text-sm lg:text-base font-bold rounded-full px-3 py-1 shadow-lg border border-white/20 backdrop-blur-sm ${
          moves <= 5 ? 'text-red-100 bg-red-500/30 animate-pulse' : 'text-white bg-white/30'
        }`}>
          Moves: {moves}
        </div>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-6 gap-2 lg:gap-3 max-w-md lg:max-w-lg bg-white/20 backdrop-blur-sm rounded-xl p-3 lg:p-4 shadow-xl border border-white/30">
        {grid.map((row, rowIndex) =>
          row.map((fruit, colIndex) => {
            const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
            const isMatching = matchingCells.some(cell => cell.row === rowIndex && cell.col === colIndex);
            
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                className={`aspect-square flex items-center justify-center text-3xl lg:text-4xl xl:text-5xl rounded-lg cursor-pointer transition-all duration-300 min-h-[40px] lg:min-h-[50px] xl:min-h-[60px] transform ${
                  isSelected
                    ? 'bg-yellow-300 scale-110 shadow-xl ring-4 ring-yellow-400/50 animate-pulse'
                    : isMatching
                    ? 'bg-green-300 scale-125 shadow-xl animate-bounce'
                    : 'bg-white/90 hover:bg-white hover:scale-105 hover:shadow-lg active:scale-95 hover:-translate-y-1'
                } ${isMatching ? 'z-10' : ''}`}
                style={{
                  animation: isMatching ? 'matchGlow 0.5s ease-in-out' : undefined
                }}
              >
                <span className={isMatching ? 'animate-pulse' : ''}>{fruit}</span>
              </div>
            );
          })
        )}
      </div>

      <div className="text-xs lg:text-sm text-white/90 text-center px-2 bg-white/20 rounded-lg py-1 backdrop-blur-sm">
        Tap two adjacent fruits to swap them!
      </div>

      {/* Enhanced animations */}
      <style jsx>{`
        @keyframes matchGlow {
          0% { box-shadow: 0 0 5px rgba(34, 197, 94, 0.5); }
          50% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.8), 0 0 30px rgba(34, 197, 94, 0.4); }
          100% { box-shadow: 0 0 5px rgba(34, 197, 94, 0.5); }
        }
      `}</style>
    </div>
  );
};

