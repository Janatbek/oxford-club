import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.page.html',
  styleUrls: ['./stock-details.page.scss'],
})
export class StockDetailsPage implements OnInit {
  public stock: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.stock = this.activatedRoute.snapshot.data['symbol'];
    console.log(this.stock)
  }

}
