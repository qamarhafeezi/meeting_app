import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isRegister: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

  public registerToggle() {
    this.isRegister = !this.isRegister;
  }

  cancelRegisterMode(event: boolean) {
    this.isRegister = event;
  }

}
