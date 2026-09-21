import { TaskPriority } from '../enum/TaskPriority';
import { TaskStatus } from '../enum/TaskStatus';
import { TaskPriorityApi, TaskStatusApi } from '../task';

export interface TaskRequest {
    id?: number;
    title: string;
    description: string;
    status: TaskStatusApi;
    priority: TaskPriorityApi;
    assigneeId: number;
    deadLine: string;
    projectId: number;
}


