import { TaskPriority } from '../enum/TaskPriority';
import { TaskStatus } from '../enum/TaskStatus';

export interface TaskRequest {
    id?: number;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    assigneeId: number;
    deadLine: string;
    projectId: number;
}
