import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Event } from '../../events/entities/event.entity';

@Entity('inscricao_automatica_subeventos')
export class InscricaoAutomaticaSubevento {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Event)
    eventoOrigem: Event; // Ao se inscrever aqui...

    @ManyToOne(() => Event)
    subeventoDestino: Event; // ...automaticamente se inscreve aqui

    @Column({ default: true })
    ativo: boolean;
}
