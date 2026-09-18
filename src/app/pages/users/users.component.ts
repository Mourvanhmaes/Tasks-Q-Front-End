import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AppShellComponent } from '../../components/layout/app-shell.component';
import { UserTableRowComponent } from '../../components/users/user-table-row/user-table-row.component';
import { UserFormModalComponent } from '../../components/modals/user-form-modal/user-form-modal.component';
import { ConfirmModalComponent } from '../../components/modals/confirm-modal/confirm-modal.component';
import { UserTableRow } from '../../models/users';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  imports: [
    FormsModule,
    AppShellComponent,
    UserTableRowComponent,
    MdbFormsModule,
    MdbRippleModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  users: UserTableRow[] = [];
  private todosUsuarios: UserTableRow[] = [];

  busca = '';
  cargoSelecionado = '';
  statusSelecionado = '';
  cargosDisponiveis: string[] = [];

  constructor(
    private readonly modalService: MdbModalService,
    private readonly usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  private carregarUsuarios(): void {
    this.usersService.listar().subscribe({
      next: usuarios => {
        this.todosUsuarios = usuarios.map((usuario): UserTableRow => ({
          id: usuario.id,
          cargoId: usuario.cargo.id,
          status: usuario.status,
          name: usuario.nome,
          initials: usuario.nome
            .split(' ')
            .slice(0, 2)
            .map(parte => parte.charAt(0))
            .join('')
            .toUpperCase(),
          avatarModifier: 'purple',
          email: usuario.email,
          roleLabel: usuario.cargo.nome,
          tierLabel: usuario.elo,
          tierModifier: 'bronze',
          statusLabel: usuario.status === 'ATIVO' ? 'Ativo' : 'Inativo',
          statusModifier: usuario.status === 'ATIVO' ? 'active' : 'off',
        }));

        this.cargosDisponiveis = [
          ...new Set(this.todosUsuarios.map(usuario => usuario.roleLabel))
        ];

        this.aplicarFiltros();
      },
      error: erro => console.error('Erro ao buscar usuários', erro)
    });
  }

  aplicarFiltros(): void {
    const termo = this.busca.trim().toLocaleLowerCase('pt-BR');

    this.users = this.todosUsuarios.filter(usuario => {
      const correspondeBusca =
        !termo ||
        usuario.name.toLocaleLowerCase('pt-BR').includes(termo) ||
        usuario.email.toLocaleLowerCase('pt-BR').includes(termo);

      const correspondeCargo =
        !this.cargoSelecionado ||
        usuario.roleLabel === this.cargoSelecionado;

      const correspondeStatus =
        !this.statusSelecionado ||
        usuario.statusLabel === this.statusSelecionado;

      return correspondeBusca && correspondeCargo && correspondeStatus;
    });
  }

openUserModal(usuario?: UserTableRow): void {
  const modalRef = this.modalService.open(UserFormModalComponent, {
    modalClass: 'modal-dialog-centered',
    data: usuario ? { usuario } : {}
  });

  modalRef.onClose.subscribe(resultado => {
    if (resultado) {
      this.carregarUsuarios();
    }
  });
}

openStatusModal(usuario: UserTableRow): void {
  const ativando = usuario.status === 'INATIVO';

  const modalRef = this.modalService.open(ConfirmModalComponent, {
    modalClass: 'modal-dialog-centered modal-sm',
    data: {
      title: ativando ? 'Ativar usuário?' : 'Inativar usuário?',
      message: ativando
        ? 'O usuário recuperará o acesso ao sistema:'
        : 'O usuário perderá o acesso ao sistema:',
      name: usuario.name,
      confirmText: ativando ? 'Ativar usuário' : 'Inativar usuário'
    }
  });

  modalRef.onClose.subscribe(confirmado => {
    if (!confirmado) {
      return;
    }

    const resultado = {
      next: () => this.carregarUsuarios(),
      error: (erro: unknown) =>
        console.error('Erro ao alterar status do usuário', erro)
    };

    if (ativando) {
      this.usersService.ativar(usuario.id).subscribe(resultado);
    } else {
      this.usersService.inativar(usuario.id).subscribe(resultado);
    }
  });
}
}