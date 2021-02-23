import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './components/layout/layout.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {VideoPageComponent} from './pages/video-page/video-page.component';
import {FavoritesPageComponent} from './pages/favorites-page/favorites-page.component';
import {AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['auth', 'login']);
const redirectLoggedInToAccount = () => redirectLoggedInTo(['/']);

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {
        path: '',
        redirectTo: '/',
        pathMatch: 'full',
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToHome}
      },
      {path: '', component: HomePageComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToHome}},
      {
        path: 'video/:id',
        component: VideoPageComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToHome}
      },
      {
        path: 'favorites',
        component: FavoritesPageComponent,
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToHome}
      }
    ]
  },
  {
    path: 'auth', loadChildren: () => import('src/app/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
