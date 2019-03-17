import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SocialSharing} from '@ionic-native/social-sharing';
import {LoyaltyCards} from './app.component';
import {HomePage} from '../pages/home/home';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Toast} from '@ionic-native/toast';
import {NativeStorage} from '@ionic-native/native-storage';


@NgModule({
  declarations: [
    LoyaltyCards,
    HomePage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(LoyaltyCards),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LoyaltyCards,
    HomePage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    BarcodeScanner,
    SocialSharing,
    Toast,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
