import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  private baseUrl = 'https://localhost:5001/api';
  constructor(private http: HttpClient) { 
  }

  getUsers(functionName) {
    return this.http.get(this.baseUrl + "/" + functionName);
  }
}
