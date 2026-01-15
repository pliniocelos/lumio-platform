import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from '../../../core/services/registration.service';
import { RegistrationIntentService } from '../../../core/services/registration-intent.service';
import { ContextService } from '../../../core/services/context.service';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-registration-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, LoaderComponent, TranslateModule],
    templateUrl: './registration-form.component.html',
    styleUrl: './registration-form.component.scss'
})
export class RegistrationFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private registrationService = inject(RegistrationService);
    private intentService = inject(RegistrationIntentService);
    private contextService = inject(ContextService);

    registrationForm!: FormGroup;
    eventSlug = signal<string>('');
    isLoading = signal<boolean>(true);
    isSubmitting = signal<boolean>(false);
    errorMessage = signal<string | null>(null);
    canRegister = signal<boolean>(false);

    ngOnInit(): void {
        this.eventSlug.set(this.route.snapshot.params['eventSlug']);
        this.initForm();
        this.checkEligibility();
    }

    private initForm(): void {
        const user = this.contextService.usuario();

        this.registrationForm = this.fb.group({
            nome: [user?.nome || '', Validators.required],
            email: [user?.email || '', [Validators.required, Validators.email]],
            categoria: ['', Validators.required],
            instituicao: [''],
            observacoes: ['']
        });
    }

    private checkEligibility(): void {
        this.registrationService.checkEligibility(this.eventSlug()).subscribe({
            next: (eligibility) => {
                if (eligibility.canRegister) {
                    this.canRegister.set(true);
                } else {
                    this.errorMessage.set(eligibility.reasons.join(', '));
                }
                this.isLoading.set(false);
            },
            error: (err) => {
                console.error('Failed to check eligibility', err);
                this.errorMessage.set('Erro ao verificar elegibilidade para inscrição.');
                this.isLoading.set(false);
            }
        });
    }

    onSubmit(): void {
        if (this.registrationForm.invalid) {
            this.registrationForm.markAllAsTouched();
            return;
        }

        this.isSubmitting.set(true);
        const user = this.contextService.usuario();

        const registration = {
            eventoSlug: this.eventSlug(),
            usuarioId: user?.id || '',
            ...this.registrationForm.value
        };

        this.registrationService.createRegistration(registration).subscribe({
            next: () => {
                // Clear intent
                this.intentService.clearIntent();
                // Redirect to success page or dashboard
                this.router.navigate(['/area-congressista/minhas-inscricoes'], {
                    queryParams: { success: 'true' }
                });
            },
            error: (err) => {
                console.error('Failed to create registration', err);
                this.errorMessage.set('Erro ao criar inscrição. Tente novamente.');
                this.isSubmitting.set(false);
            }
        });
    }

    cancel(): void {
        this.intentService.clearIntent();
        this.router.navigate(['/eventos-disponiveis']);
    }
}
