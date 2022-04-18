import { Component, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '@core/auth/services/auth.service'

@Component({
    selector: 'app-reset-forgotten-password',
    templateUrl: './reset-forgotten-password.page.html',
    styleUrls: ['./reset-forgotten-password.page.scss'],
})
export class ResetForgottenPasswordPage implements OnInit {
    form = this.fb.group({
        password: [''],
        passwordConfirmation: [''],
    })

    errors: string[] = []

    constructor(
        private auth: AuthService,
        private fb: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        void 0
    }

    submit(): void {
        this.errors = []
        const { password, passwordConfirmation } = this.form.value
        if (password !== passwordConfirmation) {
            this.errors.push('Passwords do not match')
            return
        }

        const { userId, secret } = this.activatedRoute.snapshot.params
        if (!userId && !secret) {
            this.errors.push('Token is invalid')
            return
        }

        this.auth.resetForgottenPassword(userId, secret, password, passwordConfirmation)?.then(
            () => {
                this.router.navigate(['/login'])
            },
            (err) => {
                this.errors.push(err.error.message)
            },
        )
    }
}
