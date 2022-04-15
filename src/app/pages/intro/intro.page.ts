import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { IonicSlides } from '@ionic/angular'
import { HAS_SEEN_INTRO_KEY } from 'src/app/core/guards/intro.guard'
import { StorageService } from 'src/app/core/storage/storage.service'
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper'

// The IonicSlides module must be the last module in the array.
// This will let it automatically customize the settings of modules such as Pagination, Scrollbar, Zoom, and more.
SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides])

@Component({
    selector: 'app-intro',
    templateUrl: './intro.page.html',
    styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
    private slides: any
    private hasAllSlidesSeen = false

    constructor(private storageService: StorageService, private router: Router) {}

    ngOnInit() {}

    next() {
        this.hasAllSlidesSeen = this.slides.isEnd
        this.slides.slideNext(500)
    }

    setSwiperInstance(swiper: any) {
        this.slides = swiper
    }

    async start() {
        await this.storageService.set(HAS_SEEN_INTRO_KEY, 'true')
        this.router.navigateByUrl('/login', { replaceUrl: true })
    }
}
