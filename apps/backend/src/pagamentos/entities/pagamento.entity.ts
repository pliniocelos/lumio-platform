import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Inscricao } from '../../inscricoes/entities/inscricoe.entity';

@Entity('pagamentos')
export class Pagamento {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Inscricao, inscricao => inscricao.pagamentos)
    inscricao: Inscricao;

    @Column({ unique: true })
    externalReference: string; // ID da transação no gateway (Mercado Pago)

    @Column({ nullable: true })
    preferenceId: string; // ID da preferência gerada (se aplicável)

    @Column('decimal', { precision: 10, scale: 2 })
    valor: number;

    @Column({
        type: 'enum',
        enum: ['pix', 'cartao_credito', 'boleto', 'transferencia_manual', 'cortesia'],
    })
    metodo: string;

    @Column({
        type: 'enum',
        enum: ['pendente', 'aprovado', 'em_processo', 'recusado', 'cancelado', 'devolvido'],
        default: 'pendente'
    })
    status: string;

    @Column('jsonb', { nullable: true })
    metadata: any; // Armazenar resposta bruta do gateway para debug

    @Column({ nullable: true })
    comprovanteUrl: string; // Para transferência manual

    @Column({ type: 'timestamp', nullable: true })
    dataAprovacao: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
