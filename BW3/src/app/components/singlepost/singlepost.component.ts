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
  date = new Date();
  day = this.date.getDate();
  month = this.date.getMonth() + 1;
  year = this.date.getFullYear();
  final = `${this.day}-${this.month}-${this.year}`;

  constructor(private route: ActivatedRoute, private postSrv: ServiceService) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      const id = +param['id'];
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
