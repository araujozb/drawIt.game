import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './EndGame.module.css';

interface PlayerResult {
  name: string;
  points: number;
  lives: number;
}

const EndGame: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const players: string[] = location.state?.players || [];
  const scores: number[] = location.state?.scores || [];
  const lives: number[] = location.state?.lives || [];
  const winner: string = location.state?.winner || 'Desconhecido';

  const results: PlayerResult[] = players.map((name, index) => ({
    name,
    points: scores[index] || 0,
    lives: lives[index] || 0,
  })).sort((a, b) => b.points - a.points);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>🏁 Fim de Jogo</h2>
        <p className={styles.subtitle}>
          Parabéns, <strong>{winner}</strong>! Você venceu 🎉
        </p>

        <h3 className={styles.sectionTitle}>🏆 Ranking Final</h3>
        <ul className={styles.list}>
          {results.map((player, index) => (
            <li key={index}>
              {index + 1}. {player.name} - {player.points} pts | ❤️ {player.lives}
            </li>
          ))}
        </ul>

        <button onClick={() => navigate('/')} className={styles.button}>
          🔁 Jogar Novamente
        </button>
      </div>
    </div>
  );
};

export default EndGame;
