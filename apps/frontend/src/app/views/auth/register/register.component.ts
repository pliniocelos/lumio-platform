import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, TranslateModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  isLoading = false;
  errorMessage = '';

  passwordMatchValidator(g: any) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      const { name, email, password } = this.registerForm.value;

      this.authService.register({ name: name!, email: email!, password: password! })
        .subscribe({
          next: () => {
            // Redirect handled in service
          },
          error: (err) => {
            console.error(err);
            this.isLoading = false;
            // Map Firebase error codes to messages if needed
            if (err.code === 'auth/email-already-in-use') {
              this.errorMessage = 'AUTH.ERROR.EMAIL_IN_USE';
            } else {
              this.errorMessage = 'AUTH.ERROR.REGISTER_FAILED';
            }
          }
        });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
