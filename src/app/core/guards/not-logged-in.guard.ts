import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class NotLoggedInGuard implements CanLoad {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
        if (this.authService.isLoggedIn) {
            this.router.navigate(['home']);
            return false;
        }

        return true;
    }

    canLoad(_route: Route, _segments: UrlSegment[]): boolean {
        if (this.authService.isLoggedIn) {
            this.router.navigate(['home']);
            return false;
        }

        return true;
    }
}
