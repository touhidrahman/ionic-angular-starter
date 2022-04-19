import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router'
import { AuthService } from '../auth/services/auth.service'

@Injectable({
    providedIn: 'root',
})
export class NotLoggedInGuard implements CanLoad {
    constructor(private authService: AuthService, private router: Router) {}

    async canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
        const loggedIn = await this.authService.getAuthStatus()
        if (loggedIn) this.router.navigate(['home'])
        return loggedIn
    }

    async canLoad(_route: Route, _segments: UrlSegment[]) {
        const loggedIn = await this.authService.getAuthStatus()
        if (loggedIn) this.router.navigate(['home'])
        return loggedIn
    }
}
