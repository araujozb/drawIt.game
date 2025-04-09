import React from 'react';
import { useNavigate } from 'react-router-dom';

const Rules = () => {
  const navigate = useNavigate();

  return (
    <div className="p-10 space-y-6 max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold">📜 Regras do Jogo</h2>
      <ul className="list-disc pl-6 space-y-3 text-lg">
        <li>Cada jogador começa com 3 vidas.</li>
        <li>Um tema aleatório (animal, comida, veículo) é sorteado.</li>
        <li>Um jogador desenha e a IA avalia o desenho.</li>
        <li>Acertos dão 100 pontos. Erros tiram uma vida.</li>
        <li>Cartas bônus e restritivas afetam a jogabilidade.</li>
        <li>O jogo termina quando restar um jogador ou acabar o número de rodadas.</li>
      </ul>
      <button
        className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600"
        onClick={() => navigate('/register')}
      >
        Registrar Jogadores
      </button>
    </div>
  );
};

export default Rules;
