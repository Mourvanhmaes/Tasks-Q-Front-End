import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProjectRequest } from '../models/project/project-request';
import { ProjectResponse } from '../models/project/project-response';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  API = 'http://localhost:8080/api/project';

  http = inject(HttpClient);

  findall(): Observable<ProjectResponse[]> {
    return this.http.get<ProjectResponse[]>(`${this.API}/all`);
  }

  findById(id: number): Observable<ProjectResponse> {
    return this.http.get<ProjectResponse>(`${this.API}/${id}`);
  }

  create(project: ProjectRequest): Observable<void> {
    return this.http.post<void>(`${this.API}/create`, project);
  }

  update(id: number, project: ProjectRequest): Observable<void> {
    return this.http.put<void>(`${this.API}/update/${id}`, project);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/delete/${id}`);
  }

  start(id: number): Observable<ProjectResponse> {
    return this.http.put<ProjectResponse>(`${this.API}/start/${id}`, {});
  }

  completed(id: number): Observable<ProjectResponse> {
    return this.http.put<ProjectResponse>(`${this.API}/completed/${id}`, {});
  }
}
