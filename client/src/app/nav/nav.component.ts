import { User } from './../_models/user';
import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public appTitle = "Meet Me";
  public user: User = { username: '', token: '' };
  public loggedIn: boolean;
  constructor(public accountService: AccountService, private router: Router,
    private toastr: ToastrService) {
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
        //this.loggedIn = true;
        this.router.navigateByUrl('/members');
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.error);
      }
    );
  }

  public logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
    //this.loggedIn = false;
  }

}
