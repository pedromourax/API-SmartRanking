import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { atualizarJogadorDto } from './dto/atualizar-jogador.dto'
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {


    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) { }

    private readonly logger = new Logger(JogadoresService.name)

    async criarJogador(CriarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        const { email } = CriarJogadorDto
        const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec()

        if (jogadorEncontrado) {
            throw new BadRequestException('Email já existe')
        }

        const jogadorCriado = new this.jogadorModel(CriarJogadorDto)

        return await jogadorCriado.save()
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadorModel.find().exec()
    }

    async consultarJogador(_id: string): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec()
        if (!jogadorEncontrado) throw new NotFoundException(`ID: '${_id}' não encontrado`)

        return jogadorEncontrado
    }

    async deletarJogador(_id: string): Promise<any> {
        if (!this.jogadorExiste(_id)) throw new NotFoundException(`ID: '${_id}' não encontrado`)

        await this.jogadorModel.deleteOne({ _id }).exec()

    }

    async atualizarJogador(_id: string, atualizarJogadorDto: atualizarJogadorDto): Promise<void> {

        if (!this.jogadorExiste(_id)) throw new NotFoundException(`ID: '${_id}' não encontrado`)
        await this.jogadorModel.findOneAndUpdate({ _id }, { $set: atualizarJogadorDto }).exec()
    }


    private async jogadorExiste(_id: string): Promise<boolean> {
        const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec()
        if (jogadorEncontrado) {
            return true
        }
        return false
    }
}
