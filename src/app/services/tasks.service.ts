import { Injectable, computed, inject, signal } from '@angular/core';
import { BoardColumn, TASK_STATUSES, Task, TaskStatus } from '../models/task';
import { Project } from '../models/project';
import { Users } from '../models/users';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private readonly usersService = inject(UsersService);

  readonly projects: Project[] = [
    { id: 'p1', name: 'Portal do Cliente', ownerId: 'u1' },
    { id: 'p2', name: 'App Mobile Cabanos', ownerId: 'u2' },
    { id: 'p3', name: 'Site Institucional', ownerId: 'u1' },
    { id: 'p4', name: 'Campanha de Doacao Natalina', ownerId: 'u3' }
  ];

  private readonly _tasks = signal<Task[]>([
    {
      id: 't1',
      title: 'Revisar contrato de fornecedor',
      description: 'Conferir as clausulas de renovacao automatica antes de assinar o novo contrato anual com o fornecedor de hospedagem.',
      priority: 'baixa',
      status: 'todo',
      projectId: 'p3',
      assigneeId: 'u5',
      dueLabel: '20 set',
      overdue: false,
      xp: 20,
      concluded: false
    },
    {
      id: 't2',
      title: 'Planejar sprint de outubro',
      description: 'Levantar as prioridades com o time e organizar o backlog para o proximo ciclo de duas semanas.',
      priority: 'media',
      status: 'todo',
      projectId: 'p1',
      assigneeId: 'u1',
      dueLabel: '25 set',
      overdue: false,
      xp: 25,
      concluded: false
    },
    {
      id: 't3',
      title: 'Criar wireframes da tela de onboarding',
      description: 'Desenhar o fluxo completo de cadastro e primeiro acesso para validacao com o time de design.',
      priority: 'media',
      status: 'doing',
      projectId: 'p2',
      assigneeId: 'u3',
      dueLabel: '12 set',
      overdue: false,
      xp: 30,
      concluded: false
    },
    {
      id: 't4',
      title: 'Integrar gateway de pagamento',
      description: 'Conectar o checkout ao novo gateway e validar estornos, parcelamento e verificacao antifraude.',
      priority: 'alta',
      status: 'doing',
      projectId: 'p1',
      assigneeId: 'u1',
      dueLabel: '02 set',
      overdue: true,
      xp: 80,
      concluded: false
    },
    {
      id: 't5',
      title: 'Corrigir bug no checkout',
      description: 'O cupom de desconto nao esta sendo aplicado corretamente na etapa final do checkout quando o usuario troca a forma de pagamento. Validar a integracao com o gateway de pagamento, revisar os logs do servico de cupons e cobrir o fluxo com testes automatizados antes de liberar para producao.',
      priority: 'urgente',
      status: 'doing',
      projectId: 'p1',
      assigneeId: 'u2',
      dueLabel: '04 set',
      overdue: true,
      xp: 60,
      concluded: false
    },
    {
      id: 't6',
      title: 'Revisar textos da landing page',
      description: 'Ajustar o copy da home e das paginas de doacao para o novo tom de voz da marca.',
      priority: 'baixa',
      status: 'done',
      projectId: 'p3',
      assigneeId: 'u5',
      dueLabel: '08 set',
      overdue: false,
      xp: 15,
      concluded: false
    },
    {
      id: 't7',
      title: 'Publicar posts da campanha',
      description: 'Subir os posts aprovados no instagram e agendar os stories de lembrete da campanha de fim de ano.',
      priority: 'media',
      status: 'done',
      projectId: 'p4',
      assigneeId: 'u3',
      dueLabel: '10 set',
      overdue: false,
      xp: 35,
      concluded: false
    },
    {
      id: 't8',
      title: 'Configurar pipeline de deploy',
      description: 'Aguardando liberacao de acesso ao servidor de homologacao pela equipe de infraestrutura.',
      priority: 'baixa',
      status: 'blocked',
      projectId: 'p2',
      assigneeId: 'u4',
      dueLabel: '18 set',
      overdue: false,
      xp: 45,
      concluded: false
    }
  ]);

  readonly tasks = this._tasks.asReadonly();

  replaceTasks(tasks: Task[]): void {
    this._tasks.set(tasks);
  }

  readonly columns = computed<BoardColumn[]>(() =>
    TASK_STATUSES.map(({ status, title }) => ({
      status,
      title,
      modifier: `board-column--${status}`,
      tasks: this._tasks().filter(task => task.status === status)
    }))
  );

  getById(id: string): Task | undefined {
    return this._tasks().find(task => task.id === id);
  }

  getProject(task: Task): Project | undefined {
    return this.projects.find(project => project.id === task.projectId);
  }

  getAssignee(task: Task): Users | undefined {
    return this.usersService.getById(task.assigneeId);
  }

  /**
   * Somente o administrador ou o responsavel pelo projeto podem concluir
   * (ou reabrir) uma tarefa.
   */
  canConclude(task: Task, user: Users): boolean {
    return user.role === 'admin' || this.getProject(task)?.ownerId === user.id;
  }

  /** Mover entre as colunas e liberado para qualquer membro. */
  moveTask(taskId: string, status: TaskStatus): void {
    this.update(taskId, task => (task.concluded ? task : { ...task, status }));
  }

  concludeTask(taskId: string, user: Users): void {
    this.update(taskId, task => {
      if (task.concluded || task.status !== 'done' || !this.canConclude(task, user)) {
        return task;
      }

      return {
        ...task,
        concluded: true,
        concludedById: user.id,
        concludedAtLabel: this.today()
      };
    });
  }

  reopenTask(taskId: string, user: Users): void {
    this.update(taskId, task => {
      if (!task.concluded || !this.canConclude(task, user)) {
        return task;
      }

      return {
        ...task,
        status: 'doing',
        concluded: false,
        concludedById: undefined,
        concludedAtLabel: undefined
      };
    });
  }

  private update(taskId: string, change: (task: Task) => Task): void {
    this._tasks.update(tasks => tasks.map(task => (task.id === taskId ? change(task) : task)));
  }

  private today(): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date());
  }
}
