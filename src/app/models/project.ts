export interface Project {
  id: string;
  name: string;
  /** Responsavel pelo projeto: pode concluir as tarefas dele */
  ownerId: string;
}

// MOCK: interface criada apenas para tipar o card de /projects. Progresso,
// equipe, total de tarefas e prazo ainda nao existem em Project nem no service.
export interface ProjectCardData {
  name: string;
  description: string;
  statusLabel: string;
  statusModifier: 'info' | 'danger' | 'success' | 'neutral';
  /** largura da barra, ex.: '62%' */
  progress: string;
  percentLabel: string;
  progressModifier: 'danger' | 'success' | 'neutral' | null;
  avatars: string[];
  tasksLabel: string;
  deadlineLabel: string;
  deadlineOverdue: boolean;
}
