export type UserRole = 'admin' | 'membro';

export interface Users {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: UserRole;
  roleLabel: string;
}
 
export interface UserTableRow {
  id: number;
 cargoId: number;
  status: 'ATIVO' | 'INATIVO';
  name: string;
  initials: string;
  avatarModifier: 'purple' | 'blue' | 'pink' | 'orange' | 'violet' | 'green';
  email: string;
  roleLabel: string;
  tierLabel: string;
  tierModifier: 'gold' | 'platinum' | 'silver' | 'bronze' | 'diamond';
  statusLabel: string;
  statusModifier: 'active' | 'off';
}


export interface UserApiResponse {
  id: number;
  nome: string;
  email: string;
  urlAvatar: string | null;
  cargo: {
    id: number;
    nome: string;
  };
  status: 'ATIVO' | 'INATIVO';
  xp: number;
  elo: 'INICIANTE' | 'JUNIOR' | 'PLENO' | 'ESPECIALISTA' | 'LEGACY';
  createdAt: string;
  updatedAt: string;
}

export interface CargoApiResponse {
  id: number;
  nome: string;
}

export interface UserCreateRequest {
  nome: string;
  email: string;
  senha: string;
  cargoId: number;
  status: 'ATIVO' | 'INATIVO';
  urlAvatar: string | null;
}

export interface UserUpdateRequest {
  nome: string;
  email: string;
  cargoId: number;
  status: 'ATIVO' | 'INATIVO';
  urlAvatar: string | null;
}