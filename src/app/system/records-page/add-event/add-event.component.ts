import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../../shared/category.model';
import { NgForm } from '@angular/forms';
import { EventModel } from '../../../shared/event.model';
import * as moment from 'moment';
import { EventsService } from '../../../services/events.service';
import { BillService } from '../../../services/bill.service';
import { Bill } from '../../../shared/bill.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Message } from '../../../shared/message';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: [ './add-event.component.scss' ]
})
export class AddEventComponent implements OnInit, OnDestroy {

  @Input() categories: Category[] = [];
  types = [
    { types: 'income', label: 'Доход' },
    { types: 'outcome', label: 'Расход' }
  ];
  message: Message;
  subsc1: Subscription;
  subsc2: Subscription;

  constructor(private eventsService: EventsService,
              private billService: BillService) {
  }

  ngOnInit() {
    this.message = new Message('danger', '');
  }

  ngOnDestroy() {
    if(this.subsc1) this.subsc1.unsubscribe();
    if(this.subsc2) this.subsc2.unsubscribe();
  }

  showMessage(message: Message) {
    this.message = message;

    window.setTimeout(() => {
      this.message.text = '';
    }, 5000)
  }

  onSubmit(form: NgForm) {
    let { amount, description, category, type } = form.value;
    if ( amount < 0 ) amount *= -1;

    const event = new EventModel(type, amount, +category, moment().format('DD.MM.YYYY HH:mm:ss'), description);
    this.subsc1 = this.billService.getBill()
      .subscribe((bill: Bill) => {
        let value = 0;
        if ( type === 'outcome' ) {
          if ( amount > bill.value ) {
            this.showMessage({
              text: `На счету недостаточно средств! Вам не хватает ${amount - bill.value}`,
              type: 'danger'
            });
            return;
          } else {
            value = bill.value - amount;
            this.showMessage({
              text: `Событие успешно добавлено!`,
              type: 'success'
            });
          }
        } else {
          value = bill.value + amount;
          this.showMessage({
            text: `Событие успешно добавлено!`,
            type: 'success'
          });
        }

        this.subsc2 = this.billService.updateBill({ value, currency: bill.currency })
          .mergeMap(() => {
            return this.eventsService.addEvent(event);
          })
          .subscribe(() => {
            form.setValue({
              amount: 0,
              description: ' ',
              category: 1,
              type: 'outcome'
            })
            this.showMessage({
              text: `Событие успешно добавлено!`,
              type: 'success'
            });
          });
      })
  }

}
