import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagamentosService } from './pagamentos.service';
import { PagamentosController } from './pagamentos.controller';
import { Pagamento } from './entities/pagamento.entity';
import { InscricoesModule } from '../inscricoes/inscricoes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pagamento]),
    InscricoesModule
  ],
  controllers: [PagamentosController],
  providers: [PagamentosService],
  exports: [PagamentosService]
})
export class PagamentosModule { }
