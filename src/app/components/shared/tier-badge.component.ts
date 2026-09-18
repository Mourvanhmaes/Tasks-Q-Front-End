import { Component, Input } from '@angular/core';

/**
 * Selo de tier (Bronze, Prata, Ouro, Platina, Diamante).
 *
 * As classes ficam no host, escritas por quem usa:
 *   <app-tier-badge class="tier-badge tier-badge--gold" ...>
 * porque /users, /xp e /profile desenham o mesmo .tier-badge com tamanhos
 * diferentes — o CSS de cada um continua na tela correspondente.
 */
@Component({
  selector: 'app-tier-badge',
  imports: [],
  template: `<!-- ESTRUTURA DEFINITIVA: manter. Trocar apenas o binding quando a API existir. --><i class="{{ icon }}" aria-hidden="true"></i>{{ label }}`,
  styles: [`// Sem estilos proprios: cada tela estiliza .tier-badge (no host) e o icone.`]
})
export class TierBadgeComponent {

  /** classes do icone Font Awesome, ex.: 'fa-solid fa-award' */
  @Input() icon = '';

  @Input() label = '';
}
