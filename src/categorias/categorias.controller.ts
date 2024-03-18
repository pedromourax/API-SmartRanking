import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { CategoriasService } from './categorias.service';
import { Categoria } from './interfaces/categoria.interface';
import { atualizarCategoriaDto } from './dtos/atualizar-categoria.dto';


@Controller('api/v1/categorias')
export class CategoriasController {

    constructor(private readonly categoriasService: CategoriasService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
        return await this.categoriasService.criarCategoria(criarCategoriaDto)
    }

    @Get()
    async consultarCategoria(): Promise<Array<Categoria>> {
        return await this.categoriasService.consultarTodasCategorias()
    }

    @Get(':categoria')
    async consultarCategoriaPeloID(@Param('categoria') categoria: string): Promise<Categoria> {
        return await this.categoriasService.consultarCategoriaPeloID(categoria)
    }


    @Put(':categoria')
    @UsePipes(ValidationPipe)
    async atualizarCategoria(
        @Param('categoria') categoria: string,
        @Body() atualizarCategoriaDto: atualizarCategoriaDto
    ): Promise<void> {
        return await this.categoriasService.atualizarCategoria(categoria, atualizarCategoriaDto)
    }

    @Post(':categoria/jogadores/:idJogador')
    async atribuirJogadorACategoria(
        @Param() params: string[]): Promise<void> {
        console.log(`params: ${JSON.stringify(params)}`)
        await this.categoriasService.atribuirCategoriaAJogador(params)
    }

}
