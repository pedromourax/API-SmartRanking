import * as mongoose from 'mongoose'

export const JogadorSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    telefone: { type: String, unique: true },
    nome: String,
    ranking: String,
    posicaoRanking: Number,
    urlFotoPerfil: String

}, { timestamps: true, collection: 'jogadores' })

