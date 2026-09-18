import { Component } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AppShellComponent } from '../../components/layout/app-shell.component';
import { UserTableRowComponent } from '../../components/users/user-table-row/user-table-row.component';
import { UserFormModalComponent } from '../../components/modals/user-form-modal/user-form-modal.component';
import { ConfirmModalComponent } from '../../components/modals/confirm-modal/confirm-modal.component';
import { UserTableRow } from '../../models/users';

@Component({
  selector: 'app-users',
  imports: [
    AppShellComponent,
    UserTableRowComponent,
    MdbFormsModule,
    MdbRippleModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  // MOCK: dados fixos apenas para o visual.
  // TODO(api): substituir por GET /api/users via HttpClient.
  // Obs.: rank, status e 2FA nao existem em UsersService — ver relatorio.
  readonly users: UserTableRow[] = [
    {
      name: 'Mariana Ferreira',
      initials: 'MF',
      avatarModifier: 'purple',
      email: 'mariana.ferreira@cabanos.com',
      roleLabel: 'Gerente de Projetos',
      tierLabel: 'Ouro',
      tierModifier: 'gold',
      statusLabel: 'Ativo',
      statusModifier: 'active',
      twoFactorLabel: 'Habilitado',
      twoFactorModifier: 'active'
    },
    {
      name: 'Rafael Andrade',
      initials: 'RA',
      avatarModifier: 'blue',
      email: 'rafael.andrade@cabanos.com',
      roleLabel: 'Desenvolvedor(a)',
      tierLabel: 'Platina',
      tierModifier: 'platinum',
      statusLabel: 'Ativo',
      statusModifier: 'active',
      twoFactorLabel: 'Habilitado',
      twoFactorModifier: 'active'
    },
    {
      name: 'Julia Santos',
      initials: 'JS',
      avatarModifier: 'pink',
      email: 'julia.santos@cabanos.com',
      roleLabel: 'Designer',
      tierLabel: 'Prata',
      tierModifier: 'silver',
      statusLabel: 'Ativo',
      statusModifier: 'active',
      twoFactorLabel: 'Desabilitado',
      twoFactorModifier: 'off'
    },
    {
      name: 'Thiago Pereira',
      initials: 'TP',
      avatarModifier: 'orange',
      email: 'thiago.pereira@cabanos.com',
      roleLabel: 'Desenvolvedor(a)',
      tierLabel: 'Bronze',
      tierModifier: 'bronze',
      statusLabel: 'Inativo',
      statusModifier: 'off',
      twoFactorLabel: 'Desabilitado',
      twoFactorModifier: 'off'
    },
    {
      name: 'Gustavo Cardoso',
      initials: 'GC',
      avatarModifier: 'violet',
      email: 'gustavo.cardoso@cabanos.com',
      roleLabel: 'Administrador',
      tierLabel: 'Diamante',
      tierModifier: 'diamond',
      statusLabel: 'Ativo',
      statusModifier: 'active',
      twoFactorLabel: 'Habilitado',
      twoFactorModifier: 'active'
    }
  ];

  constructor(private modalService: MdbModalService) {}

  openUserModal(): void {
    this.modalService.open(UserFormModalComponent, {
      modalClass: 'modal-dialog-centered'
    });
  }

  openDeleteUserModal(name: string): void {
    this.modalService.open(ConfirmModalComponent, {
      modalClass: 'modal-dialog-centered modal-sm',
      data: {
        title: 'Excluir usuario?',
        message: 'Essa acao removera permanentemente o acesso de',
        name,
        confirmText: 'Excluir usuario'
      }
    });
  }
}
