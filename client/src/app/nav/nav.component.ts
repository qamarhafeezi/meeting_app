import { User } from './../_models/user';
import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public appTitle = "Meet Me";
  public user: User = { username: '', token: '' };
  public loggedIn: boolean;
  constructor(public accountService: AccountService) {
  }

  ngOnInit(): void {

    //this.getCurrentUser();
  }

  public login() {

    this.accountService.login(this.user).subscribe(
      (response) => {
        //debugger;
        this.user = response;
        console.log(this.user);
        this.loggedIn = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  public logout() {
    this.accountService.logout();
    this.loggedIn = false;
  }

}
