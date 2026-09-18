import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { ProjectCardData } from '../../../models/project';
import { AvatarGroupComponent } from '../../shared/avatar-group/avatar-group.component';

/**
 * Card da grade de /projects.
 *
 * Nao injeta service nem abre modal: as acoes saem por @Output.
 * Quem usa escreve a classe no host:
 *   <app-project-card class="project-card" ...>
 */
@Component({
  selector: 'app-project-card',
  imports: [RouterLink, MdbRippleModule, AvatarGroupComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {

  @Input() project!: ProjectCardData;

  @Output() edit = new EventEmitter<void>();

  @Output() team = new EventEmitter<void>();
}
