import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-singlepost',
  templateUrl: './singlepost.component.html',
  styleUrls: ['./singlepost.component.scss'],
})
export class SinglepostComponent implements OnInit {
  posts: any;
  constructor(private postSrv: ServiceService) {}

  ngOnInit(): void {
    const postid = this.postSrv.getpostid();
    return this.single(postid);
  }

  single(id: number) {
    this.posts = this.postSrv.getpostsingolo(id);
  }
}
