import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdbModalModule, MdbModalService, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { TaskdetailsComponent } from '../../../components/tasks/taskdetails/taskdetails.component';
import { TaskdescriptionComponent } from '../../../components/tasks/taskdescription/taskdescription.component';
import Swal from 'sweetalert2';


import { Status } from '../../../models/enums/status.enum';
import { Priority } from '../../../models/enums/priority.enum';
import { TaskResponse } from '../../../models/task-response';
import { TaskRequest } from '../../../models/task-resquest';

@Component({
  selector: 'app-tasklist',
  imports: [RouterLink, MdbModalModule, TaskdetailsComponent, FormsModule, TaskdescriptionComponent],
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.scss'
})
export class TasklistComponent {

  @ViewChild('modalTasks') modalTasks!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  @ViewChild('modalDesc') modalDesc!: TemplateRef<any>;
  modelRef!: MdbModalRef<any>;

  tasks: TaskResponse[] = [];

  taskSelect!: TaskResponse;

  taskRequest!: TaskRequest;

  constructor(private modalService: MdbModalService) {}

  new(){
    this.taskRequest = {
      id: 0,
      title: '',
      description: '',
      status: Status.PENDENTE,
      priority: Priority.BAIXA,
      assigneeId: 0,
      deadLine: '',
      projectId: 0
    };

    this.modalRef = this.modalService.open(this.modalTasks);
  }


  description(task: TaskResponse){
    this.taskSelect = task;
    this.modalRef = this.modalService.open(this.modalDesc);
  }

  Detalisreturn(objtreturn: { task: TaskRequest; newtask: boolean }) {
    this.modalRef.close();
  }

  editTask(task: TaskResponse){
    this.modalRef.close();

    this.taskRequest = {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      assigneeId: task.assigneeId,
      deadLine: task.deadLine,
      projectId: 0
    };

    this.modalRef = this.modalService.open(this.modalTasks);
  }

  deleteTask(task: TaskResponse){
    this.modalRef.close();
    Swal.fire({
      title: 'Deseja excluir a tarefa ' + this.taskSelect.title + ' ?',
      text: 'Essa tarefa será deletada para sempre confirme sua escolha!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
        if(result.isConfirmed){
          Swal.fire({
            title: 'Excluída!',
            text: 'A tarefa foi excluída com sucesso.',
            icon: 'success'
          });
          this.tasks = this.tasks.filter(t => t.id !== task.id);
        }
      });
  }

  closeModal(){
    this.modalRef.close();
  }
}