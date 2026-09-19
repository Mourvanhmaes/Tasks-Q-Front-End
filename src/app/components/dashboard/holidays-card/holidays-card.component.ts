import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Holiday, NextHoliday } from '../../../models/dashboard';

/**
 * Card "Proximos feriados" do dashboard, incluindo o SVG decorativo.
 *
 * Quem usa escreve as classes no host:
 *   <app-holidays-card class="stat-card holidays-card" ...>
 */
@Component({
  selector: 'app-holidays-card',
  imports: [],
  templateUrl: './holidays-card.component.html',
  styleUrl: './holidays-card.component.scss'
})
export class HolidaysCardComponent {

  @Input() next!: NextHoliday;

  @Input() holidays: Holiday[] = [];

  @Output() menu = new EventEmitter<void>();
}
