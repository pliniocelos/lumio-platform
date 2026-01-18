import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Avaliacao } from './avaliacao.entity';

export enum StatusTrabalho {
    RASCUNHO = 'rascunho',
    SUBMETIDO = 'submetido',
    EM_AVALIACAO = 'em_avaliacao',
    APROVADO = 'aprovado',
    REPROVADO = 'reprovado',
    APROVADO_RESSALVAS = 'aprovado_ressalvas'
}

@Entity('trabalhos')
export class Trabalho {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Event)
    evento: Event;

    @ManyToOne(() => Usuario)
    submissor: Usuario;

    @Column()
    titulo: string;

    @Column('text')
    resumo: string;

    // Lista de autores em JSON: [{ nome: string, email?: string, apresentador: boolean }]
    @Column('jsonb')
    autores: any;

    @Column({ nullable: true })
    orientador: string;

    @Column({ nullable: true })
    arquivoUrl: string;

    @Column({ nullable: true })
    areaTematica: string;

    @Column({ nullable: true })
    instrucoesEspeciais: string; // Para o avaliador ler

    @Column({
        type: 'enum',
        enum: StatusTrabalho,
        default: StatusTrabalho.RASCUNHO
    })
    status: StatusTrabalho;

    @OneToMany(() => Avaliacao, avaliacao => avaliacao.trabalho)
    avaliacoes: Avaliacao[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
