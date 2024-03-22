import { Module } from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { DesafiosController } from './desafios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DesafioSchema } from './interfaces/desafios.schema';
import { JogadoresModule } from 'src/jogadores/jogadores.module';
import { CategoriasModule } from 'src/categorias/categorias.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Desafio', schema: DesafioSchema }]), JogadoresModule, CategoriasModule],
  controllers: [DesafiosController],
  providers: [DesafiosService],
  exports: [DesafiosService]
})
export class DesafiosModule { }
