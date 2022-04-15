import { Injectable } from '@angular/core'
import { CanLoad, Router } from '@angular/router'
import { map, Observable } from 'rxjs'
import { StorageService } from '../storage/storage.service'

export const HAS_SEEN_INTRO_KEY = 'hasSeenIntro'

@Injectable({
    providedIn: 'root',
})
export class IntroGuard implements CanLoad {
    constructor(private router: Router, private storageService: StorageService) {}

    canLoad(): Observable<boolean> {
        return this.storageService.get(HAS_SEEN_INTRO_KEY).pipe(
            map((hasSeenIntro) => {
                console.log('TCL: | canLoad | hasSeenIntro', hasSeenIntro)
                if (hasSeenIntro && hasSeenIntro === 'true') {
                    return true
                } else {
                    console.log('TCL: ~  here')
                    this.router.navigateByUrl('/intro', { replaceUrl: true })
                    return false
                }
            }),
        )
    }
}
