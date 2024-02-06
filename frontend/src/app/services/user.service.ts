import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/models/User.model';
import { IUserLogin } from '../shared/interfaces/IUserLogin.interface';
import { USER_LOGIN_URL } from '../shared/constants/urls.constnts';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(new User());
  public userObservable: Observable<User>;

  constructor(private http: HttpClient) { 
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin: IUserLogin):Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {

        },
        error: (errorResponse) => {
          
        }
      })
    );
  }
}
