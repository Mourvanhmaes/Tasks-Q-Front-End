import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdbModalModule, MdbModalService, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { TaskdetailsComponent } from '../../../components/tasks/taskdetails/taskdetails.component';
import { Tasks } from '../../../models/tasks';

@Component({
  selector: 'app-tasklist',
  imports: [RouterLink, MdbModalModule, TaskdetailsComponent, FormsModule],
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.scss'
})
export class TasklistComponent {

  @ViewChild('modalTasks') modalTasks!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  tasks: Tasks[] = [];

  constructor(private modalService: MdbModalService) {}

  novo(){
    this.modalRef = this.modalService.open(this.modalTasks);
  }

  retornoDetalhe(task: Tasks) {
      console.log(task);

      this.tasks.push(task);

      this.modalRef.close();
  }
}
