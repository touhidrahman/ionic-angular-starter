import { Injectable } from '@angular/core'
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
} from '@angular/router'
import { AuthService } from '@core/auth/services/auth.service'

@Injectable({
    providedIn: 'root',
})
export class LoggedInGuard implements CanActivate, CanLoad {
    constructor(private authService: AuthService, private router: Router) {}

    async canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<boolean> {
        const loggedIn = await this.authService.getAuthStatus()
        if (!loggedIn) this.router.navigate(['login'])
        return loggedIn
    }

    async canLoad(_route: Route, _segments: UrlSegment[]): Promise<boolean> {
        const loggedIn = await this.authService.getAuthStatus()
        if (!loggedIn) this.router.navigate(['login'])
        return loggedIn
    }
}
