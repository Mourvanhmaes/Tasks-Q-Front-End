import { Injectable } from '@angular/core';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly users: Users[] = [
    {
      id: 'u1',
      name: 'Mariana Ferreira',
      initials: 'MF',
      email: 'mariana.ferreira@cabanos.com',
      role: 'membro',
      roleLabel: 'Gerente de Projetos'
    },
    {
      id: 'u2',
      name: 'Rafael Andrade',
      initials: 'RA',
      email: 'rafael.andrade@cabanos.com',
      role: 'membro',
      roleLabel: 'Desenvolvedor(a)'
    },
    {
      id: 'u3',
      name: 'Julia Santos',
      initials: 'JS',
      email: 'julia.santos@cabanos.com',
      role: 'membro',
      roleLabel: 'Designer'
    },
    {
      id: 'u4',
      name: 'Thiago Pereira',
      initials: 'TP',
      email: 'thiago.pereira@cabanos.com',
      role: 'membro',
      roleLabel: 'Desenvolvedor(a)'
    },
    {
      id: 'u5',
      name: 'Gustavo Cardoso',
      initials: 'GC',
      email: 'gustavo.cardoso@cabanos.com',
      role: 'admin',
      roleLabel: 'Administrador'
    }
  ];

  getById(id: string): Users | undefined {
    return this.users.find(user => user.id === id);
  }
}
