import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

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
}
