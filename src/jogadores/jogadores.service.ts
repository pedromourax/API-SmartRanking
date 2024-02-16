import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JogadoresService {

    private Jogadores: Jogador[] = []

    private readonly logger = new Logger(JogadoresService.name)

    async criarJogador(CriarJogadorDto: CriarJogadorDto): Promise<void> {
        const { email } = CriarJogadorDto
        const jogadorEncontrado = this.Jogadores.find(jogador => jogador.email === email)
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









    private criar(CriarJogadorDto: CriarJogadorDto): void {
        const { email, telefone, nome } = CriarJogadorDto

        const jogador: Jogador = {
            _id: uuidv4(),
            telefone,
            email,
            nome,
            ranking: 'C',
            posicaoRanking: 10,
            urlFotoPerfil: 'https://www.urlimagem.com'
        }
        this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`)
        this.Jogadores.push(jogador)

    }

    private atualizar(jogadorEncontrado: Jogador, CriarJogadorDto: CriarJogadorDto) {
        const { nome } = CriarJogadorDto
        jogadorEncontrado.nome = nome
    }
}
