import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria } from './interfaces/categoria.interface';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { atualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { JogadoresService } from 'src/jogadores/jogadores.service';

@Injectable()
export class CategoriasService {

    constructor(
        @InjectModel('Categoria')
        private readonly categoriaModel: Model<Categoria>,
        private readonly jogadoresSerice: JogadoresService
    ) { }

    async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
        const { categoria } = criarCategoriaDto

        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec()

        if (categoriaEncontrada) throw new BadRequestException(`Categoria ${categoria} já existe`)

        const categoriaCriada = new this.categoriaModel(criarCategoriaDto)

        return await categoriaCriada.save()

    }

    async consultarTodasCategorias(): Promise<Array<Categoria>> {
        return await this.categoriaModel.find().populate('jogadores').exec()
    }

    async consultarCategoriaPeloID(categoria: string): Promise<Categoria> {
        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec()

        if (!categoriaEncontrada) throw new NotFoundException(`Categoria ${categoria} não existe`)

        return categoriaEncontrada

    }

    async atualizarCategoria(categoria: string, atualizarCategoriaDto: atualizarCategoriaDto): Promise<void> {

        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec()

        if (!categoriaEncontrada) throw new NotFoundException(`Categoria ${categoria} não existe`)

        await this.categoriaModel.findOneAndUpdate({ categoria }, { $set: atualizarCategoriaDto }).exec()

    }

    async atribuirCategoriaAJogador(params: string[]): Promise<void> {

        const categoria = params['categoria']
        const idJogador = params['idJogador']

        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec()

        if (!categoriaEncontrada) throw new NotFoundException(`Categoria ${categoria} não existe`)

        // const jogadorEncontrado = await this.categoriaModel.findOne({ _id: idJogador }).exec()

        await this.jogadoresSerice.consultarJogador(idJogador)
        const jogadorJaCadastradoCategoria = await this.categoriaModel.find({ categoria }).where('jogadores').in(idJogador).exec()
        console.log(jogadorJaCadastradoCategoria)
        // if (jogadorJaCadastradoCategoria.length > 0) throw new BadRequestException(`Jogador: ${idJogador} já participa da categoria ${categoria}`)


        // categoriaEncontrada.jogadores.push(idJogador)

        // await this.categoriaModel.findOneAndUpdate({ categoria }, { $set: categoriaEncontrada }).exec()

    }

}
