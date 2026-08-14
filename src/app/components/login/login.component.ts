import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MdbFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  senha = '';
  mensagemErro = '';

  constructor(private readonly router: Router) {}

  entrar(): void {
    if (!this.email.trim() || !this.senha) {
      this.mensagemErro = 'Informe seu e-mail e sua senha.';
      return;
    }

    this.mensagemErro = '';
    this.router.navigate(['/tasks']);
  }
}
