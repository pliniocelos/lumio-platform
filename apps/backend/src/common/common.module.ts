import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConflitoHorario } from './entities/conflito-horario.entity';
import { InscricaoAutomaticaSubevento } from './entities/inscricao-automatica-subevento.entity';
import { TipoProfissional } from './entities/tipo-profissional.entity';
import { Curso } from './entities/curso.entity';
import { CampoInscricao } from './entities/campo-inscricao.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ConflitoHorario,
            InscricaoAutomaticaSubevento,
            TipoProfissional,
            Curso,
            CampoInscricao,
        ]),
    ],
    exports: [TypeOrmModule],
})
export class CommonModule { }
