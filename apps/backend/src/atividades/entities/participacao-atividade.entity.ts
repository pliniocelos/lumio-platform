import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Atividade } from './atividade.entity';
import { Palestrante } from '../../palestrantes/entities/palestrante.entity';

export enum PapelParticipacao {
    PALESTRANTE = 'palestrante',
    MODERADOR = 'moderador',
    COORDENADOR = 'coordenador',
    DEBATEDOR = 'debatedor',
    PRESIDENTE = 'presidente',
    SECRETARIO = 'secretario'
}

@Entity('participacoes_atividade')
export class ParticipacaoAtividade {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Atividade, atividade => atividade.participantes, { onDelete: 'CASCADE' })
    atividade: Atividade;

    @ManyToOne(() => Palestrante, palestrante => palestrante.participacoes, { onDelete: 'CASCADE' })
    palestrante: Palestrante;

    @Column({
        type: 'enum',
        enum: PapelParticipacao,
        default: PapelParticipacao.PALESTRANTE
    })
    papel: PapelParticipacao;
}
