import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { UserTableRow } from '../../../models/users';
import { TierBadgeComponent } from '../../shared/tier-badge.component';

/**
 * Linha da tabela de /users.
 *
 * O seletor e de atributo para que o proprio <tr> continue sendo o host —
 * um elemento <app-...> dentro de <tbody> quebraria a tabela.
 *   <tr app-user-table-row [user]="user" ...></tr>
 */
@Component({
  selector: 'tr[app-user-table-row]',
  imports: [MdbRippleModule, TierBadgeComponent],
  templateUrl: './user-table-row.component.html',
  styleUrl: './user-table-row.component.scss'
})
export class UserTableRowComponent {

  @Input() user!: UserTableRow;

  @Output() edit = new EventEmitter<void>();

  @Output() remove = new EventEmitter<void>();
}
