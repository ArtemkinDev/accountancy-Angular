import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User } from '../../shared/user.model';
import { Message } from '../../shared/message';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  public emailPattern = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";
  public message: Message;

  constructor(
    private router: Router,
    private userService: UsersService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.createForm();
    this.readUrlAfterRegistrtion();
  }

  onSubmit() {
    const form = this.form;
    const formData = form.value;

    if ( form.invalid ) {
      Object.keys(form.controls).forEach(field => { // {1}
        const control = form.get(field);            // {2}
        control.markAsTouched({ onlySelf: true });       // {3}
      });
    } else {
      this.userService.getUserByEmail(formData.email).subscribe((user: User) => {
        if(user) {
          if (user.password === formData.password) {
            this.message.text = '';
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            this.router.navigate([ './system' ]);
          } else {
            this.showMessage({
              text: 'Пароль не верный!',
              type: 'danger'
            });
          }
        } else {
          this.showMessage({
            text: 'Такого пользователя не зарегистрировано!',
            type: 'danger'
          });
        }
      })
    }
  }

  showMessage(message: Message) {
    this.message = message;

    window.setTimeout(()=>{
      this.message.text = '';
    }, 2000)
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

  readUrlAfterRegistrtion() {
    this.route.queryParams
      .subscribe((params: Params) => {
        if(params['newUserCreated']) {
          this.showMessage({
            text: 'Теперь можете зайти в систему',
            type: 'success'
          });
        }
      })
  }

}
