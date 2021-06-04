import { Member } from './../../_models/member';
import { MembersService } from './../../_services/members.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private router: ActivatedRoute, private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadMember();

    this.galleryOptions = [{
      width: '500px',
      height: '500px',
      imagePercent: 100,
      thumbnailsPercent: 40,
      preview: false

    }]
  }

  getImages() {

    let imagesArray = [];
    for (let photo of this.member.photos) {
      imagesArray.push({
        small: photo?.url,
        big: photo?.url,
        medium: photo?.url
      })
    }
    return imagesArray;
  }

  loadMember() {

    let userName: string = this.router.snapshot.paramMap.get("username");

    this.memberService.getMember(userName).subscribe(response => {
      this.member = response
      console.log(this.member);
      this.galleryImages = this.getImages();
    }
    );

  }

}
