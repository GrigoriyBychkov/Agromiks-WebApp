import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {UserService} from '../../services/user.service';
import {FeedbackService} from "../../services/feedback.service";

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {
  public error = '';
  public form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required,
      Validators.minLength(4),
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    companyName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    text: new FormControl('', [Validators.required, Validators.maxLength(500)])
  });
  constructor(
    private userService: UserService,
    private feedbackService: FeedbackService
  ) {

  }

  ngOnInit() {
    this.fetchProfile();
    console.log(this.form);
  }

  async fetchProfile() {
    const profile = await this.userService.getProfile().toPromise();
    this.form.patchValue({
      email: profile.email,
      name: profile.name,
      companyName: profile.company.name
    });
  }

  async submit() {
    this.error = '';
    const email = this.form.value;
    const res = await this.feedbackService.send(email).toPromise();
    console.log('//res', res);

  }

}
