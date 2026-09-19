import { Component, Input } from '@angular/core';
import { RankingEntry, RankingVariant } from '../../../models/ranking';
import { TierBadgeComponent } from '../tier-badge.component';

/**
 * Lista de ranking, usada em duas telas com layouts diferentes:
 *  - variante 'dashboard': posicao + avatar + nome/cargo + total de tarefas
 *  - variante 'xp': linha de tabela com tier e XP
 *
 * O seletor e de atributo para o host continuar sendo o <ul>/<ol> da tela:
 *   <ul class="ranking-list" app-ranking-list [entries]="..."></ul>
 *   <ol class="ranking-list" app-ranking-list [variant]="'xp'" ...></ol>
 */
@Component({
  selector: '[app-ranking-list]',
  imports: [TierBadgeComponent],
  templateUrl: './ranking-list.component.html',
  styleUrl: './ranking-list.component.scss'
})
export class RankingListComponent {

  @Input() entries: RankingEntry[] = [];

  @Input() variant: RankingVariant = 'dashboard';

  /** o primeiro colocado da tela de XP mostra a coroa no lugar do numero */
  positionLabel(entry: RankingEntry): string {
    return entry.top ? '' : entry.position;
  }
}
