import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: firebase.User;

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.getUserState()
      .subscribe(user => {
        this.user = user;
      });
  }

  verifyEmail(): void {
    this.auth.verificationEmail();
  }

}
