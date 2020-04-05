import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Decision-point';
  nav_param ="/users";

  constructor(
    private router: Router
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd ) {
       this.nav_param = event.url;
       if(this.nav_param.includes('posts')){
         this.nav_param = '/users';
       }
      }
    });
}

}
