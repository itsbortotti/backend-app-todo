import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@ApiTags('tasks')  // Define a tag do Swagger
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Listar todas as tarefas' })
  @ApiResponse({ status: 200, description: 'Lista de tarefas retornada com sucesso.', type: [Task] })
  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @ApiOperation({ summary: 'Buscar uma tarefa pelo ID' })
  @ApiResponse({ status: 200, description: 'Tarefa encontrada.', type: Task })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada.' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @ApiOperation({ summary: 'Criar uma nova tarefa' })
  @ApiResponse({ status: 201, description: 'Tarefa criada com sucesso.', type: Task })
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @ApiOperation({ summary: 'Atualizar uma tarefa pelo ID' })
  @ApiResponse({ status: 200, description: 'Tarefa atualizada com sucesso.', type: Task })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @ApiOperation({ summary: 'Remover uma tarefa pelo ID' })
  @ApiResponse({ status: 204, description: 'Tarefa removida com sucesso.' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(id);
  }
}

export class TasksControllers {}