import { Component, OnInit } from '@angular/core';
import { request } from 'src/app/models/post';
import { ServiceService } from 'src/app/service/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthData } from 'src/app/auth/auth-data';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  requestPost!: request[];
  user = localStorage.getItem('user');
  form: FormGroup;
  utente!: AuthData | null;
  constructor(private postSrv: ServiceService, private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    if (this.user !== null) {
      const userData = JSON.parse(this.user);
      const userId = userData.user.id;
      if (userId === 1) {
        this.postSrv.getposts(userId).subscribe((data) => {
          this.requestPost = data;
        });
      }
    }
  }

  Submit() {
    if (this.user !== null) {
      const userData = JSON.parse(this.user);
      const userId = userData.user.id;
      const title = this.form.value.title;
      const body = this.form.value.body;

      this.postSrv.postcreate(userId, title, body).subscribe((requestPost) => {
        console.log(requestPost);

        this.loadPosts();
        this.form.reset();
      });
    }
  }
}
