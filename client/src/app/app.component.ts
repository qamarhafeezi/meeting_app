import { BaseService } from './_services/base.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'client';
  users: any;
  constructor(private service: BaseService) {

  }
  ngOnInit(): void {
    // this.service.get('users').subscribe(response => {
    //   this.users = response;
    //   console.log(this.users);
    // });
  }

}
