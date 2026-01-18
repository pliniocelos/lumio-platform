import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Evento, UserEventRole } from '../models/context.model';
import { ContextService } from './context.service';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private http = inject(HttpClient);
    private contextService = inject(ContextService);
    private apiUrl = environment.apiUrl;

    /**
     * Get all events associated with a user, including their role in each event
     */
    getUserEvents(userId: string): Observable<UserEventRole[]> {
        // TODO: Call proper endpoint /usuarios/meus-eventos
        return this.http.get<Evento[]>(`${this.apiUrl}/events`).pipe(
            map(events => events.map(evento => ({
                evento,
                role: 'admin' as const // Placeholder
            })))
        );
    }

    /**
     * Get all available events (for users without any event associations)
     */
    getAvailableEvents(): Observable<Evento[]> {
        return this.http.get<Evento[]>(`${this.apiUrl}/events`);
    }

    /**
     * Select an event and set it as the active context
     * This updates the context service with the selected event and role
     */
    selectEvent(evento: Evento, role: 'admin' | 'user'): void {
        this.contextService.setSelectedEvent(evento, role);
    }
}
