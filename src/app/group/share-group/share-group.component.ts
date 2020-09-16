import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {Card} from '../../model/card';
import {TinyMail, TinyMailRequest} from '../../model/TinyMail';
import {CardService} from '../../services/card.service';

@Component({
  selector: 'app-share-group',
  templateUrl: './share-group.component.html',
  styleUrls: ['./share-group.component.css']
})
export class ShareGroupComponent implements OnInit {
  closeBtnName: string;
  submitBtnName: string;
  shareGroup;
  cards: Card[];

  constructor(public bsModalRef: BsModalRef, private formBuilder: FormBuilder, private cardService: CardService, private router: Router) {
    this.shareGroup = this.formBuilder.group({from: '', to: ''});
  }

  ngOnInit(): void {
  }

  shareGroupCards(mailInfo: any): void {
    this.cardService.sendCard(this.constructTinyMailRequest(this.cards, mailInfo.from, mailInfo.to)).subscribe({
      next: data => this.navigateToHome(),
      error: error => console.error('There was an error!', error)
    });
  }

  private navigateToHome(): void {
    this.bsModalRef.hide();
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/home']);
    });
  }

  constructTinyMailRequest(cards: Card[], from: string, to: string): TinyMail {
    const tinyMail = new TinyMail();
    tinyMail.from = from;
    tinyMail.to = to;
    for (const card of cards) {
      const mailRequest = new TinyMailRequest();
      mailRequest.description = card.description;
      mailRequest.title = card.title;
      mailRequest.tinyUrl = card.tinyUrl;
      tinyMail.mailRequests.push(mailRequest);
    }
    return tinyMail;
  }
}
