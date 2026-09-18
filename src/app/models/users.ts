export type UserRole = 'admin' | 'membro';

export interface Users {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: UserRole;
  /** Cargo exibido na interface (ex.: Gerente de Projetos) */
  roleLabel: string;
}

// MOCK: interface criada apenas para tipar a linha da tabela de /users.
// Rank, status e 2FA ainda nao existem em Users nem em nenhum service.
export interface UserTableRow {
  name: string;
  initials: string;
  avatarModifier: 'purple' | 'blue' | 'pink' | 'orange' | 'violet' | 'green';
  email: string;
  roleLabel: string;
  tierLabel: string;
  tierModifier: 'gold' | 'platinum' | 'silver' | 'bronze' | 'diamond';
  statusLabel: string;
  statusModifier: 'active' | 'off';
  twoFactorLabel: string;
  twoFactorModifier: 'active' | 'off';
}
