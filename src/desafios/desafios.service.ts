import { BadRequestException, Injectable } from '@nestjs/common';
import { Desafio } from './interfaces/desafios.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { criarDesafioDto } from './dto/criar-desafio.dto';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { CategoriasService } from 'src/categorias/categorias.service';

@Injectable()
export class DesafiosService {


    constructor(
        @InjectModel('Desafio') private readonly DesafioModel: Model<Desafio>,
        private readonly jogadoresService: JogadoresService,
        private readonly categoriasService: CategoriasService
    ) { }

    async criarDesafio(criarDesafio: criarDesafioDto) {

        const { solicitante, jogadores } = criarDesafio

        console.log(typeof solicitante, solicitante)
        const a = await this.jogadoresService.consultarJogador(solicitante)

        // if (!jogadores.includes(solicitante)) throw new BadRequestException(`Solicitante ${solicitante} não faz parte do desafio`)


        // TODO: Consultar se o solicitante faz parte de um categoria


    }

}
