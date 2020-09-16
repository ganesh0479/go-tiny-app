import {Component, Input, OnInit} from '@angular/core';
import {GroupUtil} from '../../util/group-util';
import {Card} from '../../model/card';
import {Router} from '@angular/router';
import {CardService} from '../../services/card.service';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {UserGroupComponent} from '../user-group/user-group.component';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.css']
})
export class GroupCardComponent implements OnInit {
  @Input() groupName: string;
  @Input() role: string;
  groupTabs: any;
  cards: Card[];
  addUserBsModalRef: BsModalRef;
  addUserModalOptions: ModalOptions = {
    animated: true,
    keyboard: true,
    backdrop: 'static',
  };

  constructor(private router: Router, private cardService: CardService, private bsModalService: BsModalService) {
  }

  ngOnInit(): void {
    console.log('Group Card: ' + this.groupName);
    this.tabsToShow(this.role);
    this.getCardsOfGroup(this.groupName);
  }

  tabsToShow(role: string): void {
    if (role === 'ADMIN') {
      this.groupTabs = GroupUtil.adminGroupTabs;
    } else {
      this.groupTabs = GroupUtil.userGroupTabs;
    }
  }

  resolveAction(actionName: string): void {
    if (actionName === 'ADD USER TO GROUP') {
      this.addUser();
    }
  }

  fetchData(tabName: string): void {
    if (tabName === 'PENDING CARDS') {
      this.getCardsOfGroupByStatus(this.groupName, 'UPDATE_PENDING');
    } else if (tabName === 'GROUP CARDS') {
      this.getCardsOfGroup(this.groupName);
    } else if (tabName === 'AUTHORIZE CARDS') {
      this.getCardsOfGroupByStatus(this.groupName, 'APPROVED');
    }
  }

  addUser(): void {
    this.addUserModalOptions.initialState = {};
    this.addUserBsModalRef = this.bsModalService.show(UserGroupComponent, this.addUserModalOptions);
    this.addUserBsModalRef.content.closeBtnName = 'CANCEL';
    this.addUserBsModalRef.content.submitBtnName = 'ASSIGN';
  }

  getCardsOfGroup(groupName: string): void {
    this.cardService.getCardsBelongToGroup(groupName).subscribe(data => {
      this.cards = data === null ? [] : data.cardResponses;
    });
  }

  getCardsOfGroupByStatus(groupName: string, status: string): void {
    this.cardService.getCardsBelongToGroupByStatus(groupName, status).subscribe(data => {
      this.cards = data === null ? [] : data.cardResponses;
    });
  }
}
