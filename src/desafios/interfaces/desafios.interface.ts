import { Document } from 'mongoose';

import { Jogador } from 'src/jogadores/interfaces/jogador.interface';
import { DesafioStatus } from './desafio-status.enum'
import { Partida } from '../../partidas/interfaces/partidas.interface';


export interface Desafio extends Document {
    dataHoraDesafio: Date
    status: DesafioStatus
    dataHoraSolicitacao: Date
    dataHoraResposta: Date
    solicitante: Jogador
    categoria: string
    jogadores: Jogador[]
    partida: Partida
}
