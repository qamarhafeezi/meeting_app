import { User } from './../_models/user';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private base: BaseService) {

  }

  login(model: any) {
    return this.base.post('account/login', model).pipe(
      map((user: User) => {
        //debugger;
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          this.currentUserSource.next(user);
          return user;
        }
      }
      )
    );
  }
  logout() {
    localStorage.removeItem("user");
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

}
