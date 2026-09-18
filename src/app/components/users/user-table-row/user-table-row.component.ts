import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { UserTableRow } from '../../../models/users';
import { TierBadgeComponent } from '../../shared/tier-badge.component';

 
@Component({
  selector: 'tr[app-user-table-row]',
  imports: [MdbRippleModule, TierBadgeComponent],
  templateUrl: './user-table-row.component.html',
  styleUrl: './user-table-row.component.scss'
})
export class UserTableRowComponent {

  @Input() user!: UserTableRow;

  @Output() edit = new EventEmitter<void>();

  @Output() toggleStatus = new EventEmitter<void>();
}
