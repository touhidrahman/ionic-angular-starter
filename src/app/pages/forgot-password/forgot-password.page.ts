import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.page.html',
    styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
    email = '';

    constructor(private auth: AuthService, private router: Router) {}

    submit() {
        this.auth.forgotPassword(this.email).subscribe({
            next: () => {
                // this.toast.success('Success! Please check your email.');
                this.router.navigate(['/']);
            },
        });
    }
}
