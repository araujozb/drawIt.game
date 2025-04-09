import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Canvas from '../components/Canvas';
import PlayerInfo from '../components/PlayerInfo';
import ThemeDisplay from '../components/ThemeDisplay';
import { classifyDrawing, loadModel } from '../utils/aiModel';
import { drawRestrictionCard, RestrictionCard } from '../utils/cards';
import RestrictionCardDisplay from '../components/RestrictionCard';

const themeMap: Record<string, string> = {
  animal: 'animals',
  comida: 'food',
  veiculo: 'vehicle',
};

const themes = Object.keys(themeMap);

const Game = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const players = state?.players || [];

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [theme, setTheme] = useState('');
  const [message, setMessage] = useState('');
  const [scores, setScores] = useState(players.map(() => 0));
  const [lives, setLives] = useState(players.map(() => 3));
  const [restriction, setRestriction] = useState<RestrictionCard | null>(null);
  const canvasRef = useRef<any>();

  useEffect(() => {
    loadModel();
    startRound();
  }, []);

  const startRound = () => {
    const newTheme = themes[Math.floor(Math.random() * themes.length)];
    setTheme(newTheme);
    setRestriction(drawRestrictionCard());
  };

  const handleClear = () => {
    canvasRef.current.clearCanvas();
  };

  const handleClassify = async () => {
    const image = await canvasRef.current.exportImage('png');
    const img = new Image();
    img.src = image;
    img.onload = async () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      const predictions = await classifyDrawing(canvas);
      console.log('📦 Predições:', predictions);

      const expectedClass = themeMap[theme];
      console.log('🎯 Tema atual:', theme, '| 🧠 Classe esperada:', expectedClass);

      const result = predictions.find(
        (p) =>
          p.className.toLowerCase().includes(expectedClass.toLowerCase()) ||
          expectedClass.toLowerCase().includes(p.className.toLowerCase())
      );

      if (result && result.probability > 0.05) {
        if (result.probability >= 0.9) {
          const updatedScores = [...scores];
          updatedScores[currentPlayerIndex] += 100;
          setScores(updatedScores);
          setMessage('✅ Alta confiança! +100 pontos');
        } else {
          setMessage('🟡 Classe correta, mas confiança baixa. Nenhum ponto ou penalidade.');
        }
      } else {
        setMessage('❌ Tema não detectado na predição. -1 vida');
        const updatedLives = [...lives];
        updatedLives[currentPlayerIndex] -= 1;
        setLives(updatedLives);
      }

      setTimeout(() => {
        const nextIndex = (currentPlayerIndex + 1) % players.length;
        setCurrentPlayerIndex(nextIndex);
        startRound();
        canvasRef.current.clearCanvas();
        setMessage('');
      }, 2500);
    };
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold text-center">
        🎮 Rodada de {players[currentPlayerIndex]}
      </h2>
      <ThemeDisplay theme={theme} />
      {restriction && <RestrictionCardDisplay type={restriction.type} />}
      <Canvas ref={canvasRef} />
      <div className="flex justify-center gap-4">
        <button onClick={handleClear} className="bg-gray-300 px-4 py-2 rounded">
          Limpar
        </button>
        <button onClick={handleClassify} className="bg-blue-500 text-white px-4 py-2 rounded">
          Classificar
        </button>
      </div>
      <p className="text-center text-lg font-semibold">{message}</p>
      <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto mt-6">
        {players.map((p, i) => (
          <React.Fragment key={i}>
            <PlayerInfo name={p} points={scores[i]} lives={lives[i]} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Game;
