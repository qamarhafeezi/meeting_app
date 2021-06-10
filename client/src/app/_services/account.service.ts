import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
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
  private baseUri = environment.baseUri;

  constructor(private http: HttpClient) {

  }

  login(model: any) {
    return this.http.post(this.baseUri + 'account/login', model).pipe(
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

  register(model: any) {
    return this.http.post(this.baseUri + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
          this.setCurrentUser(user);
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
    localStorage.setItem("user", JSON.stringify(user));
    this.currentUserSource.next(user);
  }

}
