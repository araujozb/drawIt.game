import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center gap-6 p-8">
      <h1 className="text-5xl font-bold">🎨 DRAWIT</h1>
      <p className="text-xl max-w-xl">
        Um jogo de desenho com avaliação por IA! Registre-se, entenda as regras e vença desenhando com precisão.
      </p>
      <button
        className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
        onClick={() => navigate('/rules')}
      >
        Ver Regras
      </button>
    </div>
  );
};

export default Welcome;
