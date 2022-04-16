import { Injectable } from '@angular/core'
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment
} from '@angular/router'
import { AppwriteService } from '@core/appwrite/appwrite.service'

@Injectable({
    providedIn: 'root',
})
export class LoggedInGuard implements CanActivate, CanLoad {
    constructor(private appwrite: AppwriteService, private router: Router) {}

    async canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<boolean> {
        const session = await this.appwrite.sdk?.account.getSession('current')
        if (session) return true

        this.router.navigate(['login'])
        return false
    }

    async canLoad(_route: Route, _segments: UrlSegment[]): Promise<boolean> {
        const session = await this.appwrite.sdk?.account.getSession('current')
        if (session) return true

        this.router.navigate(['login'])
        return false
    }
}
