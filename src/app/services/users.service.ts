import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../shared/user.model';
import 'rxjs/add/operator/map';
import { BaseApi } from '../shared/core/base-api';

@Injectable()
export class UsersService extends BaseApi {

  constructor(public http: Http) {
    super(http);
  }

  /*getUserByEmail(email: string): Observable<User> {
    return this.http.get(`http://localhost:3100/users?email=${email}`)
      .map((response: Response) => response.json())
      .map((user: User) => {
        return user[ 0 ] ? user[ 0 ] : undefined;
      })
  }*/

  getUserByEmail(email: string): Observable<User> {
    return this.get('users?email = ${email}')
      .map((user: User) => {
        return user[ 0 ] ? user[ 0 ] : undefined;
      })
  }

  /*createNewUser(user: User): Observable<User> {
    return this.http.post('http://localhost:3100/users', user)
      .map((response: Response) => response.json()
      )
  }*/

  createNewUser(user: User): Observable<User> {
    return this.post('users', user);
  }
}
