import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Group} from '../model/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient: HttpClient) {
  }

  add(group: Group): Observable<any> {
    console.log('User Service: ' + group);
    return this.httpClient.post<any>('http://localhost:8080/api/v1/go-tiny/groups', group);
  }

  getUserGroups(user: string): Observable<any> {
    console.log('User Service: ' + user);
    return this.httpClient.get<any>('http://localhost:8080/api/v1/go-tiny/user-group-role/' + user);
  }

  approveCardInTheGroup(groupName: string, cardName: string): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/v1/go-tiny/groups/' + groupName + '/cards/' + cardName + '/approve');
  }

  authorizeCardInTheGroup(groupName: string, cardName: string): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/v1/go-tiny/groups/' + groupName + '/cards/' + cardName + '/authorize');
  }
}
