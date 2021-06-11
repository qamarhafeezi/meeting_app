import { Pagination } from './../../_models/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { MembersService } from './../../_services/members.service';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';

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

  constructor(private memberService: MembersService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    //this.spinner.show();
    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 1000);

    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers(this.pageNumber, this.pageSize).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
      //debugger;
    });
  }

  pageChanged($event: any) {
    //debugger;
    this.pageNumber = $event.page;
    this.loadMembers();

  }
}
