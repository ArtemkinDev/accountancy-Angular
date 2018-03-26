import { Component, OnDestroy, OnInit } from '@angular/core';
import { BillService } from '../../services/bill.service';
import { CategoriesService } from '../../services/categories.service';
import { EventsService } from '../../services/events.service';
import { Observable } from 'rxjs/Observable';
import { Bill } from '../../shared/bill.model';
import { Category } from '../../shared/category.model';
import { EventModel } from '../../shared/event.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  bill: Bill;
  categories: Category[] = [];
  events: EventModel[] = [];
  subsc: Subscription;

  constructor(private billService: BillService,
              private categoriesService: CategoriesService,
              private eventService: EventsService) { }

  ngOnInit() {
    this.subsc = Observable.combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventService.getEvents()
    ).subscribe((data: [Bill, Category[], EventModel[]]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];
      this.isLoaded = true;
    })
  }

  ngOnDestroy() {
    if (this.subsc) this.subsc.unsubscribe();
  }

  getCategoryCost(cat: Category): number {

    const categoryEvents = this.events.filter((e) => {
      return e.category === cat.id && e.type === 'outcome'
    });
    return categoryEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }

  getCategoryPercent(cat: Category): number {
    const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
    return percent;
  }

  getCategoryRest(cat: Category) {
    return cat.capacity - this.getCategoryCost(cat);
  }

}
