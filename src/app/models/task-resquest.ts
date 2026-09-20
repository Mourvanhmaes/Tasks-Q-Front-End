import { Priority } from '../models/enums/priority.enum';
import { Status } from '../models/enums/status.enum';

export interface TaskRequest {
    id?: number;
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    assigneeId: number;
    deadLine: string;
    projectId: number;
}