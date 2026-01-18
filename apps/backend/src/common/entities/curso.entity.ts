import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cursos')
export class Curso {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string; // Ex: "Medicina", "Enfermagem", "Fisioterapia"

    @Column({ type: 'enum', enum: ['graduacao', 'pos', 'tecnico'] })
    nivel: 'graduacao' | 'pos' | 'tecnico';

    @Column({ default: true })
    ativo: boolean;
}
