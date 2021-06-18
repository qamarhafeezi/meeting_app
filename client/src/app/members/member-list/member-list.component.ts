import { UserParams } from './../../_models/user-params';
import { AccountService } from './../../_services/account.service';
import { Pagination } from './../../_models/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { MembersService } from './../../_services/members.service';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  public members: Member[];
  pagination: Pagination;
  pageNumber: number = 1;
  pageSize: number = 5;
  userParams: UserParams;
  user: User;

  constructor(private memberService: MembersService,
    private accountService: AccountService) {

    this.accountService.currentUser$.pipe(take(1)).subscribe(response => {
      this.user = response;
      this.userParams = new UserParams(response);
    })

  }

  ngOnInit(): void {

    //this.spinner.show();
    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 1000);

    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers(this.userParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
      //debugger;
    });
  }

  pageChanged($event: any) {
    //debugger;
    this.userParams.pageNumber = $event.page;
    this.loadMembers();

  }
}
