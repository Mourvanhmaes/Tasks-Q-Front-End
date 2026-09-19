import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskApi, TaskProject, TaskRequest, TaskUser } from '../models/task-api';

@Injectable({ providedIn: 'root' })
export class TaskApiService {
  private readonly apiUrl = 'http://localhost:8080/api';
  constructor(private readonly http: HttpClient) {}

  listByProject(projectId: number): Observable<TaskApi[]> { return this.http.get<TaskApi[]>(`${this.apiUrl}/task/project/${projectId}`); }
  listProjects(): Observable<TaskProject[]> { return this.http.get<TaskProject[]>(`${this.apiUrl}/project/all`); }
  listUsers(): Observable<TaskUser[]> { return this.http.get<TaskUser[]>(`${this.apiUrl}/usuarios`); }
  create(data: TaskRequest): Observable<TaskApi> { return this.http.post<TaskApi>(`${this.apiUrl}/task/create`, data); }
  update(data: TaskRequest): Observable<TaskApi> { return this.http.put<TaskApi>(`${this.apiUrl}/task/update`, data); }
  start(id: number): Observable<TaskApi> { return this.http.put<TaskApi>(`${this.apiUrl}/task/start/${id}`, {}); }
  complete(id: number): Observable<TaskApi> { return this.http.put<TaskApi>(`${this.apiUrl}/task/completed/${id}`, {}); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/task/delete/${id}`); }
}
