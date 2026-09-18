import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';

@Component({
  selector: 'app-assign-users-modal',
  imports: [MdbFormsModule, MdbRippleModule],
  templateUrl: './assign-users-modal.component.html',
  styleUrl: './assign-users-modal.component.scss'
})
export class AssignUsersModalComponent {
  constructor(public modalRef: MdbModalRef<AssignUsersModalComponent>) {}
}
