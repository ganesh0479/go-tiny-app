import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../model/card';
import {CardService} from '../services/card.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() cards: Card[];
  @Input() tabName = '';

  constructor(private cardService: CardService, private router: Router) {
  }

  ngOnInit(): void {
  }

  updateCard(): void {
  }

  deleteCard(cardName: string): void {
    this.cardService.approveCard(cardName).subscribe({
      next: data => this.navigateToHome(),
      error: error => console.error('There was an error!', error)
    });
  }

  approveCard(cardName: string): void {
    this.cardService.approveCard(cardName).subscribe({
      next: data => this.navigateToHome(),
      error: error => console.error('There was an error!', error)
    });
  }

  authorizeCard(cardName: string): void {
    this.cardService.authorizeCard(cardName).subscribe({
      next: data => this.navigateToHome(),
      error: error => console.error('There was an error!', error)
    });
  }

  shareCard(): void {
    console.log('Inside share method');
  }

  private navigateToHome(): void {
    this.router.navigate(['home']);
  }
}
