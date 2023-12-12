import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Post } from 'src/app/models/post';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  modifyPostForm!: FormGroup;
  post!: Post;
  id!: number;
  constructor(
    private fb: FormBuilder,
    private postSrv: ServiceService,
    private route: ActivatedRoute,
    private authSrv: AuthService
  ) {
    this.modifyPostForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((param: any) => {
      this.id = +param['id'];
      this.postSrv.getpostsingolo(this.id).subscribe((retrievedPost) => {
        this.post = retrievedPost;
        console.log(retrievedPost);
        this.modifyPostForm = this.fb.group({
          title: [this.post.title, Validators.required],
          body: [this.post.body, [Validators.required]],
        });
      });
    });
  }

  onEdit() {
    const data = {
      title: this.modifyPostForm.controls['title'].value,
      body: this.modifyPostForm.controls['body'].value,
      userId: this.post.userId,
    };

    try {
      this.postSrv.putPost(this.id, data).subscribe();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }
}
