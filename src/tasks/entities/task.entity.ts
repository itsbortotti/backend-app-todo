import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Task {
  @ApiProperty({ example: '1a2b3c4d-5e6f-7g8h-9i0j', description: 'ID da tarefa' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Estudar TypeORM', description: 'Título da tarefa' })
  @Column()
  title: string;

  @ApiProperty({ example: false, description: 'Indica se a tarefa foi concluída' })
  @Column({ default: false })
  completed: boolean;
}