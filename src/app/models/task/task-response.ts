import { TaskPriority } from '../enum/TaskPriority';
import { TaskStatus } from '../enum/TaskStatus';

export interface TaskResponse {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: number;
  creatorId: number;
  deadLine: string;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
}

