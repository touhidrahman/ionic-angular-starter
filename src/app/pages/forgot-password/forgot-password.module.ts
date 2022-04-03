import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared/shared.module';
import { ForgotPasswordPageRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordPage } from './forgot-password.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, ForgotPasswordPageRoutingModule],
  declarations: [ForgotPasswordPage],
})
export class ForgotPasswordPageModule {}
