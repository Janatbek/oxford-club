import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from '../models/pages.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})

export class FolderPage implements OnInit, OnDestroy {
  public page: Page;
  private pageSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private fireStore: AngularFirestore) { }

  ngOnInit() {
    const pageID = this.activatedRoute.snapshot.paramMap.get('id');
    this.pageSubscription = this.fireStore
        .collection('pages')
        .doc(pageID)
        .valueChanges()
        .subscribe(page => {
          this.page = {...page as Page, id: pageID};
        });
  }

  ngOnDestroy(): void {
    this.pageSubscription.unsubscribe();
  }

}
