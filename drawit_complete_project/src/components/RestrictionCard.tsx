import React from 'react';

interface RestrictionCardProps {
  type: 'nonDominantHand' | 'oneColor' | 'noLift';
}

const restrictionTexts = {
  nonDominantHand: '👋 Usar mão não dominante',
  oneColor: '🎨 Usar apenas uma cor',
  noLift: '✍️ Não levantar o lápis',
};

const RestrictionCard = ({ type }: RestrictionCardProps) => {
  return (
    <div className="border p-3 bg-red-100 rounded-xl text-center shadow text-lg font-medium">
      {restrictionTexts[type]}
    </div>
  );
};

export default RestrictionCard;
