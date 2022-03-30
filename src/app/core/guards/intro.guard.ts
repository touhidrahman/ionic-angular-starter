import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
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
