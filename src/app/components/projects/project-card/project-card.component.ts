import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { AvatarGroupComponent } from '../../shared/avatar-group/avatar-group.component';
import { ProjectResponse } from '../../../models/project/project-response';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink, MdbRippleModule, AvatarGroupComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {

  @Input() project!: ProjectResponse;

  @Output() edit = new EventEmitter<ProjectCardData>();

  @Output() team = new EventEmitter<void>();
}
