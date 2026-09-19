import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CargoApiResponse, CargoCreateRequest, UserApiResponse, UserCreateRequest, UserUpdateRequest, Users} from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly apiUrl = 'http://localhost:8080/api/usuarios';
  private readonly cargosUrl = 'http://localhost:8080/api/cargos';

constructor(private readonly http: HttpClient) {}

listar(): Observable<UserApiResponse[]> {
  return this.http.get<UserApiResponse[]>(this.apiUrl);
}

buscarPorId(id: number): Observable<UserApiResponse> {
  return this.http.get<UserApiResponse>(
    `${this.apiUrl}/${id}`
  );
}

listarCargos(): Observable<CargoApiResponse[]> {
  return this.http.get<CargoApiResponse[]>(this.cargosUrl);
}

criarCargo(dados: CargoCreateRequest): Observable<CargoApiResponse> {
  return this.http.post<CargoApiResponse>(this.cargosUrl, dados);
}

cadastrar(dados: UserCreateRequest): Observable<UserApiResponse> {
  return this.http.post<UserApiResponse>(this.apiUrl, dados);
}

atualizar(
  id: number,
  dados: UserUpdateRequest
): Observable<UserApiResponse> {
  return this.http.put<UserApiResponse>(
    `${this.apiUrl}/${id}`,
    dados
  );
}

alterarSenha(id: number, senha: string): Observable<void> {
  return this.http.patch<void>(
    `${this.apiUrl}/${id}/senha`,
    { senha }
  );
}

inativar(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

ativar(id: number): Observable<UserApiResponse> {
  return this.http.patch<UserApiResponse>(
    `${this.apiUrl}/${id}/ativar`,
    {}
  );
}

  readonly users: Users[] = [
    {
      id: 'u1',
      name: 'Mariana Ferreira',
      initials: 'MF',
      email: 'mariana.ferreira@cabanos.com',
      role: 'membro',
      roleLabel: 'Gerente de Projetos'
    },
    {
      id: 'u2',
      name: 'Rafael Andrade',
      initials: 'RA',
      email: 'rafael.andrade@cabanos.com',
      role: 'membro',
      roleLabel: 'Desenvolvedor(a)'
    },
    {
      id: 'u3',
      name: 'Julia Santos',
      initials: 'JS',
      email: 'julia.santos@cabanos.com',
      role: 'membro',
      roleLabel: 'Designer'
    },
    {
      id: 'u4',
      name: 'Thiago Pereira',
      initials: 'TP',
      email: 'thiago.pereira@cabanos.com',
      role: 'membro',
      roleLabel: 'Desenvolvedor(a)'
    },
    {
      id: 'u5',
      name: 'Gustavo Cardoso',
      initials: 'GC',
      email: 'gustavo.cardoso@cabanos.com',
      role: 'admin',
      roleLabel: 'Administrador'
    }
  ];

  getById(id: string): Users | undefined {
    return this.users.find(user => user.id === id);
  }
}
