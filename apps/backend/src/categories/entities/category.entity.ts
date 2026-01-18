import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Event } from '../../events/entities/event.entity';

@Entity('categorias')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Event)
    evento: Event;

    @Column()
    nome: string; // Ex: "Médico", "Estudante", "Profissional"

    @Column('text', { nullable: true })
    descricao: string;

    @Column({ default: true })
    ativa: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
