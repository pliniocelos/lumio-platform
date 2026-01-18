import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtividadesService } from './atividades.service';
import { AtividadesController } from './atividades.controller';
import { Atividade } from './entities/atividade.entity';
import { ParticipacaoAtividade } from './entities/participacao-atividade.entity';
import { AuthModule } from '../auth/auth.module';
import { PermissoesModule } from '../permissoes/permissoes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Atividade, ParticipacaoAtividade]),
    AuthModule,
    PermissoesModule
  ],
  controllers: [AtividadesController],
  providers: [AtividadesService],
  exports: [AtividadesService]
})
export class AtividadesModule { }
