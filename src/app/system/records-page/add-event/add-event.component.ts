import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../../shared/category.model';
import { NgForm } from '@angular/forms';
import { EventModel } from '../../../shared/event.model';
import * as moment from 'moment';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @Input() categories: Category[] = [];
  types = [
    {types:'income', label: 'Доход'},
    {types:'outcome', label: 'Расход'}
  ]

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    let { amount, description, category, type } = form.value;
    if ( amount < 0 ) amount *= -1;

    const event = new EventModel(type, amount, +category, moment().format('DD.MM.YYYY HH:mm:ss'), description);
  }

}
