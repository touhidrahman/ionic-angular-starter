import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { HomePageRoutingModule } from './home-routing.module'

import { HomePage } from './home.page'
import { LayoutModule } from '@features/layout/layout.module'

@NgModule({
    imports: [CommonModule, FormsModule, LayoutModule, IonicModule, HomePageRoutingModule],
    declarations: [HomePage],
})
export class HomePageModule {}
