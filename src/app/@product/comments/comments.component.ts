import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AdminserviceService } from '../../services/admin/adminservice.service';
import { UserService } from '../../services/user/user.service';

import { comments } from '../../models/comment-model';
import { comment } from '../../interfaces/comment';
import { User } from '../../interfaces/user';


import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit, OnDestroy {

  Comments: comment[];
  comment_date: Date = new Date();
  isAlertHide: boolean;
  id: string;
  IdLower: any;
  unapproved: string;
  imageUrl: string;
  commentStatus: string;
  autoGenerateId: string;
  commentsSubscription: Subscription;
  currentUser: User;

  public comment = new comments();

  constructor(
    private adminService: AdminserviceService,
    private userService: UserService,
    private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get("id");
    this.IdLower = this.id.substr(0, this.id.length);
    this.isAlertHide = null;
    this.unapproved = "unapproved";
    this.imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbPyrOFsXzPmhBBo8Gm2WEEqA246A9JO8U88vOO2Qu7J87p4Yy"
    this.Comments = [];
    this.commentStatus = 'approved';
  }

  ngOnInit() {
    this.commentsSubscription = this.adminService.getComment().subscribe((comments) => this.Comments = comments.filter((comment) => this.id == comment.id && this.commentStatus == comment.comment_status));
    if (this.userService.currentUser()) {
      this.currentUser = this.userService.currentUser();
      this.comment.comment_author = this.currentUser.firstName + ' ' + this.currentUser.lastName;
      if (this.currentUser.emailOrPhone.includes('@')) return this.comment.comment_email = this.currentUser.emailOrPhone;
    }
  }

  commentUser(comment: NgForm) {
    if (confirm("Are You Sure To Add Feedback?")) {
      this.comment.comment_date = this.comment_date.toLocaleDateString();
      this.comment.id = this.id;
      this.comment.image = this.imageUrl;
      this.autoGenerateId = this.adminService.addComment(this.comment);
      if (this.autoGenerateId) {
        this.isAlertHide = true;
      }
      else {
        this.isAlertHide = false;
      }
      comment.resetForm();
      // window.scrollTo({
      //   top: 900,
      //   behavior: 'smooth'
      // });
    } else {
      this.isAlertHide = false;
    }
  }

  closeAlert(): void {
    this.isAlertHide = null;
  }
  ngOnDestroy() {
    this.commentsSubscription.unsubscribe();
  }
}
