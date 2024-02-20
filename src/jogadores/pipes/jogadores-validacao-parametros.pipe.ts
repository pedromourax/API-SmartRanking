import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class JogadoresValidacaoParametrosPipe implements PipeTransform {
    transform(valor: any, metadata: ArgumentMetadata) {
        if (!valor) throw new BadRequestException(`O valor do ${metadata.data} deve ser preenchido!`)

        return valor
    }
}