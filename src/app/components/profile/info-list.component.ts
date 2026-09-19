import { Component, Input } from '@angular/core';
import { InfoListItem } from '../../models/profile';

/**
 * Lista dt/dd de dados pessoais.
 *
 * O seletor e de atributo para o host continuar sendo o <dl> da tela:
 *   <dl class="info-list" app-info-list [items]="..."></dl>
 */
@Component({
  selector: 'dl[app-info-list]',
  imports: [],
  template: `<!-- ESTRUTURA DEFINITIVA: manter. Trocar apenas o binding quando a API existir. -->
@for (item of items; track item.label) {
  <div class="info-list__row">
    <dt>{{ item.label }}</dt>
    <dd>{{ item.value }}</dd>
  </div>
}`,
  styles: [`// Valores vindos de profile.component.scss.
.info-list__row {
  display: flex; justify-content: space-between; gap: var(--space-3);
  padding: var(--space-3) 0; border-bottom: 1px solid var(--color-border-subtle);
}
.info-list__row:last-child { border-bottom: none; }
.info-list__row dt { color: var(--color-text-muted); font-size: 0.85rem; margin: 0; }
.info-list__row dd { color: var(--color-text-primary); font-size: 0.88rem; font-weight: 600; margin: 0; text-align: right; }`]
})
export class InfoListComponent {

  @Input() items: InfoListItem[] = [];
}
