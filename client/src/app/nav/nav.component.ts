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
  public model: any = {};
  public loggedIn: boolean;
  constructor(private service: AccountService) {
  }

  ngOnInit(): void {

    this.getCurrentUser();
  }

  public login() {

    this.service.login(this.model).subscribe(
      response => {
        //debugger;
        this.model = response;
        console.log(this.model);
        this.loggedIn = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  public logout() {
    this.service.logout();
    this.loggedIn = false;
  }



  getCurrentUser() {
    this.service.currentUser$.subscribe((user: User) => {
      this.loggedIn = !!user;

    })
  }

}
