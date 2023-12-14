import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs';
import { Request } from '../models/request';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  apiURL = environment.apiURL;
  single!: Post;
  request!: Request;
  constructor(private http: HttpClient) {}
  getallPost() {
    return this.http.get<Post[]>(`${this.apiURL}/posts`);
  }
  getposts(userId: number) {
    return this.http.get<Post[]>(`${this.apiURL}/posts?userId=${userId}`);
  }
  getrequest() {
    return this.http.get<Request[]>(`${this.apiURL}/request`);
  }

  getpostid() {
    return this.single.id;
  }
  getpostsingolo(id: number) {
    return this.http.get<Post>(`${this.apiURL}/posts/${id}`);
  }
  putPost(id: number, data: { title: string; body: string; img: string }) {
    return this.http.patch<Post>(`${this.apiURL}/posts/${id}`, data);
  }
  patchProfile(
    id: number,
    body: { nome: string; cognome: string; email: string; immaginePrf: string }
  ) {
    return this.http.patch(`${this.apiURL}/users/${id}`, body);
  }
  getProfilo(id: number) {
    return this.http.get(`${this.apiURL}/users/${id}`);
  }
  // postmethod(post: Post): Observable<Post> {
  //   return this.http.post<Post>(`${this.apiURL}/posts`, {
  //     post,
  //   });
  // }
  postcreate(data: {
    userId: number;
    title: string;
    body: string;
    comments: Comment[] | undefined;
    img: string;
  }): Observable<Post> {
    return this.http.post<Post>(`${this.apiURL}/posts`, data);
  }

  requestCreate(data: {
    userId: number;
    title: string;
    body: string;
  }): Observable<Request> {
    return this.http.post<Request>(`${this.apiURL}/request`, data);
  }

  removeFrompost(id: number) {
    console.log('Removing from favorites. ID:', id);
    const url = `${this.apiURL}/posts/${id}`;

    return this.http.delete<Post>(url).pipe(
      map((response) => {
        console.log('Successfully removed from favorites:', response);
        return response;
      }),
      catchError((error) => {
        console.error('Error removing from favorites:', error);
        throw error;
      })
    );
  }
}
