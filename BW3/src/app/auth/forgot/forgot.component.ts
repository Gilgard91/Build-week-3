import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  modifyProfile: boolean = false;
  form!: FormGroup;
  formPassword!: FormGroup;
  user: any = {
    id: '',
    nome: '',
    cognome: '',
    immaginePrf: '',
    email: '',
    password: '',
  };

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
    });
    this.formPassword = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  getEmail() {
    this.modifyProfile = !this.modifyProfile;

    let email = this.form.value.email;

    this.authSrv.getUserEmail(email).subscribe((response) => {
      console.log(response);
      this.user = response;
    });
  }

  changePass() {
    const password = this.formPassword.value.password;
    const confirmPassword = this.formPassword.value.confirmPassword;
    if (password !== confirmPassword) {
      alert('Riprova');
    }
    let email = this.form.value.email;
    console.log(this.user[0].id);
    console.log(this.user);
    this.authSrv
      .createNewPass(this.user[0].id, this.user, password, email)
      .subscribe(
        (resp) => {
          console.log('password reimpostata: ', resp);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log('error durante il processo', error);
        }
      );
  }
}
