import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { CategoriesModule } from './categories/categories.module';
import { CommonModule } from './common/common.module';
import { LotesModule } from './lotes/lotes.module';
import { InscricoesModule } from './inscricoes/inscricoes.module';

@Module({
  imports: [
    // Carregar variáveis de ambiente do .env
    ConfigModule.forRoot({
      isGlobal: true, // Disponível em todo o app
    }),

    // Configurar conexão com PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true, // Carrega entities automaticamente
      synchronize: process.env.NODE_ENV === 'development', // APENAS em dev!
      logging: process.env.NODE_ENV === 'development', // Logs SQL em dev
    }),

    CommonModule,
    EventsModule,

    CategoriesModule,
    LotesModule,
    InscricoesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
