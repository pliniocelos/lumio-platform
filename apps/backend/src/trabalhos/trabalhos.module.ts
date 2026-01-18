import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrabalhosService } from './trabalhos.service';
import { TrabalhosController } from './trabalhos.controller';
import { Trabalho } from './entities/trabalho.entity';
import { Avaliacao } from './entities/avaliacao.entity';
import { AuthModule } from '../auth/auth.module';
import { PermissoesModule } from '../permissoes/permissoes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trabalho, Avaliacao]),
    AuthModule,
    PermissoesModule
  ],
  controllers: [TrabalhosController],
  providers: [TrabalhosService],
  exports: [TrabalhosService]
})
export class TrabalhosModule { }
