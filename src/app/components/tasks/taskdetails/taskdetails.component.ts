import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Tasks } from '../../../models/tasks';
import { Priority } from '../../../models/enums/priority.enum';
@Component({
  selector: 'app-taskdetails',
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './taskdetails.component.html',
  styleUrl: './taskdetails.component.scss'
})
export class TaskdetailsComponent {
  @Input() task!: Tasks;
  @Output() retorno = new EventEmitter<
  {
    task: Tasks;
    newtask: boolean;
  }>();

  Priority = Priority; 
  copyTask!: Tasks;
  newtask = false;

  ngOnInit(){
    if(Object.keys(this.task).length === 0){
      this.newtask = true;
      this.copyTask = new Tasks();
    }
    else{
      this.copyTask = {...this.task}
    }

  }



  salvar() {
    this.retorno.emit({
      task: this.copyTask,
      newtask: this.newtask
    });
  }

}
