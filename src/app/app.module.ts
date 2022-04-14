import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt'
import { APP_CONFIG } from '@core/config/app-config'
import { AuthGuard } from '@core/guards/auth.guard'
import { IntroGuard } from '@core/guards/intro.guard'
import { LoggedInGuard } from '@core/guards/logged-in.guard'
import { NotLoggedInGuard } from '@core/guards/not-logged-in.guard'
import { TokenService } from '@core/auth/services/token.service'
import { environment } from '@environment/environment'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { Drivers } from '@ionic/storage'
import { IonicStorageModule } from '@ionic/storage-angular'
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

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
        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useFactory: (tokenService: TokenService) => {
                    return {
                        disallowedRoutes: [environment.apiUrl + '/auth/'],
                        allowedDomains: [environment.apiUrl],
                        tokenGetter: async () => {
                            return await tokenService.getAccessToken()
                        },
                    }
                },
                deps: [TokenService],
            },
        }),
        HttpClientModule,
        AppRoutingModule,
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: APP_CONFIG, useValue: environment },
        IntroGuard,
        NotLoggedInGuard,
        LoggedInGuard,
        AuthGuard,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
