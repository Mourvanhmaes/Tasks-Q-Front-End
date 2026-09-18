import { Component } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-project-form-modal',
  imports: [MdbFormsModule, MdbRippleModule],
  templateUrl: './project-form-modal.component.html',
  styleUrl: './project-form-modal.component.scss'
})
export class ProjectFormModalComponent {
  constructor(
    public modalRef: MdbModalRef<ProjectFormModalComponent>,
    private modalService: MdbModalService
  ) {}

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

  // Passo 2: exclusao definitiva. So deve ficar habilitado quando o
  // projeto ja estiver arquivado (o botao abaixo comeca desabilitado).
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
        this.modalRef.close('delete');
      }
    });
  }
}
