import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ContextService } from '../services/context.service';

/**
 * Guard to ensure user has selected an event before accessing protected areas
 * Redirects to event selector if no event is selected
 */
export const eventContextGuard: CanActivateFn = (route, state) => {
    const contextService = inject(ContextService);
    const router = inject(Router);

    // Check if an event is selected in context
    if (contextService.evento()) {
        return true;
    }

    // Fallback: Check localStorage directly for race condition scenarios
    const storedEvent = localStorage.getItem('lumio_selected_event');
    if (storedEvent) {
        try {
            const parsed = JSON.parse(storedEvent);
            if (parsed.evento) {
                // Event exists in localStorage, allow navigation
                // ContextService will restore it shortly
                return true;
            }
        } catch (err) {
            // Invalid localStorage data, clear it
            localStorage.removeItem('lumio_selected_event');
        }
    }

    // No event selected, redirect to event selector
    return router.createUrlTree(['/selecionar-evento']);
};
