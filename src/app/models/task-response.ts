import { Priority } from '../models/enums/priority.enum';
import { Status } from '../models/enums/status.enum';

export interface TaskResponse {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assigneeId: number;
  creatorId: number;
  deadLine: string;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
}