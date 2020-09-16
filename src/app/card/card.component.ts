import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../model/card';
import {CardService} from '../services/card.service';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {UpdateCardComponent} from './update-card/update-card.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() cards: Card[];
  @Input() tabName = '';
  updateBsModalRef: BsModalRef;
  updateModalOptions: ModalOptions = {
    animated: true,
    keyboard: true,
    backdrop: 'static',
  };

  constructor(private cardService: CardService, private router: Router, private bsModalService: BsModalService) {
  }

  ngOnInit(): void {
  }

  updateCard(card: Card): void {
    this.updateModalOptions.initialState = {cardToUpdate: card};
    this.updateBsModalRef = this.bsModalService.show(UpdateCardComponent, this.updateModalOptions);
    this.updateBsModalRef.content.closeBtnName = 'CANCEL';
    this.updateBsModalRef.content.submitBtnName = 'UPDATE';
    this.updateBsModalRef.hide();
  }

  deleteCard(cardName: string): void {
    this.cardService.deleteCard(cardName).subscribe({
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
