import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Trabalho } from './trabalho.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('avaliacoes_trabalho')
export class Avaliacao {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Trabalho, trabalho => trabalho.avaliacoes, { onDelete: 'CASCADE' })
    trabalho: Trabalho;

    @ManyToOne(() => Usuario)
    avaliador: Usuario;

    @Column({ nullable: true, type: 'decimal', precision: 4, scale: 2 })
    nota: number; // 0.00 a 10.00

    @Column({ nullable: true, type: 'text' })
    parecer: string;

    @Column({ default: false })
    concluido: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
