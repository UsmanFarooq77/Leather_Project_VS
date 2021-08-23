import { comment } from './../../interfaces/comment';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../../services/admin/adminservice.service';
import { comments } from '../../models/comment-model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  Comments: comment[];
  comment_date: Date = new Date();
  Hidden: boolean;
  public comment = new comments();
  id: string;
  IdLower: any;
  unapproved: string = "unapproved";
  imageUrl: string;
  commentStatus: string;
  commentStatusCount: comment[];
  constructor(private adminService: AdminserviceService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get("id");
    this.IdLower = this.id.substr(0, this.id.length);
    this.imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbPyrOFsXzPmhBBo8Gm2WEEqA246A9JO8U88vOO2Qu7J87p4Yy"
    this.Comments = [];
    this.commentStatusCount = [];
    this.commentStatus = 'approved';
  }
  ngOnInit() {
    this.adminService.getComment().subscribe((comments) => this.Comments = comments.filter((comment) => this.id == comment.id));
    this.adminService.getComment().subscribe((comments) => this.commentStatusCount = comments.filter((comment) =>  this.id == comment.id && this.commentStatus == comment.comment_status));
  }
  commentUser(comment: NgForm) {
    if (confirm("Are You Sure To Add Feedback?")) {
      this.comment.comment_date = this.comment_date.toLocaleDateString();
      this.comment.id = this.id;
      this.comment.image = this.imageUrl;
      this.adminService.addComment(this.comment);
      this.Hidden = true;
      comment.resetForm();
      window.scrollTo({
        top: 1200,
        behavior: 'smooth'
      });
    } else {
      this.Hidden = false;
    }
  }
}
