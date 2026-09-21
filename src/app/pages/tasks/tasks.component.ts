import { Component, OnInit, inject } from '@angular/core';
import { forkJoin } from 'rxjs';
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
import { TaskApiService } from '../../services/task-api.service';
import { TaskApi, TaskProject, TaskUser } from '../../models/task-api';
import Swal from 'sweetalert2';
import { TaskRequest } from '../../models/task/task-request';

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
export class TasksComponent implements OnInit {

  private readonly modalService = inject(MdbModalService);
  private readonly tasksService = inject(TasksService);
  private readonly session = inject(SessionService);
  private readonly usersService = inject(UsersService);
  private readonly taskApi = inject(TaskApiService);
  apiProjects: TaskProject[] = [];
  apiUsers: TaskUser[] = [];

  readonly columns = this.tasksService.columns;
  readonly currentUser = this.session.currentUser;
  readonly users = this.usersService.users;

  ngOnInit(): void { this.loadTasks(); }

  openTaskModal(): void {
    const modal = this.modalService.open(TaskFormModalComponent, {
      modalClass: 'modal-dialog-centered modal-lg'
    });
    modal.onClose.subscribe(result => { if (result) this.loadTasks(); });
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
    return this.apiProjects.find(project => project.id === Number(task.projectId))?.name ?? '';
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
    const request: TaskRequest = { id: Number(task.id), 
      title: task.title, description: task.description, 
      status: status === 'todo' ? 'PENDENTE' : status === 'doing' ? 'ANDAMENTO' : status === 'done' ? 'CONCLUIDO' : 'ATRASADA',
      priority: task.priority.toUpperCase() as 'BAIXA' | 'MEDIA' | 'ALTA',
      assigneeId: Number(task.assigneeId),
      deadLine: task.dueLabel,
      projectId: Number(task.projectId) };
    this.taskApi.update(request).subscribe({ next: () => this.loadTasks(), error: () => Swal.fire('Erro', 'Não foi possível atualizar a tarefa.', 'error') });
  }

  conclude(task: Task): void {
    this.taskApi.complete(Number(task.id)).subscribe({ next: () => this.loadTasks(), error: () => Swal.fire('Erro', 'Não foi possível concluir a tarefa.', 'error') });
  }

  reopen(task: Task): void {
    this.move(task, 'doing');
  }

  changeCurrentUser(event: Event): void {
    this.session.setCurrentUser((event.target as HTMLSelectElement).value);
  }

  private loadTasks(): void {
    this.taskApi.listProjects().subscribe({
      next: projects => {
        this.apiProjects = projects;
        this.taskApi.listUsers().subscribe({ next: users => this.apiUsers = users });
        if (!projects.length) { this.tasksService.replaceTasks([]); return; }
        forkJoin(projects.map(project => this.taskApi.listByProject(project.id))).subscribe({
          next: lists => this.tasksService.replaceTasks(lists.flatMap((tasks, index) => tasks.map(task => this.toTask(task, projects[index].id)))),
          error: () => Swal.fire('Erro', 'Não foi possível carregar as tarefas.', 'error')
        });
      }, error: () => Swal.fire('Erro', 'Não foi possível carregar os projetos.', 'error')
    });
  }

  private toTask(task: TaskApi, projectId: number): Task {
    const status: TaskStatus = task.status === 'PENDENTE' ? 'todo' : task.status === 'ANDAMENTO' ? 'doing' : task.status === 'CONCLUIDO' ? 'done' : 'blocked';
    return { id: String(task.id), title: task.title, description: task.description, priority: task.priority.toLowerCase() as Task['priority'], status, projectId: String(projectId), assigneeId: String(task.assigneeId), dueLabel: task.deadLine, overdue: task.status === 'ATRASADA', xp: 0, concluded: task.status === 'CONCLUIDO' };
  }
}
