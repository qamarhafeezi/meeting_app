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
    this.memberService.getMembers().subscribe(response => {
      this.members = response;
    });
  }
}
