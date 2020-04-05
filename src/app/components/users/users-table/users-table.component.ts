import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../services/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  usersData:any;
  searchResult = [];
  fetchingDetails = false;
  apiError = false;
  constructor(
    private apiService: ApiServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.fetchingDetails = true;
    this.apiService.getUsers().subscribe(response => {
      this.usersData = response ? response : [];
      this.fetchingDetails = false
    },error => {
      this.fetchingDetails = false;
      this.apiError = true;
    })
  }

  onSearchChange(searchInput){
    this.searchResult = [];
    if (searchInput) {
        this.searchResult =  this.usersData.filter(user => {
          const term = searchInput.toLowerCase();
          return (user.name.toLowerCase().includes(term) || user.id.toString().includes(term));
        });
    }
  }

  displayUserPosts(user) {
      this.router.navigate(['posts/'+user.name+'/'+user.id]);
  }
}
