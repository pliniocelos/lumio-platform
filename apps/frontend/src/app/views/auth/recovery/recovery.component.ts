import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, TranslateModule],
  templateUrl: './recovery.component.html',
  styleUrl: './recovery.component.scss'
})
export class RecoveryComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService); // Inject AuthService

  recoveryForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  isLoading = false;
  successMessage = '';
  errorMessage = ''; // Add errorMessage

  onSubmit() {
    if (this.recoveryForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.recoverPassword(this.recoveryForm.value.email!)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.successMessage = 'AUTH.RECOVERY.SUCCESS_MESSAGE';
          },
          error: (err) => {
            this.isLoading = false;
            console.error(err);
            this.errorMessage = 'AUTH.RECOVERY.ERROR_GENERIC';
          }
        });
    }
  }
}
