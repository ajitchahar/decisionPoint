import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../services/api-service.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-users-posts',
  templateUrl: './users-posts.component.html',
  styleUrls: ['./users-posts.component.css']
})
export class UsersPostsComponent implements OnInit {
  userPosts:any;
  fetchingDetails = false;
  userName = "";
  apiError = false;
  constructor(
    private apiService: ApiServiceService,
    private route: ActivatedRoute
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
}
