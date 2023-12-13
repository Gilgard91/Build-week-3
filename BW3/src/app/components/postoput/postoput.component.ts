// import { Component, OnInit } from '@angular/core';
// import { Post } from 'src/app/models/post';
// import { ServiceService } from 'src/app/service/service.service';
// import {
//   FormBuilder,
//   FormGroup,
//   FormControl,
//   Validators,
//   FormArray,
// } from '@angular/forms';

// @Component({
//   selector: 'app-postoput',
//   templateUrl: './postoput.component.html',
//   styleUrls: ['./postoput.component.scss'],
// })
// export class PostoputComponent implements OnInit {
//   posts!: any[];
//   user = localStorage.getItem('user');
//   form: Post = { title: '', body: '' };

//   constructor(private postSrv: ServiceService) {}

//   ngOnInit(): void {
//     this.postSrv.getposts(userId).subscribe((data) => {
//       this.posts = data;
//     });
//   }

//   Submit() {
//     if (this.user !== null) {
//       const userData = JSON.parse(this.user);
//       //   console.log(userData.user.id);

//       //   this.postSrv
//       //     .postmethod(userData.user.id, title, body)
//       //     .subscribe((hope) => {
//       //       console.log(hope);
//       //     });
//       // } else {
//       //   console.log('No user data found in local storage');
//       // }
//       const userId = userData.user.id;
//       const newPost: Post = {
//         title: this.form.title,
//         body: this.form.body,
//       };
//       this.postSrv.postmethod({ userId, ...newPost }).subscribe((nPost) => {
//         this.postSrv.getposts(userId).subscribe((data) => {
//           this.posts = data;
//         });
//       });

//       console.log(this.form);
//     }
//   }
// }
import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { ServiceService } from 'src/app/service/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-postoput',
  templateUrl: './postoput.component.html',
  styleUrls: ['./postoput.component.scss'],
})
export class PostoputComponent implements OnInit {
  posts: Post[] = [];
  user = localStorage.getItem('user');
  form: FormGroup;
  @Output() setFalse = new EventEmitter<boolean>();
  // id = 51;
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

      this.postSrv.getposts(userId).subscribe((data) => {
        this.posts = data;
      });
    }
  }

  Submit() {
    if (this.user !== null) {
      const userData = JSON.parse(this.user);

      const data = {
        title: this.form.value.title,
        body: this.form.value.body,
        userId: userData.user.id,
        comments: [],
      };
      this.postSrv.postcreate(data).subscribe(() => {
        this.loadPosts();
        this.form.reset();
        window.location.reload();
      });
    }
  }

  deleteNewPostOp(bool: boolean) {
    this.setFalse.emit(bool);
  }
}
