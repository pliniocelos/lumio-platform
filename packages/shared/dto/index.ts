// DTOs compartilhados entre frontend e backend

export interface CreateRegistrationDto {
    eventoId: number;
    categoria: 'estudante' | 'profissional' | 'palestrante';
}

export interface Registration {
    id: string;
    eventoId: number;
    eventoNome: string;
    eventoSlug: string;
    usuarioId: string;
    categoria: 'estudante' | 'profissional' | 'palestrante';
    status: RegistrationStatus;
    dataCriacao: string;
    dataConfirmacao?: string;
    dataCancelamento?: string;
    valorPago?: number;
    comprovantePagamento?: string;
}

export enum RegistrationStatus {
    RASCUNHO = 'rascunho',
    PENDENTE_PAGAMENTO = 'pendente_pagamento',
    CONFIRMADA = 'confirmada',
    CANCELADA = 'cancelada'
}

export interface EventEligibility {
    canRegister: boolean;
    reasons: string[];
    registrationDeadline?: string;
    availableSlots?: number;
    isAlreadyRegistered: boolean;
}
