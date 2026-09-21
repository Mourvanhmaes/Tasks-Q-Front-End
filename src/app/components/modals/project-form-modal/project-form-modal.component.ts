import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { ProjectApi, ProjectUser } from '../../../models/project-api';
import { ProjectApiService } from '../../../services/project-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-form-modal',
  imports: [FormsModule, MdbFormsModule, MdbRippleModule],
  templateUrl: './project-form-modal.component.html',
  styleUrl: './project-form-modal.component.scss'
})
export class ProjectFormModalComponent implements OnInit {
  project?: ProjectApi; name = ''; description = ''; ownerId: number | null = null; deadLine = ''; status: ProjectApi['status'] = 'PENDENTE'; priority: ProjectApi['priority'] = 'MEDIA'; users: ProjectUser[] = []; saving = false;
  constructor(
    public modalRef: MdbModalRef<ProjectFormModalComponent>,
    private modalService: MdbModalService, private readonly projectApi: ProjectApiService
  ) {}
  ngOnInit(): void {
    this.projectApi.users().subscribe({ next: users => { this.users = users; this.ownerId = this.project?.ownerId ?? users[0]?.id ?? null; } });
    if (this.project) { this.name = this.project.name; this.description = this.project.description; this.deadLine = this.project.deadLine; this.status = this.project.status; this.priority = this.project.priority; }
  }
  save(): void {
    const ownerId = this.ownerId;
    if (!this.name.trim() || !this.description.trim() || !ownerId || !this.deadLine) { Swal.fire('Preencha os campos', 'Informe todos os dados do projeto.', 'warning'); return; }
    this.saving = true; const data = { id: this.project?.id, name: this.name.trim(), description: this.description.trim(), ownerId, deadLine: this.deadLine, startDate: this.project?.startDate ?? new Date().toISOString().slice(0, 10), status: this.status, priority: this.priority };
    const request = this.project ? this.projectApi.update(this.project.id, data) : this.projectApi.create(data);
    request.subscribe({ next: project => { Swal.fire('Projeto salvo', 'O projeto foi salvo com sucesso.', 'success'); this.modalRef.close(project); }, error: () => { this.saving = false; Swal.fire('Erro', 'Não foi possível salvar o projeto.', 'error'); } });
  }

  // Passo 1: arquivar o projeto. Ele continua na listagem, so muda de status.
  openArchiveConfirm(): void {
    const confirmRef = this.modalService.open(ConfirmModalComponent, {
      modalClass: 'modal-dialog-centered modal-sm',
      data: {
        title: 'Arquivar projeto?',
        message: 'O projeto sera movido para arquivados e podera ser excluido definitivamente depois',
        name: 'Portal do Cliente',
        confirmText: 'Arquivar projeto'
      }
    });

    confirmRef.onClose.subscribe((confirmed) => {
      if (confirmed) {
        this.modalRef.close('archive');
      }
    });
  }

  openDeleteConfirm(): void {
    const confirmRef = this.modalService.open(ConfirmModalComponent, {
      modalClass: 'modal-dialog-centered modal-sm',
      data: {
        title: 'Excluir projeto?',
        message: 'Essa acao removera permanentemente o projeto arquivado',
        name: 'Portal do Cliente',
        confirmText: 'Excluir projeto'
      }
    });

    confirmRef.onClose.subscribe((confirmed) => {
      if (confirmed) {
        if (!this.project) return;
        this.projectApi.delete(this.project.id).subscribe({
          next: () => { Swal.fire('Projeto excluído', 'O projeto foi removido.', 'success'); this.modalRef.close(true); },
          error: () => Swal.fire('Erro', 'Não foi possível excluir o projeto.', 'error')
        });
      }
    });
  }
}
