import {Component, OnInit} from '@angular/core';
import {CardService} from '../services/card.service';
import {Card} from '../model/card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cards: Card[];

  constructor(private cardService: CardService) {
  }

  ngOnInit(): void {
    console.log('Inside Init');
    this.cardService.getCardsNotBelongToGroup().subscribe(data => {
      this.cards = data.cardResponses;
    });
  }

}
