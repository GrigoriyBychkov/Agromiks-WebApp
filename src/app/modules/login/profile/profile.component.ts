import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public error = '';
  public form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
    ]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    companyName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.minLength(4)]),
    confirmPassword: new FormControl('', [Validators.minLength(4)]),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    console.log('form', this.form);
    this.fetchProfile();
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
    try {
      const result = await this.userService.updateProfile(this.form.value).toPromise();
      if (result) {
        this.snackBar.open('Данные успешно обновлены', 'ок', {
          duration: 2000,
        });
      } else {
        this.error = 'Проверьте форму';
      }
    } catch (e) {
      if (e.error && e.error.error) {
        this.error = e.error.error;
      } else {
        this.error = 'Проверьте форму';
      }
    }
  }

}
