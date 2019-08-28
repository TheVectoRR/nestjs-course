import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) {}

    @Get()
    public getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    @Post()
    public createTask(
        @Body('title') title: string,
        @Body('description') description: string,
    ): Task {
        return this.tasksService.createTask(title, description);
    }
}
