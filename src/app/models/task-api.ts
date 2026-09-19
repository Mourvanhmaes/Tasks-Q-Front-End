export interface TaskApi {
  id: number;
  title: string;
  description: string;
  status: 'PENDENTE' | 'ANDAMENTO' | 'CONCLUIDO' | 'ATRASADA';
  priority: 'BAIXA' | 'MEDIA' | 'ALTA';
  assigneeId: number;
  deadLine: string;
  completedAt: string | null;
}

export interface TaskRequest {
  id?: number;
  title: string;
  description: string;
  status: TaskApi['status'];
  priority: TaskApi['priority'];
  assigneeId: number;
  deadLine: string;
  projectId: number;
  creatorId?: number;
}

export interface TaskProject { id: number; name: string; ownerId: number; }
export interface TaskUser { id: number; nome: string; }
