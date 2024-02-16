import { IsEmail, IsPhoneNumber } from "class-validator";

export class CriarJogadorDto {
    @IsEmail()
    email: string;

    @IsPhoneNumber("BR", { message: "Número de telefone inválido" })
    telefone: string;

    nome: string;
}