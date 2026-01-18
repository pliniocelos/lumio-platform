import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { ParticipacaoAtividade } from './participacao-atividade.entity';

export enum TipoAtividade {
    PALESTRA = 'palestra',
    MESA_REDONDA = 'mesa_redonda',
    SIMPOSIO = 'simposio',
    WORKSHOP = 'workshop',
    CURSO = 'curso',
    INTERVALO = 'intervalo',
    ABERTURA = 'abertura',
    ENCERRAMENTO = 'encerramento'
}

@Entity('atividades')
export class Atividade {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Event, evento => evento.atividades, { onDelete: 'CASCADE' })
    evento: Event;

    @Column()
    titulo: string;

    @Column({ type: 'text', nullable: true })
    descricao: string;

    @Column({ type: 'timestamp' })
    dataInicio: Date;

    @Column({ type: 'timestamp' })
    dataFim: Date;

    @Column({ nullable: true })
    sala: string;

    @Column({
        type: 'enum',
        enum: TipoAtividade,
        default: TipoAtividade.PALESTRA
    })
    tipo: TipoAtividade;

    @OneToMany(() => ParticipacaoAtividade, participacao => participacao.atividade)
    participantes: ParticipacaoAtividade[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
