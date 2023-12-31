import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthData } from 'src/app/auth/auth-data';
import { AuthService } from 'src/app/auth/auth.service';
import { Request } from 'src/app/models/request';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  requestPost!: Request[];
  user = localStorage.getItem('user');
  form: FormGroup;
  utente!: AuthData | null;
  userRequest!: number;
  allUsers!: any[];
  constructor(
    private postSrv: ServiceService,
    private fb: FormBuilder,
    private authSrv: AuthService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((_user) => {
      this.utente = _user;
      console.log(this.utente);
    });
    this.loadPosts();
    
    this.authSrv.getAllUser().subscribe((all) => {
      this.allUsers = all;      
    });
  }

  loadPosts() {
    if (this.user !== null) {
      const userData = JSON.parse(this.user);
      const userId = userData.user.id;

      this.postSrv.getrequest().subscribe((data) => {
        this.requestPost = data;
      });
    }
  }

  Submit() {
    if (this.user !== null) {
      const userData = JSON.parse(this.user);

      const data = {
        userId: userData.user.id,
        title: this.form.value.title,
        body: this.form.value.body,
      };
      this.postSrv.requestCreate(data).subscribe((requestPost) => {
        console.log(requestPost);

        this.loadPosts();
        this.form.reset();
      });
    }
  }
}
