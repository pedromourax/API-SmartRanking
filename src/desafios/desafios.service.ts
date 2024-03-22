import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Desafio } from './interfaces/desafios.interface';
import { Partida } from '../partidas/interfaces/partidas.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { criarDesafioDto } from './dto/criar-desafio.dto';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { CategoriasService } from 'src/categorias/categorias.service';
import { DesafioStatus } from './interfaces/desafio-status.enum';
import { sub } from 'date-fns';
import { atualizarDesafioDto } from './dto/atualizar-desafio.dto';
import { atribuirDesafioPartidaDto } from '../partidas/dto/atribuir-desafio-partida.dto';

@Injectable()
export class DesafiosService {


    constructor(
        @InjectModel('Desafio') private readonly DesafioModel: Model<Desafio>,
        private readonly jogadoresService: JogadoresService,
        private readonly categoriasService: CategoriasService
    ) { }

    async criarDesafio(criarDesafio: criarDesafioDto) {

        const { solicitante, jogadores } = criarDesafio

        const [jogador1, jogador2] = jogadores

        await this.jogadoresService.consultarJogador(`${jogador1}`)
        await this.jogadoresService.consultarJogador(`${jogador2}`)

        if (!jogadores.includes(solicitante)) throw new BadRequestException(`Solicitante ${solicitante} não faz parte do desafio`)


        // TODO: Consultar se o solicitante faz parte de um categoria

        const solicitanteCategoria = await this.categoriasService.jogadorJaCadastradoCategoria(`${solicitante}`)

        if (!solicitanteCategoria) throw new BadRequestException(`Jogador: ${solicitante} não faz parte de uma categoria`)

        const desafioCriado = new this.DesafioModel(criarDesafio)
        console.log(criarDesafio)

        desafioCriado.dataHoraDesafio = criarDesafio.dataHoraDesafio
        desafioCriado.status = DesafioStatus.PENDENTE
        desafioCriado.categoria = solicitanteCategoria.categoria
        desafioCriado.dataHoraSolicitacao = sub(new Date(), { hours: 3 })
        return await desafioCriado.save()
    }


    async consultarDesafiosJogador(idJogador: Promise<string>): Promise<Array<Desafio>> {
        return await this.DesafioModel
            .find({ $or: [{ 'solicitante': idJogador }, { 'jogadores': idJogador }] })
            .populate('jogadores')
            .exec()
    }

    async consultarTodosDesafios(): Promise<Array<Desafio>> {
        return await this.DesafioModel
            .find()
            .populate('jogadores')
            .exec()
    }

    async atualizarDesafio(desafioId: string, atualizarDesafioDto: atualizarDesafioDto): Promise<void> {
        const { status, dataHoraDesafio } = atualizarDesafioDto

        const desafio = await this.DesafioModel.findById(desafioId)

        if (!desafio) throw new BadRequestException(`Desafio ${desafioId} inexistente`)

        if (dataHoraDesafio) {
            const data = new Date(dataHoraDesafio)
            if (data < sub(new Date(), { hours: 3 }))
                throw new BadRequestException(`Data inválida para o desafio ${desafioId}`)
        }

        await this.DesafioModel.findOneAndUpdate({ _id: desafioId }, { $set: atualizarDesafioDto }).exec()

    }

    async deletarDesafio(desafioId: string): Promise<void> {

        const desafio = await this.DesafioModel.findById(desafioId)
        desafio.status = DesafioStatus.CANCELADO;

        await this.DesafioModel.findOneAndUpdate({ _id: desafioId }, { $set: desafio }).exec()
    }

    async consultarDesafio(desafioId: string): Promise<Desafio> {
        const desafio = await this.DesafioModel.findById(desafioId)
        if (!desafio) throw new NotFoundException(`Desafio ${desafioId} inexistente`)
        return desafio
    }


    async definirPartidaRealizada(desafioId, partida) {
        await this.DesafioModel.findOneAndUpdate({ _id: desafioId }, { $set: { status: DesafioStatus.REALIZADO, partida: partida } }).exec()
    }

}
