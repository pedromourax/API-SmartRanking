import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString, IsNotEmpty } from "class-validator";
import { Jogador } from "src/jogadores/interfaces/jogador.interface";

export class criarDesafioDto {

    @IsDateString()
    @IsNotEmpty()
    dataHoraDesafio: Date;

    @IsNotEmpty()
    solicitante: string;

    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    jogadores: Jogador[];
}