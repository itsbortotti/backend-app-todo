import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'Estudar NestJS', description: 'Novo título da tarefa' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: true, description: 'Indica se a tarefa foi concluída' })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}