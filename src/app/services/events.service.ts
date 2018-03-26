import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BaseApi } from '../shared/core/base-api';
import { EventModel } from '../shared/event.model';

@Injectable()
export class EventsService extends BaseApi {

  constructor(public http: Http) {
    super(http);
  }

  addEvent(event: EventModel):Observable<EventModel> {
    return this.post('events', event);
  }

  getEvents():Observable<EventModel[]> {
    return this.get('events');
  }

  getEventsById(id: string): Observable<EventModel> {
    return this.get(`events/${id}`);
  }

  /*getCategories(): Observable<Category[]> {
    return this.get('categories');
  }

  createNewCategory(cat: Category): Observable<Category> {
    return this.post('categories', cat);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.put(`categories/${category.id}`, category);
  }*/
}
