import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StatCardData } from '../../../models/dashboard';

/**
 * Card de numero do dashboard ("Tarefas Pendentes", "Projetos Ativos").
 *
 * Quem usa escreve a classe no host:
 *   <app-stat-card class="stat-card" [data]="...">
 */
@Component({
  selector: 'app-stat-card',
  imports: [],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss'
})
export class StatCardComponent {

  @Input() data!: StatCardData;

  @Output() menu = new EventEmitter<void>();
}
