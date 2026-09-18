import { Component, Input } from '@angular/core';
import { BoardColumn } from '../../models/task';

/**
 * Coluna do quadro de tarefas: cabecalho (ponto, titulo, contador) e a
 * lista, que recebe os cards por <ng-content>.
 *
 * Quem usa escreve as classes no host:
 *   <app-board-column class="board-column board-column--doing" ...>
 */
@Component({
  selector: 'app-board-column',
  imports: [],
  template: `<!-- ESTRUTURA DEFINITIVA: manter. Trocar apenas o binding quando a API existir. -->
<div class="board-column__header">
  <span class="board-column__dot"></span>
  <span class="board-column__title">{{ column.title }}</span>
  <span class="board-column__count">{{ column.tasks.length }}</span>
</div>
<div class="board-column__list">
  <ng-content></ng-content>
</div>`,
  styles: [`// Valores vindos de tasks.component.scss. A regra do elemento raiz
// (.board-column) continua na pagina, porque ela bate no host.
.board-column__header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0 var(--space-1);
}
.board-column__dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--col-todo);
  flex: none;
}
.board-column__title { font-size: 0.92rem; font-weight: 600; color: var(--color-text-primary); flex: 1; }
.board-column__count {
  background: var(--color-surface-3);
  color: var(--color-text-secondary);
  border-radius: var(--radius-full);
  font-size: 0.72rem;
  font-weight: 600;
  padding: 1px 8px;
}

:host(.board-column--todo) .board-column__dot { background: var(--col-todo); }
:host(.board-column--doing) .board-column__dot { background: var(--col-doing); }
:host(.board-column--done) .board-column__dot { background: var(--col-done); }
:host(.board-column--blocked) .board-column__dot { background: var(--col-blocked); }

.board-column__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  overflow-y: auto;
  padding-right: 2px;
}`]
})
export class BoardColumnComponent {

  @Input() column!: BoardColumn;
}
