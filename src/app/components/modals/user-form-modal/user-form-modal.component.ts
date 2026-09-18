import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import {
  CargoApiResponse,
  UserTableRow
} from '../../../models/users';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-user-form-modal',
  imports: [FormsModule, MdbFormsModule, MdbRippleModule],
  templateUrl: './user-form-modal.component.html',
  styleUrl: './user-form-modal.component.scss'
})
export class UserFormModalComponent implements OnInit {
  usuario?: UserTableRow;

  nome = '';
  email = '';
  senha = '';
  cargoId: number | null = null;
  status: 'ATIVO' | 'INATIVO' = 'ATIVO';

  cargos: CargoApiResponse[] = [];
  salvando = false;
  erro = '';

  constructor(
    public modalRef: MdbModalRef<UserFormModalComponent>,
    private readonly usersService: UsersService
  ) {}

  get modoEdicao(): boolean {
    return this.usuario !== undefined;
  }

  ngOnInit(): void {
    if (this.usuario) {
      this.nome = this.usuario.name;
      this.email = this.usuario.email;
      this.cargoId = this.usuario.cargoId;
      this.status = this.usuario.status;
    }

    this.usersService.listarCargos().subscribe({
      next: cargos => {
        this.cargos = cargos;

        if (this.cargoId === null && cargos.length > 0) {
          this.cargoId = cargos[0].id;
        }
      },
      error: () => {
        this.erro = 'Não foi possível carregar os cargos.';
      }
    });
  }

salvar(): void {
  const cargoId = this.cargoId;

  const dadosInvalidos =
    !this.nome.trim() ||
    !this.email.trim() ||
    cargoId === null;

  const senhaInvalida =
    !this.modoEdicao && this.senha.length < 8;

  if (dadosInvalidos || senhaInvalida) {
    this.erro = this.modoEdicao
      ? 'Preencha todos os campos.'
      : 'Preencha os campos e use uma senha com pelo menos 8 caracteres.';
    return;
  }

  this.salvando = true;
  this.erro = '';

  const dados = {
    nome: this.nome.trim(),
    email: this.email.trim(),
    cargoId,
    status: this.status,
    urlAvatar: null
  };

  const requisicao = this.usuario
    ? this.usersService.atualizar(this.usuario.id, dados)
    : this.usersService.cadastrar({
        ...dados,
        senha: this.senha
      });

  requisicao.subscribe({
    next: usuario => this.modalRef.close(usuario),
    error: () => {
      this.salvando = false;
      this.erro = this.modoEdicao
        ? 'Não foi possível atualizar o usuário.'
        : 'Não foi possível cadastrar o usuário.';
    }
  });
}
}