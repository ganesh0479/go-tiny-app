import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserComponent} from './user/user.component';
import {LoginComponent} from './user/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CardComponent} from './card/card.component';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {GroupComponent} from './group/group.component';
import {GroupCardComponent} from './group/group-card/group-card.component';
import {AddCardComponent} from './card/add-card/add-card.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import { UpdateCardComponent } from './card/update-card/update-card.component';
import { AddGroupComponent } from './group/add-group/add-group.component';
import { CardGroupComponent } from './card/card-group/card-group.component';
import { UserGroupComponent } from './group/user-group/user-group.component';
import { ShareGroupComponent } from './group/share-group/share-group.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    HomeComponent,
    CardComponent,
    GroupComponent,
    GroupCardComponent,
    AddCardComponent,
    UpdateCardComponent,
    AddGroupComponent,
    CardGroupComponent,
    UserGroupComponent,
    ShareGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    ModalModule.forRoot(),
    PopoverModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
