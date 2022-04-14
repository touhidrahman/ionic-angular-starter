import { NgModule } from '@angular/core'
import { CoreModule } from '@core/core.module'
import { IonicModule } from '@ionic/angular'
import { SharedModule } from '@shared/shared.module'
import { RegisterPageRoutingModule } from './register-routing.module'
import { RegisterPage } from './register.page'

@NgModule({
    imports: [CoreModule, IonicModule, SharedModule, RegisterPageRoutingModule],
    declarations: [RegisterPage],
})
export class RegisterPageModule {}
