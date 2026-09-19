import { TaskPriority } from '../enum/TaskPriority';
import { TaskStatus } from '../enum/TaskStatus';

export interface ProjectResponse {
  id: number;
  name: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string;
  deadLine: string;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

