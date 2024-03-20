import { IsDateString } from "class-validator"
import { DesafioStatus } from "../interfaces/desafio-status.enum"

export class atualizarDesafioDto {

    @IsDateString()
    dataHoraDesafio: Date

    status: DesafioStatus
}