import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IUser} from '../../types/IUser';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  @Input() password: boolean;
  @Input() passwordVisible: boolean;
  @Input() loading: boolean;
  form: FormGroup;
  message: string;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['loginAgain']) {
        this.message = 'Войдите в свою учетную запись';
      }
    });
    this.form = new FormGroup({
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

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    const user: IUser = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.auth.login(user)
      .subscribe(() => {
        this.form.reset();
        this.router.navigate(['/']);
        this.loading = false;
      }, () => {
        this.loading = false;
      });
  }
}
