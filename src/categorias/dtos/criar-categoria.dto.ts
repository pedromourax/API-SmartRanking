import { IsArray, IsNotEmpty, IsString } from "class-validator"
import { Evento } from "../interfaces/categoria.interface"

export class CriarCategoriaDto {

    @IsString()
    @IsNotEmpty()
    readonly categoria: string

    @IsString()
    readonly descricao: string

    @IsArray()
    readonly eventos: Array<Evento>
}