import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-app',
  templateUrl: './auth.component.html'
})

export class AuthComponent implements OnInit{

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['./login'])
  }
}
