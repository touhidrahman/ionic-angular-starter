import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CoreModule } from '@core/core.module'
import { IonicModule } from '@ionic/angular'
import { SharedModule } from '@shared/shared.module'
import { LoginPageRoutingModule } from './login-routing.module'
import { LoginPage } from './login.page'

@NgModule({
    imports: [CoreModule, FormsModule, IonicModule, SharedModule, LoginPageRoutingModule],
    declarations: [LoginPage],
})
export class LoginPageModule {}
