import { take } from 'rxjs/operators';
import { Member } from './../../_models/member';
import { MembersService } from './../../_services/members.service';
import { AccountService } from './../../_services/account.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/user';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  member: Member;
  user: User;
  @ViewChild("profileForm") editForm: NgForm
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private accountService: AccountService,
    private memberService: MembersService) {

    this.accountService.currentUser$.pipe(take(1)).subscribe(
      response => {
        this.user = response;
        console.log('user namme is ' + this.user.userName);
      });
  }

  ngOnInit(): void {

    if (this.user)
      this.loadMember(this.user.userName);
    else
      console.log('user not found');
  }

  loadMember(userName: string) {
    this.memberService.getMember(userName).subscribe(response => {
      this.member = response;
      console.log(this.member.knownAs);
    })
  }

  updateProfile() {
    this.memberService.updateProfile(this.member).subscribe((response) => {
      console.log(response);
      this.editForm.reset(this.member);
    })

  }

}
