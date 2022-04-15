import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '@core/auth/services/auth.service'
import { LoginFormService } from '@core/auth/services/login-form.service'
import { AlertController, LoadingController } from '@ionic/angular'

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    providers: [LoginFormService],
})
export class LoginPage implements OnInit {
    private returnUrl = ''

    constructor(
        public loginFormService: LoginFormService,
        private activatedRoute: ActivatedRoute,
        private auth: AuthService,
        private router: Router,
        private loadingController: LoadingController,
        private alertController: AlertController,
    ) {}

    get email() {
        return this.loginFormService.loginForm.controls['email']
    }

    get password() {
        return this.loginFormService.loginForm.controls['password']
    }

    ngOnInit(): void {
        this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl ?? '/'
        if (this.auth.isLoggedIn) {
            this.router.navigateByUrl(this.returnUrl)
        }
    }

    async submit() {
        const loading = await this.loadingController.create()
        await loading.present()

        this.auth.login(this.loginFormService.getValue()).subscribe({
            next: async (_) => {
                await loading.dismiss()
                this.router.navigateByUrl(this.returnUrl, { replaceUrl: true })
            },
            error: async () => {
                await loading.dismiss()

                const alert = await this.alertController.create({
                    header: 'Login failed',
                    message: 'Please check your email and password',
                    buttons: ['OK'],
                })

                await alert.present()
            },
        })
    }
}
