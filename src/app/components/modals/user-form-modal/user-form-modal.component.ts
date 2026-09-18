import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { CargoApiResponse } from '../../../models/users';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-user-form-modal',
  imports: [FormsModule, MdbFormsModule, MdbRippleModule],
  templateUrl: './user-form-modal.component.html',
  styleUrl: './user-form-modal.component.scss'
})
export class UserFormModalComponent implements OnInit {
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

  ngOnInit(): void {
    this.usersService.listarCargos().subscribe({
      next: cargos => {
        this.cargos = cargos;

        if (cargos.length > 0) {
          this.cargoId = cargos[0].id;
        }
      },
      error: () => {
        this.erro = 'nao foi possivel carregar os cargos';
      }
    });
  }

  salvar(): void {
    if (
      !this.nome.trim() ||
      !this.email.trim() ||
      this.senha.length < 8 ||
      this.cargoId === null
    ) {
      this.erro = 'Prencha os campos e use uma senha com pelo menos 8 caracteres.';
      return;
    }

    this.salvando = true;
    this.erro = '';

    this.usersService.cadastrar({
      nome: this.nome.trim(),
      email: this.email.trim(),
      senha: this.senha,
      cargoId: this.cargoId,
      status: this.status,
      urlAvatar: null
    }).subscribe({
      next: usuario => this.modalRef.close(usuario),
      error: () => {
        this.salvando = false;
        this.erro = 'nao foi possivel cadastrar o usuario';
      }
    });
  }
}