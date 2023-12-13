import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  accedi(form: NgForm) {
    console.log(form.value);
    try {
      this.authSrv.login(form.value).subscribe();
    } catch (error) {
      alert('Login errato!');
      console.log(error);
      this.router.navigate(['/login']);
    }
  }
  creaaccount() {
    this.router.navigate(['/register']);
  }
}
