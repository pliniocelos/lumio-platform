import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento, UserEventRole } from '../models/context.model';
import { ContextService } from './context.service';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private http = inject(HttpClient);
    private contextService = inject(ContextService);

    /**
     * Get all events associated with a user, including their role in each event
     */
    getUserEvents(userId: string): Observable<UserEventRole[]> {
        return this.http.get<UserEventRole[]>(`/api/user/${userId}/events`);
    }

    /**
     * Get all available events (for users without any event associations)
     */
    getAvailableEvents(): Observable<Evento[]> {
        return this.http.get<Evento[]>('/api/events/available');
    }

    /**
     * Select an event and set it as the active context
     * This updates the context service with the selected event and role
     */
    selectEvent(evento: Evento, role: 'admin' | 'user'): void {
        this.contextService.setSelectedEvent(evento, role);
    }
}
