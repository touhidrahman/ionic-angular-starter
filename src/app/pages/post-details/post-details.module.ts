import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CoreModule } from '@core/core.module'
import { LayoutModule } from '@features/layout/layout.module'
import { IonicModule } from '@ionic/angular'
import { PostDetailsPageRoutingModule } from './post-details-routing.module'
import { PostDetailsPage } from './post-details.page'

@NgModule({
    imports: [CoreModule, FormsModule, LayoutModule, IonicModule, PostDetailsPageRoutingModule],
    declarations: [PostDetailsPage],
})
export class PostDetailsPageModule {}
