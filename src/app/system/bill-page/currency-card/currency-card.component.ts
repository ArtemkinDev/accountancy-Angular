import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: [ './currency-card.component.scss' ]
})
export class CurrencyCardComponent implements OnInit {
  @Input() currency: any;

  currencies: string[] = [ 'USD', 'EUR' ];

  currenciesObject: object = {};

  constructor() {
  }

  ngOnInit() {
    this.createCurrencies();
  }

  createCurrencies() {
    for (let i =0; i < this.currencies.length; i++) {
      this.currenciesObject[this.currencies[i]] = this.findCurrency(this.currencies[i], this.currency);
    }
  }

  findCurrency(currency: string, arr: [ object ]): object {
    return arr.filter((cur) => {
      return cur[ 'cc' ] === currency;
    })[ 0 ];
  }

}
