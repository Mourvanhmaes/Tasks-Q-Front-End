import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import {CargoApiResponse,UserTableRow } from '../../../models/users';
import { UsersService } from '../../../services/users.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  const nome = this.nome.trim();
  const email = this.email.trim();
  const cargoId = this.cargoId;

  if (nome.length < 3) {
    this.erro = 'O nome deve possuir pelo menos 3 caracteres.';
    return;
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!emailValido) {
    this.erro = 'Informe um e-mail válido. Exemplo: usuario@email.com';
    return;
  }

  if (cargoId === null) {
    this.erro = 'Selecione um cargo.';
    return;
  }

  if (!this.modoEdicao && this.senha.length < 8) {
    this.erro = 'A senha deve possuir pelo menos 8 caracteres.';
    return;
  }

  if (!this.modoEdicao && this.senha.length > 72) {
    this.erro = 'A senha deve possuir no máximo 72 caracteres.';
    return;
  }

  this.salvando = true;
  this.erro = '';

  const dados = {
    nome,
    email,
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

    error: (erro: HttpErrorResponse) => {
      this.salvando = false;

      if (erro.status === 409) {
        this.erro = 'Já existe um usuário cadastrado com este e-mail.';
        return;
      }

      if (erro.status === 400) {
        this.erro = 'Os dados informados são inválidos. Verifique os campos.';
        return;
      }

      this.erro = this.modoEdicao
        ? 'Não foi possível atualizar o usuário.'
        : 'Não foi possível cadastrar o usuário.';
    }
  });
}
}