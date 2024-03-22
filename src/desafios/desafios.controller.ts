import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { criarDesafioDto } from './dto/criar-desafio.dto';
import { atualizarDesafioDto } from './dto/atualizar-desafio.dto';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
import { ValidacaoStatusDesafioPipe } from 'src/common/pipes/validacao-status-desafio.pipe';

@Controller('api/v1/desafios')
export class DesafiosController {

  constructor(private readonly desafiosService: DesafiosService) { }

  @Post()
  @UsePipes(ValidationPipe)
  async criarDesafio(@Body() desafio: criarDesafioDto) {

    await this.desafiosService.criarDesafio(desafio)

  }

  @Get()
  async consultarDesafios(@Query('idJogador') idJogador: Promise<string>) {
    if (idJogador) {
      return await this.desafiosService.consultarDesafiosJogador(idJogador)
    }
    return await this.desafiosService.consultarTodosDesafios()
  }

  @Put(':desafioId')
  @UsePipes(ValidationPipe)
  async atualizarDesafio(
    @Param('desafioId', ValidacaoParametrosPipe) desafioId: string,
    @Body(ValidacaoStatusDesafioPipe) atualizarDesafioDto: atualizarDesafioDto): Promise<void> {

    await this.desafiosService.atualizarDesafio(desafioId, atualizarDesafioDto)

  }

  @Delete(':desafioId')
  async deletarDesafio(@Param('desafioId', ValidacaoParametrosPipe) desafioId: string): Promise<void> {
    await this.desafiosService.deletarDesafio(desafioId)
  }


}
