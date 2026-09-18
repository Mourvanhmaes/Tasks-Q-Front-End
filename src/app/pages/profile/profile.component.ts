import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AppShellComponent } from '../../components/layout/app-shell.component';
import { ProfileBannerComponent } from '../../components/profile/profile-banner/profile-banner.component';
import { InfoListComponent } from '../../components/profile/info-list.component';
import { EditProfileModalComponent } from '../../components/modals/edit-profile-modal/edit-profile-modal.component';
import { InfoListItem } from '../../models/profile';
import { UserApiResponse } from '../../models/users';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-profile',
  imports: [
    AppShellComponent,
    ProfileBannerComponent,
    InfoListComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  usuario: UserApiResponse | null = null;
  personalInfo: InfoListItem[] = [];
  erro = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly usersService: UsersService,
    private readonly modalService: MdbModalService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.erro = 'Usuário inválido.';
      return;
    }

    this.carregarUsuario(id);
  }

  private carregarUsuario(id: number): void {
    this.usersService.buscarPorId(id).subscribe({
      next: usuario => {
        this.usuario = usuario;

        this.personalInfo = [
          { label: 'Nome completo', value: usuario.nome },
          { label: 'E-mail', value: usuario.email },
          { label: 'Cargo', value: usuario.cargo.nome },
          {
            label: 'Status',
            value: usuario.status === 'ATIVO' ? 'Ativo' : 'Inativo'
          },
          {
            label: 'Na empresa desde',
            value: new Date(usuario.createdAt).toLocaleDateString('pt-BR')
          }
        ];
      },
      error: () => {
        this.erro = 'Não foi possível carregar o perfil.';
      }
    });
  }

  get iniciais(): string {
  if (!this.usuario) {
    return '';
  }

  return this.usuario.nome
    .split(' ')
    .slice(0, 2)
    .map(parte => parte.charAt(0))
    .join('')
    .toUpperCase();
}

get eloLabel(): string {
  switch (this.usuario?.elo) {
    case 'JUNIOR': return 'Júnior';
    case 'PLENO': return 'Pleno';
    case 'ESPECIALISTA': return 'Especialista';
    case 'LEGACY': return 'Legacy';
    default: return 'Iniciante';
  }
}

get tierModifier(): 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' {
  switch (this.usuario?.elo) {
    case 'JUNIOR': return 'silver';
    case 'PLENO': return 'gold';
    case 'ESPECIALISTA': return 'platinum';
    case 'LEGACY': return 'diamond';
    default: return 'bronze';
  }
}

openEditProfileModal(): void {
  if (!this.usuario) {
    return;
  }

  const modalRef = this.modalService.open(EditProfileModalComponent, {
    modalClass: 'modal-dialog-centered',
    data: {
      usuario: this.usuario
    }
  });

  modalRef.onClose.subscribe(resultado => {
    if (resultado) {
      this.carregarUsuario(resultado.id);
    }
  });
}
}