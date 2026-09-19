import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppShellComponent } from '../../components/layout/app-shell.component';
import { StatCardComponent } from '../../components/dashboard/stat-card/stat-card.component';
import { HolidaysCardComponent } from '../../components/dashboard/holidays-card/holidays-card.component';
import { ProjectListItemComponent } from '../../components/dashboard/project-list-item/project-list-item.component';
import { TasksSummaryComponent } from '../../components/dashboard/tasks-summary/tasks-summary.component';
import { RankingListComponent } from '../../components/shared/ranking-list/ranking-list.component';
import { Holiday, NextHoliday, ProjectListItemData, StatCardData, TaskSummaryItem } from '../../models/dashboard';
import { RankingEntry } from '../../models/ranking';
import { DashboardHoliday, DashboardProject, DashboardTask, DashboardUser } from '../../models/dashboard-api';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [AppShellComponent, StatCardComponent, HolidaysCardComponent, ProjectListItemComponent, TasksSummaryComponent, RankingListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  userName = 'usuário';
  nextHoliday: NextHoliday = { date: '--', name: 'Nenhum feriado próximo', caption: 'Próximo feriado nacional' };
  holidays: Holiday[] = [];
  statCards: StatCardData[] = [];
  projects: ProjectListItemData[] = [];
  taskSummary: TaskSummaryItem[] = [];
  ranking: RankingEntry[] = [];

  private tasks: DashboardTask[] = [];
  private users: DashboardUser[] = [];
  private apiProjects: DashboardProject[] = [];
  private apiErrorShown = false;

  constructor(private readonly dashboardService: DashboardService, private readonly router: Router) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loadTasks();
    this.loadProjects();
    this.loadUsers();
    this.loadHolidays();
  }

  goToProjects(): void { this.router.navigate(['/projects']); }
  goToXp(): void { this.router.navigate(['/xp']); }

  private loadTasks(): void {
    this.dashboardService.listTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.updateTaskCards();
        this.updateProjects();
      },
      error: () => this.showApiError()
    });
  }

  private loadProjects(): void {
    this.dashboardService.listProjects().subscribe({
      next: (projects) => {
        this.apiProjects = projects;
        this.updateProjects();
      },
      error: () => this.showApiError()
    });
  }

  private loadUsers(): void {
    this.dashboardService.listUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.userName = users[0]?.nome ?? 'usuário';
        this.ranking = users
          .filter((user) => user.status === 'ATIVO')
          .sort((first, second) => second.xp - first.xp)
          .slice(0, 5)
          .map((user, index) => this.toRanking(user, index));
        this.updateProjects();
      },
      error: () => this.showApiError()
    });
  }

  private loadHolidays(): void {
    this.dashboardService.listHolidays().subscribe({
      next: (holidays) => this.updateHolidays(holidays),
      error: () => this.showApiError()
    });
  }

  private updateTaskCards(): void {
    const total = this.tasks.length;
    const completed = this.tasks.filter((task) => task.status === 'CONCLUIDO').length;
    const inProgress = this.tasks.filter((task) => task.status === 'ANDAMENTO').length;
    const overdue = this.tasks.filter((task) => task.status === 'ATRASADA').length;
    const pending = total - completed;

    this.statCards = [
      {
        icon: 'fa-solid fa-clipboard-list', iconModifier: 'purple', title: 'Tarefas Pendentes',
        value: String(pending), trendLabel: overdue ? `${overdue} atrasada(s)` : 'Tudo em dia',
        trendModifier: overdue ? 'danger' : 'success', caption: 'Tarefas que precisam da sua atenção',
        progress: this.percent(pending, total), progressModifier: 'purple', total: `de ${total} no total`
      },
      {
        icon: 'fa-solid fa-layer-group', iconModifier: 'blue', title: 'Projetos Ativos',
        value: '0', trendLabel: '', trendModifier: 'success', caption: 'Projetos em andamento',
        progress: '0%', progressModifier: 'blue', total: 'de 0 no total'
      }
    ];

    this.taskSummary = [
      this.toSummary('Concluídas', completed, total, 'success'),
      this.toSummary('Em andamento', inProgress, total, 'blue'),
      this.toSummary('Atrasadas', overdue, total, 'danger')
    ];
  }

  private updateProjects(): void {
    if (!this.apiProjects.length) return;

    const active = this.apiProjects.filter((project) => project.status !== 'CONCLUIDO').length;
    const activeCard = this.statCards.find((card) => card.title === 'Projetos Ativos');
    if (activeCard) {
      activeCard.value = String(active);
      activeCard.progress = this.percent(active, this.apiProjects.length);
      activeCard.total = `de ${this.apiProjects.length} no total`;
    }
    this.projects = this.apiProjects.map((project) => this.toProjectCard(project, []));
    this.apiProjects.forEach((project) => this.loadProjectTasks(project));
  }

  private updateHolidays(holidays: DashboardHoliday[]): void {
    const next = holidays
      .filter((holiday) => new Date(`${holiday.data}T00:00:00`) >= this.startOfToday())
      .sort((first, second) => first.data.localeCompare(second.data));
    const [first, ...others] = next;
    if (!first) return;

    this.nextHoliday = { date: this.formatDate(first.data), name: first.title, caption: 'Próximo feriado nacional' };
    this.holidays = others.slice(0, 3).map((holiday, index) => ({
      date: this.formatDate(holiday.data), name: holiday.title,
      dotModifier: index === 0 ? 'purple' : index === 1 ? 'blue' : 'success'
    }));
  }

  private loadProjectTasks(project: DashboardProject): void {
    this.dashboardService.listTasksByProject(project.id).subscribe({
      next: (tasks) => {
        const card = this.toProjectCard(project, tasks);
        this.projects = this.projects.map((item) => item.title === project.name ? card : item);
      },
      error: () => this.showApiError()
    });
  }

  private toProjectCard(project: DashboardProject, projectTasks: DashboardTask[]): ProjectListItemData {
    const completed = projectTasks.filter((task) => task.status === 'CONCLUIDO').length;
    const owner = this.users.find((user) => user.id === project.ownerId);
    const status = this.projectStatus(project.status);
    const progress = this.percent(completed, projectTasks.length);

    return {
      icon: 'fa-solid fa-layer-group', iconModifier: 'purple', title: project.name,
      statusLabel: status.label, statusModifier: status.modifier, description: project.description,
      tasksLabel: `${completed} de ${projectTasks.length} tarefas`, membersLabel: owner ? '1 membro' : 'Sem responsável',
      deadlineLabel: `Entrega em ${this.formatDate(project.deadLine)}`,
      deadlineModifier: project.status === 'ATRASADA' ? 'alert' : project.status === 'CONCLUIDO' ? 'done' : null,
      progress, progressModifier: status.progressModifier, percentLabel: progress,
      avatars: owner ? [this.initials(owner.nome)] : [], moreAvatars: null
    };
  }

  private toRanking(user: DashboardUser, index: number): RankingEntry {
    return {
      position: String(index + 1),
      positionModifier: index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : null,
      initials: this.initials(user.nome), name: user.nome, role: user.cargo.nome,
      scoreValue: String(user.xp), scoreLabel: 'XP'
    };
  }

  private toSummary(label: string, count: number, total: number, modifier: 'success' | 'blue' | 'danger'): TaskSummaryItem {
    const progress = this.percent(count, total);
    return { label, count: String(count), percentLabel: progress, progress, modifier };
  }

  private projectStatus(status: DashboardProject['status']): { label: string; modifier: 'info' | 'danger' | 'success'; progressModifier: 'purple' | 'blue' | 'success' | 'danger' } {
    if (status === 'CONCLUIDO') return { label: 'Concluído', modifier: 'success', progressModifier: 'success' };
    if (status === 'ATRASADA') return { label: 'Atrasado', modifier: 'danger', progressModifier: 'danger' };
    return { label: 'Em andamento', modifier: 'info', progressModifier: 'blue' };
  }

  private percent(value: number, total: number): string {
    return total ? `${Math.round((value / total) * 100)}%` : '0%';
  }

  private formatDate(date: string): string {
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(new Date(`${date}T00:00:00`));
  }

  private initials(name: string): string {
    return name.split(' ').slice(0, 2).map((part) => part[0]).join('').toUpperCase();
  }

  private startOfToday(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }

  private showApiError(): void {
    if (this.apiErrorShown) return;
    this.apiErrorShown = true;
    Swal.fire('Não foi possível carregar a dashboard', 'Verifique se a API está em execução.', 'error');
  }
}
