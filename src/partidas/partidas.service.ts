import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Partida } from './interfaces/partidas.interface';
import { DesafiosService } from 'src/desafios/desafios.service';
import { atribuirDesafioPartidaDto } from './dto/atribuir-desafio-partida.dto';

@Injectable()
export class PartidasService {

    constructor(@InjectModel('Partida')
    private readonly PartidaModel: Model<Partida>,
        private readonly DesafioService: DesafiosService
    ) { }

    async criarPartida(desafioId: string, atribuirDesafioPartida: atribuirDesafioPartidaDto): Promise<void> {
        const desafio = await this.DesafioService.consultarDesafio(desafioId)
        const { def, resultado } = atribuirDesafioPartida
        if (!desafio.jogadores.includes(def)) throw new BadRequestException(`Jogador ${def} não faz parte do desafio`)


        const partida = new this.PartidaModel({
            def: def,
            resultado: resultado,
            categoria: desafio.categoria,
            jogadores: desafio.jogadores
        })
        await partida.save()

        await this.DesafioService.definirPartidaRealizada(desafioId, partida._id)

    }

}
