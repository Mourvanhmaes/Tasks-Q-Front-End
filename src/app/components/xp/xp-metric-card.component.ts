import { Component, Input } from '@angular/core';
import { XpMetricCardData } from '../../models/xp';

/**
 * Card de metrica da tela de XP (XP total, tarefas na semana, etc.).
 *
 * Quem usa escreve a classe no host:
 *   <app-xp-metric-card class="xp-metric-card" [data]="...">
 */
@Component({
  selector: 'app-xp-metric-card',
  imports: [],
  template: `<!-- ESTRUTURA DEFINITIVA: manter. Trocar apenas o binding quando a API existir. -->
<div class="xp-metric-card__icon xp-metric-card__icon--{{ data.iconModifier }}"><i class="{{ data.icon }}"></i></div>
<div class="xp-metric-card__body">
  <span class="xp-metric-card__title">{{ data.title }}</span>
  <span class="xp-metric-card__value">{{ data.value }}</span>
  <span class="xp-metric-card__desc">{{ data.description }}</span>
</div>`,
  styles: [`// Valores vindos de xp.component.scss. A regra do elemento raiz
// (.xp-metric-card) continua na pagina, porque bate no host.
.xp-metric-card__icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(99, 70, 220, .15);
  color: var(--color-primary-300);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  flex: none;
}
.xp-metric-card__icon--success { background: var(--color-success-bg); color: var(--color-success); }
.xp-metric-card__icon--streak { background: var(--color-warning-bg); color: var(--xp-streak); }

.xp-metric-card__body { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.xp-metric-card__title { font-size: 13px; color: var(--color-text-secondary); }
.xp-metric-card__value { font-size: 20px; font-weight: 700; color: var(--color-text-primary); }
.xp-metric-card__desc { font-size: 12px; color: var(--color-text-muted); }`]
})
export class XpMetricCardComponent {

  @Input() data!: XpMetricCardData;
}
