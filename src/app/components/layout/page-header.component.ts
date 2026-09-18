import { Component, Input } from '@angular/core';

/**
 * Cabecalho de pagina: titulo + subtitulo, com o botao de acao projetado
 * pela pagina (o handler do clique continua sendo dela).
 *
 * Quem usa escreve a classe no host:
 *   <app-page-header class="page-header" ...>
 * porque .page-header muda de tamanho/margem conforme a tela.
 */
@Component({
  selector: 'app-page-header',
  imports: [],
  template: `<!-- ESTRUTURA DEFINITIVA: manter. Trocar apenas o binding quando a API existir. -->
<div>
  <h1 class="page-header__title">{{ title }}</h1>
  <p class="page-header__subtitle">{{ subtitle }}</p>
</div>
<ng-content></ng-content>`,
  styles: [`// Valores identicos aos que estavam em tasks.component.scss e
// projects.component.scss. A regra do elemento raiz (.page-header) continua
// na pagina, porque ela bate no host e muda no responsivo de cada tela.
.page-header__title {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 0.25rem;
}

.page-header__subtitle {
  color: var(--color-text-secondary);
  margin: 0;
  font-size: 0.92rem;
}`]
})
export class PageHeaderComponent {

  @Input() title = '';

  @Input() subtitle = '';
}
