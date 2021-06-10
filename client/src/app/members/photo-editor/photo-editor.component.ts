import { Photo } from './../../_models/photo';
import { MembersService } from './../../_services/members.service';
import { take } from 'rxjs/operators';
import { AccountService } from './../../_services/account.service';
import { environment } from 'src/environments/environment';
import { Member } from 'src/app/_models/member';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  @Input() member: Member;
  public uploader: FileUploader;
  baseUrl = environment.baseUri;
  user: User;
  hasBaseDropZoneOver: false;

  constructor(private accountService: AccountService,
    private memberService: MembersService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user)
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + "users/add-photo",
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,


    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, header) => {

      if (response) {
        let photo = JSON.parse(response);
        this.member.photos.push(photo);
      }

    }

  }

  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo.id).subscribe(response => {
      this.user.photoUrl = photo.url;
      this.accountService.setCurrentUser(this.user);
      this.member.photoUrl = photo.url;

      this.member.photos.forEach(p => {
        if (p.id === photo.id) {
          p.isMain = true;
        }
        else if (p.id != photo.id && p.isMain == true) {
          p.isMain = false;
        }
      })
    })
  }

  deletePhoto(photo: Photo) {
    this.memberService.deletePhoto(photo.id).subscribe(response => {
      //debugger;
      // this.member.photos = this.member.photos.filter(obj => {
      //   obj.id !== photo.id
      // });
      this.member.photos.forEach((item, index) => {
        if (item.id === photo.id) this.member.photos.splice(index, 1);
      })
      //debugger;
    })
  }

}
