import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AppwriteService } from '@core/appwrite/appwrite.service'
import { AuthService } from '@core/auth/services/auth.service'
import { RegisterFormService } from '@core/auth/services/register-form.service'

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
    providers: [RegisterFormService],
})
export class RegisterPage implements OnInit {
    loading = false
    errors: string[] = []

    constructor(
        public registerFormService: RegisterFormService,
        private router: Router,
        private auth: AuthService,
        private appwrite: AppwriteService,
    ) {}

    ngOnInit(): void {
        void 0
    }

    register() {
        if (this.loading) {
            return
        }
        this.errors = []

        this.loading = true
        const data = this.registerFormService.getValue()
        this.auth.signUp(data)?.then(
            (_response) => {
                this.loading = false
                this.router.navigateByUrl('/')
            },
            (error) => {
                this.loading = false
                this.errors = error.errors
            },
        )
    }
}
