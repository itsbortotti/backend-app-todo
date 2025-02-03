import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Status')  // Categoria no Swagger
@Controller()
export class AppController {
  
  @ApiOperation({ summary: 'Verificar o status da aplicação' })
  @ApiResponse({
    status: 200,
    description: 'Aplicação em execução.',
    schema: {
      example: {
        message: 'Rodando...',
        timestamp: '2025-02-03T00:00:00Z',
        uptime: '15 minutes'
      },
    },
  })
  @Get()
  getStatus(): Record<string, any> {
    return {
      message: 'Rodando...',
      timestamp: new Date().toISOString(),
      uptime: `${process.uptime().toFixed(2)} seconds`,
    };
  }
}