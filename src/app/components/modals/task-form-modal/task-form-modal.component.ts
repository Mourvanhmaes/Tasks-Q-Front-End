import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import Swal from 'sweetalert2';
import { TaskProject, TaskUser } from '../../../models/task-api';
import { TaskApiService } from '../../../services/task-api.service';
import { Task } from '../../../models/task';

@Component({
  selector: 'app-task-form-modal',
  imports: [FormsModule, MdbFormsModule, MdbRippleModule],
  templateUrl: './task-form-modal.component.html',
  styleUrl: './task-form-modal.component.scss'
})
export class TaskFormModalComponent implements OnInit {
  task?: Task;
  title = '';
  description = '';
  projectId: number | null = null;
  assigneeId: number | null = null;
  priority: 'BAIXA' | 'MEDIA' | 'ALTA' = 'MEDIA';
  deadLine = '';
  projects: TaskProject[] = [];
  users: TaskUser[] = [];
  saving = false;

  constructor(public modalRef: MdbModalRef<TaskFormModalComponent>, private readonly taskApi: TaskApiService) {}

  ngOnInit(): void {
    this.taskApi.listProjects().subscribe({ next: projects => { this.projects = projects; this.projectId = projects[0]?.id ?? null; } });
    this.taskApi.listUsers().subscribe({ next: users => { this.users = users; this.assigneeId = users[0]?.id ?? null; } });
    if (this.task) {
      this.title = this.task.title; this.description = this.task.description; this.projectId = Number(this.task.projectId);
      this.assigneeId = Number(this.task.assigneeId); this.priority = this.task.priority.toUpperCase() as 'BAIXA' | 'MEDIA' | 'ALTA'; this.deadLine = this.task.dueLabel;
    }
  }

  save(): void {
    const projectId = this.projectId;
    const assigneeId = this.assigneeId;
    if (!this.title.trim() || !this.description.trim() || !projectId || !assigneeId || !this.deadLine) {
      Swal.fire('Preencha os campos', 'Informe todos os dados da tarefa.', 'warning');
      return;
    }
    this.saving = true;
    const data = { id: this.task ? Number(this.task.id) : undefined, title: this.title.trim(), description: this.description.trim(), projectId, assigneeId, priority: this.priority, deadLine: this.deadLine, status: this.task?.status === 'doing' ? 'ANDAMENTO' as const : this.task?.status === 'done' ? 'CONCLUIDO' as const : this.task?.status === 'blocked' ? 'ATRASADA' as const : 'PENDENTE' as const };
    const request = this.task ? this.taskApi.update(data) : this.taskApi.create(data);
    request.subscribe({
      next: task => { Swal.fire(this.task ? 'Tarefa atualizada' : 'Tarefa criada', 'A tarefa foi salva com sucesso.', 'success'); this.modalRef.close(task); },
      error: () => { this.saving = false; Swal.fire('Erro', 'Não foi possível salvar a tarefa.', 'error'); }
    });
  }
}
