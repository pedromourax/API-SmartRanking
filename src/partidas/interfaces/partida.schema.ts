import { Schema } from "mongoose";

export const PartidaSchema = new Schema({
    categoria: String,
    jogadores: [{
        type: Schema.Types.ObjectId,
        ref: "Jogador"
    }],
    def: [{
        type: Schema.Types.ObjectId,
        ref: "Jogador"
    }],
    resultado: [{
        set: String
    }]
}, { timestamps: true, collection: 'partidas' })