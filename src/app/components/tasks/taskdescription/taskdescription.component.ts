import { Component, Input } from '@angular/core';

import { Tasks } from '../../../models/tasks';

@Component({
  selector: 'app-taskdescription',
  imports: [],
  templateUrl: './taskdescription.component.html',
  styleUrl: './taskdescription.component.scss'
})
export class TaskdescriptionComponent {
  @Input() task!: Tasks;
}
