import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Event } from '../../events/entities/event.entity';

@Entity('campos_inscricao')
export class CampoInscricao {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Event)
    evento: Event;

    @Column()
    nome: string; // Ex: "CRM", "CPF", "Instituição"

    @Column()
    label: string;

    @Column({ type: 'enum', enum: ['text', 'number', 'email', 'select', 'file', 'checkbox'] })
    tipo: string;

    @Column({ default: false })
    obrigatorio: boolean;

    @Column('jsonb', { nullable: true })
    opcoes: string[]; // Para tipo 'select'

    @Column({ default: 0 })
    ordem: number;

    @Column({ default: true })
    ativo: boolean;
}
