import { Injectable } from '@angular/core';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  Capacitor
} from '@capacitor/core';
import { Router } from '@angular/router';
const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
let PushNotifications;
if (isPushNotificationsAvailable) {
    this.initPushNotifications();
    PushNotifications = Plugins.PushNotifications;
}
// const { PushNotifications } = Capacitor.isPluginAvailable('PushNotifications') ? Plugins : null;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private router: Router) {

  }

  initPush() {
    if (Capacitor.platform === 'android') {
      this.registerPush();
    }
  }

  private registerPush() {
    PushNotifications.requestPermission().then((permission) => {
      if (permission.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
          Plugins.PushNotifications.register();
      } else {
        // No permission for push granted
      }
    });

    PushNotifications.addListener(
        'registration',
        (token: PushNotificationToken) => {
          console.log('My token: ' + JSON.stringify(token));
        }
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
        'pushNotificationReceived',
        async (notification: PushNotification) => {
          console.log('Push received: ' + JSON.stringify(notification));
        }
    );

    PushNotifications.addListener(
        'pushNotificationActionPerformed',
        async (notification: PushNotificationActionPerformed) => {
          const data = notification.notification.data;
          console.log('Action performed: ' + JSON.stringify(notification.notification));
          if (data.detailsId) {
            this.router.navigateByUrl(`/home/${data.detailsId}`);
          }
        }
    );
  }
}
