import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersTableComponent } from '../app/components/users/users-table/users-table.component';
import { UsersPostsComponent } from '../app/components/users/users-posts/users-posts.component';
import { D3JsComponent } from '../app/components/d3-js/d3-js.component';


const routes: Routes = [ 
  { path: '', redirectTo: 'users', pathMatch: 'full' },    
  { path: 'users', component: UsersTableComponent },    
  { path: 'posts/:name/:userId', component: UsersPostsComponent },    
  { path: 'd3-js', component: D3JsComponent },   
];  

//export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes); 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
