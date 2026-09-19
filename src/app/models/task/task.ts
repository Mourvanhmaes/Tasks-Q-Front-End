import { TaskPriority } from '../enum/TaskPriority';
import { TaskStatus } from '../enum/TaskStatus';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: number;
  creatorId: number;
  deadLine: string;
  completedAt: string | null;
  projectId: number | null;
}
