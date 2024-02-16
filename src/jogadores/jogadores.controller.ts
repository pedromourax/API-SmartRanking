import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
    constructor(private readonly jogadoresService: JogadoresService) { }

    @Post()
    async criarJogador(@Body() CriarJogadorDto: CriarJogadorDto) {
        await this.jogadoresService.criarJogador(CriarJogadorDto)
    }

    @Get()
    async consultarTodosJogadores(@Query('email') email: string) {
        if (email) {
            return await this.jogadoresService.consultarJogador(email)
        }
        else {
            return await this.jogadoresService.consultarTodosJogadores()
        }
    }

    @Delete()
    async deletarJogador(@Query('email') email: string) {
        return await this.jogadoresService.deletarJogador(email)
    }
}   
