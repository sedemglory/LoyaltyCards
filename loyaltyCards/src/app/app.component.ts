import {Component, ViewChild} from '@angular/core';
import {Events, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HomePage} from '../pages/home/home';
import {SettingsPage} from '../pages/settings/settings';
import {NativeStorage} from "@ionic-native/native-storage";

@Component({
  templateUrl: 'app.html'
})
export class LoyaltyCards {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  dark: boolean;
  pages: Array<{ title: string, component: any }>;
  avatar = "";
  name = 'Guest';

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public nativeStorage: NativeStorage, public events: Events) {
    this.initializeApp();
    this.avatar = "assets/images/user_avatar.svg";
    events.subscribe('theme:changed', (theme) => {
      this.dark = theme;
    });
    this.nativeStorage.getItem('dark_theme')
      .then(
        data => {
          this.dark = data;
          // alert(this.dark);
        },
        error => alert(error)
      );
    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'home', component: HomePage},
      {title: 'settings', component: SettingsPage},
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#626262');
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
