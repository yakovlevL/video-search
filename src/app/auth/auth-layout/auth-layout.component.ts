import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {
  public passwordVisible = false;
  public password?: string;
  public loading = false;
  constructor() {
  }

  ngOnInit(): void {
  }

}
