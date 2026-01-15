import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { map, take } from 'rxjs/operators';

/**
 * Guard to protect auth pages (login, register, recovery) from authenticated users.
 * If user is already logged in, redirects to event selector.
 * This guard is async and waits for Firebase to determine auth state.
 */
export const guestGuard: CanActivateFn = (route, state) => {
    const auth = inject(Auth);
    const router = inject(Router);

    // Wait for Firebase to emit the current auth state
    return user(auth).pipe(
        take(1), // Only take the first emission
        map(firebaseUser => {
            if (firebaseUser) {
                // User is authenticated, redirect to event selector
                return router.createUrlTree(['/selecionar-evento']);
            }
            // Not authenticated, allow access to auth pages
            return true;
        })
    );
};
