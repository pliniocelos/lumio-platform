import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity('vouchers')
export class Voucher {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Event)
    evento: Event;

    @Column({ unique: true })
    codigo: string; // Ex: "PROMO2026", "ESTUDANTE50"

    @Column({ type: 'enum', enum: ['percentual', 'valor_fixo'] })
    tipoDesconto: 'percentual' | 'valor_fixo';

    @Column('decimal', { precision: 10, scale: 2 })
    valorDesconto: number; // 50 (para 50%) ou 100.00 (para R$ 100)

    // Restrições de Uso
    @Column({ nullable: true })
    quantidadeMaxima: number; // Limite de usos (null = ilimitado)

    @Column({ default: 0 })
    quantidadeUsada: number;

    // Período de Validade
    @Column({ type: 'timestamp', nullable: true })
    dataInicio: Date;

    @Column({ type: 'timestamp', nullable: true })
    dataFim: Date;

    // Restrições por Categoria (opcional)
    @ManyToMany(() => Category, { nullable: true })
    @JoinTable()
    categoriasPermitidas: Category[];

    @Column({ default: true })
    ativo: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
