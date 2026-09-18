import { Component, computed, inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { TASK_STATUSES, Task, TaskStatus } from '../../../models/task';
import { TasksService } from '../../../services/tasks.service';
import { SessionService } from '../../../services/session.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-task-detail-modal',
  imports: [MdbRippleModule, TitleCasePipe],
  templateUrl: './task-detail-modal.component.html',
  styleUrl: './task-detail-modal.component.scss'
})
export class TaskDetailModalComponent {

  /** Preenchido pelo modal service ao abrir a tarefa. */
  taskId = '';

  readonly statuses = TASK_STATUSES;

  private readonly tasksService = inject(TasksService);
  private readonly session = inject(SessionService);
  private readonly usersService = inject(UsersService);

  readonly task = computed(() => this.tasksService.tasks().find(item => item.id === this.taskId));

  constructor(public modalRef: MdbModalRef<TaskDetailModalComponent>) {}

  assigneeName(task: Task): string {
    return this.tasksService.getAssignee(task)?.name ?? 'Sem responsavel';
  }

  assigneeInitials(task: Task): string {
    return this.tasksService.getAssignee(task)?.initials ?? '--';
  }

  projectName(task: Task): string {
    return this.tasksService.getProject(task)?.name ?? '';
  }

  ownerName(task: Task): string {
    const ownerId = this.tasksService.getProject(task)?.ownerId;
    return ownerId ? this.usersService.getById(ownerId)?.name ?? '' : '';
  }

  concludedBy(task: Task): string {
    return task.concludedById ? this.usersService.getById(task.concludedById)?.name ?? '' : '';
  }

  /** Concluir e reabrir: so o admin ou o responsavel pelo projeto. */
  canConclude(task: Task): boolean {
    return this.tasksService.canConclude(task, this.session.currentUser());
  }

  changeStatus(event: Event, task: Task): void {
    this.tasksService.moveTask(task.id, (event.target as HTMLSelectElement).value as TaskStatus);
  }

  conclude(task: Task): void {
    this.tasksService.concludeTask(task.id, this.session.currentUser());
  }

  reopen(task: Task): void {
    this.tasksService.reopenTask(task.id, this.session.currentUser());
  }
}
