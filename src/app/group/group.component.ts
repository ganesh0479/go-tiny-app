import {Component, OnInit} from '@angular/core';
import {GroupService} from '../services/group.service';
import {UserGroup} from '../model/user-group';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  userGroups: UserGroup[];

  constructor(private groupService: GroupService) {
  }

  ngOnInit(): void {
    const user = sessionStorage.getItem('user');
    this.groupService.getUserGroups(user).subscribe(data => this.userGroups = data.userGroupRolesResponse);
  }
}
