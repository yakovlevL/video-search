import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {IUser} from '../types/IUser';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {IAuthResponse} from '../types/IAuth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public error$: Subject<string> = new Subject<string>();
  url: string = environment.baseUrl + environment.apiKey;

  constructor(
    private http: HttpClient
  ) { }

  get token(): string {
    const expiresDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expiresDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  login(user: IUser): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(this.url, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  logout(): void {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    const {message} = error.error.error;

    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Пользователь с такими данными не найден');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Некорректный пароль');
        break;
      case 'INVALID_EMAIL':
        this.error$.next('Некорректный email');
        break;
    }

    return throwError(error);
  }

  private setToken(res: IAuthResponse | null): void {
    if (res) {
      const expiresDate = new Date(new Date().getTime() + +res.expiresIn * 1000);
      localStorage.setItem('fb-token', res.idToken);
      localStorage.setItem('fb-token-exp', expiresDate.toString());
    } else {
      localStorage.clear();
    }

  }
}
