import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, of } from 'rxjs';
import { AppContext, Tenant, Evento, Usuario } from '../models/context.model';

@Injectable({
    providedIn: 'root'
})
export class ContextService {
    private http = inject(HttpClient);

    // State signals
    private mockState = signal<AppContext>({
        tenant: null,
        evento: null,
        usuario: null,
        selectedEventRole: null
    });

    // Public signals
    readonly tenant = computed(() => this.mockState().tenant);
    readonly evento = computed(() => this.mockState().evento);
    readonly usuario = computed(() => this.mockState().usuario);
    readonly selectedEventRole = computed(() => this.mockState().selectedEventRole);
    readonly isLoading = signal<boolean>(false);
    readonly error = signal<string | null>(null);

    constructor() {
        // First restore from localStorage (synchronous)
        this.restoreSelectedEvent();
        // Then load from API (async) - will preserve restored event if exists
        this.loadContext();
    }

    loadContext() {
        this.isLoading.set(true);
        this.http.get<AppContext>('/api/context')
            .pipe(
                tap(context => {
                    // Preserve any already-selected event from localStorage
                    const currentEvento = this.mockState().evento;
                    const currentRole = this.mockState().selectedEventRole;

                    this.mockState.set({
                        ...context,
                        // Only override event if we don't already have one from localStorage
                        evento: currentEvento || context.evento,
                        selectedEventRole: currentRole || context.selectedEventRole
                    });
                    this.isLoading.set(false);
                    this.error.set(null);
                }),
                catchError(err => {
                    console.error('Failed to load context', err);
                    this.error.set('Falha ao carregar contexto.');
                    this.isLoading.set(false);
                    return of(null);
                })
            )
            .subscribe();
    }

    updateUser(user: Usuario | null) {
        this.mockState.update(state => ({ ...state, usuario: user }));
    }

    /**
     * Set the selected event and role in the context
     * Persists the selection in localStorage
     */
    setSelectedEvent(evento: Evento, role: 'admin' | 'user'): void {
        this.mockState.update(state => ({
            ...state,
            evento,
            selectedEventRole: role
        }));

        // Persist in localStorage
        localStorage.setItem('lumio_selected_event', JSON.stringify({ evento, role }));
    }

    /**
     * Get the role of the current user in the selected event
     */
    getSelectedEventRole(): 'admin' | 'user' | null {
        return this.mockState().selectedEventRole;
    }

    /**
     * Clear the selected event from context
     */
    clearSelectedEvent(): void {
        this.mockState.update(state => ({
            ...state,
            evento: null,
            selectedEventRole: null
        }));
        localStorage.removeItem('lumio_selected_event');
    }

    /**
     * Check if there is a stored event in localStorage
     * Useful for guards and early checks before context is fully loaded
     */
    hasStoredEvent(): boolean {
        return !!localStorage.getItem('lumio_selected_event');
    }

    /**
     * Restore selected event from localStorage on app initialization
     */
    private restoreSelectedEvent(): void {
        const stored = localStorage.getItem('lumio_selected_event');
        if (stored) {
            try {
                const { evento, role } = JSON.parse(stored);
                this.mockState.update(state => ({
                    ...state,
                    evento,
                    selectedEventRole: role
                }));
            } catch (err) {
                console.error('Failed to restore selected event', err);
                localStorage.removeItem('lumio_selected_event');
            }
        }
    }
}

