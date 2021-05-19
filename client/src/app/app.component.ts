import { AccountService } from './_services/account.service';
import { BaseService } from './_services/base.service';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'client';
  users: any;
  constructor(private service: AccountService) {

  }
  ngOnInit(): void {
    // this.service.get('users').subscribe(response => {
    //   this.users = response;
    //   console.log(this.users);
    // });
    this.setCurrentUser();
  }

  setCurrentUser() {
    //debugger;
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.service.setCurrentUser(user);
  }

}
