import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {AlertController, IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SocialSharing} from '@ionic-native/social-sharing';
import {LoyaltyCards} from './app.component';
import {HomePage} from '../pages/home/home';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Toast} from '@ionic-native/toast';
import {NativeStorage} from '@ionic-native/native-storage';
import {SettingsPage} from "../pages/settings/settings";
import {File} from '@ionic-native/file';
import {FileChooser} from '@ionic-native/file-chooser';
import {InAppBrowser} from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    LoyaltyCards,
    HomePage,
    SettingsPage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(LoyaltyCards),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LoyaltyCards,
    HomePage,
    SettingsPage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    BarcodeScanner,
    SocialSharing,
    Toast,
    File,
    FileChooser,
    AlertController,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
