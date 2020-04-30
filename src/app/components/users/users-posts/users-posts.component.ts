import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../services/api-service.service';
import { ActivatedRoute } from '@angular/router';
import {trigger, transition, style, animate, query, stagger, keyframes} from '@angular/animations';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-users-posts',
  templateUrl: './users-posts.component.html',
  styleUrls: ['./users-posts.component.css'],
  animations: [

    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])

  ]
})
export class UsersPostsComponent implements OnInit {
  userPosts:any;
  fetchingDetails = false;
  modalRef:any;
  currentModalPost = "";
  userName = "";
  currentIndex = 0;
  apiError = false;
  constructor(
    private apiService: ApiServiceService,
    private route: ActivatedRoute,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal
  ) { 
    const userId = this.route.snapshot.params['userId']
    this.userName = this.route.snapshot.params['name'];
    this.fetchUserPosts(userId);
  }

  ngOnInit() {
  }

  fetchUserPosts(userId) {
    this.fetchingDetails = true;
      this.apiService.getUserPosts(userId).subscribe(response => {
        this.userPosts = response ? response : [];
        this.fetchingDetails = false;
    }, error => {
      this.fetchingDetails = false;
      this.apiError = true;
    })
  }

  open(modal, post, index) {
    
   this.currentIndex = 0;
   this.currentModalPost = "";
   this.currentIndex = index;
   this.modalRef = this.modalService.open(modal);
   this.currentModalPost = post.body;
  }

  close() {
    this.userPosts[this.currentIndex].body = this.currentModalPost;
    this.modalRef.close()
  }
}
