
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
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
    <div className="p-10 max-w-xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-center">👥 Registrar Jogadores</h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Nome do jogador"
          className="border p-2 rounded flex-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={addPlayer} className="bg-blue-500 px-4 py-2 text-white rounded">Adicionar</button>
      </div>
      <ul className="list-disc pl-5">
        {players.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
      <button onClick={startGame} className="mt-4 bg-green-500 px-6 py-2 text-white rounded">Iniciar Jogo</button>
    </div>
  );
};

export default Register;
