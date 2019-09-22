import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task.status.enum';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}

    public async getTasks(filterDto: GetTasksFilterDTO): Promise<Task[]>  {
        return this.taskRepository.getTasks(filterDto);
    }

    public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    public async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`task with ID: '${id}' not found`);
        }

        return found;
    }

    public async deleteTaskById(id: number): Promise<void> {

        const result = await this.taskRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`task with ID: '${id}' not found`);
        }
    }

    public async updateTaskById(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }
}
