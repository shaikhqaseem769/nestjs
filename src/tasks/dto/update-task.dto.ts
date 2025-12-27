import { IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks-status.enum';

export class updateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
