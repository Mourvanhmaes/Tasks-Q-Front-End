import { Component, ViewChild } from '@angular/core';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AppShellComponent } from '../../components/layout/app-shell.component';
import { PageHeaderComponent } from '../../components/layout/page-header.component';
import { ProjectCardComponent } from '../../components/projects/project-card/project-card.component';
import { ProjectFormModalComponent } from '../../components/modals/project-form-modal/project-form-modal.component';
import { AssignUsersModalComponent } from '../../components/modals/assign-users-modal/assign-users-modal.component';
import { ProjectCardData } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { ProjectResponse } from '../../models/project/project-response';

@Component({
  selector: 'app-projects',
  imports: [AppShellComponent, PageHeaderComponent, ProjectCardComponent, MdbRippleModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})

export class ProjectsComponent {

  projects: ProjectResponse[] = [];

    constructor(
        private modalService: MdbModalService,
        private projectService: ProjectService
      ) {
      this.loadProjects();
    }

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

  loadProjects(): void {
    this.projectService.findall().subscribe({
      next: (projects) => {
        this.projects = projects;
      },
      error: (error) => {
        console.error(error);
      }
  });
}
}
