import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { TierBadgeComponent } from '../../shared/tier-badge.component';

/**
 * Banner do perfil: capa, avatar, nome, cargo e tier.
 *
 * Quem usa escreve a classe no host:
 *   <app-profile-banner class="profile-banner" ...>
 */
@Component({
  selector: 'app-profile-banner',
  imports: [MdbRippleModule, TierBadgeComponent],
  templateUrl: './profile-banner.component.html',
  styleUrl: './profile-banner.component.scss'
})
export class ProfileBannerComponent {

  @Input() initials = '';

  @Input() name = '';

  @Input() role = '';

  @Input() tierLabel = '';

  @Input() tierModifier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'locked' = 'gold';

  @Output() edit = new EventEmitter<void>();

  @Output() changeAvatar = new EventEmitter<void>();
}
