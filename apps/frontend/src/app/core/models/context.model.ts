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
  inscricaoId?: string; // Optional registration ID for participants
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  eventos: UserEventRole[]; // Array of events with user's role in each
}

export interface AppContext {
  tenant: Tenant | null;
  evento: Evento | null; // Currently selected event
  usuario: Usuario | null;
  selectedEventRole: 'admin' | 'user' | null; // Role in the currently selected event
}
