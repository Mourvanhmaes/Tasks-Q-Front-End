import { Component } from '@angular/core';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AppShellComponent } from '../../components/layout/app-shell.component';
import { PageHeaderComponent } from '../../components/layout/page-header.component';
import { ProjectCardComponent } from '../../components/projects/project-card/project-card.component';
import { ProjectFormModalComponent } from '../../components/modals/project-form-modal/project-form-modal.component';
import { AssignUsersModalComponent } from '../../components/modals/assign-users-modal/assign-users-modal.component';
import { ProjectCardData } from '../../models/project';

@Component({
  selector: 'app-projects',
  imports: [AppShellComponent, PageHeaderComponent, ProjectCardComponent, MdbRippleModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  // MOCK: dados fixos apenas para o visual.
  // TODO(api): substituir por GET /api/projects via HttpClient.
  readonly projects: ProjectCardData[] = [
    {
      name: 'Portal do Cliente',
      description: 'Area logada para clientes acompanharem pedidos, faturas e suporte.',
      statusLabel: 'Em andamento',
      statusModifier: 'info',
      progress: '62%',
      percentLabel: '62%',
      progressModifier: null,
      avatars: ['MF', 'RA', 'JS'],
      tasksLabel: '14 tarefas',
      deadlineLabel: '30 out',
      deadlineOverdue: false
    },
    {
      name: 'App Mobile Cabanos',
      description: 'Aplicativo mobile para voluntarios registrarem horas e acoes.',
      statusLabel: 'Atrasado',
      statusModifier: 'danger',
      progress: '35%',
      percentLabel: '35%',
      progressModifier: 'danger',
      avatars: ['JS', 'TP'],
      tasksLabel: '9 tarefas',
      deadlineLabel: '05 set',
      deadlineOverdue: true
    },
    {
      name: 'Site Institucional',
      description: 'Novo site institucional da ONG com area de doacoes e blog.',
      statusLabel: 'Concluido',
      statusModifier: 'success',
      progress: '100%',
      percentLabel: '100%',
      progressModifier: 'success',
      avatars: ['GC', 'TP'],
      tasksLabel: '21 tarefas',
      deadlineLabel: 'concluido',
      deadlineOverdue: false
    },
    {
      name: 'Campanha de Doacao Natalina',
      description: 'Estruturar a campanha de arrecadacao de fim de ano, aguardando aprovacao do orcamento.',
      statusLabel: 'Pendente',
      statusModifier: 'neutral',
      progress: '0%',
      percentLabel: '0%',
      progressModifier: 'neutral',
      avatars: ['GC'],
      tasksLabel: '0 tarefas',
      deadlineLabel: '01 dez',
      deadlineOverdue: false
    }
  ];

  constructor(private modalService: MdbModalService) {}

  openProjectModal(): void {
    this.modalService.open(ProjectFormModalComponent, {
      modalClass: 'modal-dialog-centered modal-lg'
    });
  }

  openAssignUsersModal(): void {
    this.modalService.open(AssignUsersModalComponent, {
      modalClass: 'modal-dialog-centered'
    });
  }
}
