import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Priority } from '../../../models/enums/priority.enum';
import { TaskRequest } from '../../../models/task-resquest';
@Component({
  selector: 'app-taskdetails',
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './taskdetails.component.html',
  styleUrl: './taskdetails.component.scss'
})
export class TaskdetailsComponent {
  @Input() task!: TaskRequest;
  @Output() retorno = new EventEmitter<
  {
    task: TaskRequest;
    newtask: boolean;
  }>();

  Priority = Priority; 
  copyTask!: TaskRequest;
  newtask = false;

ngOnInit(){
  this.copyTask = { ...this.task };
  this.newtask = !this.task.id;
}



  salvar() {
    this.retorno.emit({
      task: this.copyTask,
      newtask: this.newtask
    });
  }

}
