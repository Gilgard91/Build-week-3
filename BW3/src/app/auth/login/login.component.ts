import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authSrv: AuthService, private router: Router) {}
  loginErr: boolean = false;
  ngOnInit(): void {}

  accedi(form: NgForm) {
    console.log(form.value);

    this.authSrv.login(form.value).subscribe(
      (result) => {},
      (error) => {
        this.loginErr = true;
      }
    );
    //  catch (err) {
    //   this.loginErr = true;
    //   alert('Login errato!');
    //   console.log(err);
    //   this.router.navigate(['/login']);
    // }
  }
  creaaccount() {
    this.router.navigate(['/register']);
  }
}
