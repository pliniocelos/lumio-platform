import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../models/context.model';
import { Registration, EventEligibility } from '../models/registration.model';

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {
    private http = inject(HttpClient);

    /**
     * Get all events available for registration
     */
    getAvailableEvents(): Observable<Evento[]> {
        return this.http.get<Evento[]>('/api/events/available-for-registration');
    }

    /**
     * Check if user is eligible to register for an event
     */
    checkEligibility(eventId: string): Observable<EventEligibility> {
        return this.http.get<EventEligibility>(`/api/events/${eventId}/eligibility`);
    }

    /**
     * Create a new registration
     */
    createRegistration(registration: Partial<Registration>): Observable<Registration> {
        return this.http.post<Registration>('/api/registrations', registration);
    }

    /**
     * Get all registrations for a user
     */
    getUserRegistrations(userId: string): Observable<Registration[]> {
        return this.http.get<Registration[]>(`/api/user/${userId}/registrations`);
    }

    /**
     * Cancel a registration
     */
    cancelRegistration(registrationId: string): Observable<void> {
        return this.http.delete<void>(`/api/registrations/${registrationId}`);
    }
}
