import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './dropPassword.component.html',
  styleUrls: ['./dropPassword.component.scss']
})
export class DropPasswordComponent implements OnInit {
  public error = '';
  public form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
    ]),
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
      const result = await this.userService.dropPassword(this.form.value).toPromise();
      if (result) {
        this.router.navigate(['/login']);
      } else {
        this.error = 'Такой учетной записи не существует';
      }
    } catch (e) {
      this.error = 'Такой учетной записи не существует';
    }
  }

}
