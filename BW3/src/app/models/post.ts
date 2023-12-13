export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  img: string | boolean;
  comments: [{ commenterId: number; id: number; body: string }];
  // date: string;
}

export interface request {
  userId: number;
  id: number;
  title: string;
  body: string;
}
