import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../shared/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: [ './registration.component.scss' ]
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  public emailPattern = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";

  constructor(private userService: UsersService,
              private router: Router) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      'email': new FormControl(null, [
        Validators.required,
        Validators.pattern(this.emailPattern)
      ], this.checkDuplicateEmail.bind(this)),
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      'name': new FormControl(null, [
        Validators.required,
        Validators.minLength(1)
      ]),
      'agree': new FormControl(false, [
        Validators.requiredTrue
      ]),
    })
  }

  validatorMessages(fieldtype: string): string | boolean {
    const form = this.form;

    if ( !form || !form.invalid ) {
      return false;
    }

    let error: string;

    if ( fieldtype === 'email' ) {
      if ( form.get('email')[ 'errors' ][ 'required' ] ) {
        error = 'Введите Ваш email';
      } else if ( form.get('email')[ 'errors' ][ 'pattern' ] ) {
        error = 'Введите валидный email';
      } else if ( form.get('email')[ 'errors' ][ 'dublicateEmail' ] ) {
        error = 'Пользователь с таким email зарегистрирован!';
      }
    } else if ( fieldtype === 'password' ) {
      if ( form.get('password')[ 'errors' ][ 'required' ] ) {
        error = 'Введите Ваш пароль';
      } else if ( form.get('password')[ 'errors' ][ 'minlength' ] ) {
        error = 'Минимальное количество символов - 6';
      }
    } else if ( fieldtype === 'name' ) {
      if ( form.get('name')[ 'errors' ][ 'required' ] ) {
        error = 'Введите Ваше имя!';
      } else if ( form.get('name')[ 'errors' ][ 'minlength' ] ) {
        error = 'Имя должно быть более одного символа';
      }
    }

    return error;
  }

  onSubmit() {
    const form = this.form;
    const formData = form.value;
    const { email, password, name } = formData;
    const user = new User(email, password, name);

    if ( form.invalid ) {
      Object.keys(form.controls).forEach(field => { // {1}
        const control = form.get(field);            // {2}
        control.markAsTouched({ onlySelf: true });       // {3}
      });
    } else {
      this.userService.createNewUser(user)
        .subscribe(() => {
            this.router.navigate([ '/login' ], {
              queryParams: {
                newUserCreated: true
              }
            })
          }
        )
      ;
    }
  }

  checkDuplicateEmail(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.getUserByEmail(control.value)
        .subscribe((user: User) => {
          if ( user ) {
            resolve({ dublicateEmail: true })
          } else resolve(null);
        })
    })
  }

}
