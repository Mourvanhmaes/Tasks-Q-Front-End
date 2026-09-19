export type TaskStatusApi = 'PENDENTE' | 'ANDAMENTO' | 'CONCLUIDO' | 'ATRASADA';

export interface DashboardTask {
  id: number;
  title: string;
  description: string;
  status: TaskStatusApi;
  priority: 'BAIXA' | 'MEDIA' | 'ALTA';
  assigneeId: number;
  creatorId: number;
  deadLine: string;
  completedAt: string | null;
}

export interface DashboardProject {
  id: number;
  name: string;
  description: string;
  status: TaskStatusApi;
  priority: 'BAIXA' | 'MEDIA' | 'ALTA';
  startDate: string;
  deadLine: string;
  ownerId: number;
}

export interface DashboardUser {
  id: number;
  nome: string;
  cargo: { id: number; nome: string };
  status: 'ATIVO' | 'INATIVO';
  xp: number;
}

export interface DashboardHoliday {
  data: string;
  title: string;
  description: string;
}
