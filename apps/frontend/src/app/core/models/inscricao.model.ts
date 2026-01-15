export type StatusInscricao = 'PENDENTE' | 'CONFIRMADA' | 'CANCELADA' | 'AGUARDANDO_PAGAMENTO' | 'ISENTO';

export interface CategoriaInscricao {
    id: string;
    nome: string;
    valor: number;
}

export interface ParticipanteResumo {
    id: string;
    nome: string;
    email: string;
    cpf?: string;
    pcd?: {
        possui: boolean;
        descricao?: string;
    };
}

export interface CheckIn {
    data: Date;
    usuarioResponsavel?: string;
}

export interface Inscricao {
    id: string;
    eventoId: string;
    participante: ParticipanteResumo;
    categoria: CategoriaInscricao;
    voucher?: string;
    comprovanteUrl?: string; // If null/undefined, considered "Sem comprovante"
    dataInscricao: Date;
    status: StatusInscricao;
    valorTotal: number;
    saldoDevedor: number;
    checkins: CheckIn[];
}
