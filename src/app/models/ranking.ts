// MOCK: o ranking ainda nao vem de service/API.

/** Layout do ranking: compacto (dashboard) ou tabela (tela de XP). */
export type RankingVariant = 'dashboard' | 'xp';

export interface RankingEntry {
  /** numero da posicao; no primeiro lugar da tela de XP e trocado por uma coroa */
  position: string;
  positionModifier: 'gold' | 'silver' | 'bronze' | null;
  initials: string;
  name: string;
  role: string;

  // --- variante dashboard ---
  scoreValue?: string;
  scoreLabel?: string;

  // --- variante xp ---
  xpLabel?: string;
  tierLabel?: string;
  tierModifier?: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  /** primeiro colocado (coroa) */
  top?: boolean;
  /** linha do usuario logado */
  me?: boolean;
}
