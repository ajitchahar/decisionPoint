import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersTableComponent } from './components/users/users-table/users-table.component';
import { UsersPostsComponent } from './components/users/users-posts/users-posts.component';
import { D3JsComponent } from './components/d3-js/d3-js.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgbModule , NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject} from 'rxjs';


@NgModule({
  declarations: [
    AppComponent,
    UsersTableComponent,
    UsersPostsComponent,
    D3JsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule.forRoot()
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
