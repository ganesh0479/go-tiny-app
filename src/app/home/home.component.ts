import {Component, OnInit} from '@angular/core';
import {CardService} from '../services/card.service';
import {Card} from '../model/card';
import {ActivatedRoute} from '@angular/router';
import {AddCardComponent} from '../card/add-card/add-card.component';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cards: Card[];
  activeTab: string;
  bsModalRef: BsModalRef;
  modalOptions: ModalOptions = {
    animated: true,
    keyboard: true,
    backdrop: 'static',
  };

  constructor(private cardService: CardService, private route: ActivatedRoute, private bsModalService: BsModalService) {
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

  addCard(): void {
    this.bsModalRef = this.bsModalService.show(AddCardComponent, this.modalOptions);
    this.bsModalRef.content.closeBtnName = 'CANCEL';
    this.bsModalRef.content.submitBtnName = 'ADD CARD';
    this.bsModalRef.hide();
  }
}
