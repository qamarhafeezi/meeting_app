import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private base: BaseService) {

  }

  login(model: any) {
    return this.base.post('account/login', model);
  }
}
