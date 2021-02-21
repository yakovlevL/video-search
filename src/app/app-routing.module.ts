import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './components/layout/layout.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {VideoPageComponent} from './pages/video-page/video-page.component';
import {FavoritesPageComponent} from './pages/favorites-page/favorites-page.component';
import {AuthLayoutComponent} from './auth/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomePageComponent},
      {path: 'video/:id', component: VideoPageComponent},
      {path: 'favorites', component: FavoritesPageComponent}
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
export class AppRoutingModule { }
