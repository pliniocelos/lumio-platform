import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { ContextService } from '../../core/services/context.service';
import { UserEventRole, Evento } from '../../core/models/context.model';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../../shared/components/language-switcher/language-switcher.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-event-selector',
    standalone: true,
    imports: [CommonModule, LoaderComponent, TranslateModule, LanguageSwitcherComponent],
    templateUrl: './event-selector.component.html',
    styleUrl: './event-selector.component.scss'
})
export class EventSelectorComponent implements OnInit {
    private eventService = inject(EventService);
    private contextService = inject(ContextService);
    private router = inject(Router);
    private authService = inject(AuthService);
    translate = inject(TranslateService);

    userEvents = signal<UserEventRole[]>([]);
    availableEvents = signal<Evento[]>([]);
    isLoading = signal<boolean>(true);
    errorMessage = signal<string | null>(null);

    ngOnInit(): void {
        const user = this.contextService.usuario();

        if (!user) {
            this.router.navigate(['/login']);
            return;
        }

        // Check if user already has a selected event in context
        // This prevents the component from loading in an inconsistent state
        // when the user refreshes the page while on a dashboard
        const selectedEvent = this.contextService.evento();
        const selectedRole = this.contextService.getSelectedEventRole();

        if (selectedEvent && selectedRole) {
            // User already has a selected event, redirect to appropriate dashboard
            if (selectedRole === 'admin') {
                this.router.navigate(['/sistema/dashboard']);
            } else {
                this.router.navigate(['/area-congressista/dashboard']);
            }
            return;
        }

        // Load user's events
        this.eventService.getUserEvents(user.id).subscribe({
            next: (events) => {
                this.userEvents.set(events);

                // If user has no events, load available events
                if (events.length === 0) {
                    this.loadAvailableEvents();
                } else {
                    this.isLoading.set(false);
                }
            },
            error: (err) => {
                console.error('Failed to load user events', err);
                this.errorMessage.set('Falha ao carregar eventos. Por favor, tente novamente.');
                this.isLoading.set(false);
            }
        });
    }

    private loadAvailableEvents(): void {
        this.eventService.getAvailableEvents().subscribe({
            next: (events) => {
                this.availableEvents.set(events);
                this.isLoading.set(false);
            },
            error: (err) => {
                console.error('Failed to load available events', err);
                this.errorMessage.set('Falha ao carregar eventos disponíveis.');
                this.isLoading.set(false);
            }
        });
    }

    selectEvent(userEvent: UserEventRole): void {
        this.eventService.selectEvent(userEvent.evento, userEvent.role);

        // Navigate based on role
        if (userEvent.role === 'admin') {
            this.router.navigate(['/sistema/dashboard']);
        } else {
            this.router.navigate(['/area-congressista/dashboard']);
        }
    }

    getRoleBadgeClass(role: 'admin' | 'user'): string {
        return role === 'admin' ? 'badge-admin' : 'badge-user';
    }

    getRoleLabel(role: 'admin' | 'user'): string {
        return role === 'admin' ? 'Administrador' : 'Participante';
    }

    logout(): void {
        this.authService.logout();
    }
}
