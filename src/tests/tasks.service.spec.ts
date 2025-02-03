import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../tasks/tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../tasks/entities/task.entity';
import { Repository } from 'typeorm';

describe('TasksService', () => {
  let service: TasksService;
  let repository: Repository<Task>;

  const mockTask = {
    id: '1',
    title: 'Test Task',
    completed: false,
  };

  const mockRepository = {
    find: jest.fn().mockResolvedValue([mockTask]),
    findOneBy: jest.fn().mockResolvedValue(mockTask),
    create: jest.fn().mockReturnValue(mockTask),
    save: jest.fn().mockResolvedValue(mockTask),
    update: jest.fn().mockResolvedValue(mockTask),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('deve retornar todas as tarefas', async () => {
    const tasks = await service.findAll();
    expect(tasks).toEqual([mockTask]);
    expect(repository.find).toHaveBeenCalledTimes(1);
  });

  it('deve retornar uma tarefa pelo ID', async () => {
    const task = await service.findOne('1');
    expect(task).toEqual(mockTask);
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: '1' });
  });

  it('deve criar uma nova tarefa', async () => {
    const task = await service.create({ title: 'Nova Tarefa' });
    expect(task).toEqual(mockTask);
    expect(repository.save).toHaveBeenCalledTimes(1);
  });

  it('deve atualizar uma tarefa existente', async () => {
    // Arrange
    const taskId = '1';
    const updateData = { completed: true };
  
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockTask);  // Mock do findOne
    repository.save = jest.fn().mockResolvedValueOnce(mockTask);      // Mock do save
  
    // Act
    const updatedTask = await service.update(taskId, updateData);
  
    // Assert
    expect(service.findOne).toHaveBeenCalledWith(taskId);
    expect(repository.save).toHaveBeenCalledWith({ ...mockTask, ...updateData });
    expect(updatedTask).toEqual(mockTask);
  });

  it('deve remover uma tarefa pelo ID', async () => {
    await service.remove('1');
    expect(repository.delete).toHaveBeenCalledWith('1');
  });

  it('deve lançar uma exceção ao tentar buscar uma tarefa inexistente', async () => {
    jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);
    await expect(service.findOne('2')).rejects.toThrowError('Tarefa com ID 2 não encontrada');
  });
});