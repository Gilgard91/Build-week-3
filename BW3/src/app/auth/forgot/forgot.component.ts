import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  modifyProfile: boolean = false;
  password!: string;
  consfirmPassword!: string;

  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}
}
