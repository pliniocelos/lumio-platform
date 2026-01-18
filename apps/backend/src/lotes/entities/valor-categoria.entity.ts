import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Lote } from '../../lotes/entities/lote.entity';

@Entity('valores_categoria')
export class ValorCategoria {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Category)
    categoria: Category;

    @ManyToOne(() => Lote)
    lote: Lote;

    @Column('decimal', { precision: 10, scale: 2 })
    valor: number;

    @Column({ default: true })
    ativo: boolean;
}
