import React from 'react';

interface Player {
  name: string;
  points: number;
}

interface LeaderboardProps {
  players: Player[];
}

const Leaderboard = ({ players }: LeaderboardProps) => (
  <div className="bg-white p-4 rounded-xl shadow">
    <h3 className="text-xl font-bold mb-2">🏆 Ranking</h3>
    <ul className="space-y-1">
      {players.sort((a, b) => b.points - a.points).map((player, index) => (
        <li key={index}>
          {index + 1}. {player.name} - {player.points} pts
        </li>
      ))}
    </ul>
  </div>
);

export default Leaderboard;
