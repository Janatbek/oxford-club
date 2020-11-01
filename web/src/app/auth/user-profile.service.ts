import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private db: AngularFirestore) { }

  getUserProfile() {
    const userProfile = this.db.collection('userProfiles').get()
  }
}
