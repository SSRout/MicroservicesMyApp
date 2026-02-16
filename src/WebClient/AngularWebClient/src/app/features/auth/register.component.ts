import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AuthService } from '@core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
    this.initForm();
  }

  initForm(): void {
    this.registerForm = this.formBuilder.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      },
    );
  }

  passwordMatchValidator(group: FormGroup): any {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.snackBar.open('Please fill all fields correctly', 'Close', {
        duration: 3000,
      });
      return;
    }

    this.isLoading = true;
    const { fullName, email, password } = this.registerForm.value;

    this.authService.register(email, fullName, password).subscribe(
      () => {
        this.isLoading = false;
        this.snackBar.open('Account created successfully!', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/']);
      },
      (error) => {
        this.isLoading = false;
        const message =
          error?.error?.detail || 'Registration failed. Please try again.';
        this.snackBar.open(message, 'Close', { duration: 3000 });
      },
    );
  }
}
