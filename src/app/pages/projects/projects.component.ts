import { Component, OnInit } from '@angular/core';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AppShellComponent } from '../../components/layout/app-shell.component';
import { PageHeaderComponent } from '../../components/layout/page-header.component';
import { ProjectCardComponent } from '../../components/projects/project-card/project-card.component';
import { ProjectFormModalComponent } from '../../components/modals/project-form-modal/project-form-modal.component';
import { AssignUsersModalComponent } from '../../components/modals/assign-users-modal/assign-users-modal.component';
import { ProjectCardData } from '../../models/project';
import { ProjectApi } from '../../models/project-api';
import { ProjectApiService } from '../../services/project-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projects',
  imports: [AppShellComponent, PageHeaderComponent, ProjectCardComponent, MdbRippleModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects: ProjectCardData[] = [];
  private apiProjects: ProjectApi[] = [];
  constructor(private modalService: MdbModalService, private readonly projectApi: ProjectApiService) {}
  ngOnInit(): void { this.load(); }
  openProjectModal(card?: ProjectCardData): void {
    const project = card ? this.apiProjects.find(item => item.id === card.id) : undefined;
    const modal = this.modalService.open(ProjectFormModalComponent, {
      modalClass: 'modal-dialog-centered modal-lg'
      , data: { project }
    });
    modal.onClose.subscribe(result => { if (result) this.load(); });
  }

  openAssignUsersModal(): void {
    this.modalService.open(AssignUsersModalComponent, {
      modalClass: 'modal-dialog-centered'
    });
  }

  private load(): void {
    this.projectApi.list().subscribe({
      next: projects => { this.apiProjects = projects; this.projects = projects.map(project => this.toCard(project)); },
      error: () => Swal.fire('Erro', 'Não foi possível carregar os projetos.', 'error')
    });
  }
  private toCard(project: ProjectApi): ProjectCardData {
    const completed = project.status === 'CONCLUIDO'; const delayed = project.status === 'ATRASADA';
    return { id: project.id, name: project.name, description: project.description, statusLabel: completed ? 'Concluído' : delayed ? 'Atrasado' : project.status === 'ANDAMENTO' ? 'Em andamento' : 'Pendente', statusModifier: completed ? 'success' : delayed ? 'danger' : project.status === 'ANDAMENTO' ? 'info' : 'neutral', progress: completed ? '100%' : '0%', percentLabel: completed ? '100%' : '0%', progressModifier: completed ? 'success' : delayed ? 'danger' : 'neutral', avatars: [], tasksLabel: 'Tarefas disponíveis na tela de tarefas', deadlineLabel: project.deadLine, deadlineOverdue: delayed };
  }
}
