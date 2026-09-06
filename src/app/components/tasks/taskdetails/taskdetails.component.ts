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
  @Output() retorno = new EventEmitter<Tasks>();
  Priority = Priority;




  salvar() {
    this.retorno.emit(this.task);
  }

}
