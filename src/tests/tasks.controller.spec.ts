import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from '../tasks/tasks.controller';
import { TasksService } from '../tasks/tasks.service';
import { Task } from '../tasks/entities/task.entity';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockTask = {
    id: '1',
    title: 'Test Task',
    completed: false,
  };

  const mockService = {
    findAll: jest.fn().mockResolvedValue([mockTask]),
    findOne: jest.fn().mockResolvedValue(mockTask),
    create: jest.fn().mockResolvedValue(mockTask),
    update: jest.fn().mockResolvedValue(mockTask),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('deve retornar todas as tarefas', async () => {
    const tasks = await controller.findAll();
    expect(tasks).toEqual([mockTask]);
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });

  it('deve retornar uma tarefa pelo ID', async () => {
    const task = await controller.findOne('1');
    expect(task).toEqual(mockTask);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('deve criar uma nova tarefa', async () => {
    const task = await controller.create({ title: 'Nova Tarefa' });
    expect(task).toEqual(mockTask);
    expect(service.create).toHaveBeenCalledWith({ title: 'Nova Tarefa' });
  });

  it('deve atualizar uma tarefa', async () => {
    const task = await controller.update('1', { completed: true });
    expect(task).toEqual(mockTask);
    expect(service.update).toHaveBeenCalledWith('1', { completed: true });
  });

  it('deve remover uma tarefa', async () => {
    await controller.remove('1');
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});