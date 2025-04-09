export type BonusCardType = 'replay' | 'doublePoints' | 'ignoreRestriction';
export type RestrictionCardType = 'nonDominantHand' | 'oneColor' | 'noLift';

export interface BonusCard {
  id: string;
  type: BonusCardType;
  description: string;
}

export interface RestrictionCard {
  id: string;
  type: RestrictionCardType;
  description: string;
}

export const bonusCards: BonusCard[] = [
  { id: 'bonus1', type: 'replay', description: '🎁 Repetir o desenho caso erre' },
  { id: 'bonus2', type: 'doublePoints', description: '💎 Receba o dobro de pontos caso acerte' },
  { id: 'bonus3', type: 'ignoreRestriction', description: '🛡️ Ignore qualquer restrição nessa rodada' }
];

export const restrictionCards: RestrictionCard[] = [
  { id: 'res1', type: 'nonDominantHand', description: '👋 Desenhar com a mão não dominante' },
  { id: 'res2', type: 'oneColor', description: '🎨 Usar apenas uma cor no desenho' },
  { id: 'res3', type: 'noLift', description: '✍️ Não levantar o lápis durante o desenho' }
];

export function drawBonusCard(): BonusCard {
  const index = Math.floor(Math.random() * bonusCards.length);
  return bonusCards[index];
}

export function drawRestrictionCard(): RestrictionCard {
  const index = Math.floor(Math.random() * restrictionCards.length);
  return restrictionCards[index];
}
