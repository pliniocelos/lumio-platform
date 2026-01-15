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

export interface RegistrationIntent {
    eventId: string;
    timestamp: number;
    redirectUrl: string;
}

export interface EventEligibility {
    canRegister: boolean;
    reasons: string[];
    registrationDeadline?: string;
    availableSlots?: number;
    isAlreadyRegistered: boolean;
}
