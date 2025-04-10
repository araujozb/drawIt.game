
export type RestrictionType = 'espelhar' | 'canhoto' | 'tela pequena' | 'desenhe sem ver';

export interface RestrictionCard {
  type: RestrictionType;
  description: string;
}

const restrictionCards: RestrictionCard[] = [
  { type: 'espelhar', description: 'O desenho será espelhado horizontalmente.' },
  { type: 'canhoto', description: 'Só é permitido usar a mão esquerda (área da direita desabilitada).' },
  { type: 'tela pequena', description: 'O canvas fica reduzido.' },
  { type: 'desenhe sem ver', description: 'Você precisa desenhar com o canvas oculto.' },
];

export const drawRestrictionCard = (): RestrictionCard => {
  const index = Math.floor(Math.random() * restrictionCards.length);
  return restrictionCards[index];
};
