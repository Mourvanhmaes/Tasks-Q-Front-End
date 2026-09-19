import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardHoliday, DashboardProject, DashboardTask, DashboardUser } from '../models/dashboard-api';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly apiUrl = 'http://localhost:8080/api';

  constructor(private readonly http: HttpClient) {}

  listTasks(): Observable<DashboardTask[]> {
    return this.http.get<DashboardTask[]>(`${this.apiUrl}/task/all`);
  }

  listProjects(): Observable<DashboardProject[]> {
    return this.http.get<DashboardProject[]>(`${this.apiUrl}/project/all`);
  }

  listTasksByProject(projectId: number): Observable<DashboardTask[]> {
    return this.http.get<DashboardTask[]>(`${this.apiUrl}/task/project/${projectId}`);
  }

  listUsers(): Observable<DashboardUser[]> {
    return this.http.get<DashboardUser[]>(`${this.apiUrl}/usuarios`);
  }

  listHolidays(): Observable<DashboardHoliday[]> {
    return this.http.get<DashboardHoliday[]>(`${this.apiUrl}/feriados`);
  }
}
