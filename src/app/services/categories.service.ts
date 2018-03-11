import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BaseApi } from '../shared/core/base-api';
import { Category } from '../shared/category.model';

@Injectable()
export class CategoriesService extends BaseApi {

  constructor(public http: Http) {
    super(http);
  }

  getCategories(): Observable<Category[]> {
    return this.get('categories');
  }

  createNewCategory(cat: Category): Observable<Category> {
    return this.post('categories', cat);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.put(`categories/${category.id}`, category);
  }
}
