import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  public emailPattern = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    console.log(this.form);

  }

  goToRegistration(event: Event) {
    event.preventDefault();
    this.router.navigate([ './registration' ])
  }

  createForm() {
    this.form = new FormGroup({
      'email': new FormControl(null, [
        Validators.required,
        Validators.pattern(this.emailPattern)
      ]),
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  validatorMessages(fieldtype: string): string|boolean {
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
      }
    } else if ( fieldtype === 'password' ) {
      if ( form.get('password')[ 'errors' ][ 'required' ] ) {
        error = 'Введите Ваш пароль';
      } else if ( form.get('password')[ 'errors' ][ 'minlength' ] ) {
        error = 'Минимальное количество символов - 6';
      }
    }

    return error;
  }

}
