import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ru_RU } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { RegisterPageComponent } from './auth/register-page/register-page.component';
import { VideoPageComponent } from './pages/video-page/video-page.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { SearchComponent } from './components/search/search.component';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import { VideoGridCardComponent } from './components/cards/video-grid-card/video-grid-card.component';
import { VideoListCardComponent } from './components/cards/video-list-card/video-list-card.component';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {SharedModule} from './modules/shared.module';
import {NzAlertModule} from 'ng-zorro-antd/alert';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';

registerLocaleData(ru);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent,
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    VideoPageComponent,
    FavoritesPageComponent,
    SearchComponent,
    VideoGridCardComponent,
    VideoListCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzTypographyModule,
    ReactiveFormsModule,
    NzFormModule,
    NzSpaceModule,
    NzCardModule,
    NzAvatarModule,
    SharedModule,
    NzAlertModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [{ provide: NZ_I18N, useValue: ru_RU }],
  bootstrap: [AppComponent]
})
export class AppModule { }
