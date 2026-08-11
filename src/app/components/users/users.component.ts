import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  usuarios = [
    {
      id: 1,
      name: 'Felipe Piquetti',
      email: 'felipepiquetti@gmail.com',
      password: '123456',
      cargo: 'Administrador',
      status: 'Ativo'
    }
  ];

  novoUsuario = {
    id: 0,
    name: '',
    email: '',
    password: '',
    cargo: '',
    status: 'Ativo'
  };

  salvarUsuario() {
    this.novoUsuario.id = this.usuarios.length + 1;

    this.usuarios.push({
      ...this.novoUsuario
    });

    this.limparFormulario();
  }

  excluirUsuario(id: number) {
    this.usuarios = this.usuarios.filter(
      usuario => usuario.id !== id
    );
  }

  limparFormulario() {
    this.novoUsuario = {
      id: 0,
      name: '',
      email: '',
      password: '',
      cargo: '',
      status: 'Ativo'
    };
  }

}