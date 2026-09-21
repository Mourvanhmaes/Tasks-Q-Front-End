import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MdbFormsModule, MdbRippleModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  senha = '';
  erro = '';

  constructor(private readonly router: Router) {}

  entrar(): void {
    if (!this.email.trim() || !this.senha.trim()) {
      this.erro = 'Informe o e-mail e a senha para entrar.';
      return;
    }

    this.erro = '';
    this.router.navigate(['/admin/dashboard']);
  }

}
