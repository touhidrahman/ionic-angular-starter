import { Inject, Injectable } from '@angular/core'
import { AppwriteService } from '@core/appwrite/appwrite.service'
import { StorageService } from '@core/storage/storage.service'
import { LOCATION } from '@ng-web-apis/common'
import { Models } from 'appwrite'
import { Subject } from 'rxjs'
import { StateSubject } from 'rxjs-state-subject'
import { LoginPayload } from '../interfaces/login.payload'
import { RegisterPayload } from '../interfaces/register.payload'

const SESSION_ID = 'SESSION_ID'
const USER_DATA = 'USER_DATA'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user = new StateSubject<any | null>(null)

    private loggedIn = new StateSubject<boolean>(false)
    private shouldRefreshUser = new Subject<void>()

    get isLoggedIn(): boolean {
        return this.loggedIn.value
    }

    constructor(
        private appwrite: AppwriteService,
        private storage: StorageService,
        @Inject(LOCATION) private location: Location,
    ) {
        console.log('TCL: ~ location ', this.location)
        this.shouldRefreshUser.asObservable().subscribe(() => this.checkToken())
        this.checkToken()
    }

    signUp(data: RegisterPayload) {
        const { email, password, firstName, lastName } = data
        return this.appwrite.sdk?.account.create('unique()', email, password, `${firstName} ${lastName}`)
    }

    async login(data: LoginPayload) {
        try {
            const response = await this.appwrite.sdk?.account.createSession(data.email, data.password)

            this.storage.set(SESSION_ID, response?.$id)
            this.storage.set(USER_DATA, JSON.stringify(response))
            this.shouldRefreshUser.next()
            this.loggedIn.next(true)

            return new Promise<any>((resolve) => resolve(response))
        } catch (error) {
            throw error
        }
    }

    verifyEmail(userId: string, secret: string): Promise<Models.Token> | undefined {
        return this.appwrite.sdk?.account.updateVerification(userId, secret)
    }

    forgotPassword(email: string): Promise<Models.Token> | undefined {
        return this.appwrite.sdk?.account.createRecovery(email, this.location.origin)
    }

    resetForgottenPassword(
        userId: string,
        secret: string,
        password: string,
        passwordAgain: string,
    ): Promise<Models.Token> | undefined {
        return this.appwrite.sdk?.account.updateRecovery(userId, secret, password, passwordAgain)
    }

    signOut() {
        this.user.next(null)
        this.loggedIn.next(false)
    }

    private async checkToken() {
        try {
            const user = await this.appwrite.sdk?.account.get()
            if (user) {
                this.user.next(user)
                this.loggedIn.next(true)
            } else {
                this.user.next(null)
                this.loggedIn.next(false)
            }
        } catch (error) {
            console.error('APP: Invalid login')
        }
    }
}
