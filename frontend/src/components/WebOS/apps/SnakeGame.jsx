import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const SnakeGame = () => {
  const [snake, setSnake] = useState([[10, 10]]);
  const [food, setFood] = useState([15, 15]);
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(150);

  const gridSize = 20;
  const cellSize = 20;

  const generateFood = useCallback(() => {
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);
    return [x, y];
  }, []);

  const resetGame = () => {
    setSnake([[10, 10]]);
    setFood(generateFood());
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const newSnake = [...prevSnake];
        const head = [...newSnake[0]];

        switch (direction) {
          case 'UP':
            head[1] -= 1;
            break;
          case 'DOWN':
            head[1] += 1;
            break;
          case 'LEFT':
            head[0] -= 1;
            break;
          case 'RIGHT':
            head[0] += 1;
            break;
          default:
            break;
        }

        // Check wall collision
        if (head[0] < 0 || head[0] >= gridSize || head[1] < 0 || head[1] >= gridSize) {
          setGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }

        // Check self collision
        if (newSnake.some(segment => segment[0] === head[0] && segment[1] === head[1])) {
          setGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }

        newSnake.unshift(head);

        // Check food collision
        if (head[0] === food[0] && head[1] === food[1]) {
          setFood(generateFood());
          setScore(prev => prev + 10);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [direction, food, isPlaying, gameOver, speed, generateFood]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isPlaying) return;

      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, isPlaying]);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-green-400 to-emerald-600 p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Snake Game</h2>
            <p className="text-sm text-gray-600">Use arrow keys to move</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-600">{score}</div>
            <div className="text-xs text-gray-600">SCORE</div>
          </div>
        </div>

        {/* Game Board */}
        <div
          className="relative border-4 border-gray-800 bg-gray-100"
          style={{
            width: gridSize * cellSize,
            height: gridSize * cellSize,
          }}
        >
          {/* Snake */}
          {snake.map((segment, idx) => (
            <div
              key={idx}
              className="absolute bg-green-600 rounded-sm"
              style={{
                left: segment[0] * cellSize,
                top: segment[1] * cellSize,
                width: cellSize - 2,
                height: cellSize - 2,
                opacity: idx === 0 ? 1 : 0.8,
              }}
            />
          ))}

          {/* Food */}
          <div
            className="absolute bg-red-500 rounded-full"
            style={{
              left: food[0] * cellSize,
              top: food[1] * cellSize,
              width: cellSize - 2,
              height: cellSize - 2,
            }}
          />

          {/* Game Over Overlay */}
          {gameOver && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-3xl font-bold mb-2">Game Over!</h3>
                <p className="text-xl mb-4">Score: {score}</p>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={gameOver}
            className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 flex items-center gap-2 transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={resetGame}
            className="px-6 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;