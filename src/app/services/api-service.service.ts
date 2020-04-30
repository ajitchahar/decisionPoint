import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'd3';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  constructor(
    private http: HttpClient,
  ) { }


  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  getGraphData(){
   return this.http.get('assets/graph_FD.csv', {responseType: 'text'});
  }

  getUserPosts(userId) {
    return this.http.get('https://jsonplaceholder.typicode.com/posts?userId='+userId);
  }
}
