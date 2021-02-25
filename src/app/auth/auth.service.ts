import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError: BehaviorSubject<string> = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: any; // firebase.User
  user: any;
  verifyEmail = false;
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) { }

  getUserState(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }
  // Верификация Email
  async verificationEmail(): Promise<void> {
    (await this.afAuth.currentUser).sendEmailVerification()
      .then(() => {
        this.verifyEmail = true;
      })
      .catch(err => {
        this.eventAuthError.next(err);
      });
  }
  // login в сисему
  login(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .catch(err => {
        this.eventAuthError.next(err);
      })
      .then(userCredential => {
        // console.log(userCredential);
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
        console.log(userCredential);
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
    });
  }
  logout(): ReturnType<firebase.auth.Auth['signOut']> {
    return this.afAuth.signOut();
  }

}
