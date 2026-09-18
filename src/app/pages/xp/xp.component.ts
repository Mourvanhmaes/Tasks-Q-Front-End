import { Component } from '@angular/core';
import { AppShellComponent } from '../../components/layout/app-shell.component';
import { XpMetricCardComponent } from '../../components/xp/xp-metric-card.component';
import { XpProgressRingComponent } from '../../components/xp/xp-progress-ring.component';
import { RankingListComponent } from '../../components/shared/ranking-list/ranking-list.component';
import { XpMetricCardData } from '../../models/xp';
import { RankingEntry } from '../../models/ranking';

@Component({
  selector: 'app-xp',
  imports: [AppShellComponent, XpMetricCardComponent, XpProgressRingComponent, RankingListComponent],
  templateUrl: './xp.component.html',
  styleUrl: './xp.component.scss'
})
export class XpComponent {

  // MOCK: dados fixos apenas para o visual.
  // TODO(api): substituir por GET /api/xp/resumo via HttpClient.
  readonly leftMetrics: XpMetricCardData[] = [
    {
      icon: 'fa-solid fa-chart-simple',
      iconModifier: 'primary',
      title: 'Total de XP',
      value: '8.420 XP',
      description: 'Sua pontuacao total'
    },
    {
      icon: 'fa-solid fa-check',
      iconModifier: 'success',
      title: 'Tarefas na semana',
      value: '7',
      description: 'Tarefas concluidas'
    }
  ];

  // MOCK: dados fixos apenas para o visual.
  // TODO(api): substituir por GET /api/xp/resumo via HttpClient.
  readonly rightMetrics: XpMetricCardData[] = [
    {
      icon: 'fa-solid fa-fire',
      iconModifier: 'streak',
      title: 'XP essa semana',
      value: '+180 XP',
      description: 'Continue assim!'
    },
    {
      icon: 'fa-solid fa-calendar-days',
      iconModifier: 'primary',
      title: 'Sequencia',
      value: '6 dias',
      description: 'Em atividade'
    }
  ];

  // MOCK: dados fixos apenas para o visual.
  // TODO(api): substituir por GET /api/ranking via HttpClient.
  readonly ranking: RankingEntry[] = [
    {
      position: '1', positionModifier: null, initials: 'GC', name: 'Gustavo Cardoso',
      role: 'Administrador', tierLabel: 'Diamante', tierModifier: 'diamond', xpLabel: '12.980 XP', top: true
    },
    {
      position: '2', positionModifier: null, initials: 'RA', name: 'Rafael Andrade',
      role: 'Desenvolvedor(a)', tierLabel: 'Platina', tierModifier: 'platinum', xpLabel: '10.240 XP'
    },
    {
      position: '3', positionModifier: null, initials: 'MF', name: 'Mariana Ferreira',
      role: 'Gerente de Projetos', tierLabel: 'Ouro', tierModifier: 'gold', xpLabel: '8.420 XP', me: true
    },
    {
      position: '4', positionModifier: null, initials: 'JS', name: 'Julia Santos',
      role: 'Designer', tierLabel: 'Ouro', tierModifier: 'gold', xpLabel: '7.910 XP'
    },
    {
      position: '5', positionModifier: null, initials: 'TP', name: 'Thiago Pereira',
      role: 'Desenvolvedor(a)', tierLabel: 'Bronze', tierModifier: 'bronze', xpLabel: '2.150 XP'
    }
  ];
}
