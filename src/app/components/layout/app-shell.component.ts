import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';

/**
 * Casca das telas internas: sidebar + area de conteudo.
 * O conteudo da pagina entra por <ng-content>.
 *
 * As classes .app-shell e .app-shell__content sao globais (styles.scss),
 * por isso nao sao redeclaradas aqui.
 */
@Component({
  selector: 'app-shell',
  imports: [SidebarComponent],
  template: `<!-- ESTRUTURA DEFINITIVA: manter. Trocar apenas o binding quando a API existir. -->
<div class="app-shell">
  <app-sidebar></app-sidebar>
  <div class="app-shell__content">
    <ng-content></ng-content>
  </div>
</div>`,
  styles: [`// O host apenas embrulha a .app-shell, que e global (styles.scss).
:host { display: block; }`]
})
export class AppShellComponent {

}
