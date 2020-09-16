import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder} from '@angular/forms';
import {CardService} from '../../services/card.service';
import {Router} from '@angular/router';
import {CardGroup} from '../../model/card-group';

@Component({
  selector: 'app-card-group',
  templateUrl: './card-group.component.html',
  styleUrls: ['./card-group.component.css']
})
export class CardGroupComponent implements OnInit {
  closeBtnName: string;
  submitBtnName: string;
  cardGroup;

  constructor(public bsModalRef: BsModalRef, private formBuilder: FormBuilder, private cardService: CardService, private router: Router) {
    this.cardGroup = this.formBuilder.group({cardName: '', groupName: ''});
  }

  ngOnInit(): void {
  }

  addCardToGroup(cardToAdd: CardGroup): void {
    this.cardService.addCardToGroup(cardToAdd).subscribe({
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
