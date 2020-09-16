import {Component, Input, OnInit} from '@angular/core';
import {GroupUtil} from '../../util/group-util';
import {Card} from '../../model/card';
import {Router} from '@angular/router';
import {CardService} from '../../services/card.service';
import {GroupService} from '../../services/group.service';

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

  constructor(private router: Router, private cardService: CardService, private groupService: GroupService) {
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
    if (actionName === 'ADD USER') {
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
