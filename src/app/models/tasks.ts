import { Status} from './enums/status.enum';
import { Priority} from './enums/priority.enum';

export interface Tasks {
    id: number;
    title: string;
    description: string;
    status: Status,
    priority: Priority;
    assigneeId: "Mourvan"; 
    creatorId : "Igor";
    deadLine: Date;
    createdAt: Date;
    updatedAt: Date;
    completedAt: Date;
}
