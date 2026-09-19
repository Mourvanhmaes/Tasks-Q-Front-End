import { Component, Input } from '@angular/core';

/**
 * Anel de progresso de XP com o tier no centro.
 *
 * Quem usa escreve a classe no host:
 *   <app-xp-progress-ring class="xp-progress-ring" ...>
 *
 * Atencao: a fatia colorida do anel esta no conic-gradient do CSS
 * (257deg fixos), nao vem de @Input — ver relatorio.
 */
@Component({
  selector: 'app-xp-progress-ring',
  imports: [],
  template: `<!-- ESTRUTURA DEFINITIVA: manter. Trocar apenas o binding quando a API existir. -->
<div class="xp-progress-ring__inner">
  <div class="xp-progress-ring__icon"><i class="{{ icon }}"></i></div>
  <span class="xp-progress-ring__tier">{{ tierLabel }}</span>
</div>`,
  styles: [`// Valores vindos de xp.component.scss. A regra do elemento raiz
// (.xp-progress-ring, com o conic-gradient) continua na pagina, porque
// bate no host.
.xp-progress-ring__inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle, #111b3d, #071022 70%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.xp-progress-ring__icon {
  width: 130px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  color: var(--tier-gold);
  filter: drop-shadow(0 0 20px rgba(255, 215, 0, .35));
  margin-bottom: var(--space-2);
}

.xp-progress-ring__tier { font-size: 18px; font-weight: 700; color: var(--color-text-primary); }

@media (max-width: 1200px) {
  .xp-progress-ring__icon { width: 110px; height: 110px; font-size: 54px; }
}

@media (max-width: 700px) {
  .xp-progress-ring__icon { width: 90px; height: 90px; font-size: 44px; }
}`]
})
export class XpProgressRingComponent {

  /** classes do icone Font Awesome, ex.: 'fa-solid fa-gem' */
  @Input() icon = '';

  @Input() tierLabel = '';
}
