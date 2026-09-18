import { Injectable, computed, inject, signal } from '@angular/core';
import { Users } from '../models/users';
import { UsersService } from './users.service';

/**
 * Guarda o usuario logado. Enquanto nao existe autenticacao de verdade,
 * o usuario inicial e o mesmo exibido na sidebar e pode ser trocado na tela
 * de tarefas para conferir as permissoes de cada papel.
 */
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly usersService = inject(UsersService);

  private readonly _currentUser = signal<Users>(this.usersService.users[0]);

  readonly currentUser = this._currentUser.asReadonly();

  readonly isAdmin = computed(() => this._currentUser().role === 'admin');

  setCurrentUser(id: string): void {
    const user = this.usersService.getById(id);
    if (user) {
      this._currentUser.set(user);
    }
  }
}
