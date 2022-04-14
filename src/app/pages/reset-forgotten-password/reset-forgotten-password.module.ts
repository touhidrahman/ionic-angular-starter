import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CoreModule } from '@core/core.module'
import { IonicModule } from '@ionic/angular'
import { ResetForgottenPasswordPageRoutingModule } from './reset-forgotten-password-routing.module'
import { ResetForgottenPasswordPage } from './reset-forgotten-password.page'

@NgModule({
    imports: [CoreModule, FormsModule, IonicModule, ResetForgottenPasswordPageRoutingModule],
    declarations: [ResetForgottenPasswordPage],
})
export class ResetForgottenPasswordPageModule {}
