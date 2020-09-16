import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder} from '@angular/forms';
import {Card} from '../../model/card';
import {CardService} from '../../services/card.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-update-card',
  templateUrl: './update-card.component.html',
  styleUrls: ['./update-card.component.css']
})
export class UpdateCardComponent implements OnInit {

  closeBtnName: string;
  submitBtnName: string;
  cardToUpdate: Card;
  card;

  constructor(public bsModalRef: BsModalRef, private formBuilder: FormBuilder, private cardService: CardService, private router: Router) {
    this.card = this.formBuilder.group({title: '', description: '', picture: null, expiresIn: 0});
  }

  ngOnInit(): void {
  }

  updateCard(cardToAdd: Card): void {
    console.log('Card to add: ' + cardToAdd);
    cardToAdd.name = this.cardToUpdate.name;
    this.cardService.updateCard(cardToAdd).subscribe({
      next: data => this.navigateToHome(data),
      error: error => console.error('There was an error!', error)
    });
  }

  private navigateToHome(status: any): void {
    this.bsModalRef.hide();
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/home']);
    });
  }
}
