import { UserParams } from './../_models/user-params';
import { Member } from './../_models/member';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/paginated-result';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private baseUri = environment.baseUri;
  paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();

  constructor(private http: HttpClient) { }

  getMembers(userParams: UserParams) {
    //return this.http.get<Member[]>(this.baseUri + 'users');
    let httpParams = this.setHttpParams(userParams);
    return this.http.get<Member[]>(this.baseUri + 'users', { observe: 'response', params: httpParams }).
      pipe(
        map(response => {
          this.paginatedResult.result = response.body;
          if (response.headers.get("Pagination") != null) {
            this.paginatedResult.pagination = JSON.parse(response.headers.get("Pagination"));
          }
          return this.paginatedResult;

        }));
  }

  setHttpParams(userParams: UserParams): HttpParams {

    let httpParams = new HttpParams();
    if (userParams.pageSize !== null && userParams.pageNumber !== null) {
      httpParams = httpParams.append("pageNumber", userParams.pageNumber.toString());
      httpParams = httpParams.append("pageSize", userParams.pageSize.toString());
    }
    return httpParams;
  }

  getMember(userName: string) {
    return this.http.get<Member>(this.baseUri + 'users/' + userName?.toLowerCase());
  }

  updateProfile(member: Member) {
    return this.http.put(this.baseUri + 'users', member);
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUri + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUri + 'users/delete-photo/' + photoId);
  }
}
