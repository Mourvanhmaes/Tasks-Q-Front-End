import { Component } from '@angular/core';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AppShellComponent } from '../../components/layout/app-shell.component';
import { ProfileBannerComponent } from '../../components/profile/profile-banner/profile-banner.component';
import { XpProgressBarComponent } from '../../components/profile/xp-progress-bar.component';
import { InfoListComponent } from '../../components/profile/info-list.component';
import { ActivityListComponent } from '../../components/profile/activity-list.component';
import { TierBadgeComponent } from '../../components/shared/tier-badge.component';
import { EditProfileModalComponent } from '../../components/modals/edit-profile-modal/edit-profile-modal.component';
import { ActivityItem, InfoListItem } from '../../models/profile';

@Component({
  selector: 'app-profile',
  imports: [
    AppShellComponent,
    ProfileBannerComponent,
    XpProgressBarComponent,
    InfoListComponent,
    ActivityListComponent,
    TierBadgeComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  // MOCK: dados fixos apenas para o visual.
  // TODO(api): substituir por GET /api/users/:id via HttpClient.
  // Obs.: a tela ainda nao le o parametro :id da rota — ver relatorio.
  readonly personalInfo: InfoListItem[] = [
    { label: 'Nome completo', value: 'Mariana Ferreira' },
    { label: 'E-mail', value: 'mariana.ferreira@cabanos.com' },
    { label: 'Telefone', value: '(11) 98765-4321' },
    { label: 'Cargo', value: 'Gerente de Projetos' },
    { label: 'Departamento', value: 'Produto' },
    { label: 'Na empresa desde', value: '03 de marco de 2022' }
  ];

  // MOCK: dados fixos apenas para o visual.
  // TODO(api): substituir por GET /api/users/:id/atividades via HttpClient.
  readonly recentActivity: ActivityItem[] = [
    {
      icon: 'fa-solid fa-circle-check',
      text: 'Concluiu',
      highlight: 'Revisar textos da landing page',
      time: 'Ha 2 horas',
      xp: '+15 XP'
    },
    {
      icon: 'fa-solid fa-circle-check',
      text: 'Concluiu',
      highlight: 'Planejar sprint de outubro',
      time: 'Ontem',
      xp: '+25 XP'
    },
    {
      icon: 'fa-solid fa-trophy',
      text: 'Alcancou o',
      highlight: 'Tier Ouro',
      time: 'Ha 3 dias',
      xp: '+100 XP'
    }
  ];

  constructor(private modalService: MdbModalService) {}

  openEditProfileModal(): void {
    this.modalService.open(EditProfileModalComponent, {
      modalClass: 'modal-dialog-centered'
    });
  }
}
