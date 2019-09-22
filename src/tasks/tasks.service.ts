import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task.status.enum';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}

    // public getTasksWithFilters(filterDto: GetTasksFilterDTO): Task[] {
    //     const { status, search } = filterDto;

    //     let tasks = this.getAllTasks();

    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     }

    //     if (search) {
    //         tasks = tasks.filter(task =>
    //                 task.title.includes(search) ||
    //                 task.description.includes(search)
    //             );
    //     }

    //     return tasks;
    // }
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

        // const found = await this.getTaskById(id);
        // this.tasks = this.tasks.filter(task => task.id !== found.id);
    }

    // public updateTaskById(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}
