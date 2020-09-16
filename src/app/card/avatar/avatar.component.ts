import {Component, OnInit} from '@angular/core';
import {Card} from '../../model/card';
import {CardService} from '../../services/card.service';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

  card: Card;
  closeBtnName: string;
  submitBtnName: string;

  constructor(public bsModalRef: BsModalRef, private cardService: CardService) {
  }

  ngOnInit(): void {
  }

  processFile(imageInput: any): void {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.cardService.uploadAvatar(file, this.card.name).subscribe({
        next: data => '',
        error: error => console.error('There was an error!', error)
      });
    });
    reader.readAsDataURL(file);
    this.bsModalRef.hide();
  }
}
