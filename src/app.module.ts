import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI),
    JogadoresModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
