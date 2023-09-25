import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';

interface AuthResposne {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  userSubject = new BehaviorSubject<User>(new User());
  constructor(private http: HttpClient) {}
  signUp(email: string, password: string) {
    return this.http
      .post<AuthResposne>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA3nV4--fGi8RJFLUufIPxnoHKixYWbD8k',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((data) =>
          this.handleAuthen(
            data.email,
            data.localId,
            data.idToken,
            data.expiresIn
          )
        )
      );
  }
  login(email: string, password: string) {
    return this.http
      .post<AuthResposne>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA3nV4--fGi8RJFLUufIPxnoHKixYWbD8k',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((data) =>
          this.handleAuthen(
            data.email,
            data.localId,
            data.idToken,
            data.expiresIn
          )
        )
      );
  }
  handleError(errRes: HttpErrorResponse) {
    let errorMessage = 'Unknow error';
    if (!errRes.error || !errRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email is existed';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Password is incorrect';
        break;
    }
    return throwError(errorMessage);
  }
  private handleAuthen(
    email: string,
    userId: string,
    idToken: string,
    expiresIn: string
  ) {
    const user = new User(
      email,
      userId,
      idToken,
      new Date(new Date().getTime() + +expiresIn * 1000)
    );
    this.userSubject.next(user);
  }
}
