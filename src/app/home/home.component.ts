import {Component, OnInit} from '@angular/core';
import {CardService} from '../services/card.service';
import {Card} from '../model/card';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cards: Card[];
  routeName: string;
  activeTab: string;

  constructor(private cardService: CardService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log('Inside Init');
    this.setActiveTab(this.route.snapshot.paramMap.get('group'));
    this.cardService.getCardsNotBelongToGroup().subscribe(data => {
      this.cards = data.cardResponses;
    });
  }

  setActiveTab(tab: string): void {
    console.log('Active tab : ' + tab);
    if (tab === 'group') {
      this.activeTab = 'group';
    } else {
      this.activeTab = 'card';
    }
  }
}
