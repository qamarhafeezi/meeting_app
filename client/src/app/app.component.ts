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
  constructor(private accountService: AccountService) {

  }
  ngOnInit(): void {
    // this.service.get('users').subscribe(response => {
    //   this.users = response;
    //   console.log(this.users);
    // });
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

}
