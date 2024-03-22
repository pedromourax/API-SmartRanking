import { IsNotEmpty } from "class-validator"
import { Resultado } from "../../partidas/interfaces/partidas.interface"
import { Jogador } from "src/jogadores/interfaces/jogador.interface"

export class atribuirDesafioPartidaDto {

    @IsNotEmpty()
    def: Jogador

    @IsNotEmpty()
    resultado: Array<Resultado>

}