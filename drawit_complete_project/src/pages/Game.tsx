import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Canvas from '../components/Canvas';
import PlayerInfo from '../components/PlayerInfo';
import { classifyDrawing, loadModel } from '../utils/aiModel';
import { drawRestrictionCard, RestrictionCard } from '../utils/cards';
import styles from './Game.module.css';

const themeMap: Record<string, string> = {
  animal: 'animals',
  comida: 'food',
  veiculo: 'vehicle',
};

const themes = Object.keys(themeMap);

const Game: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const players = state?.players || [];

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [theme, setTheme] = useState('');
  const [message, setMessage] = useState('');
  const [scores, setScores] = useState(players.map(() => 0));
  const [lives, setLives] = useState(players.map(() => 3));
  const [restriction, setRestriction] = useState<RestrictionCard | null>(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const canvasRef = useRef<any>();

  useEffect(() => {
    loadModel();
    startRound();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleTimeOut();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const startRound = () => {
    const newTheme = themes[Math.floor(Math.random() * themes.length)];
    setTheme(newTheme);
    setRestriction(drawRestrictionCard());
    setTimeLeft(10); // Reset timer for the new round
  };

  const handleTimeOut = () => {
    const updatedLives = [...lives];
    updatedLives[currentPlayerIndex] -= 1;
    setLives(updatedLives);
    setMessage('⏰ Tempo esgotado! -1 vida');

    // Verifica se o jogador foi eliminado
    if (updatedLives[currentPlayerIndex] <= 0) {
      const remaining = updatedLives.filter((v) => v > 0);

      // Se só 1 sobrou → ele vence
      if (remaining.length === 1) {
        const winnerIndex = updatedLives.findIndex((v) => v > 0);
        setTimeout(() => {
          navigate('/end', {
            state: {
              winner: players[winnerIndex],
              scores,
              lives: updatedLives,
              players,
            },
          });
        }, 2000);
        return;
      }
    }

    // Próximo jogador
    setTimeout(() => {
      let nextIndex = (currentPlayerIndex + 1) % players.length;

      // Encontra o próximo jogador com vida
      while (lives[nextIndex] <= 0) {
        nextIndex = (nextIndex + 1) % players.length;
      }

      setCurrentPlayerIndex(nextIndex);
      startRound();
      canvasRef.current.clearCanvas();
      setMessage('');
    }, 2500);
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
      const expectedClass = themeMap[theme];

      const result = predictions.find(
        (p) =>
          p.className.toLowerCase().includes(expectedClass.toLowerCase()) ||
          expectedClass.toLowerCase().includes(p.className.toLowerCase())
      );

      const updatedScores = [...scores];
      const updatedLives = [...lives];

      if (result && result.probability > 0.05) {
        if (result.probability >= 0.9) {
          updatedScores[currentPlayerIndex] += 100;
          setMessage('✅ Alta confiança! +100 pontos');
        } else {
          setMessage('🟡 Classe correta, mas confiança baixa.');
        }
      } else {
        updatedLives[currentPlayerIndex] -= 1;
        setMessage('❌ Tema não detectado. -1 vida');
      }

      setScores(updatedScores);
      setLives(updatedLives);

      // ⛳ Verifica se o jogador venceu por pontuação
      if (updatedScores[currentPlayerIndex] >= 500) {
        setTimeout(() => {
          navigate('/end', {
            state: {
              winner: players[currentPlayerIndex],
              scores: updatedScores,
              lives: updatedLives,
              players,
            },
          });
        }, 2000);
        return;
      }

      // 💀 Verifica se ele foi eliminado
      if (updatedLives[currentPlayerIndex] <= 0) {
        const remaining = updatedLives.filter((v) => v > 0);

        // Se só 1 sobrou → ele vence
        if (remaining.length === 1) {
          const winnerIndex = updatedLives.findIndex((v) => v > 0);
          setTimeout(() => {
            navigate('/end', {
              state: {
                winner: players[winnerIndex],
                scores: updatedScores,
                lives: updatedLives,
                players,
              },
            });
          }, 2000);
          return;
        }
      }

      // 🕹️ Próximo jogador
      setTimeout(() => {
        let nextIndex = (currentPlayerIndex + 1) % players.length;

        // Encontra o próximo jogador com vida
        while (lives[nextIndex] <= 0) {
          nextIndex = (nextIndex + 1) % players.length;
        }

        setCurrentPlayerIndex(nextIndex);
        startRound();
        canvasRef.current.clearCanvas();
        setMessage('');
      }, 2500);
    };
  };

  return (
    <div className={styles.container}>
      {/* Barra de status visível no topo */}
      <div className={styles.statusBar}>
        <div className={styles.statusItem}><strong>🎯 Jogador:</strong> {players[currentPlayerIndex]}</div>
        <div className={styles.statusItem}><strong>🧠 Tema:</strong> {theme}</div>
        <div className={styles.statusItem}><strong>❤️ Vida:</strong> {lives[currentPlayerIndex]}</div>
        <div className={styles.statusItem}><strong>⏳ Tempo:</strong> {timeLeft}s</div>
      </div>

      {/* Área lateral: Canvas + Ranking */}
      <div className={styles.mainContent}>
        <div className={styles.leftSide}>
          <div className={styles.canvasWrapper}>
            <Canvas ref={canvasRef} />
          </div>
          <div className={styles.controls}>
            <button onClick={handleClear} className={styles.button}>Limpar</button>
            <button onClick={handleClassify} className={styles.button}>Classificar</button>
          </div>
          {message && <p className={styles.message}>{message}</p>}
        </div>

        <div className={styles.rightSide}>
          <h3 style={{ marginBottom: '12px', fontSize: '18px' }}>🏆 Ranking</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Jogador</th>
                <th>Pontos</th>
                <th>Vidas</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p, i) => (
                <tr key={i}>
                  <td>{p}</td>
                  <td>{scores[i]}</td>
                  <td>{lives[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p
            className={styles.message}
            style={{ color: message.includes('❌') ? '#ff4d4d' : '#00ffaa' }}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Game;
