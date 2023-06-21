import { User } from "./user";

export interface Media {
  id: number | string;
  path: string;
  user_id: number | string;
  group_id: null | number | string;
  created_at: string;
  updated_at: string;
  thumbnail?: string | undefined;
}

export interface Comment {
  id: number | string;
  content: string;
  user: User;
  created_at: string;
}

export interface Interaction {
  id: number | string;
  type: string;
  content: string;
  created_at: string;
  user: User;
}

export interface Post {
  id: string | number;
  content?: string;
  videos: Array<Media>;
  images: Array<Media>;
  comments: Array<Comment>;
  interactions: Array<Interaction>;
  created_at: string;
  updated_at: string;
  user: User;
}
