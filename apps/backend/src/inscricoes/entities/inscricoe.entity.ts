import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { Category } from '../../categories/entities/category.entity';
import { Lote } from '../../lotes/entities/lote.entity';
import { Voucher } from '../../vouchers/entities/voucher.entity';

@Entity('inscricoes')
export class Inscricao {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Event)
    evento: Event;

    @Column()
    usuarioId: string; // Firebase UID

    @ManyToOne(() => Category)
    categoria: Category;

    @ManyToOne(() => Lote, { nullable: true })
    lote: Lote;

    // Voucher
    @ManyToOne(() => Voucher, { nullable: true })
    voucher: Voucher;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    valorDesconto: number; // Valor do desconto aplicado pelo voucher

    // Status
    @Column({
        type: 'enum',
        enum: ['rascunho', 'pendente_pagamento', 'pendente_documentacao', 'confirmada', 'cancelada'],
        default: 'rascunho'
    })
    status: string;

    // Tipo de Inscrição
    @Column({ type: 'enum', enum: ['normal', 'cortesia', 'palestrante'], default: 'normal' })
    tipoInscricao: string;

    // Valores
    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    valorTotal: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    valorPago: number;

    // Datas
    @Column({ type: 'timestamp', nullable: true })
    dataConfirmacao: Date;

    @Column({ type: 'timestamp', nullable: true })
    dataCancelamento: Date;

    // Campos Customizados (JSON)
    @Column('jsonb', { nullable: true })
    camposPersonalizados: any;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

