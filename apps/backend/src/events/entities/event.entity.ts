import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Atividade } from '../../atividades/entities/atividade.entity';

@Entity('eventos')
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ unique: true })
    slug: string;

    @Column('text')
    descricao: string;

    // Configurações de Tipo
    @Column({ type: 'enum', enum: ['presencial', 'online', 'hibrido'] })
    tipo: 'presencial' | 'online' | 'hibrido';

    @Column({ default: false })
    gratuito: boolean;

    // Configurações de Inscrição
    @Column({ default: true })
    inscricoesAtivas: boolean;

    @Column({ type: 'enum', enum: ['automatica', 'manual'], default: 'automatica' })
    tipoConfirmacao: 'automatica' | 'manual';

    // Visibilidade
    @Column({ default: true })
    visivelNoSite: boolean;

    // Datas
    @Column({ type: 'timestamp' })
    dataInicio: Date;

    @Column({ type: 'timestamp' })
    dataFim: Date;

    // Localização
    @Column({ nullable: true })
    local: string;

    @Column({ nullable: true })
    linkOnline: string;

    // Mídia
    @Column({ nullable: true })
    folderUrl: string; // Imagem 16:9

    // Funcionalidades
    @Column({ default: false })
    aceitaTrabalhosCientificos: boolean;

    @Column({ default: false })
    temGradeCientifica: boolean;

    @Column({ default: false })
    temExpositores: boolean;

    // Hierarquia (Eventos e Subeventos)
    @Column({ nullable: true })
    eventoPaiId: number;

    @ManyToOne(() => Event, evento => evento.subeventos, { nullable: true })
    eventoPai: Event;

    @OneToMany(() => Event, evento => evento.eventoPai)
    subeventos: Event[];

    // Grade Científica
    @OneToMany(() => Atividade, atividade => atividade.evento)
    atividades: Atividade[];

    // Idiomas (mantido do modelo original)
    @Column('simple-array')
    idiomas: string[];

    @Column()
    tema: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
