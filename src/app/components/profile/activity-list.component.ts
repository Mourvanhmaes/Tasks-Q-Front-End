import { Component, Input } from '@angular/core';
import { ActivityItem } from '../../models/profile';

/**
 * Lista de atividade recente do perfil.
 *
 * O seletor e de atributo para o host continuar sendo o <ul> da tela:
 *   <ul class="activity-list" app-activity-list [items]="..."></ul>
 */
@Component({
  selector: 'ul[app-activity-list]',
  imports: [],
  template: `<!-- ESTRUTURA DEFINITIVA: manter. Trocar apenas o binding quando a API existir. -->
@for (item of items; track $index) {
  <li>
    <div class="activity-list__icon"><i class="{{ item.icon }}"></i></div>
    <div class="activity-list__body">
      <span class="activity-list__text">{{ item.text }} <strong>{{ item.highlight }}</strong></span>
      <span class="activity-list__time">{{ item.time }}</span>
    </div>
    <span class="activity-list__xp">{{ item.xp }}</span>
  </li>
}`,
  styles: [`// Valores vindos de profile.component.scss. A regra do elemento raiz
// (.activity-list) continua na pagina, porque bate no host.
li { display: flex; align-items: center; gap: var(--space-3); }

.activity-list__icon {
  width: 34px; height: 34px; border-radius: var(--radius-full); flex: none;
  background: var(--color-surface-2); color: var(--color-primary-300);
  display: flex; align-items: center; justify-content: center; font-size: 0.85rem;
}
.activity-list__body { flex: 1; display: flex; flex-direction: column; }
.activity-list__text { font-size: 0.86rem; color: var(--color-text-secondary); }
.activity-list__text strong { color: var(--color-text-primary); }
.activity-list__time { font-size: 0.74rem; color: var(--color-text-muted); }
.activity-list__xp { font-size: 0.8rem; font-weight: 700; color: var(--xp-glow); }`]
})
export class ActivityListComponent {

  @Input() items: ActivityItem[] = [];
}
