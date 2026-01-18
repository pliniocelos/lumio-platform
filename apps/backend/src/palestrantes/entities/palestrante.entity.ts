import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ParticipacaoAtividade } from '../../atividades/entities/participacao-atividade.entity';

@Entity('palestrantes')
export class Palestrante {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ type: 'text', nullable: true })
    minicurriculo: string;

    @Column({ nullable: true })
    fotoUrl: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    linkedin: string;

    @Column({ nullable: true })
    instagram: string;

    // Relação com atividades
    @OneToMany(() => ParticipacaoAtividade, participacao => participacao.palestrante)
    participacoes: ParticipacaoAtividade[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
