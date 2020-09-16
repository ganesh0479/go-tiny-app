import {Component, OnInit} from '@angular/core';
import {GroupService} from '../services/group.service';
import {UserGroup} from '../model/user-group';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {AddGroupComponent} from './add-group/add-group.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  userGroups: UserGroup[];
  groupName;
  role;
  bsModalRef: BsModalRef;
  modalOptions: ModalOptions = {
    animated: true,
    keyboard: true,
    backdrop: 'static',
  };

  constructor(private groupService: GroupService, private bsModalService: BsModalService) {
  }

  ngOnInit(): void {
    const user = sessionStorage.getItem('user');
    this.groupService.getUserGroups(user).subscribe(data => this.userGroups = data.userGroupRolesResponse);
  }

  addGroup(): void {
    this.bsModalRef = this.bsModalService.show(AddGroupComponent, this.modalOptions);
    this.bsModalRef.content.closeBtnName = 'CANCEL';
    this.bsModalRef.content.submitBtnName = 'ADD GROUP';
  }

  resolveGroupCard(group: string, userRole: string): void {
    this.groupName = group;
    this.role = 'ADMIN';
  }
}
