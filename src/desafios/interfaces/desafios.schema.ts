import { Schema } from 'mongoose'

export const DesafioSchema = new Schema({
    dataHoraDesafio: Date,
    status: String,
    dataHoraSolicitacao: Date,
    dataHoraResposta: Date,
    solicitante: {
        type: Schema.Types.ObjectId,
        ref: "Jogador"
    },
    categoria: String,
    jogadores: [{
        type: Schema.Types.ObjectId,
        ref: "Jogador"
    }],
    partida: String/* {
        Type: Schema.Types.ObjectId,
        ref: "Partidas"
    } */
}, { timestamps: true, collection: 'desafios' })
