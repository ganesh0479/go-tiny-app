import {Component, Input, OnInit} from '@angular/core';
import {GroupUtil} from '../../util/group-util';
import {Card} from '../../model/card';
import {Router} from '@angular/router';
import {CardService} from '../../services/card.service';

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

  constructor(private router: Router, private cardService: CardService) {
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
    } else if (actionName === 'APPROVE CARD') {
      this.approveCard();
    } else if (actionName === 'AUTHORIZE CARD') {
      this.authorizeCard();
    }
  }

  fetchData(tabName: string): void {
    if (tabName === 'PENDING CARDS') {
      // fetch pending cards
    } else if (tabName === 'AUTHORIZE CARDS') {
      // fetch authorize cards
    }
  }

  addUser(): void {
  }

  approveCard(): void {
  }

  authorizeCard(): void {
  }

  getCardsOfGroup(groupName: string): void {
    this.cardService.getCardsBelongToGroup(groupName).subscribe(data => {
      this.cards = data.cardResponses;
    });
  }
}
