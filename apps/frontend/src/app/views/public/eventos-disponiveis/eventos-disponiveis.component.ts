import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegistrationService } from '../../../core/services/registration.service';
import { RegistrationIntentService } from '../../../core/services/registration-intent.service';
import { AuthService } from '../../../core/services/auth.service';
import { Evento } from '../../../core/models/context.model';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../../../shared/components/language-switcher/language-switcher.component';

@Component({
    selector: 'app-eventos-disponiveis',
    standalone: true,
    imports: [CommonModule, LoaderComponent, TranslateModule, LanguageSwitcherComponent],
    templateUrl: './eventos-disponiveis.component.html',
    styleUrl: './eventos-disponiveis.component.scss'
})
export class EventosDisponiveisComponent implements OnInit {
    private registrationService = inject(RegistrationService);
    private intentService = inject(RegistrationIntentService);
    private authService = inject(AuthService);
    private router = inject(Router);

    eventos = signal<Evento[]>([]);
    isLoading = signal<boolean>(true);
    errorMessage = signal<string | null>(null);

    ngOnInit(): void {
        this.loadAvailableEvents();
    }

    private loadAvailableEvents(): void {
        this.registrationService.getAvailableEvents().subscribe({
            next: (eventos) => {
                this.eventos.set(eventos);
                this.isLoading.set(false);
            },
            error: (err) => {
                console.error('Failed to load available events', err);
                this.errorMessage.set('Falha ao carregar eventos disponíveis.');
                this.isLoading.set(false);
            }
        });
    }

    registerForEvent(evento: Evento): void {
        // Save intent
        this.intentService.saveIntent(evento.slug);

        // Check if authenticated
        if (this.authService.isAuthenticated()) {
            // Go directly to registration form
            this.router.navigate(['/inscricao', evento.slug]);
        } else {
            // Go to login, intent will be processed after
            this.router.navigate(['/login']);
        }
    }

    logout(): void {
        this.authService.logout();
    }
}
