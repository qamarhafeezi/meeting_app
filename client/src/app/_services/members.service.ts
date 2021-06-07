import { Member } from './../_models/member';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private baseUri = environment.baseUri;
  constructor(private http: HttpClient) { }

  getMembers() {
    return this.http.get<Member[]>(this.baseUri + 'users');
  }

  getMember(userName: string) {
    return this.http.get<Member>(this.baseUri + 'users/' + userName?.toLowerCase());
  }

  updateProfile(member: Member) {
    return this.http.put(this.baseUri + 'users', member);
  }
}
