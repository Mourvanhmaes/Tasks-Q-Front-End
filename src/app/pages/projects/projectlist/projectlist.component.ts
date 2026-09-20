  import { Component } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
  import { ProjectResponse } from '../../../models/projetc-response';
  import Swal from 'sweetalert2';
  import { ProjectService } from '../../../services/project.service';


  @Component({
    selector: 'app-projectlist',
    imports: [MdbModalModule, FormsModule],
    templateUrl: './projectlist.component.html',
    styleUrl: './projectlist.component.scss'
  })
  export class ProjectlistComponent {

    projects: ProjectResponse[] = [];

    constructor(private projectService: ProjectService) {}

    ngOnInit() {
      this.projectService.findall().subscribe({
        next: (projects) => {
          this.projects = projects;
        }
      });
    }

  }
