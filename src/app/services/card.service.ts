import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Card} from '../model/card';
import {CardGroup} from '../model/card-group';
import {TinyMail} from '../model/TinyMail';
import {GroupUtil} from '../util/group-util';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private httpClient: HttpClient) {
  }

  addCard(card: Card): Observable<any> {
    console.log('User Service: ' + card);
    return this.httpClient.post<any>(GroupUtil.apiUrl + '/api/v1/go-tiny/cards', card);
  }

  addCardToGroup(cardGroup: CardGroup): Observable<any> {
    console.log('User Service: ' + cardGroup);
    return this.httpClient.post<any>(GroupUtil.apiUrl + '/api/v1/go-tiny/card-group', cardGroup);
  }

  updateCard(card: Card): Observable<any> {
    console.log('User Service: ' + card);
    return this.httpClient.patch<any>(GroupUtil.apiUrl + '/api/v1/go-tiny/cards', card);
  }

  updateCardInTheGroup(card: Card, groupName: string): Observable<any> {
    console.log('User Service: ' + card);
    return this.httpClient.patch<any>(GroupUtil.apiUrl + '/api/v1/go-tiny/cards/groups/' + groupName, card);
  }

  approveCard(cardName: string, groupName: string): Observable<any> {
    return this.httpClient.get<any>(GroupUtil.apiUrl + '/api/v1/go-tiny/groups/' + groupName + '/cards/' + cardName + '/approve');
  }

  authorizeCard(cardName: string, groupName: string): Observable<any> {
    return this.httpClient.get<any>(GroupUtil.apiUrl + '/api/v1/go-tiny/groups/' + groupName + '/cards/' + cardName + '/authorize');
  }

  deleteCard(cardName: string): Observable<any> {
    return this.httpClient.delete<any>(GroupUtil.apiUrl + '/api/v1/go-tiny/cards/' + cardName);
  }

  deleteCardInTheGroup(card: string, groupName: string): Observable<any> {
    console.log('User Service: ' + card);
    return this.httpClient.delete<any>(GroupUtil.apiUrl + '/api/v1/go-tiny/cards/' + card + '/groups/' + groupName);
  }

  getCardsNotBelongToGroup(): Observable<any> {
    return this.httpClient.get<any>(GroupUtil.apiUrl + '/api/v1/go-tiny/cards/');
  }

  getCardsBelongToGroup(groupName: string): Observable<any> {
    return this.httpClient.get<any>(GroupUtil.apiUrl + '/api/v1/go-tiny/cards/groups/' + groupName);
  }

  getCardsBelongToGroupByStatus(groupName: string, status: string): Observable<any> {
    return this.httpClient.get<any>(GroupUtil.apiUrl + '/api/v1/go-tiny/cards/' + status + '/groups/' + groupName);
  }

  sendCard(tinyMail: TinyMail): Observable<any> {
    console.log('Tiny mail : ' + JSON.stringify(tinyMail));
    return this.httpClient.post(GroupUtil.apiUrl + '/api/v1/go-tiny/mails', tinyMail);
  }

  uploadAvatar(imageFile: File, cardName: string): Observable<any> {
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', imageFile, imageFile.name);
    return this.httpClient.post(GroupUtil.apiUrl + '/api/v1/go-tiny/cards/' + cardName + '/avatar', uploadImageData, {observe: 'response'});
  }
}
