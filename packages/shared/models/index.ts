// Models compartilhados entre frontend e backend

export interface Tenant {
    id: number;
    nome: string;
}

export interface Evento {
    id: number;
    nome: string;
    slug: string;
    idiomas: string[];
    tema: string;
}

export interface UserEventRole {
    evento: Evento;
    role: 'admin' | 'user';
    inscricaoId?: string;
}

export interface Usuario {
    id: string;
    nome: string;
    email: string;
    eventos: UserEventRole[];
}

export interface AppContext {
    tenant: Tenant | null;
    evento: Evento | null;
    usuario: Usuario | null;
    selectedEventRole: 'admin' | 'user' | null;
}
