import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/auth/auth-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  utente!: AuthData | null;
  constructor(private authSrv: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.authSrv.restore();

    this.authSrv.user$.subscribe((_user) => {
      this.utente = _user;
    });
  }
  postGenerali() {
    this.router.navigate(['/posts']);
  }
}
