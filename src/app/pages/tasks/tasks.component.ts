import { Component, inject } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AppShellComponent } from '../../components/layout/app-shell.component';
import { PageHeaderComponent } from '../../components/layout/page-header.component';
import { BoardColumnComponent } from '../../components/tasks/board-column.component';
import { TaskCardComponent } from '../../components/tasks/task-card/task-card.component';
import { TaskFormModalComponent } from '../../components/modals/task-form-modal/task-form-modal.component';
import { TaskDetailModalComponent } from '../../components/modals/task-detail-modal/task-detail-modal.component';
import { MoveOption, Task, TaskStatus } from '../../models/task';
import { TasksService } from '../../services/tasks.service';
import { SessionService } from '../../services/session.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-tasks',
  imports: [
    AppShellComponent,
    PageHeaderComponent,
    BoardColumnComponent,
    TaskCardComponent,
    MdbFormsModule,
    MdbRippleModule
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {

  private readonly modalService = inject(MdbModalService);
  private readonly tasksService = inject(TasksService);
  private readonly session = inject(SessionService);
  private readonly usersService = inject(UsersService);

  readonly columns = this.tasksService.columns;
  readonly currentUser = this.session.currentUser;
  readonly users = this.usersService.users;

  openTaskModal(): void {
    this.modalService.open(TaskFormModalComponent, {
      modalClass: 'modal-dialog-centered modal-lg'
    });
  }

  openTaskDetailModal(task: Task): void {
    this.modalService.open(TaskDetailModalComponent, {
      modalClass: 'modal-dialog-centered modal-lg',
      data: { taskId: task.id }
    });
  }

  initials(task: Task): string {
    return this.tasksService.getAssignee(task)?.initials ?? '--';
  }

  projectName(task: Task): string {
    return this.tasksService.getProject(task)?.name ?? '';
  }

  concludedBy(task: Task): string {
    return task.concludedById ? this.usersService.getById(task.concludedById)?.name ?? '' : '';
  }

  /** Mover a tarefa entre as colunas e liberado para admin e membros. */
  moveOptions(task: Task): MoveOption[] {
    if (task.concluded) {
      return [];
    }

    switch (task.status) {
      case 'todo':
        return [{ status: 'doing', label: 'Iniciar', icon: 'fa-play' }];
      case 'doing':
        return [
          { status: 'todo', label: 'Voltar', icon: 'fa-arrow-left' },
          { status: 'done', label: 'Concluido', icon: 'fa-arrow-right' }
        ];
      case 'done':
        return [{ status: 'doing', label: 'Reabrir', icon: 'fa-arrow-left' }];
      case 'blocked':
        return [{ status: 'doing', label: 'Retomar', icon: 'fa-play' }];
      default:
        return [];
    }
  }

  /** Concluir de fato: so o admin ou o responsavel pelo projeto. */
  canConclude(task: Task): boolean {
    return this.tasksService.canConclude(task, this.currentUser());
  }

  move(task: Task, status: TaskStatus): void {
    this.tasksService.moveTask(task.id, status);
  }

  conclude(task: Task): void {
    this.tasksService.concludeTask(task.id, this.currentUser());
  }

  reopen(task: Task): void {
    this.tasksService.reopenTask(task.id, this.currentUser());
  }

  changeCurrentUser(event: Event): void {
    this.session.setCurrentUser((event.target as HTMLSelectElement).value);
  }
}
