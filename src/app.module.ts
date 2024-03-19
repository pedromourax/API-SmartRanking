import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from './categorias/categorias.module';
import { DesafiosModule } from './desafios/desafios.module';
import * as dotenv from 'dotenv'
dotenv.config()
@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI),
    JogadoresModule,
    CategoriasModule,
    DesafiosModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
