import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from './model/user';

@Injectable({
  providedIn: 'root'
})
export class UserSignupService {

  constructor(private httpClient: HttpClient) {
  }

  register(user: User): Observable<any> {
    console.log('User Service: ' + user);
    return this.httpClient.post<any>('http://localhost:8080/api/v1/go-tiny/users', user);
  }

  login(user: User): Observable<any> {
    console.log('User Service: ' + user);
    return this.httpClient.patch<any>('http://localhost:8080/api/v1/go-tiny/users', user);
  }
}
