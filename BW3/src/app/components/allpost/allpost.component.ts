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
      userId: this.postToModify.userId,
    };
    try {
      this.postSrv.putPost(id, data).subscribe(() => window.location.reload());
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }
}
