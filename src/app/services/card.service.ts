import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Card} from '../model/card';
import {CardGroup} from '../model/card-group';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private httpClient: HttpClient) {
  }

  addCard(card: Card): Observable<any> {
    console.log('User Service: ' + card);
    return this.httpClient.post<any>('http://localhost:8080/api/v1/go-tiny/cards', card);
  }

  addCardToGroup(cardGroup: CardGroup): Observable<any> {
    console.log('User Service: ' + cardGroup);
    return this.httpClient.post<any>('http://localhost:8080/api/v1/go-tiny/card-group', cardGroup);
  }

  updateCard(card: Card): Observable<any> {
    console.log('User Service: ' + card);
    return this.httpClient.patch<any>('http://localhost:8080/api/v1/go-tiny/cards', card);
  }

  approveCard(cardName: string): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/v1/go-tiny/groups/sample/cards/' + cardName + '/approve');
  }

  authorizeCard(cardName: string): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/v1/go-tiny/groups/sample/cards/' + cardName + '/authorize');
  }

  deleteCard(cardName: string): Observable<any> {
    return this.httpClient.delete<any>('http://localhost:8080/api/v1/go-tiny/cards/' + cardName);
  }

  getCardsNotBelongToGroup(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/v1/go-tiny/cards/');
  }

  getCardsBelongToGroup(groupName: string): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/v1/go-tiny/cards/groups/' + groupName);
  }
}
