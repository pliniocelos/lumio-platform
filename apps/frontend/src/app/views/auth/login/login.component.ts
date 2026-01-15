import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { RegistrationIntentService } from '../../../core/services/registration-intent.service';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  registrationIntentService = inject(RegistrationIntentService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  isLoading = false;
  errorMessage = '';

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      const { email, password } = this.loginForm.value;

      this.authService.login({ email: email!, password: password! })
        .subscribe({
          next: async () => {
            // Wait a bit more for Firebase and context to be ready
            await new Promise(resolve => setTimeout(resolve, 300));

            // Check for registration intent
            const intent = this.registrationIntentService.getIntent();

            if (intent) {
              // User came from event registration link
              console.log('Intent found, redirecting to:', intent.redirectUrl);
              this.router.navigate([intent.redirectUrl]);
            } else {
              // Normal flow - go to event selector
              console.log('No intent, redirecting to event selector');
              this.router.navigate(['/selecionar-evento']);
            }
            this.isLoading = false;
          },
          error: (err) => {
            console.error(err);
            this.isLoading = false;

            // Handle specific Firebase error codes
            const errorCode = err?.code || '';

            if (errorCode === 'auth/network-request-failed' || !navigator.onLine) {
              this.errorMessage = 'AUTH.ERROR.NETWORK_ERROR';
            } else if (errorCode === 'auth/invalid-credential' || errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
              this.errorMessage = 'AUTH.ERROR.LOGIN_FAILED';
            } else if (errorCode === 'auth/too-many-requests') {
              this.errorMessage = 'AUTH.ERROR.TOO_MANY_ATTEMPTS';
            } else if (errorCode === 'auth/user-disabled') {
              this.errorMessage = 'AUTH.ERROR.USER_DISABLED';
            } else {
              this.errorMessage = 'AUTH.ERROR.UNKNOWN';
            }
          }
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
