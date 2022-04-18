import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '@core/auth/services/auth.service'
import { AlertController, LoadingController } from '@ionic/angular'
import { timer } from 'rxjs'

@Component({
    selector: 'app-verify-email',
    templateUrl: './verify-email.page.html',
    styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
    message = 'Verifying email...'

    constructor(
        private auth: AuthService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private loadingController: LoadingController,
        private alertController: AlertController,
    ) {}

    async ngOnInit() {
        const loading = await this.loadingController.create()
        await loading.present()

        const { secret, userId } = this.activatedRoute.snapshot.params
        if (!secret || !userId) {
            this.message = 'Invalid token'
            this.redirectToLoginPage()
            await loading.dismiss()
            return
        }

        this.auth.verifyEmail(userId, secret)?.then(
            () => {
                this.message = 'Email verified. Redirecting to login page...'
                this.redirectToLoginPage()
            },
            () => {
                this.message = 'Invalid token'
                this.redirectToLoginPage()
            },
        )
    }

    private redirectToLoginPage() {
        timer(5000).subscribe({ next: () => this.router.navigate(['/']) })
    }
}
