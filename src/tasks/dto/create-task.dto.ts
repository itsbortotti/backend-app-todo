import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Estudar NestJS', description: 'Título da tarefa' })
  @IsString()
  @IsNotEmpty()
  title: string;
}