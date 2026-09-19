import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';

@Component({
  selector: 'app-confirm-modal',
  imports: [MdbRippleModule],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent {
  title = 'Confirmar exclusao?';
  message = 'Essa acao removera permanentemente';
  name = '';
  confirmText = 'Excluir';

  constructor(public modalRef: MdbModalRef<ConfirmModalComponent>) {}
}
