import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

const Register: React.FC = () => {
  const [players, setPlayers] = useState<string[]>([]);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const addPlayer = () => {
    if (name.trim() !== '') {
      setPlayers([...players, name.trim()]);
      setName('');
    }
  };

  const startGame = () => {
    navigate('/game', { state: { players } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>👥 Registrar Jogadores</h2>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Nome do jogador"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
          <button onClick={addPlayer} className={styles.button}>➕</button>
        </div>
        <ul>
          {players.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
        <button onClick={startGame} className={styles.startButton}>
          ▶️ Iniciar Jogo
        </button>
      </div>
    </div>
  );
};

export default Register;
