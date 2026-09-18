import { Component, Input } from '@angular/core';
import { ProjectListItemData } from '../../../models/dashboard';
import { AvatarGroupComponent } from '../../shared/avatar-group/avatar-group.component';

/**
 * Item da lista "Meus Projetos" do dashboard.
 * Visualmente diferente do app-project-card de /projects — sao dois
 * componentes distintos de proposito.
 *
 * Nao tem acao propria hoje (o item nao e clicavel na tela atual).
 * Quem usa escreve a classe no host:
 *   <app-project-list-item class="project-item" [project]="...">
 */
@Component({
  selector: 'app-project-list-item',
  imports: [AvatarGroupComponent],
  templateUrl: './project-list-item.component.html',
  styleUrl: './project-list-item.component.scss'
})
export class ProjectListItemComponent {

  @Input() project!: ProjectListItemData;
}
