import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzUploadChangeParam} from 'ng-zorro-antd/upload';
import {UserService} from '../../services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import firebase from 'firebase';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  form: FormGroup;
  user: firebase.User;

  constructor(
    private msg: NzMessageService
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null,
        [
          Validators.required
        ]),
      phone: new FormControl(null,
        [
          Validators.required,
        ]),
      email: new FormControl(null,
        [
          Validators.required,
          Validators.email
        ]),
      image: new FormControl(null,
        [
          Validators.required
        ]),
    });
  }

  uploadImg({file, fileList}: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.msg.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  }
}
