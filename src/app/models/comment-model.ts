import { comment } from './../interfaces/comment';
export class comments implements comment {

    comment_author: string;
    comment_email: string;
    comment_content: string;
    comment_status: string;
    comment_toggle: boolean;
    comment_date: string;
    id: string;
    image: string;

    constructor (){
        this.comment_status = "unapproved";
        this.comment_toggle = false;
        // this.comment_date.getUTCDate();
    }
    getCommentStatus(){
        return this.comment_status = "unapproved";
    }
    getCommentToggle(){
        return this.comment_toggle = false;
    }
}