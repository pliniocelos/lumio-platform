import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tipos_profissionais')
export class TipoProfissional {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string; // Ex: "Médico", "Enfermeiro", "Fisioterapeuta"

    @Column({ type: 'enum', enum: ['medico', 'saude', 'academico'] })
    area: 'medico' | 'saude' | 'academico';

    @Column({ default: true })
    ativo: boolean;
}
