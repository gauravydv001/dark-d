// dd/src/types/Post.ts
export interface Post {
  id: string;
  content: string;
  authorId: string;
  createdAt: Date;
  likes?: number;
  replies?: number;
}