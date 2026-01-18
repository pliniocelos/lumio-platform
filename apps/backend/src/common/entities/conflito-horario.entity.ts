import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Event } from '../../events/entities/event.entity';

@Entity('conflitos_horario')
export class ConflitoHorario {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Event)
    subevento1: Event;

    @ManyToOne(() => Event)
    subevento2: Event;

    @Column('text', { nullable: true })
    motivo: string;

    @Column({ default: true })
    ativo: boolean;
}
