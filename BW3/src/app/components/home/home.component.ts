import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/auth/auth-data';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { ServiceService } from 'src/app/service/service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  utente!: AuthData | null;
  posts: Post[] = [];
  sub!: Subscription;

  modify: Boolean = false;
  modifyPostForm!: FormGroup;
  postToModify!: Post;
  itemToModifyId!: number;
  constructor(
    private postSrv: ServiceService,
    private authSrv: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.modifyPostForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.authSrv.restore();

    this.authSrv.user$.subscribe((_user) => {
      this.utente = _user;
    });
    this.get();
  }

  hasFullAccess(): boolean {
    const userId = this.utente?.user?.id;
    return userId === 1;
  }

  modifyPost(id: number) {
    this.postSrv.getpostsingolo(id).subscribe((post) => {
      // this.router.navigate([`/edit`, id]);
      this.modify = true;
      this.itemToModifyId = id;
      this.postToModify = post;
      this.modifyPostForm = this.fb.group({
        title: [post.title, Validators.required],
        body: [post.body, [Validators.required]],
      });
      console.log(post);
    });
  }

  cancellapost(id: number) {
    this.postSrv.removeFrompost(id).subscribe((risultato) => {
      console.log('cancellato: ' + id);
      this.posts = this.posts.filter((post) => post.id !== id);
    });
  }

  singlepost(id: number) {
    this.postSrv.getpostsingolo(id).subscribe((it) => {
      this.router.navigate([`/posts`, id]);
      console.log(it);
    });
  }

  get() {
    this.sub = this.postSrv.getallPost().subscribe((all) => {
      this.posts = all;
      console.log(all);
    });
  }
}
