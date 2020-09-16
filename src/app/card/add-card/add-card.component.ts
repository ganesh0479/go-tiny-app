import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {Card} from '../../model/card';
import {CardService} from '../../services/card.service';
import {HomeComponent} from '../../home/home.component';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {

  closeBtnName: string;
  submitBtnName: string;
  card;

  constructor(public bsModalRef: BsModalRef, private formBuilder: FormBuilder, private cardService: CardService, private router: Router) {
    this.card = this.formBuilder.group({title: '', description: '', name: '', actualUrl: '', expiresIn: 0, picture: null});
  }

  ngOnInit(): void {
  }

  addCard(cardToAdd: Card): void {
    this.cardService.addCard(cardToAdd).subscribe({
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
