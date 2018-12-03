import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginProvider } from '../providers/login/login';
import { AlertsProvider } from '../providers/alerts/alerts';
import { LoginPage } from '../pages/login/login';
import { HttpClientModule } from '@angular/common/http';
import { ContratacionProvider } from '../providers/contratacion/contratacion';


@NgModule({
  declarations: [
    MyApp,
    HomePage,LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    AlertsProvider,
    ContratacionProvider
  ]
})
export class AppModule {}
