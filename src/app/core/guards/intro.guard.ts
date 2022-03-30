import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../storage/storage.service';

export const HAS_SEEN_INTRO_KEY = 'hasSeenIntro';

@Injectable({
  providedIn: 'root',
})
export class IntroGuard implements CanLoad {
  constructor(private router: Router, private storageService: StorageService) {}

  async canLoad(): Promise<boolean> {
    const hasSeenIntro = await this.storageService.get(HAS_SEEN_INTRO_KEY);
    console.log('TCL: | canLoad | hasSeenIntro', hasSeenIntro);
    if (hasSeenIntro && hasSeenIntro === 'true') {
      return true;
    } else {
      this.router.navigateByUrl('/intro', { replaceUrl: true });
      return false;
    }
  }
}
