import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from './model/user';
import {GroupUtil} from '../util/group-util';

@Injectable({
  providedIn: 'root'
})
export class UserSignupService {

  constructor(private httpClient: HttpClient) {
  }

  register(user: User): Observable<any> {
    console.log('User Service: ' + user);
    return this.httpClient.post<any>(GroupUtil.apiUrl + '/api/v1/go-tiny/users', user);
  }

  login(user: User): Observable<any> {
    console.log('User Service: ' + user);
    return this.httpClient.patch<any>(GroupUtil.apiUrl + '/api/v1/go-tiny/users', user);
  }

  getAll(): Observable<any> {
    return this.httpClient.get<any>(GroupUtil.apiUrl + '/api/v1/go-tiny/users');
  }
}
