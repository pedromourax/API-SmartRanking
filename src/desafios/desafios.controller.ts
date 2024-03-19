import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { criarDesafioDto } from './dto/criar-desafio.dto';

@Controller('api/v1/desafios')
export class DesafiosController {
  constructor(private readonly desafiosService: DesafiosService) { }

  @Post()
  @UsePipes(ValidationPipe)
  async criarDesafio(@Body() desafio: criarDesafioDto) {
    return await this.desafiosService.criarDesafio(desafio)
  }
}
