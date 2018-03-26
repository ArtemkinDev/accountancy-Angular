import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventsService } from '../../../services/events.service';
import { CategoriesService } from '../../../services/categories.service';
import { Subscription } from 'rxjs/Subscription';
import { Category } from '../../../shared/category.model';
import { EventModel } from '../../../shared/event.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: [ './history-detail.component.scss' ]
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  categorie: Category;
  event: EventModel;
  isLoaded = false;
  subsc1: Subscription;

  constructor(private route: ActivatedRoute,
              private categoriesService: CategoriesService,
              private eventService: EventsService) {
  }

  ngOnInit() {
    this.subsc1 = this.route.params
      .mergeMap((params: Params) => {
        return this.eventService.getEventsById(params[ 'id' ]);
      })
      .mergeMap((event: EventModel) => {
         this.event = event;

        return this.categoriesService.getEventsById(event.category);
      })
      .subscribe((category: Category) => {
        this.categorie = category;
        this.isLoaded = true;
      })
  }

  ngOnDestroy() {
    if (this.subsc1) this.subsc1.unsubscribe();
  }

}
