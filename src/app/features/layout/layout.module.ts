import { NgModule } from '@angular/core'
import { CoreModule } from '@core/core.module'
import { IonicModule } from '@ionic/angular'
import { FooterOneComponent } from './components/footer-one/footer-one.component'
import { HeaderNavigationsComponent } from './components/header-navigations/header-navigations.component'
import { HeaderOneComponent } from './components/header-one/header-one.component'

@NgModule({
    declarations: [FooterOneComponent, HeaderNavigationsComponent, HeaderOneComponent],
    exports: [FooterOneComponent, HeaderNavigationsComponent, HeaderOneComponent],
    imports: [CoreModule, IonicModule],
})
export class LayoutModule {}
