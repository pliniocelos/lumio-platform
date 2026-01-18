import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Event } from '../../events/entities/event.entity';

@Entity('permissoes_evento')
export class PermissaoEvento {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Usuario)
    usuario: Usuario;

    @ManyToOne(() => Event)
    evento: Event;

    @Column({ type: 'enum', enum: ['admin', 'visualizador'], default: 'visualizador' })
    papel: 'admin' | 'visualizador';

    // Permissões Granulares
    @Column({ default: true })
    podeEditarEvento: boolean;

    @Column({ default: true })
    podeGerenciarInscricoes: boolean;

    @Column({ default: true })
    podeGerenciarVouchers: boolean;

    @Column({ default: true })
    podeGerenciarCategorias: boolean;

    @Column({ default: true })
    podeGerenciarLotes: boolean;

    @Column({ default: false })
    podeExcluirEvento: boolean; // Normalmente só Super Admin

    @Column({ default: true })
    ativo: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
