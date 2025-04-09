
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PlayerResult {
  name: string;
  points: number;
}

const mockResults: PlayerResult[] = [
  { name: 'Ana', points: 400 },
  { name: 'João', points: 300 },
  { name: 'Carlos', points: 200 },
];

const EndGame = () => {
  const navigate = useNavigate();

  const winner = mockResults[0];

  return (
    <div className="p-10 max-w-3xl mx-auto text-center space-y-6">
      <h2 className="text-4xl font-bold">🏁 Fim de Jogo</h2>
      <p className="text-2xl">Parabéns, <strong>{winner.name}</strong>! Você venceu com {winner.points} pontos 🎉</p>

      <h3 className="text-2xl mt-6 font-semibold">🏆 Ranking</h3>
      <ul className="space-y-2 text-left text-xl">
        {mockResults.map((player, index) => (
          <li key={index}>
            {index + 1}. {player.name} - {player.points} pts
          </li>
        ))}
      </ul>

      <button
        onClick={() => navigate('/')}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        Jogar Novamente
      </button>
    </div>
  );
};

export default EndGame;
