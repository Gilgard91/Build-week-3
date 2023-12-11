import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { ServiceService } from 'src/app/service/service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-singlepost',
  templateUrl: './singlepost.component.html',
  styleUrls: ['./singlepost.component.scss'],
})
export class SinglepostComponent implements OnInit {
  post: Post | undefined;

  constructor(private route: ActivatedRoute, private postSrv: ServiceService) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      const id = +param['id'];
      this.postSrv.getpostsingolo(id).subscribe((retrievedPost) => {
        this.post = retrievedPost;
        console.log(retrievedPost);
      });
    });
  }

  // posts: any;
  // constructor(private postSrv: ServiceService) {}

  // ngOnInit(): void {
  // const postid = this.postSrv.getpostid();
  // this.single(postid);
  // }

  // single(id: number) {
  //   this.posts = this.postSrv.getpostsingolo(id);
  // }
}
