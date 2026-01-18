import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InscricoesService } from './inscricoes.service';
import { InscricoesController } from './inscricoes.controller';
import { Inscricao } from './entities/inscricoe.entity';
import { InscricaoSubevento } from './entities/inscricao-subevento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inscricao, InscricaoSubevento])],
  controllers: [InscricoesController],
  providers: [InscricoesService],
  exports: [InscricoesService],
})
export class InscricoesModule { }
