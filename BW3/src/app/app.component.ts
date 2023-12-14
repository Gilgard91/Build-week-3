import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'BW3';
  isHomePage: boolean = false;
  isProfile: boolean = false;
  constructor(private authSrv: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Controlla se sei sulla homepage (percorso vuoto '/')
        this.isHomePage = this.router.url === '/';
        this.isProfile = this.router.url === '/posts';
      }
    });

    this.authSrv.restore();
  }
}
