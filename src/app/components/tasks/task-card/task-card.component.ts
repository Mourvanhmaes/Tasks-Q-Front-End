import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MoveOption, Task, TaskStatus } from '../../../models/task';

/**
 * Card de tarefa do quadro.
 *
 * Nao injeta service: recebe a tarefa e o que ja foi resolvido pela pagina
 * (projeto, iniciais, permissao) e devolve as acoes por @Output.
 *
 * Quem usa escreve as classes no host:
 *   <app-task-card class="card" [class.card--concluded]="task.concluded">
 */
@Component({
  selector: 'app-task-card',
  imports: [MdbRippleModule, TitleCasePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {

  @Input() task!: Task;

  @Input() projectName = '';

  @Input() assigneeInitials = '';

  @Input() concludedByName = '';

  /** botoes de mover liberados para a tarefa */
  @Input() moveOptions: MoveOption[] = [];

  /** true para admin ou responsavel pelo projeto */
  @Input() canConclude = false;

  @Output() open = new EventEmitter<void>();

  @Output() move = new EventEmitter<TaskStatus>();

  @Output() conclude = new EventEmitter<void>();

  @Output() reopen = new EventEmitter<void>();

  /** o clique nos botoes de acao nao chega aqui: a barra para a propagacao */
  @HostListener('click')
  onHostClick(): void {
    this.open.emit();
  }
}
