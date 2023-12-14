import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private authSrv: AuthService, private router: Router) {}
  registerErr: boolean = false;
  ngOnInit(): void {}

  registra(form: NgForm) {
    const data = {
      nome: form.value.nome,
      cognome: form.value.cognome,
      immaginePrf:
        form.value.immaginePrf === '' ? false : form.value.immaginePrf,
      email: form.value.email,
      password: form.value.password,
    };
    console.log(form.value);

    this.authSrv.register(form.value).subscribe(
      (result) => {},
      (error) => {
        this.registerErr = true;
        console.log(error);
      }
    );
  }
}
