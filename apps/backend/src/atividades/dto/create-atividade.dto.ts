import { TipoAtividade } from '../entities/atividade.entity';

export class CreateAtividadeDto {
    eventoId: number;
    titulo: string;
    descricao?: string; // opcional
    dataInicio: Date; // ISO string no JSON
    dataFim: Date;
    sala?: string;
    tipo?: TipoAtividade;
}
