import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { ServiceService } from 'src/app/service/service.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-singlepost',
  templateUrl: './singlepost.component.html',
  styleUrls: ['./singlepost.component.scss'],
})
export class SinglepostComponent implements OnInit {
  post: Post | undefined;
  now = new Date();
  day = this.now.getDate();
  month = this.now.getMonth() + 1;
  year = this.now.getFullYear();
  final = `${this.day}-${this.month}-${this.year}`;
  allUsers!: any[];

  constructor(
    private route: ActivatedRoute,
    private postSrv: ServiceService,
    private authSrv: AuthService
  ) {}

  ngOnInit(): void {
    this.authSrv.getAllUser().subscribe((all) => {
      this.allUsers = all;
      console.log(this.allUsers);
    });
    this.route.params.subscribe((param) => {
      const id = +param['id'];
      const date = `${this.day}-${this.month}-${this.year}`;
      this.postSrv.getpostsingolo(id).subscribe((retrievedPost) => {
        this.post = retrievedPost;
        console.log(retrievedPost);
      });
    });
    // console.log(this.datapost());
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
