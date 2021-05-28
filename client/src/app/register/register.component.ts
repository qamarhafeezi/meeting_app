import { AccountService } from './../_services/account.service';
import { User } from './../_models/user';
import { BaseService } from './../_services/base.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor(private accountService: AccountService) {

  }

  ngOnInit(): void {
  }

  register() {
    this.accountService.register(this.model).subscribe(
      (response: User) => {
        console.log("registered user is: " + response);
        this.cancel();
      },
      (error) => { console.log("error is : " + error) }
    )
    console.log("input model is " + this.model);
  }

  cancel() {
    console.log('cancel');
    this.cancelRegister.emit(false);

  }

}
