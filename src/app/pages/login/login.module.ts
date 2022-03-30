import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '@core/core.module';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';

@NgModule({
  imports: [CoreModule, FormsModule, IonicModule, LoginPageRoutingModule],
  declarations: [LoginPage],
})
export class LoginPageModule {}
