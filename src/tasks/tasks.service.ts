import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  /**
   * Retorna todas as tarefas cadastradas
   */
  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  /**
   * Retorna uma única tarefa pelo ID
   * @throws NotFoundException se a tarefa não for encontrada
   */
  async findOne(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada`);
    }
    return task;
  }

  /**
   * Cria uma nova tarefa
   */
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create(createTaskDto);
    return this.tasksRepository.save(task);
  }

  /**
   * Atualiza uma tarefa existente
   * @throws NotFoundException se a tarefa não for encontrada
   */
  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    Object.assign(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }

  /**
   * Remove uma tarefa pelo ID
   * @throws NotFoundException se a tarefa não for encontrada
   */
  async remove(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada`);
    }
  }
}