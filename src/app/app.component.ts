import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/folder/Home',
      icon: 'home'
    },
    {
      title: 'Signals',
      url: '/folder/Signals',
      icon: 'trending-up'
    },
    {
      title: 'Alerts',
      url: '/folder/Alerts',
      icon: 'alert'
    },
    {
      title: 'Watch List',
      url: '/folder/Watch List',
      icon: 'heart'
    },
    {
      title: 'Notifications',
      url: '/folder/Notifications',
      icon: 'archive'
    },
    {
      title: 'Performance',
      url: '/folder/Performance',
      icon: 'calculator'
    },
    {
      title: 'Position Sizing',
      url: '/folder/Position Sizing',
      icon: 'basket'
    },
    {
      title: 'Settings',
      url: '/folder/Settings',
      icon: 'cog'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
