import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { ServiceService } from 'src/app/service/service.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/auth/auth-data';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-singlepost',
  templateUrl: './singlepost.component.html',
  styleUrls: ['./singlepost.component.scss'],
})
export class SinglepostComponent implements OnInit {
  post!: Post;
  now = new Date();
  day = this.now.getDate();
  month = this.now.getMonth() + 1;
  year = this.now.getFullYear();
  final = `${this.day}-${this.month}-${this.year}`;
  allUsers!: any[];
  modifyPostForm!: FormGroup;
  modify: Boolean = false;
  itemToModifyId!: number;
  postToModify!: Post;
  utente!: AuthData | null;

  constructor(
    private route: ActivatedRoute,
    private postSrv: ServiceService,
    private authSrv: AuthService,
    private fb: FormBuilder
  ) {
    this.modifyPostForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', [Validators.required]],
    });
  }
  hasFullAccess(): boolean {
    const userId = this.utente?.user?.id;
    return userId === 1;
  }

  ngOnInit(): void {
    this.authSrv.getAllUser().subscribe((all) => {
      this.allUsers = all;
      console.log(this.allUsers);
    });
    this.route.params.subscribe((param) => {
      const id = +param['id'];
      // const date = `${this.day}-${this.month}-${this.year}`;
      this.postSrv.getpostsingolo(id).subscribe((retrievedPost) => {
        this.post = retrievedPost;
        console.log(retrievedPost);
      });
    });
    this.authSrv.user$.subscribe((_user) => {
      this.utente = _user;
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
  deleteOp() {
    window.location.reload();
  }
  // datapost() {
  //   const date = new Date();
  //   const day = date.getDate();
  //   const month = date.getMonth() + 1;
  //   const year = date.getFullYear();
  //   const final = `${day}-${month}-${year}`;
  //   const spandate = document.querySelector('.dataspan') as HTMLSpanElement;
  //   // return final
  //   spandate.innerHTML = `${day}-${month}-${year}`;
  // }
}
