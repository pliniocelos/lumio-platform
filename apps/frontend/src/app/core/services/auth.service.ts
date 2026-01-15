import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, signOut, user, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from '@angular/fire/auth';
import { tap, from } from 'rxjs';
import { ContextService } from './context.service';
import { Usuario } from '../models/context.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private auth = inject(Auth);
    private contextService = inject(ContextService);
    private router = inject(Router);

    constructor() {
        // Sync Firebase auth state with ContextService
        user(this.auth).subscribe(firebaseUser => {
            if (firebaseUser) {
                this.contextService.updateUser({
                    id: firebaseUser.uid,
                    nome: firebaseUser.displayName || firebaseUser.email || 'Usuário',
                    email: firebaseUser.email || '',
                    eventos: [] // Will be populated when user selects event
                });
            } else {
                this.contextService.updateUser(null);
            }
        });
    }

    login(credentials: { email: string; password: string }) {
        return from(signInWithEmailAndPassword(this.auth, credentials.email, credentials.password))
            .pipe(
                // Wait for the auth state to be updated and user to be set in context
                tap(async () => {
                    // Give Firebase more time to emit the user state and update context
                    await new Promise(resolve => setTimeout(resolve, 200));
                    // Navigation is handled by the LoginComponent to support registration intent
                })
            );
    }

    register(credentials: { email: string; password: string; name: string }) {
        return from(createUserWithEmailAndPassword(this.auth, credentials.email, credentials.password))
            .pipe(
                tap(async (userCredential) => {
                    await updateProfile(userCredential.user, { displayName: credentials.name });
                    // Force context update or let the user subscription handle it (it might take a moment)
                    this.router.navigate(['/selecionar-evento']);
                })
            );
    }

    recoverPassword(email: string) {
        return from(sendPasswordResetEmail(this.auth, email));
    }

    logout() {
        // Clear localStorage and context first to ensure guards work correctly
        localStorage.removeItem('lumio_token');
        this.contextService.updateUser(null);
        this.contextService.clearSelectedEvent();

        signOut(this.auth).then(() => {
            this.router.navigate(['/login']);
        });
    }

    isAuthenticated(): boolean {
        return !!this.contextService.usuario(); // Still relies on context for synchronous checks
    }
}
