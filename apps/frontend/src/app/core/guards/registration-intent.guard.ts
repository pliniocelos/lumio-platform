import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { RegistrationIntentService } from '../services/registration-intent.service';

/**
 * Guard to capture registration intent from URL query parameter
 * Captures ?eventId= and saves to localStorage for later processing
 */
export const registrationIntentGuard: CanActivateFn = (route) => {
    const intentService = inject(RegistrationIntentService);
    const eventId = route.queryParams['eventId'];

    if (eventId) {
        intentService.saveIntent(eventId);
        console.log(`Registration intent captured for event: ${eventId}`);
    }

    return true;
};
