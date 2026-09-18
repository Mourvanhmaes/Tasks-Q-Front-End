import { Component, Input } from '@angular/core';

/**
 * Barra "Progresso para o proximo nivel" do perfil.
 *
 * Quem usa escreve a classe no host:
 *   <app-xp-progress-bar class="xp-progress-card" ...>
 */
@Component({
  selector: 'app-xp-progress-bar',
  imports: [],
  template: `<!-- ESTRUTURA DEFINITIVA: manter. Trocar apenas o binding quando a API existir. -->
<div class="xp-progress-card__header">
  <span>{{ label }}</span>
  <span class="xp-progress-card__value">{{ value }}</span>
</div>
<div class="xp-bar"><div class="xp-bar__fill" [style.width]="percent"></div></div>`,
  styles: [`// Valores vindos de profile.component.scss. A regra do elemento raiz
// (.xp-progress-card) continua na pagina, porque bate no host.
.xp-progress-card__header {
  display: flex; justify-content: space-between;
  font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: var(--space-2);
}
.xp-progress-card__value { color: var(--color-text-muted); font-size: 0.8rem; }
.xp-bar { height: 10px; border-radius: var(--radius-full); background: var(--xp-bar-bg); overflow: hidden; }
.xp-bar__fill { height: 100%; border-radius: var(--radius-full); background: linear-gradient(90deg, var(--xp-bar-start), var(--xp-bar-end)); }`]
})
export class XpProgressBarComponent {

  @Input() label = '';

  @Input() value = '';

  /** largura da barra, ex.: '71%' */
  @Input() percent = '0%';
}
