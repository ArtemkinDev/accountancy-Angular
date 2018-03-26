import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../../shared/category.model';
import { EventModel } from '../../../shared/event.model';

@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: [ './history-events.component.scss' ]
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[];
  @Input() events: EventModel[];
  searchValue: string = '';
  searchPlaceholder: string = "Сумма";
  searchField: string = 'amount';

  constructor() {
  }

  ngOnInit() {
    this.events.forEach((e) => {
      e.catName = this.categories.find((c) => {
        return c.id === e.category;
      }).name;
    })
  }

  changeCriteria(field: string) {
    const namesMap = {
      amount: 'Сумма',
      date: 'Дата',
      category: 'Категория',
      type: 'Тип'
    };

    this.searchPlaceholder = namesMap[field];
    this.searchField = field;
  }

}
