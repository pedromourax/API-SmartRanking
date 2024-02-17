import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {

    private Jogadores: Jogador[] = []

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) { }

    private readonly logger = new Logger(JogadoresService.name)

    async criarJogador(CriarJogadorDto: CriarJogadorDto): Promise<void> {
        const { email } = CriarJogadorDto
        // const jogadorEncontrado = this.Jogadores.find(jogador => jogador.email === email)
        const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec()


        if (jogadorEncontrado) {
            await this.atualizar(jogadorEncontrado, CriarJogadorDto)
        }
        else {
            await this.criar(CriarJogadorDto)
        }

    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return this.Jogadores
    }

    async consultarJogador(email: string): Promise<Jogador> {
        const jogadorEncontrado = this.Jogadores.find(jogador => jogador.email === email)
        if (!jogadorEncontrado) throw new NotFoundException(`Email: '${email}' não encontrado`)
        return jogadorEncontrado
    }

    async deletarJogador(email: string): Promise<void> {
        const jogadorEncontrado = this.Jogadores.find(jogador => jogador.email === email)
        if (!jogadorEncontrado) throw new NotFoundException(`Email: '${email}' não encontrado`)
        this.Jogadores = this.Jogadores.filter(jogador => jogador.email !== email)
    }

    private async criar(CriarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        const jogadorCriado = new this.jogadorModel(CriarJogadorDto)
        return jogadorCriado.save()
    }

    private async atualizar(jogadorEncontrado: Jogador, CriarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        return await this.jogadorModel.findOneAndUpdate({ email: jogadorEncontrado.email }, { $set: CriarJogadorDto }).exec()
    }
}
