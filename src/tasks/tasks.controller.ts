import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { updateTaskStatusDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator'
import { User } from 'src/auth/user.entity';
import { ConfigService } from '@nestjs/config';
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  // taskService: TasksService;
  // constructor(taskService: TasksService){
  //     this.taskService = taskService;
  // }

  constructor(private taskService: TasksService, private configService: ConfigService) {
    // console.log(configService.get('PORT'))
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }


  @Delete('/:id')
  deleteTaskById(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.taskService.deleteTaskById(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: updateTaskStatusDto,
    @GetUser() user: User
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTaskStatus(id, status, user);
  }

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto, @GetUser() user: User): Promise<Task[]> {
    return this.taskService.getTasks(filterDto, user);
  }
  /*

  


  // First method
  // @Post()
  // createTask(@Body() body) {
  //      console.log('body',body)
  // }

  

  */
}
