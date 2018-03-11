import { Component, Input, OnInit } from '@angular/core';
import { Bill } from '../../../shared/bill.model';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currency: any;

  dollars: number;
  euro: number;

  constructor() {}

  ngOnInit() {
    const rates:[object]  = this.currency;
    this.dollars = this.bill.value / this.findCurrency('USD', rates)['rate'];
    this.euro = this.bill.value / this.findCurrency('EUR', rates)['rate'];
  }

  findCurrency(currency: string, arr: [object]): object {
    return arr.filter((cur) => {
      return cur['cc'] === currency;
    })[0];
  }

}
