import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv'
dotenv.config()
@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI),
    JogadoresModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
