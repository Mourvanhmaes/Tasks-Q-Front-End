import { Component, HostBinding, Input } from '@angular/core';

/** Duas aparencias ja existentes: cards de /projects e cards do dashboard. */
export type AvatarGroupVariant = 'project' | 'member';

/**
 * Grupo de avatares empilhados, com o "+N" opcional no fim.
 * A classe do host muda conforme a variante, porque as duas telas usam
 * nomes de classe diferentes (.avatar-group e .member-avatar-group).
 */
@Component({
  selector: 'app-avatar-group',
  imports: [],
  templateUrl: './avatar-group.component.html',
  styleUrl: './avatar-group.component.scss'
})
export class AvatarGroupComponent {

  @Input() initials: string[] = [];

  /** texto do avatar extra, ex.: '+2' (somente na variante member) */
  @Input() more: string | null = null;

  @Input() variant: AvatarGroupVariant = 'project';

  @HostBinding('class.avatar-group')
  get isProjectVariant(): boolean {
    return this.variant === 'project';
  }

  @HostBinding('class.member-avatar-group')
  get isMemberVariant(): boolean {
    return this.variant === 'member';
  }
}
