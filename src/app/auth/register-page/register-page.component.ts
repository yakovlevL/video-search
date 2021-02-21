import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  @Input() password;
  @Input() passwordVisible;

  constructor() { }

  ngOnInit(): void {
  }

}
