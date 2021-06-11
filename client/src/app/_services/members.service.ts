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

  getMembers(currentPage?: number, itemsPerPage?: number) {
    //return this.http.get<Member[]>(this.baseUri + 'users');
    let userParams = new HttpParams();
    if (currentPage !== null && itemsPerPage !== null) {
      //debugger;
      userParams = userParams.append("pageNumber", currentPage.toString());
      userParams = userParams.append("pageSize", itemsPerPage.toString());
    }

    return this.http.get<Member[]>(this.baseUri + 'users', { observe: 'response', params: userParams }).
      pipe(
        map(response => {
          this.paginatedResult.result = response.body;
          if (response.headers.get("Pagination") != null) {
            this.paginatedResult.pagination = JSON.parse(response.headers.get("Pagination"));
          }

          return this.paginatedResult;

        }));
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
