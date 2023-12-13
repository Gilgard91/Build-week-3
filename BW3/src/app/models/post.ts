import { Comment } from './comment';
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  img: string | boolean;
  comments: Comment[];
  // date: string;
}

export interface request {
  userId: number;
  id: number;
  title: string;
  body: string;
}
