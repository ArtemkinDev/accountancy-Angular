import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();
  public User;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.User = JSON.parse(window.localStorage.getItem('user'));
  }

  onLogOut(event: Event) {
    event.preventDefault();

    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
