import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdbModalModule, MdbModalService, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { TaskdetailsComponent } from '../../../components/tasks/taskdetails/taskdetails.component';
import { Tasks } from '../../../models/tasks';
import { TaskdescriptionComponent } from '../../../components/tasks/taskdescription/taskdescription.component';
import Swal from 'sweetalert2';


import { Status } from '../../../models/enums/status.enum';
import { Priority } from '../../../models/enums/priority.enum';

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

  tasks: Tasks[] = [
    {
        id: 1,
        title: 'Organizar Pastas',
        description: 'Organizar a estrutura de pastas do projeto, separando os arquivos de acordo com suas respectivas responsabilidades.',
        status: Status.ANDAMENTO,
        priority: Priority.ALTA,
        assigneeId: 'Mourvan',
        creatorId: 'Igor',
        deadLine: new Date('2026-09-09'),
        createdAt: new Date('2026-08-21'),
        updatedAt: new Date('2026-09-01'),
        completedAt: null as any
    },

    {
        id: 2,
        title: 'Criar tela de Login',
        description: 'Desenvolver a tela de login da aplicação utilizando Angular e MDB.',
        status: Status.PENDENTE,
        priority: Priority.MEDIA,
        assigneeId: 'Mourvan',
        creatorId: 'Igor',
        deadLine: new Date('2026-09-07'),
        createdAt: new Date('2026-08-25'),
        updatedAt: new Date('2026-08-25'),
        completedAt: null as any
    },

    {
        id: 3,
        title: 'Configurar Banco de Dados',
        description: 'Configurar a conexão com o banco de dados e realizar os testes de persistência.',
        status: Status.ANDAMENTO,
        priority: Priority.ALTA,
        assigneeId: 'Mourvan',
        creatorId: 'Igor',
        deadLine: new Date('2026-09-05'),
        createdAt: new Date('2026-08-20'),
        updatedAt: new Date('2026-09-02'),
        completedAt: null as any
    },

    {
        id: 4,
        title: 'Documentar API',
        description: 'Criar a documentação dos endpoints da API para facilitar a integração com o frontend.',
        status: Status.ATRASO,
        priority: Priority.BAIXA,
        assigneeId: 'Mourvan',
        creatorId: 'Igor',
        deadLine: new Date('2026-08-30'),
        createdAt: new Date('2026-08-15'),
        updatedAt: new Date('2026-08-29'),
        completedAt: new Date('2026-08-29')
    },

    {
        id: 5,
        title: 'Corrigir Modal de Tarefas',
        description: 'Corrigir a abertura do modal de detalhes e garantir que a tarefa selecionada seja exibida corretamente.',
        status: Status.PENDENTE,
        priority: Priority.ALTA,
        assigneeId: 'Mourvan',
        creatorId: 'Igor',
        deadLine: new Date('2026-09-03'),
        createdAt: new Date('2026-08-28'),
        updatedAt: new Date('2026-09-01'),
        completedAt: null as any
    }

  ];

  taskSelect!: Tasks;

  constructor(private modalService: MdbModalService) {}

  new(){
    this.taskSelect = new Tasks();
    this.modalRef = this.modalService.open(this.modalTasks);
  }


  description(task: Tasks){
    this.taskSelect = task;
    this.modalRef = this.modalService.open(this.modalDesc);
  }

  Detalisreturn(objtreturn: { task: Tasks; newtask: boolean }) {
      if(objtreturn.newtask){
        const findTask = this.tasks.findIndex(t => t.id === objtreturn.task.id);
        this.tasks[findTask] = objtreturn.task;
      }
      else{
        objtreturn.task.id = Math.max(
          ...this.tasks.map(t => t.id)
        ) + 1;
        this.tasks.push(objtreturn.task);
      }
      this.modalRef.close();

  }

  editTask(task: Tasks){
    this.modalRef.close();
    this.taskSelect = task;
    this.modalRef = this.modalService.open(this.modalTasks);
  }

  deleteTask(task: Tasks){
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