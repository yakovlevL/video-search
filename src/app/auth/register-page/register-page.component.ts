import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  @Input() password;
  @Input() passwordVisible;
  loading: boolean;
  form: FormGroup;
  authError: any;
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.eventAuthError$.subscribe(data => {
      this.authError = data;
    });
    this.form = new FormGroup({
      username: new FormControl(null,
        Validators.required
      ),
      email: new FormControl(null,
        [
          Validators.required,
          Validators.email
        ]),
      password: new FormControl(null,
        [
          Validators.required,
          Validators.minLength(6)
        ])
    });
  }

  createUser(form): void {
    this.auth.createUser(form.value);
  }
}
