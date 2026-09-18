import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { UserApiResponse } from '../../../models/users';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-edit-profile-modal',
  imports: [FormsModule, MdbFormsModule, MdbRippleModule],
  templateUrl: './edit-profile-modal.component.html',
  styleUrl: './edit-profile-modal.component.scss'
})
export class EditProfileModalComponent implements OnInit {
  usuario!: UserApiResponse;

  nome = '';
  email = '';
  senha = '';
  erro = '';
  salvando = false;

  constructor(
    public modalRef: MdbModalRef<EditProfileModalComponent>,
    private readonly usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.nome = this.usuario.nome;
    this.email = this.usuario.email;
  }

  salvar(): void {
    const nome = this.nome.trim();
    const email = this.email.trim();
    const senha = this.senha.trim();

    if (nome.length < 3) {
      this.erro = 'O nome deve possuir pelo menos 3 caracteres.';
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValido) {
      this.erro = 'Informe um e-mail válido.';
      return;
    }

    if (senha && senha.length < 8) {
      this.erro = 'A nova senha deve possuir pelo menos 8 caracteres.';
      return;
    }

    this.salvando = true;
    this.erro = '';

    const dados = {
      nome,
      email,
      cargoId: this.usuario.cargo.id,
      status: this.usuario.status,
      urlAvatar: this.usuario.urlAvatar
    };

    this.usersService.atualizar(this.usuario.id, dados).subscribe({
      next: usuarioAtualizado => {
        if (!senha) {
          this.modalRef.close(usuarioAtualizado);
          return;
        }

        this.usersService.alterarSenha(this.usuario.id, senha).subscribe({
          next: () => this.modalRef.close(usuarioAtualizado),
          error: () => {
            this.salvando = false;
            this.erro = 'Os dados foram atualizados, mas não foi possível alterar a senha.';
          }
        });
      },
      error: () => {
        this.salvando = false;
        this.erro = 'Não foi possível atualizar o perfil.';
      }
    });
  }
}