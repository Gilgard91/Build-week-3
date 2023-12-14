import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post';
import { ServiceService } from 'src/app/service/service.service';
import { AuthData } from 'src/app/auth/auth-data';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-allpost',
  templateUrl: './allpost.component.html',
  styleUrls: ['./allpost.component.scss'],
})
export class AllpostComponent implements OnInit {
  posts: Post[] = [];
  auth!: AuthData[];
  sub!: Subscription;
  user!: AuthData;
  modify: Boolean = false;
  modifyPostForm!: FormGroup;
  postToModify!: Post;
  itemToModifyId!: number;
  nome: string | undefined;
  cognome: string | undefined;
  email: string | undefined;
  immaginePrf!: string | boolean;
  newPost: Boolean = false;

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
    const userId = this.authSrv.getuserid();
    this.get(userId!);
    this.user = this.authSrv.getUser();
    const user = localStorage.getItem('user');
    if (user !== null) {
      const userData = JSON.parse(user);
      this.nome = userData.user.nome;
      this.cognome = userData.user.cognome;
      this.email = userData.user.email;
      this.immaginePrf = userData.user.immaginePrf
        ? userData.user.immaginePrf
        : 'https://images.unsplash.com/photo-1533794299596-8e62c88ff975?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
      console.log(this.immaginePrf);
    }
  }

  get(userId: number) {
    this.sub = this.postSrv.getposts(userId).subscribe((all) => {
      this.posts = all;
      console.log(all);
    });
  }

  singlepost(id: number) {
    this.postSrv.getpostsingolo(id).subscribe((it) => {
      this.router.navigate([`/posts`, id]);
      console.log(it);
    });
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
        img: [post.img],
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

  onEdit(id: number) {
    const data = {
      title: this.modifyPostForm.controls['title'].value,
      body: this.modifyPostForm.controls['body'].value,
      img: this.modifyPostForm.controls['img'].value,
      userId: this.postToModify.userId,
    };
    try {
      this.postSrv.putPost(id, data).subscribe(() => window.location.reload());
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }
  annulla() {
    this.modify = false;
  }
  setFalse(e: any) {
    this.newPost = e;
  }
  writeNewPost() {
    this.newPost = true;
    scroll(0, 0);
  }
}
