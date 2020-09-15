import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './user/login/login.component';
import {UserComponent} from './user/user.component';
import {HomeComponent} from './home/home.component';
import {GroupComponent} from './group/group.component';

const routes: Routes = [
  {path: '', component: UserComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'group', component: GroupComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
