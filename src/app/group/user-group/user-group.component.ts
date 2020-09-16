import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder} from '@angular/forms';
import {GroupService} from '../../services/group.service';
import {Router} from '@angular/router';
import {UserGroup} from '../../model/user-group';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.css']
})
export class UserGroupComponent implements OnInit {

  groups = [];
  users = [];
  roles = [{label: 'Admin User', value: 'ADMIN'}, {label: 'Normal User', value: 'USER'}];
  closeBtnName: string;
  submitBtnName: string;
  userGroup;

  constructor(public bsModalRef: BsModalRef, private formBuilder: FormBuilder, private groupService: GroupService, private router: Router) {
    this.userGroup = this.formBuilder.group({groupName: '', role: '', userName: ''});
  }

  ngOnInit(): void {
  }

  onselectGroup(name: any): void {
    console.log('Selected group Name :' + name.target.value);
  }

  addUserGroup(groupToAdd: UserGroup): void {
    this.groupService.addUserToGroup(groupToAdd).subscribe({
      next: data => this.navigateToGroup(),
      error: error => console.error('There was an error!', error)
    });
  }

  private navigateToGroup(): void {
    this.bsModalRef.hide();
    this.router.navigate(['home']);
  }

}
