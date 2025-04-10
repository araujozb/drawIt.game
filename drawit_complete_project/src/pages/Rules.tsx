import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Rules.module.css';

const Rules: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>📜 Regras do Jogo</h2>
        <ul className={styles.rulesList}>
          <li>🎯 Cada jogador começa com 3 vidas.</li>
          <li>🧠 A IA avalia seus desenhos com base em precisão.</li>
          <li>⏱ Acertos dão pontos, erros tiram vidas.</li>
          <li>🎁 Cartas bônus e restrições adicionam desafios.</li>
        </ul>
        <button onClick={() => navigate('/register')} className={styles.button}>
          Registrar Jogadores
        </button>
      </div>
    </div>
  );
};

export default Rules;
