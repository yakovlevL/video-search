import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  visible = false;
  user: firebase.User;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
  }

  ngOnInit(): void {
    this.auth.getUserState()
      .subscribe(user => {
        this.user = user;
      });
  }

  clickMe(): void {
    this.visible = false;
  }

  change(value: boolean): void {}

  logout(e: Event): void {
    e.preventDefault();
    this.auth.logout();
    this.router.navigate(['/auth', 'login']);
  }
}
