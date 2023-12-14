import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/auth/auth-data';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  utente!: AuthData | null;

  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authSrv.user$.subscribe((_user) => {
      this.utente = _user;
      console.log(this.utente);
    });

    this.authSrv.restore();
  }

  logout() {
    this.authSrv.logout();
    this.router.navigate(['/login']);
  }
}
