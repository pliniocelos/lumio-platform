import { Injectable } from '@angular/core';
import { RegistrationIntent } from '../models/registration.model';

@Injectable({
    providedIn: 'root'
})
export class RegistrationIntentService {
    private readonly STORAGE_KEY = 'registration_intent';
    private readonly EXPIRATION_TIME = 3600000; // 1 hora

    saveIntent(eventId: string): void {
        const intent: RegistrationIntent = {
            eventId,
            timestamp: Date.now(),
            redirectUrl: `/inscricao/${eventId}`
        };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(intent));
    }

    getIntent(): RegistrationIntent | null {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (!stored) return null;

        try {
            const intent = JSON.parse(stored);

            // Verifica expiração
            if (Date.now() - intent.timestamp > this.EXPIRATION_TIME) {
                this.clearIntent();
                return null;
            }

            return intent;
        } catch (err) {
            console.error('Failed to parse registration intent', err);
            this.clearIntent();
            return null;
        }
    }

    clearIntent(): void {
        localStorage.removeItem(this.STORAGE_KEY);
    }

    hasIntent(): boolean {
        return !!this.getIntent();
    }
}
