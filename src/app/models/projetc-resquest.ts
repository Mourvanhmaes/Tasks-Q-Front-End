import { Priority } from '../models/enums/priority.enum';
import { Status } from '../models/enums/status.enum';

export interface ProjectRequest {
  id?: number;
  name: string;
  description: string;
  status: Status;
  priority: Priority;
  startDate: string;
  deadLine: string;
  ownerId: number;
}