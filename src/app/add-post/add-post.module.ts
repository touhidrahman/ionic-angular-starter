import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPostPageRoutingModule } from './add-post-routing.module';

import { AddPostPage } from './add-post.page';
import { CoreModule } from '@core/core.module';
import { LayoutModule } from '@features/layout/layout.module';

@NgModule({
  imports: [
    CoreModule,
    FormsModule,
    IonicModule,
    LayoutModule,
    AddPostPageRoutingModule
  ],
  declarations: [AddPostPage]
})
export class AddPostPageModule {}
