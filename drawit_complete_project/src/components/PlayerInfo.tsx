import React from 'react';

interface PlayerInfoProps {
  name: string;
  points: number;
  lives: number;
}

const PlayerInfo = ({ name, points, lives }: PlayerInfoProps) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow text-center">
      <p className="font-bold text-lg">{name}</p>
      <p>Pontos: {points}</p>
      <p>Vidas: {lives}</p>
    </div>
  );
};

export default PlayerInfo;
