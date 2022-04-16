import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router'
import { AppwriteService } from '@core/appwrite/appwrite.service'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private appwrite: AppwriteService) {}

    async canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<boolean> {
        const session = await this.appwrite.sdk?.account.getSession('current')
        console.log('TCL: | auth guard', session)
        return !!session
    }
}
