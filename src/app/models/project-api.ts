export interface ProjectApi { id: number; name: string; description: string; status: 'PENDENTE' | 'ANDAMENTO' | 'CONCLUIDO' | 'ATRASADA'; priority: 'BAIXA' | 'MEDIA' | 'ALTA'; startDate: string; deadLine: string; ownerId: number; }
export interface ProjectRequest { id?: number; name: string; description: string; status: ProjectApi['status']; priority: ProjectApi['priority']; startDate: string; deadLine: string; ownerId: number; }
export interface ProjectUser { id: number; nome: string; }
