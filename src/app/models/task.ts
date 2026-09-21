//export type TaskStatus = 'todo' | 'doing' | 'done' | 'blocked';

//export type TaskPriority = 'baixa' | 'media' | 'alta' | 'urgente';

// task-status.ts (ou onde já está TaskStatus)
export type TaskStatus = 'todo' | 'doing' | 'done' | 'blocked';
export type TaskStatusApi = 'PENDENTE' | 'ANDAMENTO' | 'CONCLUIDO' | 'ATRASADA'; // backend

export type TaskPriority = 'baixa' | 'media' | 'alta' | 'urgente';
export type TaskPriorityApi = 'BAIXA' | 'MEDIA' | 'ALTA';           // backend


export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  projectId: string;
  assigneeId: string;
  dueLabel: string;
  overdue: boolean;
  xp: number;
  /** Tarefa validada pelo admin ou pelo responsavel do projeto */
  concluded: boolean;
  concludedById?: string;
  concludedAtLabel?: string;
}

export interface BoardColumn {
  status: TaskStatus;
  title: string;
  modifier: string;
  tasks: Task[];
}

export interface StatusOption {
  status: TaskStatus;
  title: string;
}

/** Botao de mover a tarefa exibido no card do quadro. */
export interface MoveOption {
  status: TaskStatus;
  label: string;
  icon: string;
}

export const TASK_STATUSES: StatusOption[] = [
  { status: 'todo', title: 'A Fazer' },
  { status: 'doing', title: 'Em Andamento' },
  { status: 'done', title: 'Concluido' },
  { status: 'blocked', title: 'Bloqueado' }
];

export type TaskRequestStatus =
  | 'PENDENTE'
  | 'ANDAMENTO'
  | 'CONCLUIDO'
  | 'ATRASADA';