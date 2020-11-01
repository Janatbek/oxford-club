import {Component, OnDestroy, OnInit} from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NotificationService } from './notification.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Page } from './models/pages.model';
import {Observable, Subscription} from 'rxjs';
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public selectedIndex = 0;
  // public appPages = [
  //   {
  //     title: 'Home',
  //     url: '/',
  //     icon: 'home'
  //   },
  //   {
  //     title: 'Signals',
  //     url: '/folder/Signals',
  //     icon: 'trending-up'
  //   },
  //   {
  //     title: 'Alerts',
  //     url: '/folder/Alerts',
  //     icon: 'alert'
  //   },
  //   {
  //     title: 'Watch List',
  //     url: '/folder/Watch List',
  //     icon: 'heart'
  //   },
  //   {
  //     title: 'Notifications',
  //     url: '/folder/Notifications',
  //     icon: 'notifications'
  //   },
  //   {
  //     title: 'Performance',
  //     url: '/folder/Performance',
  //     icon: 'calculator'
  //   },
  //   {
  //     title: 'Position Sizing',
  //     url: '/folder/Position Sizing',
  //     icon: 'basket'
  //   },
  //   {
  //     title: 'Settings Test',
  //     url: '/folder/Settings',
  //     icon: 'cog'
  //   }
  // ];

  // public appPages: Pages[];
  public appPages: Page[];
  public appPagesSubscription: Subscription;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private notificationService: NotificationService,
    public toastController: ToastController,
    private fireStore: AngularFirestore
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.prepareSideNav();
    const pathID = window.location.pathname.split('folder/')[1];
    if (pathID !== undefined) {
      if (this.appPages) {
        this.selectedIndex = this.appPages
            .findIndex(page => page.id === pathID);
      }
    }
  }

  prepareSideNav(): void {
    const pagesCollection = this.fireStore
        .collection<Page>('pages', ref => ref.orderBy('order'));
    this.appPagesSubscription = pagesCollection.snapshotChanges().pipe(
        map(actions => actions.map(action => {
          const data = action.payload.doc.data() as Page;
          const id = action.payload.doc.id;
          return {id, ...data};
        }))
    ).subscribe((pages: Page[]) => this.appPages = pages);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnDestroy(): void {
    this.appPagesSubscription.unsubscribe();
  }
}
