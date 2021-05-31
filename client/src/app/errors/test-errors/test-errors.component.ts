import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {

  baseUri = environment.baseUri;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get404Error() {
    this.http.get(this.baseUri + "buggy/not-found").subscribe(
      response => console.log(response),
      error => console.log(error),
    )
  }
  get400Error() {
    this.http.get(this.baseUri + "buggy/bad-request").subscribe(
      response => console.log(response),
      error => console.log(error),
    )
  }
  get500Error() {
    this.http.get(this.baseUri + "buggy/server-error").subscribe(
      response => console.log(response),
      error => console.log(error),
    )
  }
  get401Error() {
    this.http.get(this.baseUri + "buggy/auth").subscribe(
      response => console.log(response),
      error => console.log(error),
    )
  }
  get400ValidationError() {
    this.http.post(this.baseUri + "account/register", {}).subscribe(
      response => console.log(response),
      error => console.log(error),
    )
  }


}
