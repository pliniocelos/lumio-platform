import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Event } from '../../events/entities/event.entity';

@Entity('lotes')
export class Lote {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Event)
    evento: Event;

    @Column()
    nome: string; // Ex: "1º Lote", "Lote Promocional"

    @Column({ type: 'timestamp' })
    dataInicio: Date;

    @Column({ type: 'timestamp' })
    dataFim: Date;

    @Column({ default: true })
    ativo: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
