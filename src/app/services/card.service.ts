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

  updateCardInTheGroup(card: Card, groupName: string): Observable<any> {
    console.log('User Service: ' + card);
    return this.httpClient.patch<any>('http://localhost:8080/api/v1/go-tiny/cards/groups/' + groupName, card,);
  }

  approveCard(cardName: string, groupName: string): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/v1/go-tiny/groups/' + groupName + '/cards/' + cardName + '/approve');
  }

  authorizeCard(cardName: string, groupName: string): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/v1/go-tiny/groups/' + groupName + '/cards/' + cardName + '/authorize');
  }

  deleteCard(cardName: string): Observable<any> {
    return this.httpClient.delete<any>('http://localhost:8080/api/v1/go-tiny/cards/' + cardName);
  }

  deleteCardInTheGroup(card: string, groupName: string): Observable<any> {
    console.log('User Service: ' + card);
    return this.httpClient.delete<any>('http://localhost:8080/api/v1/go-tiny/cards/' + card + '/groups/' + groupName);
  }

  getCardsNotBelongToGroup(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/v1/go-tiny/cards/');
  }

  getCardsBelongToGroup(groupName: string): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/v1/go-tiny/cards/groups/' + groupName);
  }

  getCardsBelongToGroupByStatus(groupName: string, status: string): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/v1/go-tiny/cards/' + status + '/groups/' + groupName);
  }
}
