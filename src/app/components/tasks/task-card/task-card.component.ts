import { Component, EventEmitter, HostListener, Input, Output, inject, OnInit} from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MoveOption, Task, TaskStatus } from '../../../models/task';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-task-card',
  imports: [MdbRippleModule, TitleCasePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent implements OnInit {

  private readonly usersService = inject(UsersService);

  @Input() task!: Task;

  @Input() projectName = '';

  @Input() assigneeInitials = '';

  @Input() concludedByName = '';

  @Input() moveOptions: MoveOption[] = [];

  @Input() canConclude = false;

  @Output() open = new EventEmitter<void>();

  @Output() move = new EventEmitter<TaskStatus>();

  @Output() conclude = new EventEmitter<void>();

  @Output() reopen = new EventEmitter<void>();

  ngOnInit(): void {
    this.loadAssignee();
  }

  private loadAssignee(): void {
    this.usersService.buscarPorId(Number(this.task.assigneeId))
      .subscribe({
        next: (user) => {
          this.concludedByName = user.nome;
        }
      });
  }

  @HostListener('click')
  onHostClick(): void {
    this.open.emit();
  }
}
