import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) {}

    @Get()
    public getTasks(@Query() filterDto: GetTasksFilterDTO): Task[] {
        if (Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilters(filterDto);
        } else {
            return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id')
    public getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    public createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    public deleteTaskById(@Param('id') id: string): void {
        this.tasksService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    public updateTaskById(
            @Param('id') id: string,
            @Body('status') status: TaskStatus
        ): Task {
            return this.tasksService.updateTaskById(id, status);
    }
}
