import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {IUser} from '../types/IUser';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {IAuthResponse} from '../types/IAuth';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // public error$: Subject<string> = new Subject<string>();
  // signInUrl: string = environment.signInUrl + environment.apiKey;
  private eventAuthError: BehaviorSubject<string> = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: any; // firebase.User

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
  }

  getUserState(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }
  // login в сисему
  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .catch(err => {
        this.eventAuthError.next(err);
      })
      .then(userCredential => {
        if (userCredential) {
          this.router.navigate(['/']);
        }
      });
  }

// создание нового юзера при регистрации
  createUser(user): void {
    this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        this.newUser = user;
        // console.log(userCredential);
        userCredential.user.updateProfile({
          displayName: user.username
        });
        // после добавляем юзера в базу
        this.inserUserData(userCredential)
          .then(() => {
            this.router.navigate(['/']);
          });
      }).catch(err => {
      this.eventAuthError.next(err);
    });
  }

  // метод для записи юзера в базу
  inserUserData(userCredential: firebase.auth.UserCredential): Promise<void> {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      username: this.newUser.username
      // firstname: this.newUser.firstname
    });
  }

  logout(): ReturnType<firebase.auth.Auth['signOut']> {
    return this.afAuth.signOut();
  }

  // get token(): string {
  //   const expiresDate = new Date(localStorage.getItem('fb-token-exp'));
  //   if (new Date() > expiresDate) {
  //     this.logout();
  //     return null;
  //   }
  //   return localStorage.getItem('fb-token');
  // }
  //
  // login(user: IUser): Observable<any> {
  //   user.returnSecureToken = true;
  //   return this.http.post(this.signInUrl, user)
  //     .pipe(
  //       tap(this.setToken),
  //       catchError(this.handleError.bind(this))
  //     );
  // }
  //
  // logout(): void {
  //   this.setToken(null);
  // }
  //
  // isAuthenticated(): boolean {
  //   return !!this.token;
  // }
  //
  // private handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
  //   const {message} = error.error.error;
  //
  //   switch (message) {
  //     case 'EMAIL_NOT_FOUND':
  //       this.error$.next('Пользователь с такими данными не найден');
  //       break;
  //     case 'INVALID_PASSWORD':
  //       this.error$.next('Некорректный пароль');
  //       break;
  //     case 'INVALID_EMAIL':
  //       this.error$.next('Некорректный email');
  //       break;
  //   }
  //
  //   return throwError(error);
  // }
  //
  // private setToken(res: IAuthResponse | null): void {
  //   if (res) {
  //     const expiresDate = new Date(new Date().getTime() + +res.expiresIn * 1000);
  //     localStorage.setItem('fb-token', res.idToken);
  //     localStorage.setItem('fb-token-exp', expiresDate.toString());
  //   } else {
  //     localStorage.clear();
  //   }
  //
  // }
}
