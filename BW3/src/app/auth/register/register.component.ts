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
    try {
      this.authSrv.register(data).subscribe();
    } catch (error: any) {
      console.log(error);
      alert(error);
      this.router.navigate(['/register']);
    }
  }
}
