import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RegistrationService } from '../../../core/services/registration.service';
import { ContextService } from '../../../core/services/context.service';
import { Registration, RegistrationStatus } from '../../../core/models/registration.model';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-minhas-inscricoes',
    standalone: true,
    imports: [CommonModule, LoaderComponent, TranslateModule],
    templateUrl: './minhas-inscricoes.component.html',
    styleUrl: './minhas-inscricoes.component.scss'
})
export class MinhasInscricoesComponent implements OnInit {
    private registrationService = inject(RegistrationService);
    private contextService = inject(ContextService);
    private route = inject(ActivatedRoute);

    registrations = signal<Registration[]>([]);
    filteredRegistrations = signal<Registration[]>([]);
    isLoading = signal<boolean>(true);
    errorMessage = signal<string | null>(null);
    selectedFilter = signal<string>('todas');
    showSuccessMessage = signal<boolean>(false);

    readonly RegistrationStatus = RegistrationStatus;

    ngOnInit(): void {
        // Check for success message
        this.route.queryParams.subscribe(params => {
            if (params['success'] === 'true') {
                this.showSuccessMessage.set(true);
                setTimeout(() => this.showSuccessMessage.set(false), 5000);
            }
        });

        this.loadRegistrations();
    }

    private loadRegistrations(): void {
        const user = this.contextService.usuario();
        if (!user) {
            this.errorMessage.set('Usuário não encontrado');
            this.isLoading.set(false);
            return;
        }

        this.registrationService.getUserRegistrations(user.id).subscribe({
            next: (registrations) => {
                this.registrations.set(registrations);
                this.applyFilter('todas');
                this.isLoading.set(false);
            },
            error: (err) => {
                console.error('Failed to load registrations', err);
                this.errorMessage.set('Falha ao carregar inscrições.');
                this.isLoading.set(false);
            }
        });
    }

    applyFilter(filter: string): void {
        this.selectedFilter.set(filter);

        if (filter === 'todas') {
            this.filteredRegistrations.set(this.registrations());
        } else {
            const filtered = this.registrations().filter(r => r.status === filter);
            this.filteredRegistrations.set(filtered);
        }
    }

    getStatusBadgeClass(status: RegistrationStatus): string {
        switch (status) {
            case RegistrationStatus.CONFIRMADA:
                return 'badge-success';
            case RegistrationStatus.PENDENTE_PAGAMENTO:
                return 'badge-warning';
            case RegistrationStatus.CANCELADA:
                return 'badge-danger';
            case RegistrationStatus.RASCUNHO:
                return 'badge-secondary';
            default:
                return 'badge-secondary';
        }
    }

    getStatusLabel(status: RegistrationStatus): string {
        switch (status) {
            case RegistrationStatus.CONFIRMADA:
                return 'Confirmada';
            case RegistrationStatus.PENDENTE_PAGAMENTO:
                return 'Pendente Pagamento';
            case RegistrationStatus.CANCELADA:
                return 'Cancelada';
            case RegistrationStatus.RASCUNHO:
                return 'Rascunho';
            default:
                return status;
        }
    }

    cancelRegistration(registration: Registration): void {
        if (!confirm(`Deseja realmente cancelar a inscrição no evento "${registration.eventoNome}"?`)) {
            return;
        }

        this.registrationService.cancelRegistration(registration.id).subscribe({
            next: () => {
                this.loadRegistrations();
            },
            error: (err) => {
                console.error('Failed to cancel registration', err);
                alert('Erro ao cancelar inscrição. Tente novamente.');
            }
        });
    }
}
