import { DesafioStatus } from "src/desafios/interfaces/desafio-status.enum";
import { BadRequestException, PipeTransform } from "@nestjs/common";

export class ValidacaoStatusDesafioPipe implements PipeTransform {

    readonly statusPermitidos = [
        DesafioStatus.NEGADO,
        DesafioStatus.ACEITO,
        DesafioStatus.CANCELADO
    ]

    transform(value: any) {
        const status = value.status.toUpperCase()
        if (!this.statusPermitidos.includes(status)) {
            throw new BadRequestException(`${status} inválido`)
        }
        return value
    }

}