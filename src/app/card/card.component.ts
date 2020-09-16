import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../model/card';
import {CardService} from '../services/card.service';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {UpdateCardComponent} from './update-card/update-card.component';
import {CardGroupComponent} from './card-group/card-group.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() cards: Card[];
  @Input() tabName: string;
  @Input() groupName: string;
  updateBsModalRef: BsModalRef;
  updateModalOptions: ModalOptions = {
    animated: true,
    keyboard: true,
    backdrop: 'static',
  };

  cardGroupBsModalRef: BsModalRef;
  cardGroupModalOptions: ModalOptions = {
    animated: true,
    keyboard: true,
    backdrop: 'static',
  };

  constructor(private cardService: CardService, private router: Router, private bsModalService: BsModalService) {
  }

  ngOnInit(): void {
    console.log('cards group ' + this.cards);
  }

  updateCard(card: Card): void {
    this.updateModalOptions.initialState = {cardToUpdate: card, tabName: this.tabName, groupName: this.groupName};
    this.updateBsModalRef = this.bsModalService.show(UpdateCardComponent, this.updateModalOptions);
    this.updateBsModalRef.content.closeBtnName = 'CANCEL';
    this.updateBsModalRef.content.submitBtnName = 'UPDATE';
    this.updateBsModalRef.hide();
  }

  addCardToGroup(): void {
    this.cardGroupBsModalRef = this.bsModalService.show(CardGroupComponent, this.cardGroupModalOptions);
    this.cardGroupBsModalRef.content.closeBtnName = 'CANCEL';
    this.cardGroupBsModalRef.content.submitBtnName = 'ASSIGN';
    this.cardGroupBsModalRef.hide();
  }

  deleteCard(cardName: string): void {
    if (this.tabName === 'GROUP CARDS') {
      this.cardService.deleteCardInTheGroup(cardName, this.groupName).subscribe({
        next: data => this.navigateToHome(),
        error: error => console.error('There was an error!', error)
      });
    } else {
      this.cardService.deleteCard(cardName).subscribe({
        next: data => this.navigateToHome(),
        error: error => console.error('There was an error!', error)
      });
    }
  }

  approveCard(cardName: string): void {
    this.cardService.approveCard(cardName, this.groupName).subscribe({
      next: data => this.navigateToHome(),
      error: error => console.error('There was an error!', error)
    });
  }

  authorizeCard(cardName: string): void {
    this.cardService.authorizeCard(cardName, this.groupName).subscribe({
      next: data => this.navigateToHome(),
      error: error => console.error('There was an error!', error)
    });
  }

  shareCard(card: Card): string {
    return 'mailto:?subject=' + card.title + ' Bookmark' + '&body=' + this.constructEmailBody(card);
  }

  private navigateToHome(): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/home']);
    });
  }

  private constructEmailBody(card: Card): string {
    return '<body>Hi,<br><br>Please find the ' + '<b>' + card.title + '<b>' + ' bookmark. Please click on Go Tiny to visit webpage.<br><br>'
      + this.constructEmailCardHeader(card.title) + this.constructEmailCardBody(card.description)
      + this.constructEmailCardFooter(card.tinyUrl);
  }

  private constructEmailCardHeader(title: string): string {
    return '<table style="width: 300px;height: 200px;font-family: \'Calibri\'">\n' +
      '  <tr>\n' +
      '    <th style="background-color: black; color: white;height:75px;font-size: 30px">\n' +
      '      <b>' + title;
  }

  private constructEmailCardBody(description: string): string {
    return '</b>\n' +
      '    </th>\n' +
      '  </tr>\n' +
      '  <tr>\n' +
      '    <td>\n' +
      '      <b>' + description;
  }

  private constructEmailCardFooter(tinyUrl: string): string {
    return '</b>\n' +
      '    </td>\n' +
      '  </tr>\n' +
      '  <tr style="height: 40px">\n' +
      '    <th style="background-color: black; color: white;">\n' +
      '      <a href="' + tinyUrl + '"' + '>Go Tiny</a>\n' +
      '    </th>\n' +
      '  </tr>\n' +
      '</table>\n' +
      '</body>';
  }
}
