import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public error = '';
  public form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
    ]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    companyName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('form', this.form);
  }

  async submit() {
    this.error = '';
    try {
      const result = await this.userService.registration(this.form.value).toPromise();
      if (result && result.user && result.token) {
        this.userService.setUser(result.user);
        this.userService.setToken(result.token);
        this.router.navigate(['/dashboard']);
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
