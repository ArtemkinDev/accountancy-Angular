import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { EventsService } from '../../services/events.service';
import { Category } from '../../shared/category.model';
import { EventModel } from '../../shared/event.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: [ './history-page.component.scss' ]
})
export class HistoryPageComponent implements OnInit {
  categories: Category[];
  events: EventModel[];
  filteredEvents: EventModel[] = [];
  isLoaded = false;
  isFilterVisible = false;
  subsc: Subscription;

  chartData = [];

  constructor(private categoriesService: CategoriesService,
              private eventService: EventsService) {
  }

  ngOnInit() {
    this.subsc = Observable.combineLatest(
      this.categoriesService.getCategories(),
      this.eventService.getEvents()
    ).subscribe((data: [ Category[], EventModel[] ]) => {
      this.categories = data[ 0 ];
      this.events = data[ 1 ].reverse();

      this.setOriginalEvents();
      this.calculateChartData();

      console.log(this.filteredEvents);


      this.isLoaded = true;
    })
  }

  calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach((c) => {
      const catEvents = this.filteredEvents.filter((e) => {
        return e.category === c.id && e.type === 'outcome';
      })

      this.chartData.push({
        name: c.name,
        value: catEvents.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      })
    })
  }

  openFilter() {
    this.toggleFilterVisibility(true);
  }

  closeFilter() {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  private toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir;
  }

  ngOnDestroy() {
    if ( this.subsc ) this.subsc.unsubscribe();
  }

  onFilterApply(filterData) {
    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.closeFilter();
    this.setOriginalEvents();

    this.filteredEvents = this.filteredEvents
      .filter((e) => {
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter((e) => {
        return filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter((e) => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });

    this.calculateChartData();

  }

  private setOriginalEvents() {
    this.filteredEvents = this.events.slice();
  }

}
