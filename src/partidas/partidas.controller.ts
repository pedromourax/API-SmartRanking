import { Body, Controller, Param, Post } from '@nestjs/common';
import { atribuirDesafioPartidaDto } from './dto/atribuir-desafio-partida.dto';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
import { PartidasService } from './partidas.service';

@Controller('api/v1/partidas')
export class PartidasController {

    constructor(private readonly partidasSerice: PartidasService) { }


    @Post(':desafioId')
    async criarPartida(
        @Param('desafioId', ValidacaoParametrosPipe) desafioId: string,
        @Body() atribuirDesafioPartidaDto: atribuirDesafioPartidaDto): Promise<void> {

        await this.partidasSerice.criarPartida(desafioId, atribuirDesafioPartidaDto)

    }


}
