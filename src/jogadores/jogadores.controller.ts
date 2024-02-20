import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { atualizarJogadorDto } from './dto/atualizar-jogador.dto'
import { JogadoresService } from './jogadores.service';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe'
import { Jogador } from './interfaces/jogador.interface';


@Controller('api/v1/jogadores')
export class JogadoresController {
    constructor(private readonly jogadoresService: JogadoresService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(@Body() CriarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        return await this.jogadoresService.criarJogador(CriarJogadorDto)
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(
        @Body() atualizarJogadorDto: atualizarJogadorDto,
        @Param('_id', JogadoresValidacaoParametrosPipe) _id: string
    ) {
        await this.jogadoresService.atualizarJogador(_id, atualizarJogadorDto)
    }

    @Get()
    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadoresService.consultarTodosJogadores()
    }

    @Get('/:_id')
    async consultadoJogadorID(
        @Param('_id', JogadoresValidacaoParametrosPipe) _id: string): Promise<Jogador> {
        return await this.jogadoresService.consultarJogador(_id)
    }

    @Delete('/:_id')
    async deletarJogador(@Param('_id', JogadoresValidacaoParametrosPipe) _id: string) {
        return await this.jogadoresService.deletarJogador(_id)
    }
}   
