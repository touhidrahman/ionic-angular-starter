import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
    UrlTree,
} from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class LoggedInGuard implements CanActivate, CanLoad {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        _route: ActivatedRouteSnapshot,
        _state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.authService.isLoggedIn) {
            return true;
        }

        this.router.navigate(['login']);
        return false;
    }

    canLoad(
        _route: Route,
        _segments: UrlSegment[],
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.authService.isLoggedIn) {
            return true;
        }

        this.router.navigate(['login']);
        return false;
    }
}
