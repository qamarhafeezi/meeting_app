import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private baseUrl = 'https://localhost:5001/api/';
  constructor(private http: HttpClient) {
  }

  get(endPoint: string) {
    return this.http.get(this.baseUrl + endPoint);
  }

  post(endPoint: string, postData: any) {
    return this.http.post(this.baseUrl + endPoint, postData);
  }
}
