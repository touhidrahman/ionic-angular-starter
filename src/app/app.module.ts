import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { APP_CONFIG } from '@core/config/app-config';
import { authInterceptorProvider } from '@core/interceptors/auth-header.interceptor';
import { unauthorizedInterceptorProvider } from '@core/interceptors/unauthorized.interceptor';
import { environment } from '@environment/environment';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), HttpClientModule, AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: APP_CONFIG, useValue: environment },
    authInterceptorProvider,
    unauthorizedInterceptorProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
