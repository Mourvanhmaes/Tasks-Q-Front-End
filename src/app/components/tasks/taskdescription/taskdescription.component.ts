import { Component, Input } from '@angular/core';
import { TaskResponse } from '../../../models/task-response';

@Component({
  selector: 'app-taskdescription',
  imports: [],
  templateUrl: './taskdescription.component.html',
  styleUrl: './taskdescription.component.scss'
})
export class TaskdescriptionComponent {
  @Input() task!: TaskResponse;
}
