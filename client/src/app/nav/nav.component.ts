import { Component, OnInit } from '@angular/core';
import { BaseService } from '../_services/base.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public appTitle = "Meet Me";
  public model: any = {};
  public loggedIn: boolean;
  constructor(private service: BaseService) {
  }

  ngOnInit(): void {
  }

  public login() {

    this.service.post('account/login', this.model).subscribe(
      response => {
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
    this.loggedIn = false;
  }

}
