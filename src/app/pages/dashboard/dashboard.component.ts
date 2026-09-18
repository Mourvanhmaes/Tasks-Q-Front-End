import { Component } from '@angular/core';
import { AppShellComponent } from '../../components/layout/app-shell.component';
import { StatCardComponent } from '../../components/dashboard/stat-card/stat-card.component';
import { HolidaysCardComponent } from '../../components/dashboard/holidays-card/holidays-card.component';
import { ProjectListItemComponent } from '../../components/dashboard/project-list-item/project-list-item.component';
import { TasksSummaryComponent } from '../../components/dashboard/tasks-summary/tasks-summary.component';
import { RankingListComponent } from '../../components/shared/ranking-list/ranking-list.component';
import { Holiday, NextHoliday, ProjectListItemData, StatCardData, TaskSummaryItem } from '../../models/dashboard';
import { RankingEntry } from '../../models/ranking';

@Component({
  selector: 'app-dashboard',
  imports: [
    AppShellComponent,
    StatCardComponent,
    HolidaysCardComponent,
    ProjectListItemComponent,
    TasksSummaryComponent,
    RankingListComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  // MOCK: dados fixos apenas para o visual.
  // TODO(api): substituir por GET /api/feriados via HttpClient.
  readonly nextHoliday: NextHoliday = {
    date: '12 Out',
    name: 'Nossa Senhora Aparecida',
    caption: 'Próximo feriado nacional'
  };

  // MOCK: dados fixos apenas para o visual.
  // TODO(api): substituir por GET /api/feriados via HttpClient.
  readonly holidays: Holiday[] = [
    { date: '2 Nov', name: 'Finados', dotModifier: 'purple' },
    { date: '15 Nov', name: 'Proclamação da República', dotModifier: 'blue' },
    { date: '25 Dez', name: 'Natal', dotModifier: 'success' }
  ];

  // MOCK: dados fixos apenas para o visual.
  // TODO(api): substituir por GET /api/dashboard/indicadores via HttpClient.
  readonly statCards: StatCardData[] = [
    {
      icon: 'fa-solid fa-clipboard-list',
      iconModifier: 'purple',
      title: 'Tarefas Pendentes',
      value: '12',
      trendLabel: '+3 hoje',
      trendModifier: 'danger',
      caption: 'Tarefas que precisam da sua atenção',
      progress: '43%',
      progressModifier: 'purple',
      total: 'de 28 no total'
    },
    {
      icon: 'fa-solid fa-layer-group',
      iconModifier: 'blue',
      title: 'Projetos Ativos',
      value: '3',
      trendLabel: '+1 este mês',
      trendModifier: 'success',
      caption: 'Projetos em andamento',
      progress: '60%',
      progressModifier: 'blue',
      total: 'de 5 no total'
    }
  ];

  // MOCK: dados fixos apenas para o visual.
  // TODO(api): substituir por GET /api/projects via HttpClient.
  readonly projects: ProjectListItemData[] = [
    {
      icon: 'fa-solid fa-desktop',
      iconModifier: 'purple',
      title: 'Portal do Cliente',
      statusLabel: 'Em andamento',
      statusModifier: 'info',
      description: 'Integração com gateway de pagamento e melhorias na experiência',
      tasksLabel: '8 de 12 tarefas',
      membersLabel: '3 membros',
      deadlineLabel: 'Entrega em 15 abr 2024',
      deadlineModifier: null,
      progress: '62%',
      progressModifier: 'purple',
      percentLabel: '62%',
      avatars: ['MF', 'RA', 'JS'],
      moreAvatars: '+2'
    },
    {
      icon: 'fa-solid fa-mobile-screen-button',
      iconModifier: 'violet',
      title: 'App Mobile Cabanos',
      statusLabel: 'Atrasado',
      statusModifier: 'danger',
      description: 'Correção de bugs e preparação para nova versão',
      tasksLabel: '5 de 14 tarefas',
      membersLabel: '2 membros',
      deadlineLabel: 'Entrega em 10 mar 2024',
      deadlineModifier: 'alert',
      progress: '35%',
      progressModifier: 'danger',
      percentLabel: '35%',
      avatars: ['JS', 'TP'],
      moreAvatars: '+1'
    },
    {
      icon: 'fa-solid fa-globe',
      iconModifier: 'blue',
      title: 'Site Institucional',
      statusLabel: 'Concluído',
      statusModifier: 'success',
      description: 'Novo site com foco em performance e SEO',
      tasksLabel: '18 de 18 tarefas',
      membersLabel: '4 membros',
      deadlineLabel: 'Concluído em 28 fev 2024',
      deadlineModifier: 'done',
      progress: '100%',
      progressModifier: 'success',
      percentLabel: '100%',
      avatars: ['GC', 'TP', 'RA'],
      moreAvatars: '+1'
    }
  ];

  // MOCK: dados fixos apenas para o visual.
  // TODO(api): substituir por GET /api/dashboard/resumo-tarefas via HttpClient.
  readonly taskSummary: TaskSummaryItem[] = [
    { label: 'Concluídas', count: '18', percentLabel: '56%', progress: '56%', modifier: 'success' },
    { label: 'Em andamento', count: '9', percentLabel: '28%', progress: '28%', modifier: 'blue' },
    { label: 'Atrasadas', count: '5', percentLabel: '16%', progress: '16%', modifier: 'danger' }
  ];

  // MOCK: dados fixos apenas para o visual.
  // TODO(api): substituir por GET /api/ranking via HttpClient.
  readonly ranking: RankingEntry[] = [
    { position: '1', positionModifier: 'gold', initials: 'RA', name: 'Rafael Andrade', role: 'Desenvolvimento', scoreValue: '24', scoreLabel: 'tarefas' },
    { position: '2', positionModifier: 'silver', initials: 'MF', name: 'Mariana Ferreira', role: 'Gerente de Projetos', scoreValue: '18', scoreLabel: 'tarefas' },
    { position: '3', positionModifier: 'bronze', initials: 'JS', name: 'Julia Santos', role: 'UX/UI Design', scoreValue: '16', scoreLabel: 'tarefas' },
    { position: '4', positionModifier: null, initials: 'GC', name: 'Gabriel Costa', role: 'Desenvolvimento', scoreValue: '14', scoreLabel: 'tarefas' },
    { position: '5', positionModifier: null, initials: 'TP', name: 'Thiago Pereira', role: 'Infraestrutura', scoreValue: '11', scoreLabel: 'tarefas' }
  ];
}
