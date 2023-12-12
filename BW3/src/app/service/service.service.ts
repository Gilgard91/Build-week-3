import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  apiURL = environment.apiURL;
  single!: Post;
  constructor(private http: HttpClient) {}

  getposts(userId: number) {
    return this.http.get<Post[]>(`${this.apiURL}/posts?userId=${userId}`);
  }

  getpostid() {
    return this.single.id;
  }
  getpostsingolo(id: number) {
    return this.http.get<Post>(`${this.apiURL}/posts/${id}`);
  }
  putPost(id: number, data: { title: string; body: string }) {
    return this.http.put<Post>(`${this.apiURL}/posts/${id}`, data);
  }
  // postmethod(post: Post): Observable<Post> {
  //   return this.http.post<Post>(`${this.apiURL}/posts`, {
  //     post,
  //   });
  // }
  postcreate(userId: number, title: string, body: string): Observable<Post> {
    return this.http.post<Post>(`${this.apiURL}/posts`, {
      userId,
      title,
      body,
    });
  }
}
