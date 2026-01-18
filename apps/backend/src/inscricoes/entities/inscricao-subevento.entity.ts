import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Inscricao } from './inscricoe.entity';
import { Event } from '../../events/entities/event.entity';

@Entity('inscricoes_subeventos')
export class InscricaoSubevento {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Inscricao)
    inscricao: Inscricao;

    @ManyToOne(() => Event)
    subevento: Event;

    @Column({ default: false })
    automatica: boolean; // Se foi inscrito automaticamente

    @CreateDateColumn()
    dataInscricao: Date;
}
