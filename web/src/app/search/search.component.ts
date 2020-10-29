import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Stock, StockDetails} from '../models/stock-autocomplete.model';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  isStockAvailable = false;
  stock: StockDetails;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getStocks(ev: any): void {
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.http.get(`http://localhost:8000/api/stocks/${val}`)
      .subscribe((res: Stock) => {
        this.stock = res[val.toUpperCase()];
        this.isStockAvailable = true;
      });
    } else {
        this.isStockAvailable = false;
    }
  }

  showDetails(item): void {
    console.log(item);
  }

}
