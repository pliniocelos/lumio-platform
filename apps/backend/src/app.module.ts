import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';

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

    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
