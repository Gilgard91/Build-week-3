import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post';
import { ServiceService } from 'src/app/service/service.service';
import { AuthData } from 'src/app/auth/auth-data';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allpost',
  templateUrl: './allpost.component.html',
  styleUrls: ['./allpost.component.scss'],
})
export class AllpostComponent implements OnInit {
  posts: Post[] = [];
  auth!: AuthData[];
  sub!: Subscription;
  nome: string | undefined;
  cognome: string | undefined;
  email: string | undefined;
  immaginePrf: string | undefined;
  @Input() post!: Post;
  constructor(
    private postSrv: ServiceService,
    private authSrv: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authSrv.getuserid();
    this.get(userId!);
    const user = localStorage.getItem('user');
    if (user !== null) {
      const userData = JSON.parse(user);
      this.nome = userData.user.nome;
      this.cognome = userData.user.cognome;
      this.email = userData.user.email;
      this.immaginePrf = userData.user.immaginePrf;
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
    this.postSrv.getpostsingolo(id).subscribe((it) => {
      this.router.navigate([`/edit`, id]);
      console.log(it);
    });
  }

  cancellapost(id: number) {
    this.postSrv.removeFrompost(id).subscribe((risultato) => {
      console.log('cancellato: ' + id);
      this.posts = this.posts.filter((post) => post.id !== id);
    });
  }
}
