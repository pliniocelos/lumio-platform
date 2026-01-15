import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuthenticated()) {
        return true;
    }

    // Check if we have a persisted mock session to restore
    if (localStorage.getItem('lumio_token')) {
        return true;
        // Note: In a real app, we would validate the token here or let the context service handle the session restore async.
        // For now, if we have a token, we let them pass, and the ContextService will load the user from localStorage on init.
    }

    return router.createUrlTree(['/login']);
};
