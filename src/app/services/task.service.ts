import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TaskRequest } from '../models/task/task-request';
import { TaskResponse } from '../models/task/task-response';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  API = 'http://localhost:8080/api/task';

  http = inject(HttpClient);

  findall(): Observable<TaskResponse[]> {
    return this.http.get<TaskResponse[]>(`${this.API}/all`);
  }

  findById(id: number): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(`${this.API}/${id}`);
  }

  create(task: TaskRequest): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(`${this.API}/create`, task);
  }

  update(task: TaskRequest): Observable<TaskResponse> {
    return this.http.put<TaskResponse>(`${this.API}/update`, task);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/delete/${id}`);
  }

  start(id: number): Observable<TaskResponse> {
    return this.http.put<TaskResponse>(`${this.API}/start/${id}`, {});
  }

  completed(id: number): Observable<TaskResponse> {
    return this.http.put<TaskResponse>(`${this.API}/completed/${id}`, {});
  }

  findByUser(id: number): Observable<TaskResponse[]> {
    return this.http.get<TaskResponse[]>(`${this.API}/user/${id}`);
  }

  findByProject(id: number): Observable<TaskResponse[]> {
    return this.http.get<TaskResponse[]>(`${this.API}/project/${id}`);
  }
}