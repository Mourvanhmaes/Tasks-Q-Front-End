import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectApi, ProjectRequest, ProjectUser } from '../models/project-api';
@Injectable({ providedIn: 'root' })
export class ProjectApiService {
  private readonly api = 'http://localhost:8080/api';
  constructor(private readonly http: HttpClient) {}
  list(): Observable<ProjectApi[]> { return this.http.get<ProjectApi[]>(`${this.api}/project/all`); }
  users(): Observable<ProjectUser[]> { return this.http.get<ProjectUser[]>(`${this.api}/usuarios`); }
  create(data: ProjectRequest): Observable<ProjectApi> { return this.http.post<ProjectApi>(`${this.api}/project/create`, data); }
  update(id: number, data: ProjectRequest): Observable<ProjectApi> { return this.http.put<ProjectApi>(`${this.api}/project/update/${id}`, data); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.api}/project/delete/${id}`); }
  start(id: number): Observable<ProjectApi> { return this.http.put<ProjectApi>(`${this.api}/project/start/${id}`, {}); }
  complete(id: number): Observable<ProjectApi> { return this.http.put<ProjectApi>(`${this.api}/project/completed/${id}`, {}); }
}
