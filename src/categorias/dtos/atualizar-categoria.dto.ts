import { ArrayMinSize, IsArray, IsOptional, IsString } from "class-validator";
import { Evento } from "../interfaces/categoria.interface";


export class atualizarCategoriaDto {

    @IsString()
    @IsOptional()
    descricao: string

    @IsArray()
    @ArrayMinSize(1)
    evento: Array<Evento>

}