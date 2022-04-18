import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { NotLoggedInGuard } from '@core/guards/not-logged-in.guard'
import { LoggedInGuard } from '@core/guards/logged-in.guard'
import { IntroGuard } from '@core/guards/intro.guard'

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then((m) => m.HomePageModule),
        canActivate: [LoggedInGuard], // TODO add intro guard,
        canLoad: [IntroGuard],
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginPageModule),
        canLoad: [NotLoggedInGuard],
    },
    {
        path: 'intro',
        loadChildren: () => import('./pages/intro/intro.module').then((m) => m.IntroPageModule),
    },
    {
        path: 'forgot-password',
        loadChildren: () =>
            import('./pages/forgot-password/forgot-password.module').then((m) => m.ForgotPasswordPageModule),
        canLoad: [NotLoggedInGuard],
    },
    {
        path: 'register',
        loadChildren: () => import('./pages/register/register.module').then((m) => m.RegisterPageModule),
        canLoad: [NotLoggedInGuard],
    },
    {
        path: 'reset-forgotten-password',
        loadChildren: () =>
            import('./pages/reset-forgotten-password/reset-forgotten-password.module').then(
                (m) => m.ResetForgottenPasswordPageModule,
            ),
    },
    {
        path: 'verify-email',
        loadChildren: () => import('./pages/verify-email/verify-email.module').then((m) => m.VerifyEmailPageModule),
    },
    {
        path: 'posts/:id',
        loadChildren: () => import('./pages/post-details/post-details.module').then((m) => m.PostDetailsPageModule),
    },
    {
        path: '**',
        loadChildren: () => import('./pages/not-found/not-found.module').then((m) => m.NotFoundPageModule),
    },
]
@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
