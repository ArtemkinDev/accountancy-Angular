import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'system-app',
  templateUrl: './system.component.html'
})

export class SystemComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.router.navigate([ 'system/bill' ]);
    this.authService.login();
  }
}
