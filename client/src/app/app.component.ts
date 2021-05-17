import { ApicallService } from './_services/apicall.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'client';
  users: any;
  constructor(private service : ApicallService){
    
  }
  ngOnInit(): void {
    this.service.getUsers('users').subscribe(response => {
      this.users = response;
      console.log(this.users);
    } )
  }


}
