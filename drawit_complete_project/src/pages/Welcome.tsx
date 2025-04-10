import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Welcome.module.css'; 

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>🖌 DRAW.IT 🖍</h1>
        <p className={styles.description}>
          Um jogo de desenho com avaliação por IA! Registre-se, entenda as regras e vença com criatividade e precisão.
        </p>
        <button className={styles.button} onClick={() => navigate('/rules')}>
          Ver Regras
        </button>
      </div>
    </div>
  );
};

export default Welcome;
