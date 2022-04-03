import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { APP_CONFIG } from '@core/config/app-config';
import { AuthGuard } from '@core/guards/auth.guard';
import { AutologinGuard } from '@core/guards/autologin.guard';
import { IntroGuard } from '@core/guards/intro.guard';
import { LoggedInGuard } from '@core/guards/logged-in.guard';
import { authInterceptorProvider } from '@core/interceptors/auth-header.interceptor';
import { unauthorizedInterceptorProvider } from '@core/interceptors/unauthorized.interceptor';
import { environment } from '@environment/environment';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Drivers } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: 'ionic-angular-starter__db',
      driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage],
    }),
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: APP_CONFIG, useValue: environment },
    authInterceptorProvider,
    unauthorizedInterceptorProvider,
    IntroGuard,
    AutologinGuard,
    LoggedInGuard,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
