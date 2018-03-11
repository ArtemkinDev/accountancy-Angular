import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Bill } from '../shared/bill.model';
import { BaseApi } from '../shared/core/base-api';

@Injectable()

export class BillService extends BaseApi{
  constructor(public http: Http) {
    super(http);
  }

  /*getBill(): Observable<Bill> {
    return this.http.get('http://localhost:3100/bill')
      .map((response: Response) => {
        return response.json();
      })
  }*/

  getBill(): Observable<Bill> {
    return this.get('bill');
  }

  /*getCurrency(base: string = 'RUB'): Observable<any> {
    return this.http.get(`https://api.fixer.io/latest?base=${base}`)
      .map((response: Response) => {
        return response.json();
      })
  }*/
    getCurrency(): Observable<any> {
    return this.http.get(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`)
      .map((response: Response) => {
        return response.json();
      })
  }
}
