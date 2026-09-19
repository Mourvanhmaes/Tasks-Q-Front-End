import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskSummaryItem } from '../../../models/dashboard';

/**
 * Painel "Resumo de Tarefas" do dashboard.
 *
 * Quem usa escreve as classes no host:
 *   <app-tasks-summary class="panel tasks-summary" ...>
 */
@Component({
  selector: 'app-tasks-summary',
  imports: [],
  templateUrl: './tasks-summary.component.html',
  styleUrl: './tasks-summary.component.scss'
})
export class TasksSummaryComponent {

  @Input() title = '';

  @Input() subtitle = '';

  @Input() periodLabel = '';

  @Input() items: TaskSummaryItem[] = [];

  @Output() changePeriod = new EventEmitter<void>();
}
